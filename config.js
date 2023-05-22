// API端口 使用时需要修改这里
const Port = 80
// 配置一个token加密密钥
const jwtSecretKey = 'ShortChainVue'
// token的有效期 24h
const expiresIn = '24h'

module.exports = {
    Port,
    jwtSecretKey,
    expiresIn
}
