// APi设置面板
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

module.exports={
    Port,
    pub_date,
    pub_month,
    row,
    URL
}
