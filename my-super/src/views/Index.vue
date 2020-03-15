<template>
	<div>
		<router-view></router-view>
		<van-tabbar v-model="active" active-color="#f00">
			<van-tabbar-item
				v-for="(item, index) of icon"
				:key="index"
				:to="item.name"
			>
				<span>{{ item.text }}</span>
				<img
					slot="icon"
					slot-scope="props"
					:src="props.active ? item.active : item.inactive"
				/>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 0,
			icon: [
				{
					name: "/index/home",
					inactive: require("../assets/image/navigation_homebutton_normal.png"),
					active: require("../assets/image/navigation_homebutton_press.png"),
					text: "首页"
				},
				{
					name: "/index/classify",
					inactive: require("../assets/image/navigation_typebutton_normal.png"),
					active: require("../assets/image/navigation_typebutton_press.png"),
					text: "分类"
				},
				{
					name: "/index/discover",
					inactive: require("../assets/image/navigation_discovery_off.png"),
					active: require("../assets/image/navigation_discovery_on.png"),
					text: "发现"
				},
				{
					name: "/index/cart",
					inactive: require("../assets/image/navigation_cartbutton_normal.png"),
					active: require("../assets/image/navigation_cartbutton_press.png"),
					text: "购物车"
				},
				{
					name: "/index/me",
					inactive: require("../assets/image/navigation_mystorebutton_normal.png"),
					active: require("../assets/image/navigation_mystorebutton_press.png"),
					text: "我的"
				}
			]
		};
	},
	methods: {
		ifRouter() {
			if (this.$route.name == "home") {
				this.active = 0;
			} else if (this.$route.name == "classify") {
				this.active = 1;
			} else if (this.$route.name == "discover") {
				this.active = 2;
			} else if (this.$route.name == "cart") {
				this.active = 3;
			} else if (this.$route.name == "me") {
				this.active = 4;
			}
		}
	},
	created() {
		this.ifRouter();
	},
	updated() {
		this.ifRouter();
	}
};
</script>

<style lang="scss">
.van-tabbar {
	&.van-tabbar--fixed {
		z-index: 9999;
	}
}
.tall {
	height: 50px;
}
</style>
