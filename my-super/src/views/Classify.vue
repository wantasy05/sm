<template>
	<cube-page type="scroll-tab-view" :title="title">
		<div slot="content">
			<div class="left-panel">
				<cube-scroll>
					<cube-tab-bar
						v-model="selectedLabel"
						:data="tabs"
						@change="changeHandler"
					></cube-tab-bar>
				</cube-scroll>
			</div>
			<div class="right-panel">
				<cube-scroll ref="scroll">
					<ul>
						<li
							v-for="(item, index) of scrollData"
							:key="index"
							@click.prevent="particulars($event, item)"
						>
							<img :src="baseUrl + item.pic" alt="" />
							<div class="title">
								<p>{{ item.pname }}</p>
								<div class="price">
									<span>{{ "￥" + item.price }}</span>
									<i :data-pid="item.pid" :data-cid="item.cid"></i>
								</div>
							</div>
						</li>
					</ul>
					<div class="tall"></div>
				</cube-scroll>
			</div>
		</div>
	</cube-page>
</template>

<script>
import CubePage from "../components/classify/CubePage.vue";
import { indexSeries, indexShop, addCart, getDetails } from "../apis/api.js";
import * as DATAS from "../data/tab-bar";
import { mapState } from "vuex";

export default {
	data() {
		return {
			DATA_MAP: {
				全部: "all",
				零食: "snacks",
				美妆: "beauty",
				生鲜: "fresh",
				数码: "digital"
			},
			selectedLabel: "全部",
			scrollData: [],
			tabs: [],
			title: "全部"
		};
	},
	computed: {
		...mapState(["baseUrl"])
	},
	created() {
		indexShop().then(res => {
			this.scrollData = res.data.data;
			this.DATA_MAP.全部 = res.data.data;
			let arr = res.data.data;
			let obj = {};
			arr.forEach(item => {
				obj[item.cid] = obj[item.cid] || [];
				obj[item.cid].push(item);
			});
			this.DATA_MAP.零食 = obj[1];
			this.DATA_MAP.美妆 = obj[2];
			this.DATA_MAP.生鲜 = obj[3];
			this.DATA_MAP.数码 = obj[4];
		});
		// indexSeries({ cid: -1 }).then(res => {

		// });
		this.tabs = Object.keys(this.DATA_MAP).map(label => ({
			label
		}));
		// this.scrollData = this.DATA_MAP[this.selectedLabel];
	},
	methods: {
		changeHandler(label) {
			this.scrollData = this.DATA_MAP[label];
			this.title = label;
			this.$nextTick(() => {
				// reset better-scroll'postion
				this.$refs.scroll.scrollTo(0, 0);
				// 当您的dom在nextTick中发生变化时，您需要计算滚动内容的高度
				this.$refs.scroll.refresh();
			});
		},
		addCart(e) {
			if (this.$global.isLogin) {
				var obj = {
					pid: e.target.dataset.pid,
					count: 1,
					user_id: sessionStorage.getItem("uid")
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
									url: "/index/classify"
								}
							});
						}, 300);
					}
				});
			} else {
				this.$router.push({
					name: "login",
					params: {
						url: "/index/classify"
					}
				});
			}
		},
		particulars(e, item) {
			if (e.target.tagName == "I") {
				this.addCart(e);
			} else {
				var pid = item.pid;
				this.$router.push({
					path: "/details",
					query: {
						pid: pid
					}
				});
			}
		}
	},
	components: {
		CubePage
	},
	watch: {
		selectedLabel(newV) {
			// console.log(newV);
		}
	}
};
</script>

<style lang="scss" scoped>
.cube-page {
	.header {
		background: #fff;
	}
}
.cube-scroll-list-wrapper {
	.cube-tab-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		/deep/ .cube-tab {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-basis: unset;
			height: 50px;
			line-height: 50px;
			font-weight: bold;
			font-size: 16px;
			border-radius: 5px;
			color: #333;
			width: 100%;
			transition: all 0.3s ease-in;
			&.cube-tab_active {
				color: #f00;
				font-size: 16px;
				background-color: #fff;
			}
		}
	}
}
.left-panel {
	position: absolute;
	top: 44px;
	left: 0;
	bottom: 0;
	width: 80px;
	background-color: #f1f1f1;
}
.right-panel {
	position: absolute;
	top: 44px;
	left: 80px;
	right: 0;
	bottom: 0;
	background-color: #f1f1f1;
	ul {
		background-color: #fff;
		padding-top: 10px;
	}
	li {
		height: 100px;
		display: flex;
		margin-top: 30px;
		font-size: 14px;
		img {
			height: 90%;
			margin: 0 10px 0 20px;
			border: 1px solid #ff9f38;
			border-radius: 3px;
			box-shadow: 0 1px 5px 0 #000;
		}
		p {
			overflow: hidden;
			line-height: 20px;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2; //设置文本显示两行
			white-space: normal;
		}
		.price {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 25px;
			color: #f00;
			font-weight: bold;
			i {
				margin-right: 10px;
				display: block;
				height: 30px;
				width: 30px;
				background-image: url(../assets/image/home_chophand_cart.png);
				background-size: 100% 100%;
			}
		}
	}
}
</style>
