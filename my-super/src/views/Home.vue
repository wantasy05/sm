<template>
	<div class="home">
		<!-- 搜索框 -->
		<div class="search">
			<van-search
				shape="round"
				background="transparent"
				placeholder="请输入搜索关键词"
				@focus="goSearch"
			/>
		</div>
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item, index) of images" :key="index">
				<img :src="baseUrl + item.img_url" alt="" />
			</van-swipe-item>
		</van-swipe>
		<van-grid :column-num="5" :border="false">
			<van-grid-item
				v-for="(item, index) of grid"
				:key="index"
				:icon="item.image"
				:text="item.text"
			/>
		</van-grid>
		<div class="snacks">
			<div class="text">
				<p>进口零食</p>
				<span>折扣促销每日更新</span>
			</div>
			<div class="shop">
				<div>
					<span>满199减120</span>
					<img :src="baseUrl + series[0].pic" />
				</div>
				<div>
					<span>满199减5</span>
					<img :src="baseUrl + series[1].pic" />
				</div>
				<div>
					<span>满2件享95折</span>
					<img :src="baseUrl + series[2].pic" />
				</div>
			</div>
		</div>
		<div class="snacks beauty">
			<div class="text">
				<p>美妆护肤</p>
				<span>折扣促销每日更新</span>
			</div>
			<div class="shop">
				<div>
					<span>满199减120</span>
					<img :src="baseUrl + beauty[0].pic" />
				</div>
				<div>
					<span>满199减5</span>
					<img :src="baseUrl + beauty[1].pic" />
				</div>
				<div>
					<span>满2件享95折</span>
					<img :src="baseUrl + beauty[2].pic" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { indexSwiper, indexSeries } from "../apis/api.js";
import { mapState } from "vuex";
export default {
	name: "carrousel",
	data() {
		return {
			value: "",
			images: [],
			grid: [
				{
					image: require("../assets/image/grid1.png"),
					text: "进口食品"
				},
				{
					image: require("../assets/image/grid2.png"),
					text: "美妆护肤"
				},
				{
					image: require("../assets/image/grid3.png"),
					text: "时令生鲜"
				},
				{
					image: require("../assets/image/grid4.png"),
					text: "电脑数码"
				},
				{
					image: require("../assets/image/grid5.png"),
					text: "热销榜"
				},
				{
					image: require("../assets/image/grid6.png"),
					text: "发现好店"
				},
				{
					image: require("../assets/image/grid7.png"),
					text: "图书馆"
				},
				{
					image: require("../assets/image/grid8.png"),
					text: "超值9.9"
				},
				{
					image: require("../assets/image/grid9.png"),
					text: "领券中心"
				},
				{
					image: require("../assets/image/grid10.png"),
					text: "家电馆"
				}
			],
			series: [{ pic: "" }, { pic: "" }, { pic: "" }],
			beauty: [{ pic: "" }, { pic: "" }, { pic: "" }]
		};
	},
	computed: {
		...mapState(["baseUrl"])
	},
	methods: {
		goSearch(e) {
			console.log(e);
			this.$router.push("/search");
		}
	},
	created() {
		indexSwiper().then(res => {
			this.images = res.data.data;
		});
		var obj = { cid: 1 };
		indexSeries(obj).then(res => {
			this.series = res.data.data;

			// console.log(this.series);
		});
		indexSeries({ cid: 2 }).then(res => {
			this.beauty = res.data.data;

			console.log(this.series);
		});
	},
	mounted() {
		// setTimeout(() => {
		// 	for (const item of this.series) {
		// 		this.series.push(item.pic);
		// 		console.log(this.series);
		// 	}
		// }, 100);
	}
};
</script>
<style lang="scss" scoped>
// .home {
// 	display: flex;
// 	justify-content: center;
// 	flex-direction: column;
// 	align-items: center;
// }
.search {
	position: fixed;
	width: 100%;
	z-index: 3;
}
.van-swipe {
	height: 244px;
	img {
		width: 100%;
		height: 100%;
	}
}

.van-grid {
	background: #fff;
	position: relative;
	width: 90%;
	margin: 0 auto;
	margin-top: -50px;
	z-index: 5;
	/deep/ .van-grid-item__icon {
		font-size: 45px;
	}
}
.snacks {
	margin: 0 auto;
	margin-top: 15px;
	width: 90%;
	height: 200px;
	background: url("/images/home_bg_dp_bottom.png");
	background-size: 100% 100%;
	padding: 15px;
	.text {
		display: flex;
		align-items: center;
		span {
			margin-left: 15px;
			font-size: 12px;
			color: #999;
		}
		p {
			font-size: 18px;
			color: #ff5d00;
			font-weight: bold;
		}
	}
	.shop {
		display: flex;
		font-size: 8px;
		margin-top: 15px;
		div {
			background: #fff;
			padding: 0 5px;
			margin: 5px;
			width: 30%;
			height: 120px;
			border: 1px solid #f1f1f1;
			box-shadow: 0px 3px 5px 0px #f1f1f1;
		}
		span {
			background: url("/images/panic_title_backdown.png") no-repeat;
			background-size: 100% 100%;
			display: block;
			color: #fff;
			height: 20px;
			line-height: 20px;
			text-align: center;
			white-space: nowrap;
			margin-bottom: 10px;
			width: 95%;
		}
		img {
			width: 100%;
			height: 80px;
		}
	}
}
.beauty {
	background: url("/images/home_1x3_fen_bg.png");
}
</style>
