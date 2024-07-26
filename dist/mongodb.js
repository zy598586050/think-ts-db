"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const utils_1 = require("./utils");
class MongoDb {
    // 配置
    mongodbConfig;
    // 模型名
    modelName = '';
    // 模型
    model;
    // 构造函数初始化
    constructor(modelName, config) {
        this.modelName = modelName;
        this.mongodbConfig = {
            ...config,
            port: config?.port || 27017
        };
        mongoose_1.default.connect(`mongodb://${this.mongodbConfig.user}:${this.mongodbConfig.password}@${this.mongodbConfig.host}:${this.mongodbConfig.port}/${this.mongodbConfig.database}`);
    }
    /**
     * 创建模型
     * @param obj 模型对象
     * @param options 设置选项
     * -------@param isAutoTime 是否开启自动时间戳，默认不开启
     * -------@param createTime 创建时间字段名，默认 create_time
     * -------@param updateTime 更新时间字段名，默认 update_time
     */
    M(obj, options = {}) {
        const { isAutoTime, createTime, updateTime } = { isAutoTime: false, createTime: 'create_time', updateTime: 'update_time', ...options };
        const schema = new mongoose_1.Schema({
            ...obj,
            ...(isAutoTime ? {
                [createTime]: {
                    type: Date,
                    default: Date.now
                },
                [updateTime]: {
                    type: Date,
                    default: Date.now
                }
            } : {})
        });
        this.model = mongoose_1.default.model((0, utils_1.firstToUpper)(this.modelName), schema);
        return this;
    }
    /**
     * 新增数据
     * @param obj 数据
     * @param options 设置选项
     * -------@param isAutoTime 是否开启自动时间戳，默认不开启
     * -------@param createTime 创建时间字段名，默认 create_time
     * -------@param updateTime 更新时间字段名，默认 update_time
     * @returns
     */
    insert(obj, options = {}) {
        const { isAutoTime, createTime, updateTime } = { isAutoTime: false, createTime: 'create_time', updateTime: 'update_time', ...options };
        const newModel = new this.model({
            ...obj,
            ...(isAutoTime ? {
                [createTime]: Date.now,
                [updateTime]: Date.now
            } : {})
        });
        return newModel.save();
    }
    /**
     * 查询数据
     * @param whereObj 查询条件
     * @param current 第几页
     * @param size 每页多少条
     * @returns
     */
    select(whereObj = {}, current, size) {
        if (current && size) {
            return this.model.find(whereObj).skip((current - 1) * size).limit(size);
        }
        else {
            return this.model.find(whereObj);
        }
    }
    /**
     * 更新数据
     * @param whereObj 限制条件
     * @param updateObj 更新数据
     */
    update(whereObj, updateObj) {
        return this.model.updateOne(whereObj, updateObj);
    }
    /**
     * 删除数据
     * @param whereObj 限制条件
     */
    delete(whereObj) {
        return this.model.deleteOne(whereObj);
    }
}
exports.default = MongoDb;
