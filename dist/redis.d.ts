interface DBOBJECT {
    [key: string]: any;
}
export interface REDISCONFIG {
    host: string;
    port?: number;
    db?: number;
    password?: string;
}
export default class Redis {
    redisConfig: REDISCONFIG;
    client: any;
    constructor(config: REDISCONFIG);
    /**
     * 获取值
     * @param key 键
     * @returns
     */
    get(key: string): any;
    /**
     * 设置值
     * @param key 键
     * @param value 值
     * @param timeout 过期时间
     * @param callback 过期后的回调
     */
    set(key: string, value: string | DBOBJECT, timeout?: number, callback?: () => void): void;
    /**
     * 删除值
     * @param key 键
     */
    del(key: string): void;
    /**
     * 以哈希的方式存储
     * @param index 索引
     * @param value 键值对
     * @param timeout 过期时间
     * @param callback 过期后的回调
     */
    hmset(index: string, value: DBOBJECT, timeout?: number, callback?: () => void): void;
    /**
     * 获取
     * @param index 索引
     * @param key 键
     * @returns
     */
    hget(index: string, key: string): any;
    /**
     * 获取所有
     * @param index 索引
     * @returns
     */
    hgetAll(index: string): Promise<any>;
    /**
     * 删除
     * @param index 索引
     * @param key 键
     * @returns
     */
    hdel(index: string, key: string): void;
    /**
     * 递减
     * @param key 键
     * @param num 步长
     */
    decrby(key: string, num?: number): void;
    /**
     * 递增
     * @param key 键
     * @param num 步长
     */
    incrby(key: string, num?: number): void;
    /**
     * 将给定的值推入列表的右端
     * @param key 键
     * @param value 值
     */
    rpush(key: string, value: string): void;
    /**
     * 从列表右端弹出一个值
     * @param key 键
     * @returns
     */
    rpop(key: string): any;
}
export {};
