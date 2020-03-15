// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

// 获取购物车的信息
router.post("/get_cart", (req, res) => {
	// 用户的id
	var user_id = req.body.uid;
	// console.log(req.body);
	if (!user_id) {
		res.send({ code: 400, msg: "未登录,请先登录" });
		return;
	}
	// 购物车页面需要的商品信息,降序排序
	var sql = `SELECT * FROM cake_cart left join cake_product on cake_cart.pid = cake_product.pid and cake_cart.user_id=?`;
	pool.query(sql, [user_id], (err, result) => {
		if (err) throw err;
		// console.log(result);
		if (result.length > 0) {
			res.send({ code: 200, data: result });
		} else {
			res.send({ code: 400, msg: "购物车为空,请先添加商品" });
		}
	});
});
router.post("/delete", (req, res) => {
	console.log(req.body);
	var pids = req.body.pids;

	if (!pids) {
		res.send({ code: 400, msg: "请先选择要删除的商品" });
		return;
	}
	var sql = `DELETE FROM cake_cart WHERE pid IN (${pids})`;
	pool.query(sql, [pids], (err, result) => {
		if (err) throw err;
		if (result.affectedRows > 0) {
			res.send({ code: 200, msg: "删除成功" });
		} else {
			res.send({ code: 400, msg: "删除失败" });
		}
	});
});
router.post("/amend", (req, res) => {
	var user_id = req.body.user_id;
	var pid = req.body.pid;
	var count = req.body.count;
	var sql = `UPDATE cake_cart SET count=? WHERE user_id=? AND pid=?`;
	pool.query(sql, [count, user_id, pid], (err, result) => {
		if (err) throw err;
		// console.log(result);
		if (result.affectedRows > 0) {
			res.send({ code: 200, msg: "商品数量添加成功" });
		} else {
			res.send({
				code: 400,
				msg: "购物车商品数量累加失败"
			});
		}
	});
});

// 加入购物车路由 (需要参数用户id,商品id,规格id,数量)
router.post("/add", (req, res) => {
	var user_id = req.body.user_id;
	var pid = req.body.pid;
	var count = req.body.count;
	if (!user_id) {
		res.send({ code: 400, msg: "未登录状态" });
		return;
	}
	// 先查询一下这个用户是否已经把该商品加入购物车
	var sql = `SELECT * FROM cake_cart WHERE user_id=?
              AND pid =?`;
	pool.query(sql, [user_id, pid], (err, result) => {
		if (err) throw err;
		// 该用户购物车已有该商品,累加该商品的数量
		if (result.length > 0) {
			count = Number(count);
			result[0].count ? (count += Number(result[0].count)) : 1;
			// console.log(count);
			var add_count = count;
			var sql2 = `UPDATE cake_cart SET count=? WHERE user_id=?
                  AND pid=?`;
			pool.query(sql2, [count, user_id, pid], (err, result) => {
				if (err) throw err;
				if (result.affectedRows > 0) {
					res.send({ code: 200, msg: "购物车已有该商品,累加商品数量" });
				} else {
					res.send({
						code: 400,
						msg: "购物车已有该商品,购物车商品数量累加失败"
					});
				}
			});
		} else {
			// 没有该商品在购物车就创建该数据
			var sql3 = "INSERT INTO cake_cart SET ?";
			pool.query(sql3, [req.body], (err, result) => {
				if (err) throw err;
				if (result.affectedRows > 0) {
					res.send({ code: 200, msg: "商品添加购物车成功" });
				} else {
					res.send({ code: 400, msg: "商品添加购物车失败" });
				}
			});
		}
	});
});
module.exports = router;
