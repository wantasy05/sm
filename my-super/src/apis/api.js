import axios from "./axios.js";

//登录
export const login = data => {
	return (async function() {
		var result = await axios.post("/user/list", data);
		return result;
	})();
};
//获取用户数据
export const getUser = data => {
	return (async function() {
		var result = await axios.post("/user/message", data);
		return result;
	})();
};
//修改用户数据
export const setUser = data => {
	return (async function() {
		var result = await axios.post("/user/update", data);
		return result;
	})();
};
//修改用户密码
export const setPwd = data => {
	return (async function() {
		var result = await axios.post("/user/updatePwd", data);
		return result;
	})();
};
//保存地址信息
export const setAddress = data => {
	return (async function() {
		var result = await axios.post("/user/address", data);
		return result;
	})();
};
//获取地址列表
export const getAddress = data => {
	return (async function() {
		var result = await axios.post("/user/get_address", data);
		return result;
	})();
};
//获取地址
export const getAddressData = data => {
	return (async function() {
		var result = await axios.post("/user/get_address_data", data);
		return result;
	})();
};

//删除地址
export const delAddress = data => {
	return (async function() {
		var result = await axios.post("/user/del_address", data);
		return result;
	})();
};

//首页轮播
export const indexSwiper = data => {
	return (async function() {
		var result = await axios.get("/index/swiper", data);
		return result;
		console.log(result);
	})();
};

//首页商品
export const indexShop = () => {
	return (async function() {
		var result = await axios.get("/index/shop");
		return result;
	})();
};
export const indexSeries = data => {
	return (async function() {
		var result = await axios.post("/index/series", data);
		return result;
	})();
};

//添加购物车
export const addCart = data => {
	return (async function() {
		var result = await axios.post("/cart/add", data);
		return result;
	})();
};

//获取购物车商品
export const getCart = data => {
	return (async function() {
		var result = await axios.post("/cart/get_cart", data);
		return result;
	})();
};

//修改购物车数量
export const amendCart = data => {
	console.log(data);
	return (async function() {
		var result = await axios.post("/cart/amend", data);
		return result;
	})();
};

//删除购物车
export const deleteCart = data => {
	return (async function() {
		var result = await axios.post("/cart/delete", data);
		return result;
	})();
};

//获取商品详情
export const getDetails = data => {
	return (async function() {
		var result = await axios.post("/details/product", data);
		return result;
	})();
};
//添加收藏
export const addSave = data => {
	return (async () => {
		var result = await axios.post("/user/save", data);
		return result;
	})();
};
//获取收藏列表
export const getSave = data => {
	return (async () => {
		var result = await axios.post("/user/save_list", data);
		return result;
	})();
};

//判断是否收藏
export const isSave = data => {
	return (async () => {
		var result = await axios.post("/user/is_save", data);
		return result;
	})();
};

//模糊查询
export const search = data => {
	return (async () => {
		var result = await axios.post("/search/key_word", data);
		return result;
	})();
};
//历史搜索
export const history = data => {
	return (async () => {
		var result = await axios.post("/search/history", data);
		return result;
	})();
};
//删除搜索历史
export const delHistory = () => {
	return (async () => {
		var result = await axios.get("/search/clearhis");
		return result;
	})();
};

//订单
export const getOrder = data => {
	return (async () => {
		var result = await axios.post("/orders/order", data);
		return result;
	})();
};
