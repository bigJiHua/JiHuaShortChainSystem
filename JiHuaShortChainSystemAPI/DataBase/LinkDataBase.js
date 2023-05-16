const mysql = require('mysql')

const linkDataBase = mysql.createPool({
    host: '',
    user:'ShortChain',
    password:'ShortChain',
    database:'ShortChain'
})

module.exports = linkDataBase

