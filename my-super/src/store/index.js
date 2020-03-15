import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLogin: "",
		baseUrl: "http://127.0.0.1:5051"
	},
	mutations: {
		setIslogin(state, islogin) {
			state.islogin = islogin;
		},
		cityAlert: (state, uid) => {
			state.uid = uid;
			localStorage.setItem("uid", uid);
		}
	},
	actions: {},
	modules: {}
});
