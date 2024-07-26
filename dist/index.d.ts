import MySql, { MYSQLCONFIG } from './mysql';
import Redis, { REDISCONFIG } from './redis';
import MongoDb, { MONGOOSECONFIG } from './mongodb';
import ElasticSearch, { ESCONFIG } from './elasticsearch';
export { MYSQLCONFIG, REDISCONFIG, MONGOOSECONFIG, ESCONFIG };
export declare const Db: (tableName: string, config: MYSQLCONFIG) => MySql;
export declare const RDb: (config: REDISCONFIG) => Redis;
export declare const MDb: (modelName: string, config: MONGOOSECONFIG) => MongoDb;
export declare const EDb: (config: ESCONFIG) => ElasticSearch;
