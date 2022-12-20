/* 这是一个用于检查用户状态的中间件 */
const {ExecuteFunction,ExecuteFunctionData} = require('../ExecuteFunction')
// 检查用户状态 CheckUserStatus
exports.CheckUserStatus = async (req, res, next) => {
    const username = req.body.username ? req.body.username : req.query.username
    const CheckUserStatusSql = `select * from User where username=? and state=0`
    const CheckUserStatus = await ExecuteFunctionData(CheckUserStatusSql, username)
    if (CheckUserStatus.length === 0) {
        res.status(204).send({
            status: 204,
            message: '用户状态异常',
        })
    } else {
        next()
    }
}
