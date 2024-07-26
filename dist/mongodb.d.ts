interface DBOBJECT {
    [key: string]: any;
}
export interface MONGOOSECONFIG {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
export default class MongoDb {
    mongodbConfig: MONGOOSECONFIG;
    modelName: string;
    model: any;
    constructor(modelName: string, config: MONGOOSECONFIG);
    /**
     * 创建模型
     * @param obj 模型对象
     * @param options 设置选项
     * -------@param isAutoTime 是否开启自动时间戳，默认不开启
     * -------@param createTime 创建时间字段名，默认 create_time
     * -------@param updateTime 更新时间字段名，默认 update_time
     */
    M(obj: DBOBJECT, options?: {
        isAutoTime?: boolean;
        createTime?: string;
        updateTime?: string;
    }): this;
    /**
     * 新增数据
     * @param obj 数据
     * @param options 设置选项
     * -------@param isAutoTime 是否开启自动时间戳，默认不开启
     * -------@param createTime 创建时间字段名，默认 create_time
     * -------@param updateTime 更新时间字段名，默认 update_time
     * @returns
     */
    insert(obj: DBOBJECT, options?: {
        isAutoTime?: boolean;
        createTime?: string;
        updateTime?: string;
    }): any;
    /**
     * 查询数据
     * @param whereObj 查询条件
     * @param current 第几页
     * @param size 每页多少条
     * @returns
     */
    select(whereObj?: DBOBJECT, current?: number, size?: number): any;
    /**
     * 更新数据
     * @param whereObj 限制条件
     * @param updateObj 更新数据
     */
    update(whereObj: DBOBJECT, updateObj: DBOBJECT): any;
    /**
     * 删除数据
     * @param whereObj 限制条件
     */
    delete(whereObj: DBOBJECT): any;
}
export {};
