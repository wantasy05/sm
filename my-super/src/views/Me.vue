<template>
	<div class="me">
		<div class="set" @click="set">
			<img v-if="code" src="../assets/image/mystore_setup.png" alt="" />
		</div>
		<div class="bg">
			<img src="../assets/image/login_bg.png" alt="" />
		</div>
		<div class="portrait">
			<img :src="user_img" alt="" @click="set" />
			<span @click="login">{{ uname || "登录/注册" }}</span>
		</div>
		<van-grid :column-num="3" :border="false">
			<van-grid-item
				v-for="(item, index) of images"
				:key="index"
				:icon="item.url"
				:text="item.text"
				@click="skip(item)"
			/>
		</van-grid>
		<div class="order">
			<div class="order_text">
				<p>我的订单</p>
				<span>
					查看全部
					<img src="../assets/image/home_icon_next_gray2.png" alt="" />
				</span>
			</div>
			<van-grid :column-num="4" :border="false">
				<van-grid-item
					v-for="(item, index) of d_images"
					:key="index"
					:icon="item.url"
					:text="item.text"
				/>
			</van-grid>
		</div>
		<div class="order">
			<div class="order_text">
				<p>我的资产</p>
			</div>
			<van-grid :column-num="4" :border="false">
				<van-grid-item
					v-for="(item, index) of z_images"
					:key="index"
					:icon="item.url"
					:text="item.text"
				/>
			</van-grid>
		</div>
	</div>
</template>
<script>
import { getUser } from "../apis/api.js";
import { mapState } from "vuex";

export default {
	data() {
		return {
			uname: "",
			user_img: require("../assets/image/avatar.png"),
			code: false,
			images: [
				{ url: require("../assets/image/mystore_heart.png"), text: "我的收藏" },
				{ url: require("../assets/image/mystore_foot.png"), text: "浏览足迹" },
				{ url: require("../assets/image/mystore_list.png"), text: "常购清单" }
			],
			d_images: [
				{
					url: require("../assets/image/mystore_waitpay_icon.png"),
					text: "待付款"
				},
				{
					url: require("../assets/image/mystore_receipt.png"),
					text: "待收货"
				},
				{
					url: require("../assets/image/mystore_new_evaluate.png"),
					text: "待评价"
				},
				{
					url: require("../assets/image/mystore_return.png"),
					text: "退换货"
				}
			],
			z_images: [
				{
					url: require("../assets/image/mystore_coupon_icon.png"),
					text: "优惠券"
				},
				{
					url: require("../assets/image/mystore_balance_icon.png"),
					text: "账户余额"
				},
				{
					url: require("../assets/image/mystore_gold_icon.png"),
					text: "金币"
				},
				{
					url: require("../assets/image/mystore_gift_icon.png"),
					text: "礼品卡"
				}
			]
		};
	},
	computed: {
		...mapState(["baseUrl"])
	},
	created() {
		this.getUser();
	},
	watch: {
		$router() {}
	},
	methods: {
		getUser() {
			console.log(this.$global.isLogin);
			if (this.$global.isLogin) {
				getUser({
					phone: sessionStorage.getItem("phone"),
					upwd: sessionStorage.getItem("upwd")
				})
					.then(res => {
						if (res.data.status == 403) {
							this.code = true;
							return;
						} else {
							console.log(res);
							this.uname = res.data.data[0].uname;
							this.user_img = this.baseUrl + res.data.data[0].user_img;
							this.code = true;
						}
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				this.user_img = require("../assets/image/avatar.png");
			}
		},
		login() {
			console.log(this.code);
			this.code ||
				this.$router.push({
					name: "login",
					params: {
						url: "/index/me"
					}
				});
		},
		skip(data) {
			data.text == "我的收藏" && this.$router.push("/collect");
		},
		set() {
			this.code && this.$router.push("/edit");
		}
	},
	mounted() {}
};
</script>
<style lang="scss" scoped>
.me {
	padding-bottom: 50px;
}
.set {
	position: absolute;
	right: 0;
	padding: 15px;
	img {
		width: 30px;
		height: 30px;
	}
}
.bg {
	width: 100%;
	height: 250px;
	background: #fff;
	img {
		width: 100%;
	}
}
.portrait {
	width: 100%;
	position: absolute;
	display: flex;
	top: 50px;
	flex-direction: column;
	align-items: center;
	img {
		margin-top: 75px;
		width: 75px;
		height: 75px;
	}
	span {
		margin-top: 5px;
		font-size: 20px;
	}
}
.order {
	margin-top: 15px;
	padding: 15px;
	background: #fff;
	.order_text {
		padding-bottom: 10px;
		display: flex;
		justify-content: space-between;
		font-size: 15px;
		border-bottom: 1px solid #eaeaea;
		span {
			color: #666;
			img {
				width: 15px;
				height: 15px;
			}
		}
	}
}
</style>
