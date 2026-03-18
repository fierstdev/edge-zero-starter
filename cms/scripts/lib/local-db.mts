import fs from 'node:fs'
import path from 'node:path'
import { DatabaseSync } from 'node:sqlite'

export type LocalDbRepairResult = {
  backupFile: null | string
  dbFile: null | string
  droppedTables: string[]
  addedColumns: Array<{ column: string; table: string }>
  skipped: boolean
  reason?: string
}

export type LocalDbIndexCleanupResult = {
  backupFile: null | string
  dbFile: null | string
  droppedIndexes: string[]
  skipped: boolean
  reason?: string
}

type ColumnPatch = {
  column: string
  definition: string
}

const TABLE_PATCHES: Record<string, ColumnPatch[]> = {
  pages_blocks_about: [
    { column: 'badge_text', definition: 'TEXT' },
  ],
  pages_blocks_auth_portal: [
    { column: 'eyebrow_text', definition: 'TEXT' },
    { column: 'submit_button_text', definition: "TEXT DEFAULT 'Continue'" },
    { column: 'success_redirect_label', definition: "TEXT DEFAULT 'Success redirect'" },
    { column: 'name_label', definition: "TEXT DEFAULT 'Full name'" },
    { column: 'email_label', definition: "TEXT DEFAULT 'Email address'" },
    { column: 'password_label', definition: "TEXT DEFAULT 'Password'" },
    { column: 'confirm_password_label', definition: "TEXT DEFAULT 'Confirm password'" },
  ],
  pages_blocks_call_to_action: [
    { column: 'fine_print', definition: 'TEXT' },
  ],
  pages_blocks_contact: [
    { column: 'badge_text', definition: 'TEXT' },
    { column: 'email_label', definition: "TEXT DEFAULT 'Email'" },
    { column: 'phone_label', definition: "TEXT DEFAULT 'Phone'" },
    { column: 'address_label', definition: "TEXT DEFAULT 'Address'" },
    { column: 'first_name_label', definition: "TEXT DEFAULT 'First Name'" },
    { column: 'last_name_label', definition: "TEXT DEFAULT 'Last Name'" },
    { column: 'email_field_label', definition: "TEXT DEFAULT 'Email Address'" },
    { column: 'message_label', definition: "TEXT DEFAULT 'Message'" },
    { column: 'submit_button_text', definition: "TEXT DEFAULT 'Send Message'" },
  ],
  pages_blocks_feature_grid: [
    { column: 'media_id', definition: 'INTEGER' },
  ],
  pages_blocks_platform_dashboard: [
    { column: 'eyebrow_text', definition: "TEXT DEFAULT 'Dashboard'" },
    { column: 'active_view_label', definition: "TEXT DEFAULT 'Active view'" },
    { column: 'status_text', definition: "TEXT DEFAULT 'Live'" },
    { column: 'overview_label', definition: "TEXT DEFAULT 'Overview'" },
    { column: 'projects_label', definition: "TEXT DEFAULT 'Projects'" },
    { column: 'licenses_label', definition: "TEXT DEFAULT 'Licenses'" },
    { column: 'billing_label', definition: "TEXT DEFAULT 'Billing'" },
    { column: 'settings_label', definition: "TEXT DEFAULT 'Settings'" },
  ],
  pages_blocks_quote_funnel: [
    { column: 'select_placeholder', definition: "TEXT DEFAULT 'Select an option'" },
    { column: 'previous_button_text', definition: "TEXT DEFAULT 'Back'" },
    { column: 'next_button_text', definition: "TEXT DEFAULT 'Next'" },
    { column: 'submit_button_text', definition: "TEXT DEFAULT 'Submit'" },
    { column: 'success_step_label', definition: "TEXT DEFAULT 'Done'" },
  ],
  pages_blocks_service_area: [
    { column: 'badge_text', definition: 'TEXT' },
  ],
}

export function loadEnvFile(filepath: string) {
  if (!fs.existsSync(filepath)) return

  const contents = fs.readFileSync(filepath, 'utf8')

  for (const rawLine of contents.split('\n')) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) continue

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

export function loadLocalEnv(cwd = process.cwd()) {
  loadEnvFile(path.resolve(cwd, '.env'))
  loadEnvFile(path.resolve(cwd, '.env.local'))
}

export function resolveLocalDbFile(cwd = process.cwd()) {
  const databaseUri = process.env.DATABASE_URI || 'file:./payload.db'

  if (!databaseUri.startsWith('file:')) {
    return null
  }

  const dbPath = databaseUri.slice('file:'.length)
  return path.resolve(cwd, decodeURIComponent(dbPath))
}

function quoteIdentifier(identifier: string) {
  return `"${identifier.replaceAll('"', '""')}"`
}

function getTableNames(db: DatabaseSync) {
  return new Set(
    db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all()
      .map((row) => String((row as { name: string }).name)),
  )
}

function getColumnNames(db: DatabaseSync, tableName: string) {
  return new Set(
    db
      .prepare(`PRAGMA table_info(${quoteIdentifier(tableName)})`)
      .all()
      .map((row) => String((row as { name: string }).name)),
  )
}

function getTempTables(db: DatabaseSync) {
  return db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '__new_%' ORDER BY name")
    .all()
    .map((row) => String((row as { name: string }).name))
}

function buildBackupPath(dbFile: string) {
  const timestamp = new Date().toISOString().replaceAll(':', '-')
  const backupDir = path.join(path.dirname(dbFile), '.backups')

  fs.mkdirSync(backupDir, { recursive: true })

  return path.join(backupDir, `${path.basename(dbFile)}.${timestamp}.bak`)
}

export function repairLocalDb(cwd = process.cwd()): LocalDbRepairResult {
  const dbFile = resolveLocalDbFile(cwd)

  if (!dbFile) {
    return {
      backupFile: null,
      dbFile: null,
      droppedTables: [],
      addedColumns: [],
      skipped: true,
      reason: 'DATABASE_URI is not using a local SQLite file.',
    }
  }

  if (!fs.existsSync(dbFile)) {
    return {
      backupFile: null,
      dbFile,
      droppedTables: [],
      addedColumns: [],
      skipped: true,
      reason: 'Local SQLite database does not exist yet.',
    }
  }

  const probeDb = new DatabaseSync(dbFile)
  const tableNames = getTableNames(probeDb)
  const droppedTables = getTempTables(probeDb)
  const addedColumns: Array<{ column: string; table: string }> = []

  for (const [tableName, patches] of Object.entries(TABLE_PATCHES)) {
    if (!tableNames.has(tableName)) continue

    const existingColumns = getColumnNames(probeDb, tableName)

    for (const patch of patches) {
      if (!existingColumns.has(patch.column)) {
        addedColumns.push({ column: patch.column, table: tableName })
      }
    }
  }

  probeDb.close()

  if (droppedTables.length === 0 && addedColumns.length === 0) {
    return {
      backupFile: null,
      dbFile,
      droppedTables: [],
      addedColumns: [],
      skipped: true,
      reason: 'Local SQLite schema is already up to date for the known starter/pro overlay drift.',
    }
  }

  const backupFile = buildBackupPath(dbFile)
  fs.copyFileSync(dbFile, backupFile)

  const db = new DatabaseSync(dbFile)

  for (const tableName of droppedTables) {
    db.exec(`DROP TABLE IF EXISTS ${quoteIdentifier(tableName)}`)
  }

  for (const [tableName, patches] of Object.entries(TABLE_PATCHES)) {
    if (!tableNames.has(tableName)) continue

    const existingColumns = getColumnNames(db, tableName)

    for (const patch of patches) {
      if (existingColumns.has(patch.column)) continue

      db.exec(
        `ALTER TABLE ${quoteIdentifier(tableName)} ADD COLUMN ${quoteIdentifier(patch.column)} ${patch.definition}`,
      )
    }
  }

  db.close()

  return {
    backupFile,
    dbFile,
    droppedTables,
    addedColumns,
    skipped: false,
  }
}

export function dropExplicitIndexesForTable(
  tableName: string,
  cwd = process.cwd(),
): LocalDbIndexCleanupResult {
  const dbFile = resolveLocalDbFile(cwd)

  if (!dbFile) {
    return {
      backupFile: null,
      dbFile: null,
      droppedIndexes: [],
      skipped: true,
      reason: 'DATABASE_URI is not using a local SQLite file.',
    }
  }

  if (!fs.existsSync(dbFile)) {
    return {
      backupFile: null,
      dbFile,
      droppedIndexes: [],
      skipped: true,
      reason: 'Local SQLite database does not exist yet.',
    }
  }

  const probeDb = new DatabaseSync(dbFile)
  const droppedIndexes = probeDb
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name = ? AND sql IS NOT NULL AND name NOT LIKE 'sqlite_autoindex_%' ORDER BY name",
    )
    .all(tableName)
    .map((row) => String((row as { name: string }).name))
  probeDb.close()

  if (droppedIndexes.length === 0) {
    return {
      backupFile: null,
      dbFile,
      droppedIndexes: [],
      skipped: true,
      reason: `No explicit indexes found for ${tableName}.`,
    }
  }

  const backupFile = buildBackupPath(dbFile)
  fs.copyFileSync(dbFile, backupFile)

  const db = new DatabaseSync(dbFile)

  for (const indexName of droppedIndexes) {
    db.exec(`DROP INDEX IF EXISTS ${quoteIdentifier(indexName)}`)
  }

  db.close()

  return {
    backupFile,
    dbFile,
    droppedIndexes,
    skipped: false,
  }
}
