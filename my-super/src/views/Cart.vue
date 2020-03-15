<template>
	<div class="cart">
		<van-sticky>
			<van-nav-bar
				title="购物车"
				:left-arrow="false"
				:right-text="edit"
				@click-right="onClickRight"
			/>
		</van-sticky>
		<div class="card_content" v-if="cart">
			<van-checkbox-group v-model="result" ref="checkboxGroup" @change="select">
				<div
					class="card"
					v-for="(item, index) of cdata"
					:key="index"
					@click="particulars($event, item)"
				>
					<van-checkbox :name="item" shape="square"> </van-checkbox>

					<van-card
						:num="item.count"
						:price="item.price.toFixed(2)"
						:title="item.pname"
						:thumb="baseUrl + item.pic"
					>
						<div slot="bottom"></div>
						<div slot="footer">
							<van-button
								size="mini"
								:disabled="item.bool"
								@click="subtract(item)"
								>-</van-button
							>
							<van-button size="mini" @click="add(item)">+</van-button>
						</div>
					</van-card>
				</div>
			</van-checkbox-group>
		</div>
		<div class="bg" v-else>
			<img src="../assets/image/20200213154054.png" alt="" />
			<van-button type="danger" @click="stroll">去逛逛</van-button>
		</div>
		<van-submit-bar
			v-if="cart"
			:disabled="del.length ? false : true"
			:price="total"
			button-text="提交订单"
			@submit="onSubmit"
		>
			<van-checkbox v-model="checked" shape="square" @click="checkAll(!checked)"
				>全选</van-checkbox
			>
		</van-submit-bar>
		<van-submit-bar
			class="delete"
			v-if="cart"
			v-show="edit == '完成'"
			button-text="删除"
			@submit="delCart"
		>
			<van-checkbox v-model="checked" shape="square" @click="checkAll(!checked)"
				>全选</van-checkbox
			>
		</van-submit-bar>
	</div>
</template>

<script>
import { getCart, amendCart, deleteCart, getOrder } from "../apis/api.js";
import { mapState } from "vuex";

export default {
	data() {
		return {
			cart: false,
			cdata: [],
			result: [],
			checked: "",
			edit: "编辑",
			del: []
		};
	},
	computed: {
		...mapState(["baseUrl"]),
		total: function() {
			return this.del.length
				? Number(
						this.del
							.map(item => item.price * item.count)
							.reduce((x, y) => x + y) * 100
				  )
				: 0;
		}
	},
	created() {
		this.getCartData();
		// this.isLogin = this.$global.isLogin;
		// this.stroll();
	},
	updated() {},
	watch: {
		// cdata() {}
	},
	methods: {
		getCartData() {
			var obj = { uid: sessionStorage.getItem("uid") };
			getCart(obj)
				.then(res => {
					if (res.data.code == 200) this.cart = true;
					this.cdata = res.data.data;
					this.cdata.bool = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
		checkAll(e) {
			this.$refs.checkboxGroup.toggleAll(e);
		},
		stroll() {
			this.$router.push("/index/classify");
		},
		subtract(data) {
			if (data.count <= 1) {
				return;
			} else {
				data.count--;
				if (data.count == 1) {
					data.bool = true;
				}
				var obj = {
					user_id: data.user_id,
					pid: data.pid,
					count: data.count
				};
				this.amendcount(obj);
			}
		},
		add(data) {
			data.count++;
			if (data.count > 1) {
				data.bool = false;
			}
			var obj = {
				user_id: data.user_id,
				pid: data.pid,
				count: data.count
			};
			this.amendcount(obj);
		},

		amendcount(data) {
			amendCart(data)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
		select(e) {
			console.log(e);
			this.checked = e.length == this.cdata.length;
			this.del = e;
		},
		onClickRight() {
			if (this.edit == "编辑") {
				this.edit = "完成";
			} else if (this.edit == "完成") {
				this.edit = "编辑";
			}
		},
		delCart() {
			var obj = { pids: this.del.map(item => item.pid).toString() };
			deleteCart(obj)
				.then(res => {
					if (res.data.code == 200) {
						this.$toast("删除成功");
						this.$router.go(0);
					} else {
						this.$toast("删除失败");
					}
					// this.del = [];
					// this.getCartData();
				})
				.catch(err => {
					console.log("删除失败");
				});
		},
		particulars(e, item) {
			if (e.target.tagName != "BUTTON" && e.target.tagName != "I") {
				this.$router.push({
					path: "/details",
					query: {
						pid: item.pid
					}
				});
			}
		},
		onSubmit() {
			var obj = {
				uid: sessionStorage.getItem("uid"),
				total: this.total,
				pids: this.del
			};
			sessionStorage.setItem("orderData", JSON.stringify(obj));
			this.$router.push("/order");
		}
	}
};
</script>

<style lang="scss" scoped>
.cart {
	width: 100%;
	height: 100%;

	.bg {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			width: 100%;
		}
		.van-button {
			margin-top: -30px;
			width: 130px;
		}
	}
}
.van-nav-bar__text {
	color: #000;
}
.delete {
	.van-submit-bar__bar {
		justify-content: space-between;
	}
}

.card {
	display: flex;
	background: #fafafa;
}
.card_content {
	padding-bottom: 120px;
	background: #fafafa;
}
.van-checkbox {
	padding: 10px;
}
.van-card__title {
	font-size: 15px;
	font-weight: bold;
	margin-top: 10px;
	margin-left: 10px;
}
.van-card__price {
	font-size: 15px;
	color: #f00;
	margin-left: 15px;
}
.van-button {
	font-size: 15px;
}
.van-submit-bar {
	margin-bottom: 50px;
}
</style>
