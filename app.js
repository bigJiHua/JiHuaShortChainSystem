/* 导入模块 */
const express = require('express')
const app = express()
const Joi = require('joi')
const config = require('./config')
const cikuFunctions = require('./ciku')
const axios = require('axios');
const cheerio = require('cheerio');


// 请求链接
async function fetchWebPage(url) {
    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'zh-CN,zh;q=0.9', // 接受中文语言
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://www.baidu.com/', // 设置引用页为百度
            // 其他可选的请求头...
        };
        const response = await axios.get(url, { headers });
        const html = response.data; // 获取网页内容
        // 调用函数并传入要解析的HTML内容
        const htmlData = parseHTML(html);
        // 筛选中文
        const chineseRegex = /[\u4e00-\u9fa5]/g;
        const matches = htmlData.match(chineseRegex);
        // 将数组连接成字符串
        if (matches !== null) {
            return matches.join("");
        } else {
            console.log("网站请求失败||获取网站内容为空")
        }
    } catch (error) {
        console.error('请求失败:', error);
    }
}
// 分析链接获取body里面的所有内容
function parseHTML(html) {
    const $ = cheerio.load(html);
    // 在这里进行进一步的解析和提取操作
    // 例如，你可以使用类似于jQuery的选择器来选择特定的元素
    const content = $('body')
        .children() // 获取 body 元素的子元素
        .not('a, img') // 过滤掉所有的 a 标签和 img 标签
        .text(); // 提取剩余内容的文本
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
    console.log(filteredKeywords);
    return filteredKeywords
}

// 请求
app.get('/?', async (req, res) => {
    console.log(req.query.url);
    const text = await fetchWebPage(req.query.url)
    const filteredKeywords = filteredKeyword(text)
    // 如果关键词超过3个及以上
    if (filteredKeywords.length >= 3) {
        res.status(200).send('不良网站');
    } else {
        res.status(200).send('网站安全');
    }
});


// 错误拦截中间件
app.use((err, req, res, next) => {
    // 错误处理逻辑
    if (err instanceof Joi.ValidationError) {
        return res.status(206).send({
            status: 206,
            message: err instanceof Error ? err.message : err,
        });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({
            status: 401,
            message: '身份认证失败，请登录',
        });
    }
    // 其他错误处理逻辑
    next(err);
});

// 监听项目端口，运行时要修改
app.listen(config.Port, () => {
    console.log('server Open')
})
