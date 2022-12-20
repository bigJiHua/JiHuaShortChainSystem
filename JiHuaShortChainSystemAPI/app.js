/* 导入模块 */
const express = require('express')
const app = express()
const cors = require('cors')
const Joi = require('joi')
const { expressjwt: expressJWT } = require('express-jwt')
const setting = require('./setting')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.cc = function (err, status) {
        if (status === '') {
            res.send({
                status: 206,
                message: err instanceof Error ? err.message : err,
            })
        } else {
            res.send({
                status: status,
                message: err instanceof Error ? err.message : err,
            })
        }
    }
    next()
})

const config = require('./config')
const toShort_router = require('./Router/Short')
const Uers_router = require('./Router/Users')
const jump_router = require('./Router/jump')

// data 获取数据
app.use('/data', expressJWT({
    secret: config.jwtSecretKey,
    algorithms: ['HS256'],
    credentialsRequired: true
}), toShort_router)
// User 登录 注册
app.use('/user', Uers_router)
// jump 跳转
app.use('/jump', jump_router)


app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) return res.cc(err, 202)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败,请登录', 401)
    return res.cc(err, 202)
})
//     监听项目端口，运行时要修改
app.listen(setting.Port, () => {
    console.log('server Open ' + setting.pub_date + ' ' + new Date())
})
