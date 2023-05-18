const config = require('../config')
const { ExecuteFunctionData } = require('../Implement/ExecuteFunction')

// 短链变成长链，且校验密码
exports.toJumpRouter = async (req,res) => {
    const ShortID = req.query.id
    // 这是一条获取时间大于当前的SQL语句
    const CalibrationTimeSql = `SELECT * FROM SLDateMap WHERE FROM_UNIXTIME(endtime / 1000) > CURRENT_TIMESTAMP AND short = ?`
    const updateClickSql = `UPDATE ShortChain SET clicks = clicks + 1 WHERE short = ?`;
    // 功能1 查表，看短链属性 Look at the short chain properties
    const shortChainPropertiesSCSql = `SELECT * FROM ShortChain WHERE short = ?`
    const shortChainPropertiesSLDSql = `SELECT * FROM SLDateMap WHERE short = ?`
    const shortChainPropertiesSC =  await ExecuteFunctionData(shortChainPropertiesSCSql,ShortID)
    const shortChainPropertiesSLD = await ExecuteFunctionData(shortChainPropertiesSLDSql,ShortID)
    // 如果是普通缩短
    if (shortChainPropertiesSC.length !== 0 && shortChainPropertiesSLD.length === 0){
        if (parseInt(shortChainPropertiesSC[0].islock) === 1 ) {
            res.status(200).send({
                status:204,
                message: '加密链接，请输入密码!'
            })
        } else {
            // 更新clicks字段
            await ExecuteFunctionData(updateClickSql, ShortID)
            res.status(200).send({
                status: 200,
                link: shortChainPropertiesSC[0].link,
                message: '解析正确，正在跳转'
            })
        }
        // 如果不是普通缩短
    }else if (shortChainPropertiesSC.length === 0 && shortChainPropertiesSLD.length !== 0){
        const CalibrationTime = await ExecuteFunctionData(CalibrationTimeSql,ShortID)
        // 是否超时
        if (CalibrationTime.length !== 0) {
            res.status(200).send({
                status: 200,
                link: CalibrationTime[0].link,
                message: '解析正确，正在跳转'
            })
        } else {
            // 超时
            res.status(404).send({
                status: 404,
                message:'短链超时！'
            })
        }
    } else {
        // 如果在表里不存在
        res.status(404).send({
            status: 404,
            message:'错误短码！'
        })
    }
}
// 加密验证
exports.todecRouter = async (req,res) => {
    const data = {...req.body}
    const updateClickSql = `UPDATE ShortChain SET clicks = clicks + 1 WHERE short = ?`;
    const selectShortChainSql = `select * from ShortChain where short = ? And islock = 1`
    // 根据short短链查找该短链信息
    const selectShortChain = await ExecuteFunctionData(selectShortChainSql,data.short)
    // console.log(selectShortChain)
    const shortpassword = selectShortChain[0].lockpwd
    const shortlink = selectShortChain[0].link
    // 校验密码是否正确
    if (data.password === shortpassword) {
        // 更新clicks字段
        await ExecuteFunctionData(updateClickSql, data.short)
        res.status(200).send({
            status: 200,
            link: shortlink,
            message: '校验正确，正在跳转'
        })
    } else {
        res.status(200).send({
            status: 404,
            message: '密码不符合!'
        })
    }
}
