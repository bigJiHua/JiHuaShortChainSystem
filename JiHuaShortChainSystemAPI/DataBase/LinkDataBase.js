const mysql = require('mysql')

const linkDataBase = mysql.createPool({
    host:'',
    user:'',
    password:'',
    database:''
})

module.exports = linkDataBase

