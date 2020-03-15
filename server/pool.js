//引入mysql模块
const mysql = require("mysql");

var pool = mysql.createPool({
	host: "127.0.0.1",
	port: "3306",
	user: "root",
	password: "",
	database: "sm",
	connectionLimit: 10
});
// 导出连接池
module.exports = pool;
