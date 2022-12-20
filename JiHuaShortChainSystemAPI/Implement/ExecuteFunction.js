const db = require('../DataBase/LinkDataBase')
const crypto = require("crypto");
const config = require("../config");
const base62 = require("base62/lib/ascii");

exports.ExecuteFunction = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })
}

exports.ExecuteFunctionData = (sql, data) => {
    return new Promise((resolve, reject) => {
        db.query(sql, data, (err, results) => {
            if (err) {
                return reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

exports.hash = (LONG_URL,URL_LENGTH) => {
    // 对长链接进行哈希
    const hash = crypto
        .createHash('sha256', config.jwtSecretKey)
        .update(LONG_URL)
        .digest('hex');
    // 将哈希值进行 base62 编码
    const shortUrl = base62.encode(parseInt(hash, 16));
    // 截取短链接
    return shortUrl.substr(0, URL_LENGTH)
}
