const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const toJump = require('../RouterFunction/jump')
const user_jump_M = require('../Rules/jump')
router.get('/?',toJump.toJumpRouter) // 获取跳转长链接
router.post('/dec',expressJoi(user_jump_M.jump_rules),toJump.todecRouter)
module.exports = router
