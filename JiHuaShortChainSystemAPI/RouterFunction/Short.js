const config = require('../config')
const { ExecuteFunctionData, hash } = require('../Implement/ExecuteFunction')

// 查询今日转地和累计转址数量 Inquire
exports.InquireShort = async (req, res) => {
    // 获取今日ShortChain转址 Forward today
    const ForwardShortChainTodaySql = `SELECT * FROM ShortChain WHERE ShortChain.date = CURDATE() AND username = ?`
    const ForwardSLDateMapTodaySql = `SELECT * FROM SLDateMap WHERE SLDateMap.date = CURDATE() AND username = ?`
    // 获取总计转址 total forwarding
    const TotalForwardingSql = `SELECT * FROM ShortChain WHERE username=?`
    const ForwardShortChainToday = await ExecuteFunctionData(ForwardShortChainTodaySql, req.auth.username)
    const ForwardSLDateMapToday = await ExecuteFunctionData(ForwardSLDateMapTodaySql, req.auth.username)
    const TotalForwarding = await ExecuteFunctionData(TotalForwardingSql, req.auth.username)
    res.status(200).send({
        message: false,
        status: 200,
        ismess: false,
        data: {
            ForwT: ForwardShortChainToday.length + ForwardSLDateMapToday.length,
            Cumuf: TotalForwarding.length
        }
    })
}
// 获取当前用户的所有链接  Get all links for the current user
exports.UserChains = async (req, res) => {
    // 获取当前user的所有缩短链接
    const GetAllLinksForTheCurrentUserShortChainSql = `SELECT SC.date,SC.id,SC.islock,SC.link,SC.short,SC.username,SC.state FROM ShortChain SC WHERE username = ? AND state = 0`
    // 获取当前user的所有 在截止有效时间内 的加密链接
    const GetAllLinksForTheCurrentUserSLDateMapSql = `SELECT * FROM SLDateMap WHERE FROM_UNIXTIME(endtime / 1000) > CURRENT_TIMESTAMP AND username = ? AND state = 0`
    // 获取当前user的所有 不在截止有效时间内 的加密链接
    const GetAllLinksForTheCurrentUserSLDateMapEndSql = `SELECT * FROM SLDateMap WHERE state = 2 OR state = 1 AND username = ?`
    // 获取当前user的所有删除的缩短链接
    const GetAllLinksForTheCurrentUserShortChainDeleteSql = `SELECT SC.date,SC.id,SC.islock,SC.link,SC.short,SC.username,SC.state FROM ShortChain SC WHERE username = ? AND state = 1`
    // 将过期链接设置为已过期
    const setExpireLinkSql = `UPDATE SLDateMap SET state = 2 WHERE FROM_UNIXTIME(endtime / 1000) < CURRENT_TIMESTAMP `
    if (!req.query.end) {
        const GetAllLinksForTheCurrentUserShortChain = await ExecuteFunctionData(GetAllLinksForTheCurrentUserShortChainSql, req.auth.username)
        const GetAllLinksForTheCurrentUserSLDateMap = await ExecuteFunctionData(GetAllLinksForTheCurrentUserSLDateMapSql, req.auth.username)
        res.status(200).send({
            status: 200,
            message: false,
            data: [...GetAllLinksForTheCurrentUserShortChain, ...GetAllLinksForTheCurrentUserSLDateMap]
        })
    } else {
        const GetAllLinksForTheCurrentUserSLDateMapEnd = await ExecuteFunctionData(GetAllLinksForTheCurrentUserSLDateMapEndSql, req.auth.username)
        if (GetAllLinksForTheCurrentUserSLDateMapEnd.length !== 0 ) {
            const selectData = [GetAllLinksForTheCurrentUserSLDateMapEnd[0].username, GetAllLinksForTheCurrentUserSLDateMapEnd[0].id, GetAllLinksForTheCurrentUserSLDateMapEnd[0].short]
            await ExecuteFunctionData(setExpireLinkSql, selectData)
        }
        const GetAllLinksForTheCurrentUserShortChainDelete = await ExecuteFunctionData(GetAllLinksForTheCurrentUserShortChainDeleteSql,req.auth.username)
        if (ExecuteFunctionData.length === 0) return res.cc('数据空空如也！', 204)
        res.status(200).send({
            status: 200,
            message: false,
            data: [...GetAllLinksForTheCurrentUserSLDateMapEnd,...GetAllLinksForTheCurrentUserShortChainDelete]
        })
    }
}
// 查询过往7日数据
exports.UserPeriod = async (req,res) => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)
    let day = new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDay()
    const QueryDate = `${year}-${month}-${day}`
    const username = req.auth.username
    // 获取当日上锁条数
    const UserPeriodSCSql = `SELECT date as date, COUNT(*) as islockCount FROM ShortChain WHERE (date >= DATE_SUB(?, INTERVAL 7 DAY)) AND (date <= ?) AND username = ? AND islock = 1 GROUP BY date ORDER BY date DESC`
    // 获取当日截止日期条数
    const UserPeriodSLSql = `SELECT date as date, COUNT(*) as endtimeCount FROM SLDateMap WHERE (date >= DATE_SUB(?, INTERVAL 7 DAY)) AND (date <= ?) AND username = ? AND endtime IS NOT NULL GROUP BY date ORDER BY date DESC`
    // 获取当日ShortChain里的所有条数
    const UserPeriodSCALLSql = `SELECT date as date, COUNT(*) as SCALLcount FROM ShortChain WHERE (date >= DATE_SUB(?, INTERVAL 7 DAY)) AND (date <= ?) AND username = ? GROUP BY date ORDER BY date DESC`
    // 获取当日SLDateMap里的所有条数
    const UserPeriodSLALLSql = `SELECT date as date, COUNT(*) as SLALLcount FROM SLDateMap WHERE (date >= DATE_SUB(?, INTERVAL 7 DAY)) AND (date <= ?) AND username = ? GROUP BY date ORDER BY date DESC`
    // 获取当日ShortChain里所有点击数
    const UserPeriodSCALLClicksSql = `SELECT date as date, SUM(clicks) as SCclicks_sum FROM ShortChain WHERE date >= DATE_SUB(?, INTERVAL 7 DAY) AND date <= ? AND username = ? GROUP BY date ORDER BY date DESC;`
    // 获取当日SLDateMap里所有点击数
    const UserPeriodSLALLClicksSql = `SELECT date as date, SUM(clicks) as SLDclicks_sum FROM SLDateMap WHERE date >= DATE_SUB(?, INTERVAL 7 DAY) AND date <= ? AND username = ? GROUP BY date ORDER BY date DESC;`
    if (QueryDate) {
        const UserPeriodSC = await ExecuteFunctionData(UserPeriodSCSql,[QueryDate,QueryDate,username])
        const UserPeriodSL = await ExecuteFunctionData(UserPeriodSLSql,[QueryDate,QueryDate,username])
        const UserPeriodSCALL = await ExecuteFunctionData(UserPeriodSCALLSql,[QueryDate,QueryDate,username])
        const UserPeriodSLALL = await ExecuteFunctionData(UserPeriodSLALLSql,[QueryDate,QueryDate,username])
        const UserPeriodSCALLClicks = await ExecuteFunctionData(UserPeriodSCALLClicksSql,[QueryDate,QueryDate,username])
        const UserPeriodSLALLClicks = await ExecuteFunctionData(UserPeriodSLALLClicksSql,[QueryDate,QueryDate,username])
        const AllUserData = [[...UserPeriodSC],[...UserPeriodSL],[...UserPeriodSCALL],[...UserPeriodSLALL],[...UserPeriodSCALLClicks],[...UserPeriodSLALLClicks]]
        const result = AllUserData.reduce((acc, value) => {
            value.forEach(item => {
                if (!acc[item.date]) {
                    acc[item.date] = {date:item.date}
                }
                Object.keys(item).forEach(key => {
                    if (key !== 'date') {
                        acc[item.date][key] = item[key]
                    }
                })
            })
            return acc
        }, {})
        const sortedData = Object.values(result).sort((a, b) => a.date > b.date)
        res.status(200).send({
            message: '获取成功！',
            status: 200,
            data: sortedData
        })
    }
}
// 立即缩短
exports.toShort = async (req, res) => {
    const LONG_URL = req.body.link;
    const ShortCode = await hash()
    // 整合数据
    const data = {
        username: req.auth.username,
        link: LONG_URL,
        short: ShortCode,
        date: config.pub_date
    }
    // 插入数据 insert short chain
    const insertShortChainSql = 'insert into ShortChain set ?'
    const insertShortChain = await ExecuteFunctionData(insertShortChainSql, data)
    if (insertShortChain.affectedRows !== 1) return res.cc('转换失败', 204)
    res.send({
        status: 200,
        message: '缩短成功',
        data: config.URL + ShortCode
    });
}
// 具有有效期的缩短
exports.toShorts = async (req, res) => {
    const ShortCode = await hash()
    // 整合数据
    const data = {
        username: req.auth.username,
        link: req.body.link,
        short: ShortCode,
        date: config.pub_date,
        endtime: req.body.time
    }
    // 插入数据 insert short chain
    const insertShortChainSql = 'insert into SLDateMap set ?'
    const insertShortChain = await ExecuteFunctionData(insertShortChainSql, data)
    if (insertShortChain.affectedRows !== 1) return res.cc('转换失败', 204)
    res.send({
        status: 200,
        message: '缩短成功',
        data: config.URL + ShortCode
    });
}
// 链接加密
exports.toShortp = async (req, res) => {
    const ShortCode = await hash()
    // 整合数据
    const data = {
        username: req.auth.username,
        link: req.body.link,
        short: ShortCode,
        date: config.pub_date,
        islock: 1,
        lockpwd: req.body.password
    }
    // 插入数据 insert short chain
    const insertShortChainSql = 'insert into ShortChain set ?'
    const insertShortChain = await ExecuteFunctionData(insertShortChainSql, data)
    if (insertShortChain.affectedRows !== 1) return res.cc('转换失败', 204)
    res.send({
        status: 200,
        message: '缩短成功',
        data: config.URL + ShortCode
    });
}
// 删除短链(仅 state = 0)
exports.DeleteShortChain = async (req, res) => {
    const Userdata = [req.auth.username, req.query.id, req.query.short]
    // 删除或者恢复短链 delete short chain
    const deleteShortChainSql = `UPDATE ShortChain SET state = CASE  WHEN state = 0 THEN 1  ELSE 0 END WHERE  username = ? AND id = ? AND short = ?`
    const deleteSLDateMapSql = `UPDATE SLDateMap SET state = CASE  WHEN state = 0 THEN 1  ELSE 0 END WHERE  username = ? AND id = ? AND short = ?`
    // 挑选此链接 截止日期 大于现在的链接
    const deleteSLDateMapEndtimeSql = `SELECT * FROM SLDateMap WHERE FROM_UNIXTIME(endtime / 1000) > CURRENT_TIMESTAMP AND short = ?`
    const deleteShortChain = await ExecuteFunctionData(deleteShortChainSql, Userdata)
    if (deleteShortChain.affectedRows !== 1) {
        // 如果不是普通缩短，将查询截止日期，如果超过截止日期将进行删除并返回对应的结果让其修改截止时间
        const deleteSLDateMapEndtime = await ExecuteFunctionData(deleteSLDateMapEndtimeSql, req.query.short)
        if (deleteSLDateMapEndtime.length === 0) {
            return res.cc('该链接已过期，无法修改相对应数据，请重新设置截止时间', 204)
        } else {
            const deleteSLDateMap = await ExecuteFunctionData(deleteSLDateMapSql, Userdata)
            if (deleteSLDateMap.affectedRows !== 1) {
                return res.cc('执行失败，请重试', 204)
            }
        }
    }
    res.status(200).send({
        status: 200,
        message: '操作成功'
    })
}
// 更改短链截止时间 恢复短链 彻底删除短链 修改短链加密密码
exports.ChangeRestoreLink = async (req, res) => {
    const username = req.auth.username
    const id = req.query.id
    const ToChangeFun = req.query.endtime
    const endtime = req.query.endtime
    const passwod = req.body.password
    const newPwdData = req.body.newpassword
    // 功能1 修改截止时间
    const ModificationDeadlineSql = `UPDATE SLDateMap SET endtime = ? WHERE  username = ? AND id = ?`
    // 功能2-0 恢复短链正常 restore short chain to normal SLDateMap
    const restoreSCTNSql = `UPDATE SLDateMap SET state = 0 WHERE  username = ? AND id = ? AND FROM_UNIXTIME(endtime / 1000) > CURRENT_TIMESTAMP`
    // 功能2-1 恢复短链正常 restore short chain to normal ShortChain
    const restoreSCTNShortChainSql = `UPDATE ShortChain SET state = 0 WHERE  username = ? AND id = ?`
    // 功能3 删除限时短链 Delete time-limited short chain
    const DeleteSLDateMapTLSCSql = `delete from SLDateMap where username = ? AND id = ?`
    // 功能3 删除非限时短链 Delete time-limited short chain
    const DeleteShortChainTLSCSql = `delete from ShortChain where username = ? AND id = ?`
    // 功能4 获取加密短链信息 Get encrypted short chain information
    const GetESCinformationSql = `select * from ShortChain where id =? AND username =?`
    // 功能4-1 更新原密码 Update original password
    const UpdateOriginalPwdSql =  `UPDATE ShortChain SET lockpwd = ? WHERE  username = ? AND id = ? `
    // 是否恢复
    if (ToChangeFun === 'isrecover') {
        const restoreSCTN = await ExecuteFunctionData(restoreSCTNSql, [username, id])
        if (restoreSCTN.affectedRows === 0) {
            const restoreSCTNShortChain = await ExecuteFunctionData(restoreSCTNShortChainSql, [username, id])
            if (restoreSCTNShortChain.affectedRows === 0) {
                return res.cc('恢复短链失败，请稍后重试', 204)
            }
        }
    } else if (ToChangeFun === 'delete') {
        // 彻底删除
        const DeleteTLSC = await ExecuteFunctionData(DeleteSLDateMapTLSCSql, [username, id])
        if (DeleteTLSC.affectedRows === 0) {
            const DeleteShortChainTLSC = await ExecuteFunctionData(DeleteShortChainTLSCSql, [username, id])
            if (DeleteShortChainTLSC.affectedRows === 0) return res.cc('删除短链失败，请稍后重试', 204)
        }
    } else if (!isNaN(endtime) && !isNaN(Number(endtime))) {
        // 修改截止时间
        const ModificationDeadline = await ExecuteFunctionData(ModificationDeadlineSql, [endtime, username, id])
        if (ModificationDeadline.affectedRows === 0) return res.cc('更改失败，请稍后重试', 204)
        return res.cc('更改成功，您还需要点击下方恢复按钮方可恢复状态正常', 200)
    } else if (ToChangeFun === 'changePwd') {
        const GetESCinformation = await ExecuteFunctionData(GetESCinformationSql,[id,username])
        if (GetESCinformation.length === 0) return res.cc('查询错误',404)
        if (GetESCinformation[0].lockpwd === passwod) {
            const UpdateOriginalPwd = await ExecuteFunctionData(UpdateOriginalPwdSql,[newPwdData,username,id])
            if (UpdateOriginalPwd.affectedRows !== 1) return res.cc('更改失败，请重试')
        } else {
            return res.cc('原密码错误')
        }
    } else {
        return res.cc('参数错误', 404)
    }
    res.status(200).send({
        status: 200,
        message: '操作成功'
    })
}
