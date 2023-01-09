const db = require('../DataBase/LinkDataBase')
const crypto = require("crypto");
const config = require("../config");
const base62 = require("base62/lib/ascii")
const { v4: uuid } = require('uuid');

const ExecuteFunctionData = (sql, data) => {
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
// 生成随机ＵＩＤ
let str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// 随机数生成
function generateMixed(n) {
    let code = "";
    for (let i = 0; i < n; i++) {
        let randomid = Math.ceil(Math.random() * 35);
        code += str[randomid]
    }
    return code;
}

// 校验随机短链是否重复
const CheckShortID = async (id) => {
    //校验是否有相同哈希值 Check if they have the same hash value
    const CheckIfTheyHaveTheSameHashValueSql = `select * from ShortChain where short=? `
    const CheckIfTheyHaveTheSameHashValue = await ExecuteFunctionData(CheckIfTheyHaveTheSameHashValueSql, id)
    if (CheckIfTheyHaveTheSameHashValue.length === 0) {
       return true
    } else {
        return false
    }
}
const hash = async () => {
    // 对长链接进行哈希
    const hash = crypto
        .createHash('sha256', config.jwtSecretKey)
        .update(uuid())
        .digest('hex');
    // 将哈希值进行 base62 编码 截取短链接
    const shortUrl = base62.encode(parseInt(hash, 16)).substr(0, 2) + generateMixed(4)
    const isShortCode = await CheckShortID(shortUrl) // 检查数据库中是否有重复Code
    if (isShortCode){
        // 如果没有重复
        return shortUrl
    } else {
        // 如果重复，则继续生成新的短链接
        return hash()
    }
}
module.exports = {
    ExecuteFunctionData,
    hash
}


// 查重方法
// // 初始化一个空的对象
//     const count = {};
// // 随机生成10个数字
//     for (let i = 0; i < 1000000; i++) {
//         // 对长链接进行哈希
//         const hash = crypto
//             .createHash('sha256', config.jwtSecretKey)
//             .update(uuid())
//             .digest('hex');
//         // const num =  base62.encode(parseInt(hash, 16)).substr(0, URL_LENGTH) + generateMixed(2)
//         const num =  base62.encode(parseInt(hash, 16)).substr(0, 2) + generateMixed(4)
//         // 输出一个全局唯一的字符串
//         if (count[num]) {
//             // 如果数字已经出现过，则次数加1
//             count[num]++;
//         } else {
//             // 如果数字没有出现过，则设置次数为1
//             count[num] = 1;
//         }
//     }
// // 输出每个数字出现的次数
// console.log(count);
