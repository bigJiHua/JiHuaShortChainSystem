const joi = require('joi');
const {required} = require("joi");

const link = joi.string().max(255).required()
const time = joi.number().required()
const username = joi.string().required()
const password = joi.string().required()

// 验证规则对象 - 缩短
exports.Short = {
    body:{
        username,
        link
    }
}
exports.Shorts = {
    body:{
        username,
        link,
        time
    }
}
exports.Shortp = {
    body:{
        username,
        link,
        password
    }
}

exports.InquireShort = {
    query:{
        username
    }
}
