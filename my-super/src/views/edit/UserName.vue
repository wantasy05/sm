<template>
	<div class="userName">
		<van-nav-bar title="修改真实姓名" left-text="取消" @click-left="cancel" />
		<van-cell-group>
			<van-field v-model="value" placeholder="请输入真实姓名" />
		</van-cell-group>
		<van-button type="danger" @click="realName" :disabled="show"
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
	computed: {},
	watch: {
		value() {
			if (this.value.length > 0) {
				this.show = false;
			} else {
				this.show = true;
			}
		}
	},
	created() {
		this.$bus.$on("Name", this.Name);
	},
	methods: {
		cancel() {
			if (this.oldName != this.value) {
				this.value = this.oldName;
			}
			this.$router.go(-1);
		},
		realName() {
			if (this.value) {
				setUser({
					real_name: this.value,
					uid: sessionStorage.getItem("uid")
				}).then(res => {
					console.log(res.data.code);
					if (res.data.code) {
						this.$router.push("edit");
					}
				});
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
	beforeDestroy() {
		this.$bus.$emit("realName", this.value);
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
</style>
