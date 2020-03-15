// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

//获取轮播图1
router.get("/swiper", (req, res) => {
	var sql = "select img_url from index_swiper";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		// var dataString = JSON.stringify(result);
		// var data = JSON.parse(dataString);
		// console.log(data);
		res.json({ code: 200, data: result });
	});
});
//首页商品信息
router.get("/shop", (req, res) => {
	var pid = req.body.pid;
	var sql = "select * from cake_product";
	pool.query(sql, (err, result) => {
		if (err) throw err;
		// console.log(result);
		res.json({ code: 200, data: result });
	});
});
//获取某系列下的所有商品
router.post("/series", (req, res) => {
	var cid = req.body.cid;
	if (!cid) {
		res.send({ code: 400, msg: "没有该系列的商品" });
		return;
	}
	// 获取某系列商品信息
	var sql = `SELECT * FROM cake_catalogue INNER JOIN 
	  cake_product ON cake_catalogue.cid=? AND cake_product.cid=?`;
	pool.query(sql, [cid, cid], (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			res.json({ code: 200, data: result });
		} else {
			res.json({ code: 400, msg: "没有该系列的商品" });
		}
	});
});

module.exports = router;
