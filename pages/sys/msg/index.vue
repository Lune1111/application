<template>
	<view class="wrap">
		<scroll-view class="scroll-list" scroll-y="true">
			<view class="uni-list">
				<view class="uni-list-cell" @click="navTo('/pages/sys/msg/list-item')">
					<uni-view class="uni-media-list">
						<u-avatar></u-avatar>
						<uni-view  class="uni-media-list-body">
							<uni-view class="uni-media-list-text-top"><span>name</span><span style="font-size: 26rpx;color: #999999;">09:07</span></uni-view>
							<uni-view class="uni-media-list-text-bottom">
								<uni-text><span>加油华为！加油China</span></uni-text>
							</uni-view>
						</uni-view>
					</uni-view>
				</view>
			</view>
		</scroll-view>
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
.uni-title{
	font-size: 30rpx;
	color: #333333;
	padding: 10px;
	background: #fff;
	border-top:1px solid #ededed;
	margin-top: 20rpx;
}
.uni-media-list {
    padding: 15px 15px;

}
.uni-media-list-body {
    height: 42px;
	padding-left:20rpx;
}
.uni-media-list-text-top{
	height: 40rpx;
    overflow: hidden;
	width: 100%;
	line-height: 40rpx;
	font-size: 32rpx;
	display: flex;
	justify-content: space-between;
}

.uni-media-list-text-bottom {
    width: 100%;
    line-height: 24rpx;
    font-size: 26rpx;
	color: #666666;
	span{
		margin-right: 10rpx;
	}
}


</style>
