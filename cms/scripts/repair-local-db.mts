import { loadLocalEnv, repairLocalDb } from './lib/local-db.mts'

loadLocalEnv()

const result = repairLocalDb()

console.log(JSON.stringify(result, null, 2))
