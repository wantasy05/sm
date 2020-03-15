const express = require("express");
const pool = require("../pool");
const md5 = require("md5");
const jwt = require("../jwt.js");
//创建路由器对象
const router = express.Router();

//用户列表
router.post("/list", (req, res) => {
	var { phone, upwd } = req.body;
	var reg1 = /^1[3-9]\d{9}$/; // 手机号码的正则表达式
	if (!reg1.test(phone)) {
		res.json({ code: 400, msg: "手机号格式不正确" });
		return;
	}
	// 不能纯英文字母,不能纯数字,不能有空格的8到16位密码
	var reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\W_]+$)[0-9A-Za-z\W_]{8,16}$/;
	// true 密码格式不正确, false 密码格式正确
	if (!upwd || reg2.test(upwd) == false) {
		res.json({ code: 400, msg: "密码格式不正确" });
		return;
	}
	var sql = "SELECT phone FROM user WHERE phone = ?";
	pool.query(sql, [phone], (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			var reg1 = /^1[3-9]\d{9}$/; // 手机号码的正则表达式
			if (!reg1.test(phone)) {
				res.json({ code: 400, msg: "手机号格式不正确" });
				return;
			}
			// 不能纯英文字母,不能纯数字,不能有空格的8到16位密码
			var reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\W_]+$)[0-9A-Za-z\W_]{8,16}$/;
			// true 密码格式不正确, false 密码格式正确
			if (!upwd || reg2.test(upwd) == false) {
				res.json({ code: 400, msg: "密码格式不正确" });
				return;
			}
			var sql = "SELECT * FROM user WHERE phone=? AND upwd=md5(?)";
			pool.query(sql, [phone, upwd], (err, result) => {
				if (err) throw err;
				if (result.length > 0) {
					// session 的登陆id
					req.session.uid = result[0].uid;
					let token = jwt.generateToken(result[0].uid);
					res.json({ code: 200, data: result, token: token });
				} else {
					res.json({ code: 400, msg: "用户名或密码错误" });
				}
			});
		} else {
			var user = {}; //定义对象保存用户的信息
			user.phone = phone; //保存用户手机号
			var uname = "USER" + (Math.round(Math.random() * 8999) + 1000); //随机用户名

			user.uname = uname; //保存用户名
			user.sex = 1; //新注册的用户性别默认为1
			user.real_name = "请填写"; //新注册的用户真实姓名为空
			user.birthday = null; //新注册的用户生日默认为空
			user.email = "请填写"; //新注册的用户的邮箱默认为空
			user.user_img = "/images/user/wang.jpg";
			user.city = "";
			var sql = "INSERT INTO user(phone,upwd,uname) VALUES(?,md5(?),?)";
			pool.query(sql, [phone, upwd, uname], (err, result) => {
				if (err) throw err;
				if (result.affectedRows > 0) {
					var sql = "SELECT * FROM user WHERE phone=? AND upwd=md5(?)";
					pool.query(sql, [phone, upwd], (err, result) => {
						if (err) throw err;
						if (result.length > 0) {
							// session 的登陆id
							req.session.uid = result[0].uid;
							let token = jwt.generateToken(result[0].uid);
							res.json({ code: 200, data: result, token: token });
						}
					});
				} else {
					res.json({ code: 400, msg: "注册失败" });
				}
			});
		}
	});
});

//修改密码
router.post("/updatePwd", (req, res) => {
	var uid = req.body.uid;
	var newPwd = req.body.newPwd;

	console.log(req.body);
	var sql = `select * from user where uid = ?`;
	pool.query(sql, [uid], (err, result) => {
		// console.log(result);
		// console.log(result[0].upwd);
		// console.log(111);
		// console.log(req.body.oldPwd);
		// console.log(md5(req.body.oldPwd));
		if (result[0].upwd == md5(req.body.oldPwd)) {
			console.log(newPwd);
			var sql2 = `update user set upwd = md5(?) where uid = ?`;
			pool.query(sql2, [newPwd, uid], (err, result) => {
				if (err) throw err;
				if (result.affectedRows > 0) {
					res.send({ code: 200, msg: "update successful" });
				} else {
					res.send({ code: 400, msg: "update failed" });
				}
			});
		} else {
			res.send({ code: 401, msg: "password error" });
		}
	});
});

//更改个人信息
router.post("/update", (req, res) => {
	var obj = req.body;
	var uid = req.body.uid;
	console.log(req.body);
	var sql = `update user set ? where uid = ?`;
	pool.query(sql, [obj, uid], (err, result) => {
		if (err) throw err;
		if (result.affectedRows > 0) {
			res.json({ code: 200, msg: "update successful" });
		} else {
			res.json({ code: 400, msg: "update failed" });
		}
	});
});

//获取用户信息
router.post("/message", (req, res) => {
	var phone = req.body.phone;
	var upwd = req.body.upwd;
	// console.log(req.body);
	var sql = "SELECT * FROM user WHERE phone=? AND upwd=md5(?)";
	pool.query(sql, [phone, upwd], (err, result) => {
		if (err) throw err;
		res.json({ code: 200, data: result });
	});
});

// 收藏
router.post("/save", (req, res) => {
	let token = req.headers.token;
	var uid = jwt.verifyToken(token);
	var pid = req.body.pid;

	if (!uid) {
		res.send({ code: 400, msg: "没有登录" });
		return;
	}

	var sql1 = "SELECT status FROM user_save WHERE uid=? AND pid=?";
	pool.query(sql1, [uid, pid], (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			var status = result[0].status == 0 ? 1 : 0;
			var sql2 = `UPDATE user_save SET status=? WHERE uid=? AND pid=?`;
			pool.query(sql2, [status, uid, pid], (err, result) => {
				if (err) throw err;
				if (result.affectedRows > 0) {
					res.json({
						code: 200,
						data: {
							msg: "修改收藏状态成功",
							status: status
						}
					});
				}
			});
		} else {
			var sql3 = `INSERT INTO user_save VALUES(NULL,?,?,1)`;
			pool.query(sql3, [uid, pid], (err, result) => {
				if (err) throw err;
				if (result.affectedRows > 0) {
					res.json({ code: 200, msg: "创建收藏状态为1成功" });
				} else {
					res.json({ code: 400, msg: "创建收藏失败" });
				}
			});
		}
	});
});
//新增收货地址
router.post("/address", (req, res) => {
	var obj = req.body;
	var user_id = obj.user_id;
	var aid = obj.aid;
	if (obj.is_default == "false") {
		obj.is_default = 0;
	} else {
		obj.is_default = 1;
	}
	var is_default = obj.is_default;
	console.log(obj.is_default);
	function updateAddress() {
		var sql3 = "update cake_receiver_address set ? where aid = ?";
		pool.query(sql3, [obj, aid], (err, result) => {
			if (err) throw err;
			if (result.affectedRows > 0) {
				res.json({
					code: 200,
					msg: "更新成功"
				});
			}
		});
	}
	//判断时候为默认地址
	if (aid) {
		if (is_default) {
			console.log(is_default);
			var sql1 = `update cake_receiver_address set is_default = ? where user_id = ?`;
			pool.query(sql1, [0, user_id], (err, result) => {
				if (err) throw err;
				if (result.affectedRows > 0) {
					updateAddress();
				}
			});
		} else {
			updateAddress();
		}
	} else {
		if (is_default) {
			var sql = "select * from cake_receiver_address where user_id = ?";
			pool.query(sql, [user_id], (err, result) => {
				if (err) throw err;
				if (result.length > 0) {
					var sql2 = `update cake_receiver_address set is_default = ? where user_id = ?`;
					pool.query(sql2, [0, user_id], (err, result) => {
						if (err) throw err;
						if (result.affectedRows > 0) {
							var sql4 = `INSERT INTO cake_receiver_address(user_id,receiver,province,city,county,country,addressDetail,cellphone,postcode,is_default,areaCode) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
							pool.query(
								sql4,
								[
									obj.user_id,
									obj.receiver,
									obj.province,
									obj.city,
									obj.county,
									obj.country,
									obj.addressDetail,
									obj.cellphone,
									obj.postcode,
									is_default,
									obj.areaCode
								],
								(err, result) => {
									if (err) throw err;
									if (result.affectedRows > 0) {
										res.json({
											code: 200,
											msg: "保存成功"
										});
									} else {
										res.json({
											code: 400,
											msg: "保存失败"
										});
									}
								}
							);
						}
					});
				} else {
					var sql4 = `INSERT INTO cake_receiver_address(user_id,receiver,province,city,county,country,addressDetail,cellphone,postcode,is_default,areaCode) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
					pool.query(
						sql4,
						[
							obj.user_id,
							obj.receiver,
							obj.province,
							obj.city,
							obj.county,
							obj.country,
							obj.addressDetail,
							obj.cellphone,
							obj.postcode,
							is_default,
							obj.areaCode
						],
						(err, result) => {
							if (err) throw err;
							if (result.affectedRows > 0) {
								res.json({
									code: 200,
									msg: "保存成功"
								});
							} else {
								res.json({
									code: 400,
									msg: "保存失败"
								});
							}
						}
					);
				}
			});
		} else {
			var sql4 = `INSERT INTO cake_receiver_address(user_id,receiver,province,city,county,country,addressDetail,cellphone,postcode,is_default,areaCode) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
			pool.query(
				sql4,
				[
					obj.user_id,
					obj.receiver,
					obj.province,
					obj.city,
					obj.county,
					obj.country,
					obj.addressDetail,
					obj.cellphone,
					obj.postcode,
					is_default,
					obj.areaCode
				],
				(err, result) => {
					if (err) throw err;
					if (result.affectedRows > 0) {
						res.json({
							code: 200,
							msg: "保存成功"
						});
					} else {
						res.json({
							code: 400,
							msg: "保存失败"
						});
					}
				}
			);
		}
	}
});
//获取收货地址
router.post("/get_address_data", (req, res) => {
	var uid = req.body.uid;
	var aid = req.body.aid;
	var sql = `select * from cake_receiver_address where user_id=? and aid=?`;
	pool.query(sql, [uid, aid], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});
//获取收货地址页
router.post("/get_address", (req, res) => {
	var uid = req.body.uid;
	var sql = `select * from cake_receiver_address where user_id=?`;
	pool.query(sql, [uid], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});
//删除收货地址
router.post("/del_address", (req, res) => {
	var aid = req.body.aid;
	var uid = req.body.uid;
	var sql = `delete from cake_receiver_address where aid = ? and user_id = ?`;
	pool.query(sql, [aid, uid], (err, result) => {
		if (err) throw err;
		if (result.affectedRows > 0) {
			res.json({
				code: 200,
				msg: "删除成功"
			});
		} else {
			res.json({
				code: 400,
				msg: "删除失败"
			});
		}
	});
});

//收藏页
router.post("/save_list", (req, res) => {
	var uid = req.body.uid;
	var sql = `SELECT * FROM user_save left join cake_product on user_save.pid = cake_product.pid and user_save.uid=?`;
	pool.query(sql, [uid], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

//获取商品是否收藏
router.post("/is_save", (req, res) => {
	var pid = req.body.pid;
	var sql = `select * from user_save where pid = ?`;
	pool.query(sql, [pid], (err, result) => {
		if (err) throw err;
		if (result.length) {
			res.json({
				code: 200,
				data: result
			});
		} else {
			res.json({
				code: 400
			});
		}
	});
});
//list
module.exports = router;
