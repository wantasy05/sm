// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

const jwt = require("../jwt.js");

// 商品详情的路由
router.post("/product", (req, res) => {
	// 商品的id
	console.log(req.body);
	let token = req.headers.token;
	var uid = jwt.verifyToken(token);
	var pid = req.body.pid;
	var output = {
		product: [],
		spec: [],
		save: 0
	};

	if (!pid) {
		res.send({ code: 400, msg: "没有该商品" });
		return;
	}

	// 进入了这个商品的详情 浏览量加1
	var sql = "SELECT * FROM cake_product WHERE pid=?";
	pool.query(sql, [pid], (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			// 先查询出原先的浏览量
			var read_num = parseInt(result[0].read_num);
			// 修改浏览量加1
			var sql2 = "UPDATE cake_product SET read_num=? WHERE pid=?";
			pool.query(sql2, [read_num + 1, pid], (err, result) => {
				if (err) throw err;
				// 修改成功后返回商品信息
				if (result.affectedRows > 0) {
					// 获取商品详情的信息
					var sql = `SELECT * FROM cake_product WHERE pid = ?`;
					pool.query(sql, [pid], (err, result) => {
						if (err) throw err;
						output.product = result;

						// 获取商品规格的信息
						var sql = `SELECT * FROM cake_product INNER JOIN 
                        cake_spec ON cake_product.pid=? AND cake_spec.pid=?`;
						pool.query(sql, [pid, pid], (err, result) => {
							if (err) throw err;
							output.spec = result;

							// 获取收藏
							if (!uid) {
								res.send({ code: 200, data: output });
							} else {
								var sql = "SELECT * FROM user_save WHERE uid=? AND pid=?";
								pool.query(sql, [uid, pid], (err, result) => {
									if (err) throw err;
									if (result.length > 0) {
										output.save = result[0].status;
										res.send({ code: 200, data: output });
									} else {
										res.send({ code: 200, data: output });
									}
								});
							}
						});
					});
				}
			});
		} else {
			res.send({ code: 400, msg: "没有该商品" });
		}
	});
});

module.exports = router;
