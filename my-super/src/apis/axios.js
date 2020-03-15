import Axios from "axios";
import qs from "qs";
import store from "../store/index.js";

//导出包含axios配置的实例
const axios = Axios.create({
	baseURL: "http://127.0.0.1:5051",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	}
});

// 添加请求拦截器
axios.interceptors.request.use(
	config => {
		// console.log(config);
		// console.log(config.method);
		if (config.method == "post") config.data = qs.stringify(config.data);
		if (localStorage.getItem("token"))
			config.headers.token = localStorage.getItem("token");
		if (sessionStorage.getItem("token"))
			config.headers.token = sessionStorage.getItem("token");
		return config;
	},
	error => {
		console.log("===发送请求拦截器报错===");
		console.log(error);
		console.log("===end===");
		Promise.reject(error);
	}
);
// 添加响应拦截器
axios.interceptors.response.use(
	res => {
		if (res.data.status == 403) {
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
			store.commit("setIslogin", false);
		} else if (res.data.code == -1) {
			store.commit("setIslogin", false);
		} else if (res.data.token) {
			store.commit("setIslogin", true);
			if (res.remember === "true") {
				localStorage.setItem("token", res.data.token);
			} else {
				sessionStorage.setItem("token", res.data.token);
			}
		}
		return res;
	},
	error => {
		return Promise.reject(error);
	}
);

export default axios;
