const joi = require('joi')
const username = joi.string().min(3).max(15).required()
const password = joi.string().required()
const email = joi.string().required()
const id = joi.string().required()

exports.user_loginRouter = {
    body:{
        username,
        password
    }
}
exports.user_regUserRM = {
    body:{
        username,
        password,
        email
    }
}
exports.Jump_id = {
    body:{
        id
    }
}
