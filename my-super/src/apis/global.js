// 如果session中有uid，则认为用户登陆
var isLogin = (function() {
	return sessionStorage.getItem("uid") ? true : false;
})();
var phone = (function() {
	return sessionStorage.getItem("phone");
})();
const siteName = "sm"; // 站点名称

// 模块导出
export default {
	isLogin,
	phone,
	siteName
};
