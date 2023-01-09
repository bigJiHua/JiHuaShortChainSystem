// 全局配置文件
// URL
const URL = 'https://jihau.top/'
// API端口
const Port = 80
// 允许用户上传的条数
const row = 10
/*　生成格式化日期 */
const dayjs = require('dayjs')
let d = new Date()
const pub_date = dayjs(d).format('YYYY-MM-DD')
const pub_month = dayjs(d).format('MM')

// 配置一个token加密密钥
const jwtSecretKey = 'ShortChainVue'
// token的有效期 24h
const expiresIn = '24h'
module.exports = {
    Port,
    pub_date,
    pub_month,
    row,
    URL,
    jwtSecretKey,
    expiresIn
}
