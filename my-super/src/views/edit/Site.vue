<template>
	<div class="site">
		<van-nav-bar title="地址管理" left-arrow @click-left="onClickLeft">
		</van-nav-bar>
		<van-radio-group v-model="radio">
			<van-swipe-cell v-for="(item, index) of list" :key="index">
				<div class="address_list" @click="redact(item)">
					<van-radio :name="item.aid"></van-radio>
					<div class="text">
						<div class="title">
							<p>{{ item.receiver }}</p>
							<span>{{ item.cellphone }}</span>
							<van-tag round type="danger" v-if="item.is_default">默认</van-tag>
						</div>
						<span>{{ item.address }}</span>
					</div>
				</div>
				<van-button
					slot="right"
					square
					text="删除"
					type="danger"
					class="delete-button"
					@click="delList(item)"
				/>
			</van-swipe-cell>
		</van-radio-group>
		<van-goods-action>
			<van-goods-action-button
				type="danger"
				text="新增地址"
				@click="onClickButton"
			/>
		</van-goods-action>
	</div>
</template>

<script>
import { getAddress, delAddress } from "../../apis/api.js";
export default {
	data() {
		return {
			chosenAddressId: "1",
			list: [],
			bool: false,
			select_aid: "",
			radio: 1
		};
	},
	watch: {},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		getAddress() {
			var obj = {
				uid: sessionStorage.getItem("uid")
			};
			getAddress(obj).then(res => {
				this.list = res.data;
				this.radio = res.data.find(item => item.is_default == 1).aid;
				res.data.map((item, index) => {
					this.list[index].address =
						item.province +
						item.city +
						item.county +
						item.country +
						item.addressDetail;
				});
			});
		},
		onClickButton() {
			this.$router.push("newsite");
		},
		delList(e) {
			console.log(e);
			var obj = {
				aid: e.aid,
				uid: sessionStorage.getItem("uid")
			};
			delAddress(obj).then(res => {
				if (res.data.code == 200) {
					this.$toast("删除成功");
					this.getAddress();
				}
			});
		},
		redact(e) {
			this.$router.push({
				path: "/newSite",
				query: {
					aid: e.aid
				}
			});
		}
	},
	created() {
		this.getAddress();
	}
};
</script>

<style lang="scss" scoped>
.van-nav-bar .van-icon {
	color: #000;
}
.address_list {
	display: flex;
	margin: 20px 10px 0 10px;
	padding: 20px;
	border-radius: 10px;
	background: #fff;

	.van-radio {
		margin-right: 15px;
	}
}
.text {
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
		font-size: 12px;
	}
}
.delete-button {
	height: 100%;
}
</style>
