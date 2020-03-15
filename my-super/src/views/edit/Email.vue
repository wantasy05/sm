<template>
	<div class="email">
		<van-nav-bar title="邮箱" left-text="取消" @click-left="onClickLeft" />
		<van-cell-group>
			<van-field v-model="value" placeholder="请输入邮箱地址" />
		</van-cell-group>
		<van-button type="danger" :disabled="show" @click="verifyEmail"
			>确认</van-button
		>
	</div>
</template>
<script>
import { setUser } from "../../apis/api.js";

export default {
	data() {
		return {
			value: "",
			show: true,
			newVal: ""
		};
	},
	computed: {},
	methods: {
		onClickLeft() {
			if (this.newVal != this.value) {
				this.value = this.newVal;
			}
			this.$router.go(-1);
		},
		verifyEmail() {
			var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
			if (reg.test(this.value)) {
				setUser({ email: this.value, uid: sessionStorage.getItem("uid") }).then(
					res => {
						console.log(res.data.code);
						if (res.data.code == 200) {
							this.$router.push("edit");
						}
					}
				);
			} else {
				this.$toast("邮箱格式不正确");
			}
		},
		email(val) {
			if (val == "请填写") {
				val = "";
			} else {
				this.value = val;
				this.newVal = val;
			}
		}
	},
	watch: {
		value() {
			// var len = this.value.length || 0;
			if (this.value) {
				this.show = false;
			} else {
				this.show = true;
			}
		}
	},
	beforeDestroy() {
		this.$bus.$emit("email", this.value);
	},
	created() {
		this.$bus.$on("cemail", this.email);
	}
};
</script>
<style scoped lang="scss">
.email {
	text-align: center;
}
.van-cell {
	line-height: 1rem;
}
/deep/ .van-field__control {
	font-size: 12px;
}
.van-button {
	width: 90%;
	border-radius: 6px;
	margin-top: 20px;
}
</style>
