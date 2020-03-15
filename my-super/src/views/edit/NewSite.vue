<template>
	<div class="site">
		<van-nav-bar title="新增收货地址" left-arrow @click-left="onClickLeft">
		</van-nav-bar>
		<van-address-edit
			:area-list="areaList"
			:address-info="AddressInfo"
			show-postal
			show-set-default
			show-search-result
			:search-result="searchResult"
			:area-columns-placeholder="['请选择', '请选择', '请选择']"
			@save="onSave"
		/>
	</div>
</template>

<script>
import { provinceList } from "../../common/area.js";
import { setAddress, getAddressData } from "../../apis/api.js";
export default {
	data() {
		return {
			areaList: provinceList,
			searchResult: [],
			AddressInfo: {
				name: "",
				areaCode: ""
			}
		};
	},

	watch: {},
	methods: {
		onSave(e) {
			console.log(e);
			var obj = {
				user_id: Number(sessionStorage.getItem("uid")),
				receiver: e.name,
				province: e.province,
				city: e.city,
				county: e.county,
				country: e.country,
				addressDetail: e.addressDetail,
				cellphone: e.tel,
				postcode: e.postalCode,
				is_default: e.isDefault,
				aid: e.aid || "",
				areaCode: e.areaCode
			};
			setAddress(obj)
				.then(res => {
					console.log(res);
					if (res.data.code == 200) {
						this.$toast("保存成功");
						this.$router.push("site");
					} else {
						this.$toast("保存失败");
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		onClickLeft() {
			this.$router.go(-1);
		},
		redact() {
			if (this.$route.query.aid) {
				var obj = {
					aid: this.$route.query.aid,
					uid: sessionStorage.getItem("uid")
				};
				getAddressData(obj).then(res => {
					res.data.map((item, index) => {
						this.AddressInfo.addressDetail = item.addressDetail;
						this.AddressInfo.aid = item.aid;
						this.AddressInfo.city = item.city;
						this.AddressInfo.country = item.country;
						this.AddressInfo.county = item.county;
						this.AddressInfo.isDefault = item.is_default ? true : false;
						this.AddressInfo.postalCode = item.postcode;
						this.AddressInfo.province = item.province;
						this.AddressInfo.name = item.receiver;
						this.AddressInfo.tel = item.cellphone;
						this.AddressInfo.areaCode = item.areaCode;
					});
					console.log(this.AddressInfo);
				});
			}
		}
	},
	created() {
		this.redact();
	},
	mounted() {}
};
</script>

<style lang="scss" scoped>
.van-nav-bar .van-icon,
.van-nav-bar__text {
	color: #000;
}
</style>
