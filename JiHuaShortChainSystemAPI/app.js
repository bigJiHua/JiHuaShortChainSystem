/* 导入模块 */
const express = require('express')
const app = express()
const cors = require('cors')
const Joi = require('joi')
const { expressjwt: expressJWT } = require('express-jwt')
const config = require('./config')
const { DecryptUserData } = require('./Implement/middleware/CheckUserStatus')

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.cc = function (err, status) {
        res.status(status === undefined ? 206 : status).send({
            status: status,
            message: err instanceof Error ? err.message : err,
        })
    }
    // 解析加密数据
    DecryptUserData(req)
    next()
})

// 路由
const toShort_router = require('./Router/Short')
const Uers_router = require('./Router/Users')
const jump_router = require('./Router/jump')


app.use('/api/data', expressJWT({
    secret: config.jwtSecretKey,
    algorithms: ['HS256'],
    credentialsRequired: true
}), toShort_router)   // data 获取数据 需要验权
app.use('/api/user', Uers_router) // User 登录 注册 不需要验权
app.use('/api/jump', jump_router) // jump 跳转 不需要验权

// 错误拦截中间件
app.use((err, res) => {
    if (err instanceof Joi.ValidationError) return res.status(206).send({
        status: 206,
        message: err instanceof Error ? err.message : err,
    })
    if (err.name === 'UnauthorizedError') return res.status(401).send({
        status: 401,
        message: '身份认证失败,请登录'
    })
    return res.status(206).send({
        status: 206,
        message: err
    })
})

// 监听项目端口，运行时要修改
app.listen(config.Port, () => {
    console.log('server Open ' + config.pub_date )
})
