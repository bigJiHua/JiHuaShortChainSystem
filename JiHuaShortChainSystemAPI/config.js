// 全局配置文件
// URL 使用时需要修改这里
const URL = 'http://127.0.0.1'
// API端口 使用时需要修改这里
const Port = 80
// 配置一个token加密密钥
const jwtSecretKey = 'ShortChainVue'
// token的有效期 24h
const expiresIn = '24h'

/*　生成格式化日期 */
const dayjs = require('dayjs')
let d = new Date()
const pub_date = dayjs(d).format('YYYY-MM-DD')
const pub_month = dayjs(d).format('MM')

module.exports = {
    Port,
    pub_date,
    pub_month,
    URL,
    jwtSecretKey,
    expiresIn
}
