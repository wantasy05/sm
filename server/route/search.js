// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();
const jwt = require("../jwt.js");

// 热门搜索的数据展示为浏览量高的商品
// 预览量大于100的取前十条数据到热门搜索进行展示
router.get("/hot_bot", (req, res) => {
	var sql = `SELECT * FROM cake_product WHERE read_num>100 order by read_num desc limit 0,10`;
	pool.query(sql, [], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

// 搜索关键词
router.post("/key_word", (req, res) => {
	var pname = req.body.pname;
	// console.log(pname);
	// %% 模糊检索
	if (pname) {
		var p = `%${pname}%`;
		var sql = `SELECT * FROM cake_product where pname like ?`;
		pool.query(sql, [p], (err, result) => {
			if (err) throw err;
			res.json(result);
		});
		// 搜索栏输入不为空的数值,存到后台搜索历史表中
		if (pname) {
			let token = req.headers.token;
			var uid = jwt.verifyToken(token);
			var sql2 = `select * from user_search where uid = ? and pname = ?`;
			pool.query(sql2, [uid, pname], (err, result) => {
				if (err) throw err;
				if (result.length && uid) {
					return;
				} else {
					var sql3 = `INSERT INTO user_search VALUES(NULL,?,?)`;
					pool.query(sql3, [uid, pname], (err, result) => {
						if (err) throw err;
						// console.log(result);
						return;
					});
				}
			});
		}
	} else {
		res.json({
			code: 400
		});
	}
});

// 搜索登录的用户的历史记录
router.post("/history", (req, res) => {
	let token = req.headers.token;
	var uid = jwt.verifyToken(token);
	// var uid = req.body.uid;
	// console.log(req.body);
	var sql = `SELECT * FROM user_search WHERE uid=?`;
	pool.query(sql, [uid], (err, result) => {
		if (err) throw err;
		// console.log(result)
		res.json(result);
	});
});

//清空搜索历史记录
router.get("/clearhis", (req, res) => {
	let token = req.headers.token;
	var uid = jwt.verifyToken(token);
	var sql = `DELETE FROM user_search WHERE uid=?`;
	pool.query(sql, [uid], (err, result) => {
		if (err) throw err;
		if (result.affectedRows > 0) {
			res.json({
				code: 200
			});
		} else {
			res.json({
				code: 400
			});
		}
	});
});

module.exports = router;
