<template>
	<div class="order">
		<van-sticky>
			<van-nav-bar
				title="确认订单"
				:left-arrow="true"
				@click-left="onClickLeft"
			/>
		</van-sticky>

		<div class="address_list" @click="redact">
			<div class="title">
				<p>{{ address.receiver }}</p>
				<span>{{ address.cellphone }}</span>
			</div>
			<span>{{
				address.province +
					address.city +
					address.county +
					address.country +
					address.addressDetail
			}}</span>
		</div>

		<div class="card">
			<van-card
				v-for="(item, index) of data"
				:key="index"
				:num="item.count"
				:price="item.price.toFixed(2)"
				:title="item.pname"
				:thumb="baseUrl + item.pic"
			>
				<div slot="footer">
					<van-button size="mini" @click="subtract(item)">-</van-button>
					<van-button size="mini" @click="add(item)">+</van-button>
				</div>
			</van-card>
			<div class="cell">
				<van-cell title="配送方式" is-link value="快递 免邮" />
				<van-field
					v-model="message"
					rows="1"
					autosize
					label="订单备注"
					type="textarea"
					placeholder="选填，请先和商家协商一致"
				/>
			</div>
		</div>
		<van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" />
	</div>
</template>

<script>
import {
	getOrder,
	getAddress,
	amendCart,
	getCart,
	deleteCart
} from "../apis/api.js";
import { mapState } from "vuex";
export default {
	data() {
		return {
			message: "",
			data: [],
			address: {}
		};
	},
	created() {
		this.getAddress();
		getCart({ uid: sessionStorage.getItem("uid") }).then(res => {
			var pids = JSON.parse(sessionStorage.getItem("orderData")).pids.map(
				item => ({
					pid: item.pid
				})
			);

			this.data = pids.map(item =>
				res.data.data.find(val => val.pid == item.pid)
			);
		});
	},
	computed: {
		...mapState(["baseUrl"]),
		total: function() {
			return this.data.length
				? Number(
						this.data
							.map(item => item.price * item.count)
							.reduce((x, y) => x + y) * 100
				  )
				: 0;
		}
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		redact() {
			this.$router.push({
				path: "/site",
				params: {
					bool: true
				}
			});
		},
		// onClick() {
		// 	var obj = {
		// 		uid: sessionStorage.getItem("uid")
		// 	};
		// 	getOrder(obj).then(res => {});
		// },
		getAddress() {
			var obj = {
				uid: sessionStorage.getItem("uid")
			};
			getAddress(obj).then(res => {
				this.address = res.data.find(item => item.is_default == 1);
				// console.log(this.address);
			});
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
		onSubmit() {
			var pids = {
				pids: this.data.map(item => item.pid).toString()
			};
			// console.log(pids);
			//订单提交后删除购物车中提交订单的商品
			// deleteCart(pids)
			// 	.then(res => {
			// 		if (res.data.code == 200) {
			// 			this.$toast("提交成功");
			// 		} else {
			// 			this.$toast("提交失败");
			// 		}
			// 		// this.del = [];
			// 		// this.getCartData();
			// 	})
			// 	.catch(err => {
			// 		console.log("删除失败");
			// 	});
			var obj = {
				uid: sessionStorage.getItem("uid")
			};
			getOrder(obj).then(res => {
				console.log(res);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.van-nav-bar .van-icon {
	color: #000;
}

.address_list {
	margin: 20px 10px 0 10px;
	padding: 20px;
	border-radius: 10px;
	background: #fff;
	.title {
		display: flex;
		padding-bottom: 15px;
		align-items: center;
		p {
			font-size: 17px;
			margin-right: 5px;
		}
		span {
			margin-right: 5px;
		}
	}
	span {
		font-size: 15px;
	}
}
.card {
	margin: 10px;
	background: #fff;
	border-radius: 10px;
	padding-top: 10px;
}
.van-card {
	background: #fff;
	border-radius: 10px;
}
.cell {
	padding-left: 30px;
}
</style>
