const joi = require('joi');
const {date} = require("joi");

const link = joi.string().max(255).required()
const time = joi.number().required()
const password = joi.string().min(1).max(25).required()
const id = joi.string().required()
const short = joi.string().required()
const end = joi.boolean()
const endtime = joi.string().required()
// 验证规则对象 - 缩短
exports.Short = {
    body:{
        link
    }
}
exports.Shorts = {
    body:{
        link,
        time
    }
}

exports.Shortp = {
    body:{
        link,
        password
    }
}

exports.InquireShort = {
    query:{
        end
    }
}

exports.DeleteShortChain = {
    query: {
        id,
        short
    }
}

exports.ChangeRestoreLinnk = {
    query: {
        id,
        endtime
    }
}
