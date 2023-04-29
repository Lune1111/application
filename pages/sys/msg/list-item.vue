<template>
	<view class="wrap">
		<u-navbar
				title="name"
				:autoBack="true"
				style="padding: 15rpx 0"
				rightIcon="map">
			<view slot="right" style="padding: 20px">
				<u-icon name="more-dot-fill" size="38"></u-icon>
			</view>
		</u-navbar>
		<u-row gutter="32" class="bottom-box" justify="center">
			<u-col span="10">
				<view style="width: 400rpx;padding-right: 50rpx">
					<u-input
							placeholder="说点好听的吧~"
							border="surround"
							shape="circle"
							style=" border-radius: 50rpx; background:#f6f6f6;"
					></u-input>
				</view>
			</u-col>
		</u-row>
	</view>
</template>
<script>
/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
export default {
	data() {
		return {
			keywords: '',
						
		};
	},
	onLoad() {
		
	},
	methods: {
		navTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		search(value) {
			this.$u.toast('搜索内容为：' + value)
		}
	}
};

</script>
<style lang="scss">
@import '../../../common/uni.css';
page {
	background-color: #f5f5f5;
}
.wrap .search{
	background: #ffffff;
}
.msg-time{
	font-size: 26rpx;
	padding: 10px 0;
	color: #999999;
	text-align: center;
}
.u-card__foot{
	.u-icon{
		margin-right: 10px;
	}
}


</style>
