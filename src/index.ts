import MySql, { MYSQLCONFIG } from './mysql'
import Redis, { REDISCONFIG } from './redis'
import MongoDb, { MONGOOSECONFIG } from './mongodb'
import ElasticSearch, { ESCONFIG } from './elasticsearch'

export { MYSQLCONFIG, REDISCONFIG, MONGOOSECONFIG, ESCONFIG }

// MySql
export const Db = (tableName: string, config: MYSQLCONFIG) => {
    return new MySql(tableName, config)
}

// Redis
export const RDb = (config: REDISCONFIG) => {
    return new Redis(config)
}

// Mongoose
export const MDb = (modelName: string, config: MONGOOSECONFIG) => {
    return new MongoDb(modelName, config)
}

// ElasticSearch
export const EDb = (config: ESCONFIG) => {
    return new ElasticSearch(config)
}
