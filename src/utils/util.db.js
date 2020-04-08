import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import envConfig from '@/config/env-config'

const sysId = `${envConfig.appTitle}-${envConfig.appNodeEnv}`
const adapter = new LocalStorage(sysId)
const db = low(adapter)
db.defaults({
  sys: {},
  database: {}
}).write()

export default db
