import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import Collections
import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'

// Import Globals
import { Identity } from './globals/Identity'
import { Header } from './globals/Header'
import { Theme } from './globals/Theme'
import { Footer } from './globals/Footer'
import { Licenses } from './collections/Licenses'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Pages,
    Media,
    Licenses
  ],
  globals: [
    Identity,
    Theme,
    Header,
    Footer
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      // This tells Payload to use a local file during development
      // When deployed, you will pass your D1 connection string via this environment variable
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
  sharp: sharp as any,
  plugins: [],
})
