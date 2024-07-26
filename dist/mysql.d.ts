import { Pool, PoolConnection } from 'mysql2/promise';
type CONDITION = '=' | '!=' | '>' | '<' | '>=' | '<=' | '<>';
type SORT = 'DESC' | 'ASC';
type JOIN = 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';
interface DBOBJECT {
    [key: string]: any;
}
export interface MYSQLCONFIG {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connectionLimit?: number;
}
export default class MySql {
    mysqlConfig: MYSQLCONFIG;
    pool: Pool;
    connection?: PoolConnection;
    tableName: string;
    fieldStr: string;
    whereStr: string;
    values: (string | number | (string | number)[])[];
    joinStr: string;
    lockStr: string;
    lastSql: string;
    constructor(tableName: string, config: MYSQLCONFIG, connection?: PoolConnection);
    /**
     * 单条件查询
     * @param field 字段名
     * @param condition 条件
     * @param value 值
     * @returns
     */
    where(field: string, condition: CONDITION, value?: string | number): this;
    /**
     * 多条件查询AND，前边必须要有where的调用
     * @param field 字段名
     * @param condition 条件
     * @param value 值
     * @returns
     */
    whereAnd(field: string, condition: CONDITION, value?: string | number): this;
    /**
     * 多条件查询OR，前边必须要有where的调用
     * @param field 字段名
     * @param condition 条件
     * @param value 值
     * @returns
     */
    whereOr(field: string, condition: CONDITION, value?: string | number): this;
    /**
     * 多条件查询IN
     * @param field 字段名
     * @param value 值 注意一般这里传一个数组
     * @returns
     */
    whereIn(field: string, value: (string | number)[] | string | number): this;
    /**
     * 多条件查询LIKE
     * @param field 字段名
     * @param value 值 注意一般这里传一个字符串，带上通配符，使用 %（代表零个或多个字符）和 _（代表单个字符）进行模糊匹配
     * @returns
     */
    whereLike(field: string, value: string | number): this;
    /**
     * 多条件查询BETWEEN
     * @param field 字段名
     * @param value1 值1
     * @param value2 值2
     * @returns
     */
    whereBetween(field: string, value1: string | number, value2: string | number): this;
    /**
     * 多条件查询IS NULL
     * @param field 字段名
     * @returns
     */
    whereIsNull(field: string): this;
    /**
     * 多条件查询IS NOT NULL
     * @param field 字段名
     * @returns
     */
    whereIsNotNull(field: string): this;
    /**
     * 排序
     * @param field 排序的字段
     * @param sort 排序规则，DESC倒序 ASC正序
     * @returns
     */
    order(field: string, sort?: SORT): this;
    /**
     * 分页查询
     * @param current 第几页
     * @param size 每页显示多少条
     * @returns
     */
    page(current?: number, size?: number): this;
    /**
     * 限制查询的条数
     * @param num 要查询的条数
     * @returns
     */
    limit(num: number): this;
    /**
     * 指定要显示的字段
     * @param str 字段名用英文逗号隔开，如：id,name,age
     * @param isDistinct 是否去重，默认不开启
     * @returns
     */
    field(str: string, isDistinct?: boolean): this;
    /**
     * 分组查询
     * @param field 字段名
     * @returns
     */
    group(field: string): this;
    /**
     * 新增一条数据
     * @param obj 数据对象
     * @param options 设置选项
     * -------@param isAutoTime 是否开启自动时间戳，默认不开启
     * -------@param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * -------@param createTime 创建时间字段名，默认 create_time
     * -------@param updateTime 更新时间字段名，默认 update_time
     */
    insert(obj?: DBOBJECT, options?: {
        isAutoTime?: boolean;
        isShowSql?: boolean;
        createTime?: string;
        updateTime?: string;
    }): Promise<any>;
    /**
     * 新增多条数据, 注意数据格式一定要保持一致
     * @param objArray 数据对象集合
     * @param options 设置选项
     * -------@param isAutoTime 是否开启自动时间戳，默认不开启
     * -------@param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * -------@param createTime 创建时间字段名，默认 create_time
     * -------@param updateTime 更新时间字段名，默认 update_time
     */
    insertAll(objArray?: DBOBJECT[], options?: {
        isAutoTime?: boolean;
        isShowSql?: boolean;
        createTime?: string;
        updateTime?: string;
    }): Promise<any>;
    /**
     * 更新数据
     * @param obj 数据对象
     * @param options 设置选项
     * -------@param isAutoTime 是否开启自动时间戳，默认不开启
     * -------@param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * -------@param updateTime 更新时间字段名，默认 update_time
     * -------@param allProtect 全量更新保护，默认开启，防止忘记写WHERE条件误更新所有数据
     */
    update(obj?: DBOBJECT, options?: {
        isAutoTime?: boolean;
        isShowSql?: boolean;
        updateTime?: string;
        allProtect?: boolean;
    }): Promise<any>;
    /**
     * 删除数据
     * @param options 设置选项
     * -------@param isDeleteFlag 是否是软删除，默认是
     * -------@param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * -------@param deleteTime 删除时间字段名，默认 delete_time
     * -------@param deleteProtect 删除保护，默认开启，防止忘记写WHERE条件误删除所有数据，只争对物理删除有效
     * @returns
     */
    delete(options?: {
        isDeleteFlag?: boolean;
        isShowSql?: boolean;
        deleteTime?: string;
        deleteProtect?: boolean;
    }): Promise<any>;
    /**
     * 查询一条数据
     * @param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * @returns
     */
    findOne(isShowSql?: boolean): Promise<any>;
    /**
     * 查询数据的数量
     * @param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * @returns
     */
    count(isShowSql?: boolean): Promise<any>;
    /**
     * 以某个字段递减
     * @param field 字段名
     * @param num 步减 默认步减为1
     * @options 设置选项
     * ---------@param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * ---------@param isAutoTime 是否开启自动时间戳，默认不开启
     * ---------@param updateTime 更新时间字段名，默认 update_time
     * ---------@param allProtect 全量更新保护，默认开启，防止忘记写WHERE条件误更新所有数据
     */
    decr(field: string, num: number | undefined, options: {
        isShowSql?: boolean;
        isAutoTime?: boolean;
        updateTime?: string;
        allProtect?: boolean;
    }): Promise<any>;
    /**
     * 以某个字段递增
     * @param field 字段名
     * @param num 步增 默认步增为1
     * @options 设置选项
     * ---------@param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * ---------@param isAutoTime 是否开启自动时间戳，默认不开启
     * ---------@param updateTime 更新时间字段名，默认 update_time
     * ---------@param allProtect 全量更新保护，默认开启，防止忘记写WHERE条件误更新所有数据
     */
    incr(field: string, num: number | undefined, options: {
        isShowSql?: boolean;
        isAutoTime?: boolean;
        updateTime?: string;
        allProtect?: boolean;
    }): Promise<any>;
    /**
     * 查询多条数据
     * @param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * @returns
     */
    select(isShowSql?: boolean): Promise<any>;
    /**
     * 关联查询
     * @param tableName 关联的表名
     * @param whereStr 关联条件
     * @param type 关联类型 可以为 INNER, LEFT, RIGHT, FULL 默认为LEFT
     * INNER: 如果表中有至少一个匹配，则返回行
     * LEFT: 即使右表中没有匹配，也从左表返回所有的行
     * RIGHT: 即使左表中没有匹配，也从右表返回所有的行
     * FULL: 只要其中一个表中存在匹配，就返回行
     * @returns
     */
    join(tableName: string, whereStr: string, type?: JOIN): this;
    /**
     * 锁
     * @param lockStr 锁类型，默认FOR UPDATE
     * 排它锁 FOR UPDATE 用于写操作
     * 共享锁 LOCK IN SHARE MODE 用于读操作
     * @returns
     */
    lock(lockStr?: string): this;
    /**
     * 事务
     * @param fn 回调函数
     */
    beginTransaction(fn: (TDb: any) => Promise<void>): Promise<void>;
    /**
     * 自定义SQL语句查询
     * @param sql 查询语句，防止注入请用?占位
     * @param values 匹配?的值
     * @param isShowSql 是否打印最终执行的SQL语句，默认不打印
     * @returns
     */
    query(sql: string, values?: (number | string)[], isShowSql?: boolean): Promise<any>;
}
export {};
