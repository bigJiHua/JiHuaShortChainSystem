/* 这是一个用于检查用户状态的中间件 */
const { ExecuteFunctionData } = require('../ExecuteFunction')
const CryptoJS = require("crypto-js")
const config = require('../../config')
// 检查用户状态 CheckUserStatus
exports.CheckUserStatus = async (req, res, next) => {
    const CheckUserStatusSql = `select * from User where username=? and state=0`
    const CheckUserStatus = await ExecuteFunctionData(CheckUserStatusSql, req.auth.username)
    if (CheckUserStatus.length === 0) {
        res.status(401).send({
            status: 401,
            message: '用户状态异常',
        })
    } else {
        next()
    }
}
// 解密用户数据中间件 Decrypt user data middleware
exports.DecryptUserData = (req) => {
    let reqData = req.body.data ? req.body.data : req.query.data
    if (reqData) {
        // 使用 CryptoJS 库解密字符串
        const bytes = CryptoJS.AES.decrypt(reqData, 'secret key 123')
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
        // 将字符串转换回对象
        req.body = JSON.parse(decryptedString)
    }
}


