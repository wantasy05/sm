<template>
	<div class="login">
		<div class="login_title">修改密码</div>
		<div class="form">
			<cube-input
				v-model="oldPwd"
				placeholder="请输入旧密码"
				:type="type"
				:maxlength="maxlength"
				:readonly="readonly"
				:disabled="disabled"
				:autofocus="autofocus"
				:autocomplete="autocomplete"
				:eye="eye"
			></cube-input>
			<cube-input
				v-model="valPwd"
				placeholder="请输入新密码"
				:type="type"
				:maxlength="maxlength"
				:readonly="readonly"
				:disabled="disabled"
				:autofocus="autofocus"
				:autocomplete="autocomplete"
				:eye="eye"
			></cube-input>
			<cube-input
				v-model="newPwd"
				placeholder="请再次输入新密码"
				:type="type"
				:maxlength="maxlength"
				:readonly="readonly"
				:disabled="disabled"
				:autofocus="autofocus"
				:autocomplete="autocomplete"
				:eye="eye"
			></cube-input>
			<div class="verify">
				<cube-input
					v-model="val"
					placeholder="请输入验证码"
					type="type"
					:maxlength="maxlength"
					:readonly="readonly"
					:autofocus="autofocus"
					:autocomplete="autocomplete"
				></cube-input>
				<cube-button @click="valCode">{{ code }}</cube-button>
			</div>
			<span class="noreg">未注册的用户将直接创建账户</span>
			<cube-button class="login_btn" @click="amend">确认修改</cube-button>
		</div>
	</div>
</template>
<script>
import { setPwd } from "../apis/api.js";
// import qs from "qs";
export default {
	data() {
		return {
			oldPwd: "",
			valPwd: "",
			val: "",
			code: "",
			newPwd: "",
			toastVal: "",
			placeholder: "请输入内容",
			type: "password",
			readonly: false,
			maxlength: 100,
			disabled: false,
			autofocus: true,
			autocomplete: true,
			eye: {
				open: false,
				reverse: false
			},
			routerUrl: ""
		};
	},
	created() {},
	methods: {
		valCode() {
			this.code = `${parseInt(Math.random() * 10)}${parseInt(
				Math.random() * 10
			)}${parseInt(Math.random() * 10)}${parseInt(Math.random() * 10)}`;
		},
		amend() {
			var reg_upwd = /^\w{8,16}$/;

			if (!reg_upwd.test(this.valPwd)) {
				this.toast = this.$createToast({
					txt: "密码格式不正确",
					type: "txt"
				});
				this.toast.show();
			} else if (this.valPwd != this.newPwd) {
				this.toast = this.$createToast({
					txt: "密码不一致",
					type: "txt"
				});
			} else if (this.code != this.val) {
				this.toast = this.$createToast({
					txt: "验证码不正确",
					type: "txt"
				});
				this.toast.show();
			} else {
				var obj = {
					oldPwd: this.oldPwd,
					newPwd: this.newPwd,
					uid: sessionStorage.getItem("uid")
				};
				setPwd(obj)
					.then(res => {
						if (res.data.code == 200) {
							this.$toast("修改成功");
							this.$router.push("/login");
						} else {
							this.$toast("旧密码不正确");
							this.oldUpwd = "";
							this.upwd = "";
							this.cpwd = "";
							this.code_value = "";
							this.valCode();
						}
						console.log(res.data.code);
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	},
	mounted() {
		console.log(this.$route);
		this.routerUrl = this.$route.params.url;
		this.valCode();
	}
};
</script>
<style lang="scss" scoped>
.login {
	background: url(../assets/image/login_bg.png) no-repeat;
	background-size: 100% 135px;
	width: 100%;
	height: 100%;
	&:before {
		content: "";
		display: table;
	}
}
.login_title {
	margin-top: 125px;
	display: flex;
	justify-content: center;
}
.form {
	padding-top: 60px;
	.cube-input_active::after {
		border-color: #f1f1f1;
	}
	/deep/.cube-input-field {
		padding-left: 30px;
	}
	.verify {
		display: flex;
		width: 100%;
		.cube-input {
			flex: 7;
		}
		button {
			flex: 1;
			background: #ee0a24;
			// letter-spacing: 2px;
			font-size: 15.4px;
			height: 45px;
			line-height: 15px;
		}
	}
	.noreg {
		margin-left: 30px;
		font-size: 8px;
		color: #999;
	}
	.login_btn {
		background: #ee0a24;
		margin-top: 20px;
	}
}
</style>
