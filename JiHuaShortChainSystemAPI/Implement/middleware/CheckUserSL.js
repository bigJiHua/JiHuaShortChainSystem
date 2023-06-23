/* 这是一个用于检查用户状态的中间件 */
const { ExecuteFunctionData } = require('../ExecuteFunction')
const axios = require('axios');
const cheerio = require('cheerio');
const cikuFunctions = require('../../Implement/CheckSLModule/ciku')
// <!-- Check Link Model -->
// 请求链接
async function fetchWebPage(url) {
    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'zh-CN,zh;q=0.9', // 接受中文语言
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://www.baidu.com/', // 设置引用页为百度
        };
        const response = await axios.get(url, { headers });
        // 获取网页内容
        const html = response.data
        // 调用函数并传入要解析的HTML内容
        const htmlData = parseHTML(html);
        // console.log(html)
        // 筛选中文
        const chineseRegex = /[\u4e00-\u9fa5]/g;
        const matches = htmlData.match(chineseRegex);
        // 将数组连接成字符串
        if (matches !== null) {
            return matches.join("");
        } else {
            console.log("网站请求失败||获取网站内容为空")
            return []
        }
    } catch (error) {
        console.log('网站检测请求失败/错误')
        // console.log(error)
        return []
    }
}
// 分析链接获取body里面的所有内容
function parseHTML(html) {
    const $ = cheerio.load(html);
    // 在这里进行进一步的解析和提取操作
    // 例如，你可以使用类似于jQuery的选择器来选择特定的元素
    const content = $('html')
        .children() // 获取 body 元素的子元素
        .not('a, img') // 过滤掉所有的 a 标签和 img 标签
        .text(); // 提取剩余内容的文本
    console.log(content !== '')
    return content
}
// 遍历关键词
function filteredKeyword(text) {
    // 中文关键词匹配
    const cikuDataList = [
        cikuFunctions.cikuData1,
        cikuFunctions.cikuData2,
        cikuFunctions.cikuData3,
        cikuFunctions.cikuData4,
        cikuFunctions.cikuData5,
        cikuFunctions.cikuData6,
        cikuFunctions.cikuData7,
        cikuFunctions.cikuData8,
        cikuFunctions.cikuData9
    ];
    const filteredKeywords = [];
    for (const cikuData of cikuDataList) {
        const keywords = cikuData.filter(keyword => {
            const regex = new RegExp(keyword, "g");
            return regex.test(text);
        });
        filteredKeywords.push(...keywords);
    }
    // 打印关键词
    // console.log(filteredKeywords);
    return filteredKeywords
}
// 自动检测短链程序模块
exports.AutoCheckSLFunctionModule = async (req,res,next) => {
    const WebsiteLink = await fetchWebPage(req.body.link)
    // 请求该WebsiteLink站点
    const filteredKeywords = filteredKeyword(WebsiteLink)
    // 如果关键词超过5个及以上
    if (filteredKeywords.length < 5) {
        next()
    } else {
        res.status(200).send({
            status: 404,
            message: '链接不安全'
        })
    }
}
// <!-- Check Link Model -->

