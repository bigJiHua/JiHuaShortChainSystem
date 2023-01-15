const mysql = require('mysql')

const linkDataBase = mysql.createPool({
    host: '127.0.0.0',
    user:'ShortChain',
    password:'ShortChain',
    database:'ShortChain'
})

module.exports = linkDataBase

