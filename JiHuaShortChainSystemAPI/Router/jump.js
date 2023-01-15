const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const toJump = require('../RouterFunction/jump')
const Jump_Rules = require('../Rules/Users')
router.get('/',expressJoi(Jump_Rules.Jump_id),toJump.toJumpRouter)
// TODO SELECT * FROM SLDateMap WHERE FROM_UNIXTIME(endtime / 1000) > CURRENT_TIMESTAMP AND short = 'gSpE5EU' 这是一条获取时间大于当前的SQL语句
// TODO UPDATE users SET clicks = clicks + 1, username WHERE username = 'alice'  更新users表的clicks字段同时返回username信息
module.exports = router
