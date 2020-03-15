<template>
	<div class="details">
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="header">
			<img :src="baseUrl + product.pic" @click="preview" />
			<p>{{ product.pname }}</p>
			<div class="price">
				<span>￥{{ product.price }}</span>
			</div>
			<div class="clearfix countAll">
				<span v-text="`销量：${product.sales_volume}件`"></span>
				<span>
					库存:
					<i v-text="sku.stock_num"></i>件
				</span>
				<span v-text="`浏览量：${product.read_num}`"></span>
			</div>
		</div>
		<van-cell title="规格" is-link @click="showSku" />
		<van-sku
			v-model="show"
			:sku="sku"
			:goods="goods"
			:goods-id="goodsId"
			:hide-stock="sku.hide_stock"
			@buy-clicked="onBuyClicked"
			@add-cart="onAddCartClicked"
		/>
		<van-goods-action>
			<van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
			<van-goods-action-icon
				:icon="icon"
				:text="star"
				:color="ys"
				@click="onStar"
			/>
			<van-goods-action-button
				type="warning"
				text="加入购物车"
				@click="showSku"
			/>
			<van-goods-action-button
				type="danger"
				text="立即购买"
				@click="onBuyClicked"
			/>
		</van-goods-action>
	</div>
</template>

<script>
import { getDetails, addCart, addSave, isSave } from "../apis/api.js";
import { mapState } from "vuex";
import { ImagePreview } from "vant";
export default {
	data() {
		return {
			product: [{ pic: "", price: 0 }],
			index: 0,
			images: [],
			repertoryAll: "",
			show: false,
			goodsId: "946755",
			ys: "#666",
			star: "收藏",
			icon: "star-o",
			sku: {
				// 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
				// 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
				tree: [
					{
						k: "规格", // skuKeyName：规格类目名称
						v: [
							{
								id: "1", // skuValueId：规格值 id
								name: "红色", // skuValueName：规格值名称
								imgUrl: "https://img.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
								previewImgUrl: "https://img.yzcdn.cn/1p.jpg" // 用于预览显示的规格类目图片
							}
						],
						k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
					}
				],
				// 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
				list: [
					{
						id: 2259, // skuId，下单时后端需要
						price: 1000, // 价格（单位分）
						s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
						stock_num: 110 // 当前 sku 组合对应的库存
					}
				],
				price: "1.00", // 默认价格（单位元）
				stock_num: 227, // 商品总库存
				collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
				none_sku: false, // 是否无规格商品
				hide_stock: false // 是否隐藏剩余库存
			},
			goods: {
				picture: ""
			}
		};
	},
	created() {
		this.isSave();
		var pid = this.$route.query.pid;
		getDetails({ pid: pid })
			.then(res => {
				this.product = res.data.data.product[0];
				var pic = this.baseUrl + res.data.data.product[0].pic;
				this.images.push(pic);
				var v = [],
					list = [];
				res.data.data.spec.map((val, i) => {
					v[i] = {};
					v[i].id = val.sid;
					v[i].name = val.size;
					v[i].imgUrl = v[i].previewImgUrl = this.baseUrl + val.pic;
					list[i] = {};
					list[i].id = val.pid;
					list[i].price = val.price * 100;
					list[i].s1 = val.sid;
					list[i].stock_num = val.repertory;
				});
				this.sku.tree[0].v = v;
				this.sku.list = list;
				this.sku.price = this.product.price;
				this.sku.stock_num = this.product.read_num;
			})
			.catch(err => {
				console.log(err);
			});
	},
	watch: {},
	computed: {
		...mapState(["baseUrl"])
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		preview() {
			this.$createImagePreview({
				imgs: this.images
			}).show();
		},
		showSku() {
			this.show = this.show == false;
		},
		//立即购买
		onBuyClicked(e) {
			console.log(e);
		},
		//加入购物车
		onAddCartClicked(e) {
			var obj = {
				user_id: sessionStorage.getItem("uid"),
				pid: e.selectedSkuComb.id,
				count: e.selectedNum,
				sid: e.selectedSkuComb.s1
			};
			addCart(obj).then(res => {
				if (res.data.code == 200) {
					this.$toast("加入购物车");
				} else {
					this.$toast("登录已过期，请重新登录");
					setTimeout(() => {
						this.$router.push({
							name: "login",
							params: {
								url: "/index/details"
							}
						});
					}, 300);
				}
			});
		},
		//跳转购物车
		onClickIcon() {
			this.$router.push("/index/cart");
		},
		onStar() {
			var obj = {
				uid: sessionStorage.getItem("uid"),
				pid: this.$route.query.pid
			};
			addSave(obj)
				.then(res => {
					this.isSave();
				})
				.catch(err => {
					console.log(err);
				});
		},
		isSave() {
			var obj = {
				pid: this.$route.query.pid
			};
			isSave(obj).then(res => {
				console.log(111);
				console.log(res.data);
				if (res.data.code == 200) {
					var status = res.data.data[0].status;

					if (status == 0) {
						this.icon = "star-o";
						this.ys = "#666";
						this.star = "收藏";
					} else {
						this.icon = "star";
						this.ys = "#ff5000";
						this.star = "已收藏";
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.details {
	background-color: #fff;
}
.van-nav-bar .van-icon,
.van-nav-bar__text {
	color: #000;
}
.header {
	padding: 10px;
	font-size: 20px;
	img {
		width: 100%;
	}
	p {
		font-size: 20px;
		margin: 10px 0 0 10px;
	}
	.price {
		color: #f00;
		span {
			display: block;
			margin-left: 10px;
			margin-top: 20px;
		}
		padding-bottom: 20px;
	}
	.clearfix {
		font-size: 15px;
		color: #999;
		display: flex;
		justify-content: space-between;
		padding-bottom: 20px;
		border-bottom: 1px solid #999;
	}
}
</style>
