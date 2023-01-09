const db = require('../DataBase/LinkDataBase')
const config = require('../config')
// 获取用户代办
exports.gettodolist = (req,res) => {
    const user = req.query.user
    const sql = `select * from ev_todo where username= ?`
    db.query(sql,user,(err,results)=>{
        if(err) return res.cc(err,404)
        if(results.length === 0 ) return res.status(200).send({
            status: 406,
            message: '空空如也'
        })
        res.status(200).send({
            status: 200,
            data: results,
            message: '获取成功啦! 距离时间久的记得尽快完成噢!'
        })
    })
}
