const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const Short = require('../RouterFunction/Short')
const Short_Rules = require("../Rules/Short")

//　用户state中间件
const { CheckUserStatus } = require('../Implement/middleware/CheckUserStatus')
router.use((req, res, next) => { CheckUserStatus(req, res, next) })

//　API－router
router.post('/toShort', expressJoi(Short_Rules.Short), Short.toShort) // 普通缩短API
router.post('/toShorts', expressJoi(Short_Rules.Shorts), Short.toShorts) // 限时缩短API
router.post('/toShortp', expressJoi(Short_Rules.Shortp), Short.toShortp) // 加密缩短API
router.get('/Inquire', expressJoi(Short_Rules.InquireShort), Short.InquireShort) // 查询当日数据的API
router.get('/UserChains', expressJoi(Short_Rules.InquireShort), Short.UserChains) // 获取所有用户数据API
router.get('/UserPeriod',Short.UserPeriod) // 查询过往7天数据
router.get('/deleteChain', expressJoi(Short_Rules.DeleteShortChain), Short.DeleteShortChain)　//　浅删除API　state　＝　1
router.get('/CResLink', expressJoi(Short_Rules.ChangeRestoreLinnk), Short.ChangeRestoreLink) // 恢复、更改有效期、彻底删除API
module.exports = router
