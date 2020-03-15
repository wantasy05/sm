<template>
	<div class="userName">
		<van-nav-bar title="修改用户名" left-text="取消" @click-left="cancel" />
		<van-cell-group>
			<van-field v-model="value" placeholder="请输入用户名" />
		</van-cell-group>
		<div class="ts">
			1-25字符，仅支持中英文，数字或"_"，首位须为中英文或数字
		</div>
		<van-button type="danger" @click="userName" :disabled="show"
			>确定</van-button
		>
	</div>
</template>
<script>
import { setUser } from "../../apis/api.js";
export default {
	data() {
		return {
			value: "",
			oldName: "",
			show: true
		};
	},
	methods: {
		cancel() {
			if (this.oldName != this.value) {
				this.value = this.oldName;
			}
			this.$router.go(-1);
		},
		userName() {
			if (this.value) {
				setUser({ uname: this.value, uid: sessionStorage.getItem("uid") }).then(
					res => {
						console.log(res.data.code);
						if (res.data.code == 200) {
							this.$router.push("edit");
						}
					}
				);
			}
		},
		Name(n) {
			if (n == "请填写") {
				this.value = "";
			} else {
				this.value = n;
				this.oldName = n;
			}
		}
	},
	computed: {},
	beforeDestroy() {
		this.$bus.$emit("userName2", this.value);
	},
	created() {
		this.$bus.$on("uname", this.Name);
	},
	watch: {
		value() {
			if (this.value.length > 0) {
				this.show = false;
			} else {
				this.show = true;
			}
		}
	}
};
</script>
<style scoped lang="scss">
.userName {
	text-align: center;
}
.van-nav-bar__text {
	color: #323233;
}
.van-nav-bar__title {
	font-size: 15px;
}
.van-button {
	margin-top: 50px;
	width: 90%;
	border-radius: 8px;
}
.ts {
	padding: 10px;
	font-size: 12px;
	color: #666;
	text-align: left;
}
</style>
