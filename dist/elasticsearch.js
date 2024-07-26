"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@elastic/elasticsearch");
class ElasticSearch {
    // 配置
    elasticSearchConfig;
    // 连接
    client;
    // 构造函数初始化
    constructor(config) {
        this.elasticSearchConfig = {
            ...config,
            port: config?.port || 9200
        };
        this.client = new elasticsearch_1.Client({
            node: `http://${this.elasticSearchConfig.host}:${this.elasticSearchConfig.port}`
        });
    }
    /**
     * 创建索引
     * @param index 索引
     * @param body 结构
     * @returns
     */
    createIndex(index, body) {
        return this.client?.indices.create({ index, body });
    }
    /**
     * 添加文档
     * @param index 索引
     * @param body 结构
     * @returns
     */
    addDocument(index, body) {
        return this.client?.index({ index, body });
    }
    /**
     * 查询
     * @param index 索引
     * @param body 查询结构
     */
    search(index, body) {
        return this.client?.search({ index, body });
    }
}
exports.default = ElasticSearch;
