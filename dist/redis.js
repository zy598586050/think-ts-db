"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
class Redis {
    // 配置
    redisConfig;
    // 连接
    client;
    // 构造函数初始化
    constructor(config) {
        this.redisConfig = {
            ...config,
            port: config?.port || 6379,
            db: config?.db || 0,
            password: config?.password || ''
        };
        this.client = new ioredis_1.default(this.redisConfig);
    }
    /**
     * 获取值
     * @param key 键
     * @returns
     */
    get(key) {
        return this.client.get(key);
    }
    /**
     * 设置值
     * @param key 键
     * @param value 值
     * @param timeout 过期时间
     * @param callback 过期后的回调
     */
    set(key, value, timeout = 0, callback) {
        if (callback) {
            this.client.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], () => {
                this.client.subscribe(`__keyevent@${this.redisConfig.db}__:expired`, () => {
                    this.client.on('message', (_, msg) => {
                        if (msg === key)
                            callback();
                    });
                });
            });
        }
        this.client.set(key, typeof value === 'object' ? JSON.stringify(value) : value);
        timeout && this.client.expire(key, timeout);
    }
    /**
     * 删除值
     * @param key 键
     */
    del(key) {
        this.client.del(key);
    }
    /**
     * 以哈希的方式存储
     * @param index 索引
     * @param value 键值对
     * @param timeout 过期时间
     * @param callback 过期后的回调
     */
    hmset(index, value, timeout = 0, callback) {
        if (callback) {
            this.client.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], () => {
                this.client.subscribe(`__keyevent@${this.redisConfig.db}__:expired`, () => {
                    this.client.on('message', (_, msg) => {
                        if (msg === index)
                            callback();
                    });
                });
            });
        }
        this.client.hmset(index, value);
        timeout && this.client.expire(index, timeout);
    }
    /**
     * 获取
     * @param index 索引
     * @param key 键
     * @returns
     */
    hget(index, key) {
        return this.client.hget(index, key);
    }
    /**
     * 获取所有
     * @param index 索引
     * @returns
     */
    async hgetAll(index) {
        const fields = await this.client.hkeys(index);
        const values = await Promise.all(fields.map((field) => this.client.hget(index, field)));
        return fields.reduce((result, field, index) => {
            result[field] = values[index];
            return result;
        }, {});
    }
    /**
     * 删除
     * @param index 索引
     * @param key 键
     * @returns
     */
    hdel(index, key) {
        this.client.hdel(index, key);
    }
    /**
     * 递减
     * @param key 键
     * @param num 步长
     */
    decrby(key, num = 1) {
        this.client.decrby(key, num);
    }
    /**
     * 递增
     * @param key 键
     * @param num 步长
     */
    incrby(key, num = 1) {
        this.client.incrby(key, num);
    }
    /**
     * 将给定的值推入列表的右端
     * @param key 键
     * @param value 值
     */
    rpush(key, value) {
        this.client.rpush(key, typeof value === 'object' ? JSON.stringify(value) : value);
    }
    /**
     * 从列表右端弹出一个值
     * @param key 键
     * @returns
     */
    rpop(key) {
        return this.client.rpop(key);
    }
}
exports.default = Redis;
