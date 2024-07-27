<p align="center">
  <img width="300px" src="https://www.think-js.cn/icon.png">
</p>

<p align="center">
  <a href="https://www.think-ts.cn">
    <img src="https://img.shields.io/badge/npm-v1.0.0-blue">
  </a>
  <a href="https://www.think-ts.cn">
    <img src="https://img.shields.io/badge/downloads-110k/month-green">
  </a>
  <a href="https://www.think-ts.cn">
    <img src="https://codecov.io/gh/element-plus/element-plus/branch/dev/graph/badge.svg?token=BKSBO2GLZI"/>
  </a>
  <br>
</p>

<p align="center">一个轻量级的数据库工具</p>

- 💪 ORM思想用对象的方式CRUD
- 🔥 方法提炼封装使用更加简洁优雅
- ⚡️ Nuxt、Next、Koa、Express等框架中都可以直接使用

## think-ts-db

[think-ts-db](https://www.npmjs.com/package/think-ts-db) 是 [ThinkTS框架](https://www.thinkts.cn) 独立出来的一个专门处理数据库相关业务的模块。优点是不受框架约束，可以独立运行在其他任何一个工程中。

## 目录结构

```
.
├── dist
├── src
│   ├── elasticsearch.ts
│   ├── index.ts
│   ├── mongodb.ts
│   ├── mysql.ts
│   ├── redis.ts
│   └── utils.ts
├── README.md
├── package-lock.json
├── package.json
└── tsconfig.json
```

## 安装

```
npm install think-ts-db
```

## 基本使用

这里以KOA项目来做一个简单的演示, 更多具体的调用方法可以查看 [使用文档](https://db.think-ts.cn)

```
import koa from 'koa'
import { koaBody } from 'koa-body'
import KoaRouter from 'koa-router'
import { Db, RDb } from 'think-ts-db'

const app = new koa()
const router = new KoaRouter()

app.use(koaBody({ multipart: true }))
app.use(router.routes())

const mysqlConfig = {
    host: '123.56.82.75',
    port: 3306,
    user: 'think-sso',
    password: 'dcGLEpj5JZReztBw',
    database: 'think-sso'
}

const redisConfig = {
    host: '127.0.0.1',
    port: 6379,
    db: 0
}

router.post('/login', async (ctx) => {
    const { phone, password } = ctx.request.body
    const result = await Db('user', mysqlConfig).where('phone', phone).whereAnd('password', password).findOne()
    if (result?.id) {
        const jwtToken = 'xxxxxxxxxxxx'
        RDb(redisConfig).set(jwtToken, result.id, 3000)
        ctx.body = JSON.stringify({
            code: 0,
            msg: '登录成功',
            data: jwtToken
        })
    } else {
        ctx.body = JSON.stringify({
            code: -1,
            msg: '登录失败'
        })
    }
})

app.listen(3000, () => {
    console.log('Local: http://localhost:3000')
})
```