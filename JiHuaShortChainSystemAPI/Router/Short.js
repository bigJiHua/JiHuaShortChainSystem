const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const Short = require('../RouterFunction/Short')
const Short_Rules = require("../Rules/Short")
const { CheckUserStatus } = require('../Implement/middleware/CheckUserStatus')

router.post('/toShort', expressJoi(Short_Rules.Short), (req, res, next) => {
    CheckUserStatus(req, res, next)
}, Short.toShort)
router.post('/toShorts', expressJoi(Short_Rules.Shorts), (req, res, next) => {
    CheckUserStatus(req, res, next)
}, Short.toShorts)
router.post('/toShortp', expressJoi(Short_Rules.Shortp), (req, res, next) => {
    CheckUserStatus(req, res, next)
}, Short.toShortp)

router.get('/Inquire', expressJoi(Short_Rules.InquireShort), (req, res, next) => {
    CheckUserStatus(req, res, next)
}, Short.InquireShort)
module.exports = router
