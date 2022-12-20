const setting = require('../setting')
const crypto = require('crypto');
const base62 = require('base62/lib/ascii')
const config = require('../config')
const { ExecuteFunction, ExecuteFunctionData,hash } = require('../Implement/ExecuteFunction')

// 查询今日转地和累计转址数量 Inquire
exports.InquireShort = async (req, res) => {
    // TODO 多表联查获取今日缩短数目
    // 获取今日转址 Forward today
    const ForwardTodaySql = `SELECT * FROM ShortChain INNER JOIN SLDateMap
ON ShortChain.username = SLDateMap.username AND ShortChain.date = CURDATE() AND SLDateMap.date = CURDATE() WHERE ShortChain.username = ? and SLDateMap.username = ?
`
    // 获取总计转址 total forwarding
    const TotalForwardingSql = `SELECT * FROM ShortChain WHERE username=?`
    const ForwardToday = await ExecuteFunctionData(ForwardTodaySql, req.query.username)
    const TotalForwarding = await ExecuteFunctionData(TotalForwardingSql, req.query.username)
    res.send({
        message: '查询成功',
        status: 200,
        data: {
            ForwT: ForwardToday.length,
            Cumuf: TotalForwarding.length
        }
    })
}
// 缩短
exports.toShort = async (req, res) => {
    const LONG_URL = req.body.link;
    const ShortCode = hash(LONG_URL,5)
    //校验是否有相同哈希值 Check if they have the same hash value
    const CheckIfTheyHaveTheSameHashValueSql = `select * from ShortChain where short=? `
    const CheckIfTheyHaveTheSameHashValue = await ExecuteFunctionData(CheckIfTheyHaveTheSameHashValueSql, ShortCode)
    if (CheckIfTheyHaveTheSameHashValue.length !== 0) return res.send({
        status: 200,
        message: '缩短成功',
        data: setting.URL + CheckIfTheyHaveTheSameHashValue[0].short
    });
    // 整合数据
    const data = {
        username: req.body.username,
        link: LONG_URL,
        short: ShortCode,
        date: setting.pub_date
    }
    // 插入数据 insert short chain
    const insertShortChainSql = 'insert into ShortChain set ?'
    const insertShortChain = await ExecuteFunctionData(insertShortChainSql, data)
    if (insertShortChain.affectedRows !== 1) return res.cc('转换失败', 204)
    res.send({
        status: 200,
        message: '缩短成功',
        data: setting.URL + ShortCode
    });
}
// 具有有效期的缩短
exports.toShorts = async (req, res) => {
    const ShortCode = hash(req.body.link,6)
    //校验是否有相同哈希值 Check if they have the same hash value
    const CheckIfTheyHaveTheSameHashValueSql = `select * from SLDateMap where short=? `
    const CheckIfTheyHaveTheSameHashValue = await ExecuteFunctionData(CheckIfTheyHaveTheSameHashValueSql, ShortCode)
    if (CheckIfTheyHaveTheSameHashValue.length !== 0) return res.send({
        status: 204,
        message: '请注意当前返回的短链在数据表中已经存在记录，无法再次新建时间戳，请在短链统计中修改',
        data: setting.URL + CheckIfTheyHaveTheSameHashValue[0].short
    });
    // 整合数据
    const data = {
        username: req.body.username,
        short: ShortCode,
        date: setting.pub_date,
        endtime: req.body.time
    }
    // 插入数据 insert short chain
    const insertShortChainSql = 'insert into SLDateMap set ?'
    const insertShortChain = await ExecuteFunctionData(insertShortChainSql,data)
    if (insertShortChain.affectedRows !== 1) return res.cc('转换失败', 204)
    res.send({
        status: 200,
        message: '缩短成功',
        data: setting.URL + ShortCode
    });
}

exports.toShortp = async (req,res) => {
    const ShortCode = hash(req.body.link,7)
    //校验是否有相同哈希值 Check if they have the same hash value
    const CheckIfTheyHaveTheSameHashValueSql = `select * from ShortChain where short=? and islock = 1`
    const CheckIfTheyHaveTheSameHashValue = await ExecuteFunctionData(CheckIfTheyHaveTheSameHashValueSql, ShortCode)
    if (CheckIfTheyHaveTheSameHashValue.length !== 0) return res.send({
        status: 204,
        message: '请注意当前返回的短链在数据表中已经存在记录，无法再次上锁，请在短链统计中修改',
        data: setting.URL + CheckIfTheyHaveTheSameHashValue[0].short
    });
    // 整合数据
    const data = {
        username: req.body.username,
        link: req.body.link,
        short: ShortCode,
        date: setting.pub_date,
        islock: 1,
        lockpwd: req.body.password
    }
    // 插入数据 insert short chain
    const insertShortChainSql = 'insert into ShortChain set ?'
    const insertShortChain = await ExecuteFunctionData(insertShortChainSql,data)
    if (insertShortChain.affectedRows !== 1) return res.cc('转换失败', 204)
    res.send({
        status: 200,
        message: '缩短成功',
        data: setting.URL + ShortCode
    });
}
