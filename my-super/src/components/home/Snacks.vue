<template>
	<div class="snacks">
		<div class="text">
			<p>进口零食</p>
			<span>折扣促销每日更新</span>
		</div>
		<div class="shop">
			<div>
				<span>满199减120</span>
				<img :src="baseUrl + series.data[0].pic" />
			</div>
			<div>
				<span>满199减5</span>
				<img :src="baseUrl + series.data[0].pic" />
			</div>
			<div>
				<span>满2件享95折</span>
				<img :src="baseUrl + series.data[0].pic" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		series: { default: Object },
		baseUrl: { default: "" }
	},
	data() {
		return {
			// baseUrl: "",
			// series: {
			// 	data: [{ pic: "" }, { pic: "" }, { pic: "" }]
			// },
			img: []
		};
	},
	methods: {
		// getData() {
		// 	var _this = this;
		// 	new Promise((resolve, reject) => {
		// 		resolve();
		// 	}).then(res => {
		// 		(function() {
		// 			_this.img[0] = _this.series.data[0];
		// 			_this.img[1] = _this.series.data[1];
		// 			_this.img[2] = _this.series.data[2];
		// 		})();
		// 	});
		// }
	},
	mounted() {
		// this.getData();
		// this.img[0] = this.series.data[0];
		// this.img[1] = this.series.data[1];
		// this.img[2] = this.series.data[2];
		console.log(this.img);
	}
};
</script>

<style lang="scss" scoped>
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
</style>
