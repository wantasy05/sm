<template>
	<div>
		<van-sticky>
			<van-nav-bar
				left-text="返回"
				title="收藏"
				left-arrow
				@click-left="onClickLeft"
			/>
		</van-sticky>
		<div
			class="card"
			v-for="(item, index) of data"
			:key="index"
			@click.prevent="particulars($event, item)"
		>
			<img :src="baseUrl + item.pic" alt="" />
			<div>
				<p>{{ item.pname }}</p>
				<span>￥{{ item.price.toFixed(2) }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { getSave } from "../apis/api.js";
import { mapState } from "vuex";
export default {
	data() {
		return {
			data: []
		};
	},
	computed: {
		...mapState(["baseUrl"])
	},
	watch: {
		$route() {}
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		getCollect() {
			var obj = {
				uid: sessionStorage.getItem("uid")
			};
			getSave(obj)
				.then(res => {
					console.log(res.data);
					res.data.map(item => {
						item.status && this.data.push(item);
					});
					console.log(this.data);
				})
				.catch(err => {
					console.log(err);
				});
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
	created() {
		this.getCollect();
	}
};
</script>

<style lang="scss" scoped>
.van-nav-bar .van-icon,
.van-nav-bar__text {
	color: #000;
}
.card {
	width: 100%;
	height: 120px;
	display: flex;
	align-items: center;
	background: #fff;
	margin-bottom: 10px;
	padding: 10px;
	img {
		height: 100px;
		width: 100px;
	}
	div {
		width: 100%;
		height: 100px;
		padding-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		p {
			font-size: 16px;
			line-height: 20px;
		}
		span {
			color: #f00;
		}
	}
}
</style>
