import { Client } from '@elastic/elasticsearch'

interface DBOBJECT {
    [key: string]: any
}

export interface ESCONFIG {
    host: string;
    port: number;
}

export default class ElasticSearch {

    // 配置
    elasticSearchConfig: ESCONFIG
    // 连接
    client?: Client

    // 构造函数初始化
    constructor(config: ESCONFIG) {
        this.elasticSearchConfig = {
            ...config,
            port: config?.port || 9200
        }
        this.client = new Client({
            node: `http://${this.elasticSearchConfig.host}:${this.elasticSearchConfig.port}`
        })
    }

    /**
     * 创建索引
     * @param index 索引
     * @param body 结构
     * @returns 
     */
    createIndex(index: string, body?: DBOBJECT) {
        return this.client?.indices.create({ index, body })
    }

    /**
     * 添加文档
     * @param index 索引
     * @param body 结构
     * @returns 
     */
    addDocument(index: string, body: DBOBJECT) {
        return this.client?.index({ index, body })
    }
    
    /**
     * 查询
     * @param index 索引
     * @param body 查询结构
     */
    search(index: string, body: DBOBJECT) {
        return this.client?.search({ index, body })
    }
}