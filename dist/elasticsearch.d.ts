import { Client } from '@elastic/elasticsearch';
interface DBOBJECT {
    [key: string]: any;
}
export interface ESCONFIG {
    host: string;
    port: number;
}
export default class ElasticSearch {
    elasticSearchConfig: ESCONFIG;
    client?: Client;
    constructor(config: ESCONFIG);
    /**
     * 创建索引
     * @param index 索引
     * @param body 结构
     * @returns
     */
    createIndex(index: string, body?: DBOBJECT): Promise<import("@elastic/elasticsearch/lib/api/types").IndicesCreateResponse> | undefined;
    /**
     * 添加文档
     * @param index 索引
     * @param body 结构
     * @returns
     */
    addDocument(index: string, body: DBOBJECT): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase> | undefined;
    /**
     * 查询
     * @param index 索引
     * @param body 查询结构
     */
    search(index: string, body: DBOBJECT): Promise<import("@elastic/elasticsearch/lib/api/types").SearchResponse<unknown, Record<string, import("@elastic/elasticsearch/lib/api/types").AggregationsAggregate>>> | undefined;
}
export {};
