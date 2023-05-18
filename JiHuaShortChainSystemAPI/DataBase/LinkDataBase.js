const mysql = require('mysql')

const linkDataBase = mysql.createPool({
    host: '47.115.225.101',
    user:'ShortChain',
    password:'ShortChain',
    database:'ShortChain'
})

module.exports = linkDataBase

