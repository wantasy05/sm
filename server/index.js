const express = require("express");

const bodyParser = require("body-parser");

// 引入session模块
const session = require("express-session");

/*引入token的模块*/
const jwt = require("./jwt.js");

var app = express();

app.listen(5051);

// 上传文件的限制大小
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

console.log("server is lintening 5051");
//声明跨域
app.all("*", function(req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	res.header("Access-Control-Allow-Headers", "token");
	//跨域允许的请求方式
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method.toLowerCase() == "options") res.send(200);
	//让options尝试请求快速结束
	else next();
});

app.use((req, res, next) => {
	// console.log(req.url)
	if (
		req.url != "/user/list" &&
		(req.url.startsWith("/user") ||
			req.url.startsWith("/cart") ||
			req.url.startsWith("/orders"))
	) {
		// console.log("进入")
		let token = req.headers.token;
		let result = jwt.verifyToken(token);
		// 如果考验通过就next，否则就返回登陆信息不正确
		if (result === undefined) {
			res.send({ status: 403, msg: "未提供证书" });
		} else if (result.name == "TokenExpiredError") {
			res.send({ status: 403, msg: "登录超时，请重新登录" });
		} else if (result.name == "JsonWebTokenError") {
			res.send({ status: 403, msg: "证书出错" });
		} else {
			req.user = result;
			next();
		}
	} else {
		next();
	}
});

// session
app.use(
	session({
		secret: "128位字符串", // 自定义字符串
		resave: true, // 每次请求更新数据
		saveUninitialized: true // 保存初始化数据
	})
);

// 托管静态资源到public目录
app.use(express.static("public"));

//引入路由
const userRouter = require("./route/user.js");
const indexRouter = require("./route/index.js");
// 导入cart路由器 购物车
const cartRouter = require("./route/cart");
const detailsRouter = require("./route/details");
//搜索
const searchRouter = require("./route/search");
// 导入orders路由器 订单
const ordersRouter = require("./route/order");

app.use("/user", userRouter);
app.use("/index", indexRouter);
app.use("/cart", cartRouter);
app.use("/details", detailsRouter);
app.use("/search", searchRouter);
app.use("/orders", ordersRouter);
