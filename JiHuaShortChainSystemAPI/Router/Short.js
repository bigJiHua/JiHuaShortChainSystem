const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const Short = require('../RouterFunction/Short')
const Short_Rules = require("../Rules/Short")
const { CheckUserStatus, DecryptUserData } = require('../Implement/middleware/CheckUserStatus')

router.use((req, res, next) => { CheckUserStatus(req, res, next) })

router.post('/toShort', expressJoi(Short_Rules.Short), Short.toShort)
router.post('/toShorts', expressJoi(Short_Rules.Shorts), Short.toShorts)
// router.post('/toShortp', expressJoi(Short_Rules.Shortp), Short.toShortp)
router.post('/toShortp', expressJoi(Short_Rules.Shortp), Short.toShortp)
router.get('/Inquire', expressJoi(Short_Rules.InquireShort), Short.InquireShort)
router.get('/UserChains', expressJoi(Short_Rules.InquireShort), Short.UserChains)
router.get('/deleteChain', expressJoi(Short_Rules.DeleteShortChain), Short.DeleteShortChain)
router.get('/CResLink', expressJoi(Short_Rules.ChangeRestoreLinnk), Short.ChangeRestoreLink)
module.exports = router
