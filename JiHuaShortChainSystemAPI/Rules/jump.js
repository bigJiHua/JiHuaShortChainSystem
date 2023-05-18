const joi = require('joi');
const {date} = require("joi");

const password = joi.string().min(1).max(25).required()
const short = joi.string().required()
// 验证规则对象 - 缩短
exports.jump_rules = {
    body:{
        short,
        password
    }
}
