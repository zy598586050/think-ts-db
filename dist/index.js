"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDb = exports.MDb = exports.RDb = exports.Db = void 0;
const mysql_1 = __importDefault(require("./mysql"));
const redis_1 = __importDefault(require("./redis"));
const mongodb_1 = __importDefault(require("./mongodb"));
const elasticsearch_1 = __importDefault(require("./elasticsearch"));
// MySql
const Db = (tableName, config) => {
    return new mysql_1.default(tableName, config);
};
exports.Db = Db;
// Redis
const RDb = (config) => {
    return new redis_1.default(config);
};
exports.RDb = RDb;
// Mongoose
const MDb = (modelName, config) => {
    return new mongodb_1.default(modelName, config);
};
exports.MDb = MDb;
// ElasticSearch
const EDb = (config) => {
    return new elasticsearch_1.default(config);
};
exports.EDb = EDb;
