const mysql = require('mysql')

const linkDataBase = mysql.createPool({
    host:'43.129.172.233',
    user:'ShortChain',
    password:'ShortChain',
    database:'ShortChain'
})

module.exports = linkDataBase

