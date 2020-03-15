<template>
	<div class="edit">
		<van-nav-bar title="个人资料" left-arrow @click-left="me" />
		<van-cell title="头像" is-link />
		<van-cell title="用户名" is-link :value="uname" to="/name" />
		<van-cell title="真实姓名" is-link :value="userName" to="userName" />
		<div class="sex">
			<span>性别</span>
			<van-radio-group v-model="radio">
				<van-radio name="1">男</van-radio>
				<van-radio name="0">女</van-radio>
			</van-radio-group>
		</div>

		<van-cell title="收货地址管理" is-link to="/site" />

		<!-- <van-cell title="生日" value="2015-12-16" class="birthday" /> -->
		<div class="bir">
			<van-cell title="生日" is-link @click="bir" :value="birVal" />
			<van-popup v-model="birShow" position="bottom" :style="{ height: '40%' }">
				<van-datetime-picker
					v-model="currentDate"
					type="date"
					:min-date="minDate"
					:max-date="maxDate"
					@confirm="birConfirm"
					@cancel="birCancel"
				/>
			</van-popup>
		</div>
		<div :class="classSign" @click="sign">
			<van-cell title="个性签名" :value="signVal" />
		</div>

		<div class="phone">
			<van-cell title="手机号" is-link :value="phone" />
			<van-cell title="邮箱" is-link :value="email" @click="setEmail" />
			<van-cell title="修改密码" is-link @click="setPwd" />
		</div>
		<van-button v-if="islogin" type="danger" @click="affirm"
			>退出登录</van-button
		>
	</div>
</template>
<script>
import areaList from "../common/area.js";
import { getUser, setUser } from "../apis/api.js";
export default {
	data() {
		return {
			email: "请填写",
			classSign: "sign",
			uname: "请填写",
			userName: "请填写",
			radio: "",
			show: false,
			salShow: false,
			birShow: false,
			areaList: areaList,
			val: "",
			salVal: "",
			birVal: "",
			phone: "",
			islogin: this.$global.isLogin,
			data: [],
			minDate: new Date(1950, 1, 1),
			maxDate: new Date(),
			salList: {
				province_list: {
					1: "5-8k",
					2: "8-10k",
					3: "10-15k",
					4: "15-30k",
					5: "30-50k",
					6: ">50k"
				}
			},
			currentDate: new Date(),
			signVal: "一句话介绍自己的兴趣爱好"
		};
	},
	watch: {
		radio(val) {
			setUser({ sex: val, uid: sessionStorage.getItem("uid") })
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
		birVal(val) {}
	},
	methods: {
		affirm() {
			sessionStorage.removeItem("phone");
			sessionStorage.removeItem("upwd");
			this.$toast("注销成功");
			this.$router.push("/login");
		},
		birCancel() {
			this.birShow = false;
		},
		birConfirm(e) {
			this.birShow = false;
			this.birVal = `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`;
			setUser({ birthday: this.birVal, uid: sessionStorage.getItem("uid") })
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
		setPwd() {
			this.$router.push("/amend");
		},
		setEmail() {
			this.$router.push("/email");
		},
		sign1(val) {
			this.signVal = val;
		},
		sign() {
			this.$router.push("/sign");
		},
		sal() {
			this.salShow = true;
		},
		salConfirm(e) {
			this.salShow = false;
			this.salVal = e[0].name;
		},
		salCancel() {
			this.salShow = false;
		},
		addrConfirm(e) {
			this.show = false;
			this.val = `${e[0].name} ${e[1].name}`;
		},
		salCancel() {
			this.salShow = false;
		},
		addrConfirm(e) {
			this.show = false;
			this.val = `${e[0].name} ${e[1].name}`;
		},
		addrCancel() {
			this.show = false;
		},
		address() {
			this.show = true;
		},
		bir() {
			this.birShow = true;
		},
		me() {
			this.$router.push("/index/me");
		},
		realName(name) {
			if (name == "") {
				this.userName = "请填写";
			} else {
				this.userName = name;
			}
		},
		getEmail(email) {
			if (email == "") {
				this.email = "请填写";
			} else {
				this.email = email;
			}
		},
		userName2(name) {
			if (name == "") {
				this.uname = "请填写";
			} else {
				this.uname = name;
			}
		},
		updatum() {}
	},
	computed: {},
	created() {
		this.$router.beforeEach((to, from, next) => {
			if (to.path == "/login") {
				next();
			} else {
				next("/login");
			}
		});
		getUser({
			phone: sessionStorage.getItem("phone"),
			upwd: sessionStorage.getItem("upwd")
		})
			.then(res => {
				console.log(res.data);
				var obj = res.data.data[0];
				this.uname = obj.uname || "请填写";
				this.userName = obj.real_name || "请填写";
				this.radio = obj.sex.toString() || "一句话介绍自己的兴趣爱好";
				this.signVal = obj.say || "";
				this.phone = obj.phone || "";
				this.email = obj.email || "请填写";
				var date = new Date(obj.birthday);
				this.birVal =
					`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` ||
					"";
				// console.log(obj.birthday);
			})
			.catch(err => {
				console.log(err);
			});
		this.$bus.$on("realName", this.realName);
		this.$bus.$on("sign1", this.sign1);
		this.$bus.$on("email", this.getEmail);
		this.$bus.$on("userName2", this.userName2);
		this.updatum();
	},
	updated() {
		this.updatum();
	},
	beforeDestroy() {
		this.$bus.$emit("Name", this.userName);
		this.$bus.$emit("sign2", this.signVal);
		this.$bus.$emit("cemail", this.email);
		this.$bus.$emit("uname", this.uname);
		this.updatum();
	}
};
</script>
<style scoped lang="scss">
.van-icon-arrow-left:before {
	color: #000;
}
.van-cell__title {
	text-align: left;
}
.van-cell__value {
	color: #323233;
}
.sex {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 43px;
	padding: 0 15px;
	font-size: 14px;
	border-bottom: 1px solid #eee;
}
.van-radio-group {
	display: flex;
	justify-content: space-between;
}
.van-radio-group .van-radio {
	margin: 0 5px;
}
/deep/ .van-picker-column {
	font-size: 14px;
}
/deep/ .van-picker__title {
	font-size: 14px;
}
.salary,
.address,
.birthday,
.sign {
	border-bottom: 1px solid #f0f0f0;
}
.sign .van-cell__value {
	font-size: 12px;
	color: #999;
}
.phone {
	padding: 10px 0;
	background: #f0f0f0;
}
.van-button {
	display: block;
	margin: 0 auto;
	width: 90%;
	border-radius: 8px;
	margin-top: 20px;
}
// .van-cell {
//   border-bottom: 1px solid #f0f0f0;
// }
</style>
