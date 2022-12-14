const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')


const user_login_Router = require('../RouterFunction/Users')
const user_schema_M = require('../Rules/Users')

router.post('/login',expressJoi(user_schema_M.user_loginRouter) ,user_login_Router.user_login_API)
router.post('/reguser',expressJoi(user_schema_M.user_regUserRM),user_login_Router.regUser)

module.exports = router
