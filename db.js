const mysql = require("mysql2/promise");


const pool = mysql.createPool({
  host: 'localhost'  ,
  user: 'root' ,
  password: '2356' ,
  database: 'student_1' ,
});

module.exports = pool;
