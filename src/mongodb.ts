import mongoose, { Schema } from 'mongoose'
import { firstToUpper } from './utils'

interface DBOBJECT {
    [key: string]: any
}

export interface MONGOOSECONFIG {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export default class MongoDb {
    // 配置
    mongodbConfig: MONGOOSECONFIG
    // 模型名
    modelName: string = ''
    // 模型
    model: any

    // 构造函数初始化
    constructor(modelName: string, config: MONGOOSECONFIG) {
        this.modelName = modelName
        this.mongodbConfig = {
            ...config,
            port: config?.port || 27017
        }
        mongoose.connect(`mongodb://${this.mongodbConfig.user}:${this.mongodbConfig.password}@${this.mongodbConfig.host}:${this.mongodbConfig.port}/${this.mongodbConfig.database}`)
    }

    /**
     * 创建模型
     * @param obj 模型对象
     * @param options 设置选项
     * -------@param isAutoTime 是否开启自动时间戳，默认不开启
     * -------@param createTime 创建时间字段名，默认 create_time
     * -------@param updateTime 更新时间字段名，默认 update_time
     */
    M(obj: DBOBJECT, options: { isAutoTime?: boolean; createTime?: string; updateTime?: string } = {}) {
        const { isAutoTime, createTime, updateTime } = { isAutoTime: false, createTime: 'create_time', updateTime: 'update_time', ...options }
        const schema = new Schema({
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
        })
        this.model = mongoose.model(firstToUpper(this.modelName), schema)
        return this
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
    insert(obj: DBOBJECT, options: { isAutoTime?: boolean; createTime?: string; updateTime?: string } = {}) {
        const { isAutoTime, createTime, updateTime } = { isAutoTime: false, createTime: 'create_time', updateTime: 'update_time', ...options }
        const newModel = new this.model({
            ...obj,
            ...(isAutoTime ? {
                [createTime]: Date.now,
                [updateTime]: Date.now
            } : {})
        })
        return newModel.save()
    }

    /**
     * 查询数据
     * @param whereObj 查询条件
     * @param current 第几页
     * @param size 每页多少条
     * @returns 
     */
    select(whereObj: DBOBJECT = {}, current?: number, size?: number) {
        if (current && size) {
            return this.model.find(whereObj).skip((current - 1) * size).limit(size)
        } else {
            return this.model.find(whereObj)
        }
    }

    /**
     * 更新数据
     * @param whereObj 限制条件
     * @param updateObj 更新数据
     */
    update(whereObj: DBOBJECT, updateObj: DBOBJECT) {
        return this.model.updateOne(whereObj, updateObj)
    }

    /**
     * 删除数据
     * @param whereObj 限制条件
     */
    delete(whereObj: DBOBJECT) {
        return this.model.deleteOne(whereObj)
    }
}