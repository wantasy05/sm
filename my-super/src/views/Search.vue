<template>
	<div class="search">
		<van-search
			v-model="valSearch"
			shape="round"
			background="#fff"
			placeholder="请输入搜索关键词"
			:show-action="true"
			@search="onSearch"
			@cancel="onCancel"
		/>
		<div class="history" v-if="isSearch">
			<div class="record_search">
				<p>搜索历史</p>
				<span @click="delHistory">
					<img src="../assets/image/delete.png" alt="" />
				</span>
			</div>
			<van-button
				round
				type="primary"
				size="small"
				v-for="(item, index) of hisSearch"
				:key="index"
				>{{ item.pname }}</van-button
			>
		</div>
		<div v-else>
			<div
				class="card"
				v-for="(item, index) of searchData"
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
	</div>
</template>

<script>
import { search, history, delHistory } from "../apis/api.js";
import { mapState } from "vuex";
export default {
	data() {
		return {
			valSearch: "",
			hisSearch: [],
			searchData: [],
			isSearch: true,
			canSearch: true
		};
	},
	computed: {
		...mapState(["baseUrl"])
	},
	created() {
		this.getHistory();
	},
	updated() {
		if (this.canSearch) {
			console.log(111);
			this.canSearch = false;
			this.onSearch();
			setTimeout(() => {
				this.canSearch = true;
			}, 1000);
		}
	},
	watch: {
		valSearch(val) {
			val || (this.isSearch = true);
		}
	},
	methods: {
		onSearch() {
			if (this.valSearch.trim()) {
				var obj = {
					pname: this.valSearch
				};
				search(obj)
					.then(res => {
						this.searchData = res.data;
						this.isSearch = false;
					})
					.catch(err => {
						console.log(err);
					});
				setTimeout(() => {
					this.getHistory();
				}, 100);
			}
		},
		onCancel() {
			this.$router.push("./");
		},
		getHistory() {
			var obj = {
				uid: sessionStorage.getItem("uid")
			};
			history(obj)
				.then(res => {
					this.hisSearch = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		delHistory() {
			if (this.hisSearch.length)
				delHistory()
					.then(res => {
						console.log(res.data.code);
						if (res.data.code == 200) {
							this.hisSearch = [];
						}
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
	}
};
</script>

<style lang="scss" scoped>
.van-search__content--round {
	background: #eaeaea;
}
.history {
	background: #fff;
	padding: 10px;
	.record_search {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		font-size: 15px;
		img {
			width: 20px;
			height: 20px;
		}
	}
	.van-button--primary {
		color: #000;
		background-color: #f1f1f1;
		border: 0.026667rem solid #f1f1f1;
	}
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
