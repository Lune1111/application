<template>

    <view>
        <div class="canvas" style="opacity: 1.9">
            <iframe src="/static/kongmingLantern.html" ref="iframe" width="100%" height="885px" scrolling="no"/>
        </div>
        <view  class="flex-container">
            <view style="padding-left: 24rpx;">
                <u-button class="layout-button" style="background: linear-gradient(to right, #6f8ee3, #87b0c6);">
                    <view style="color: #FFFFFF">倾</view>
                </u-button>
            </view>
            <view style="display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 150rpx;
                        margin-bottom: 10rpx">
                    <u-button style=" background:#6a8ee7; color: #ffffff" size="mini" class="sex"><u-icon name="man"></u-icon>男</u-button>
                    <u-button style=" background:pink;color: #ffffff" size="mini" class="sex"><u-icon name="woman"></u-icon>女</u-button>
            </view>
            <view style="padding-right: 24rpx;">
                <u-button class="layout-button" style="background: linear-gradient(to right, #e9a168, #e8c188);">
                    <view style="color: #FFFFFF">听</view>
                </u-button>
            </view>
        </view>

    </view>
</template>

<script>
    import HeadNavBar from '@/components/headnavbar/index';
    import UButton from "../../../uview-ui/components/u-button/u-button";
    import UIcon from "../../../uview-ui/components/u-icon/u-icon";
    /**
     * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
     */
    export default {
        components: {
            UIcon,
            UButton,
            HeadNavBar
        },
        onTabItemTap() {
            // this.stop();
            uni.setTabBarStyle({
                backgroundColor: "rgba(32,32,44,0.3)",
            })
        },

        onHide() {
            // this.show();
            uni.setTabBarStyle({
                backgroundColor: "#ffffff",
            })
        },
        created() {
            // this.stop();
            uni.setTabBarStyle({
                backgroundColor: "rgba(32,32,44,0.3)",
            })
        },
        methods: {
            // 阻止页面滚动
            stop() {
                var box = function (e) {
                    passive: false;
                };
                document.body.style.overflow = 'hidden';
                document.addEventListener("touchmove", box, false);
            },
        }
    }
</script>

<style scoped>
    .canvas {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        height: 99%;
        z-index: 1;
    }

    .flex-container {
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: flex-end;
        align-items: flex-end;
        width: 800rpx;
        height: 1306rpx;
    }

    .layout-button {
        font-size: 40rpx;
        color: #ffffff;
        width: 290rpx;
        margin: 8rpx;
        height: 160rpx;
        border-radius: 36rpx;
    }
    .u-hairline-border:after {
        border: none;
    }
    .sex{
        height: 64rpx;
    }
</style>