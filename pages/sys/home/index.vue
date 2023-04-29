<template>
    <view class="wrap">
        <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
        <!--<u-tabs :is-scroll="false" :current="current" @change="change"></u-tabs>-->
        <view class="u-demo-block" v-for="(item,index) in (current=='0'?userList:localList)" v-if="!item.isReport"
              :key="index">
            <u-gap height="5" bg-color="#f5f5f5" style="margin: 10rpx 0"></u-gap>
            <view class="u-demo-block__content">
                <u-row justify="space-between" gutter="10" @click="navToTwo(item.userId)">
                    <u-col span="2" class="u-p-l-15 u-p-t-15">
                        <u-avatar
                                :src="item.qxUser.avatar"
                        ></u-avatar>
                    </u-col>

                    <u-col span="9">
                        <view style="font-weight: 900">
                            {{item.qxUser.nickName}}
                            <u-icon v-if="item.qxUser.sex==1" name="man" color="blue"></u-icon>
                            <u-icon v-if="item.qxUser.sex!=1" name="woman" color="pink"></u-icon>
                        </view>
                        <view class="u-m-t-5 u-font-20 u-type-info">{{item.qxUser.area}}</view>
                    </u-col>
                    <u-col span="1">
                        <view v-if="item.userId!=vuex_user.id" class="demo-layout u-flex u-row-center" @click.stop="reportS(item.id)">
                            <u-icon name="more-dot-fill"></u-icon>
                        </view>
                    </u-col>
                </u-row>
                <view @click="navTo('/pages/sys/home/detail?item='+ encodeURIComponent(JSON.stringify(item.id)))">
                    <u-row
                            justify="space-between"
                            customStyle="margin-bottom: 10px"
                    >
                        <u-col span="10" offset="2" class="u-m-b-20 ">
                            <view v-if="item.content !=''" class="demo-layout " style="min-height: 20rpx;">
                                {{item.content}}
                            </view>
<!--                            style="min-height: 0rpx;max-height: 600rpx;min-width: 0rpx;max-width: 600rpx"-->
                            <view style="min-height: 0rpx;min-width: 0rpx;"   @tap.stop v-if="item.photoList.length ===1" class="u-m-t-20 u-m-b-20">
                                <u-image mode="aspectFit" @click="imgPreview(item.photoList,0)" style="height: 600rpx;" :src="item.photoList[0]" ></u-image>
                            </view>

                            <view @tap.stop v-if="item.photoList.length ===2"  class="u-m-t-20 u-flex">

                                <u-image @click="imgPreview(item.photoList,indexPhoto)" v-for="(photo,indexPhoto) in item.photoList" width="200rpx" height="200rpx" class="u-m-r-30" :src="photo"></u-image>
                            </view>
                            <view @tap.stop v-if="item.photoList.length >=3 && item.photoList.length <=4"  class="u-flex u-flex-wrap"  >
                                {{getElInfo()}}
                                <u-image @click="imgPreview(item.photoList,indexPhoto)" width="200rpx" height="200rpx" class="u-m-r-10 u-m-t-10"   v-for="(photo,indexPhoto) in item.photoList" :src="photo"></u-image>
                            </view>
                            <view @tap.stop v-if="item.photoList.length >=5"  class="u-flex u-flex-wrap"  >
                                <u-image @click="imgPreview(item.photoList,indexPhoto)" width="190rpx" height="190rpx" class="u-m-r-10 u-m-t-10"   v-for="(photo,indexPhoto) in item.photoList" :src="photo"></u-image>
                            </view>
                        </u-col>
                    </u-row>
                    <u-row
                            justify="space-between"
                            customStyle="margin-bottom: 10px"
                            class="u-m-b-20"
                    >
                        <u-col span="3" offset="2">
                            <view class="demo-layout u-flex u-row-center">
                                <u-icon name="share" label="分享"></u-icon>
                            </view>
                        </u-col>
                        <u-col span="3">
                            <view class="demo-layout u-flex u-row-center">
                                <u-icon name="chat" value=""></u-icon>
                                {{item.commentNumber}}
                            </view>
                        </u-col>
                        <u-col span="3">
                            <view @click.stop="getLike(index)" :class="{ highlight: item.deleted }">
                                <u-icon v-if="!item.islike" name="thumb-up" :size="30" color="#9a9a9a"></u-icon>
                                <u-icon v-if="item.islike" name="thumb-up-fill" :size="30"></u-icon>
                                {{ item.praiseNumber }}
                            </view>
                        </u-col>
                    </u-row>
                </view>
            </view>
            <u-gap height="5" bg-color="#f5f5f5" style="margin: 10rpx 0"></u-gap>
        </view>
        <view class="floatbtn" @click="navTo('/pages/sys/home/add-form')">
            <u-icon name="edit-pen" size="50"></u-icon>
        </view>
        <u-popup
                mode="bottom"
                v-model="reportShow"
                length="18%"
                :mask="true"
        >
            <view class="report">
                <view class="bor-b" @click="report()">
                    <u-icon color="#2979ff" name="warning" size="35" class="u-p-r-20"></u-icon>
                    举报
                </view>
                <view class="bor-b">
                    <u-icon color="#2979ff" name="close-circle" size="35" class="u-p-r-20">
                    </u-icon>加入黑名单
                </view>
                <view class="u-text-center " style="line-height:70rpx;" @click="reportShow = false">
                    关闭
                </view>
            </view>
        </u-popup>
    </view>
</template>
<script>
    import HeadNavBar from '@/components/headnavbar/index';

    /**
     * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
     */
    export default {
        components: {
            HeadNavBar
        },
        data() {
            return {
                imgHeight:10,
                list: [{
                    name: '推荐',
                },{
                    name: '同城'
                },],
                localList:[],
                userList: [{}],
                likeList: {
                    fatherId: '',
                    type: '1',
                    deleted: '0',
                },
                reportList: {
                    type: '1',
                    fatherId: '',
                },
                listNew: [],
                current: 0,
                status: 'loadmore',
                iconType: 'circle',
                isDot: false,
                loadText: {
                    loadmore: '点击加载更多',
                    loading: '正在加载...',
                    nomore: '没有更多了'
                },
                head: '/static/aidex/images/head.png',
                src: '/static/aidex/banner/banner01.png',
                todoCount: 3,
                reportShow: false,
                now:0,
            };
        },
        onLoad() {

        },
        onShow() {
            this.$u.api.getInvitation({}).then(res => {
                this.userList = res.rows;
            });
            this.$u.api.getInvitation({area:1}).then(res => {
                this.localList = res.rows;
            });
        },
        onTabItemTap() {
            this.$u.api.getInvitation({}).then(res => {
                this.userList = res.rows;
            });
            this.$u.api.getInvitation({area:1}).then(res => {
                this.localList = res.rows;
            });
        },
        created() {
            this.$u.api.getInvitation({}).then(res => {
                this.userList = res.rows;
            });
            this.$u.api.getInvitation({area:1}).then(res => {
                this.localList = res.rows;
            });
            console.log(this.localList);
        },
        methods: {
            reportS(id) {
                this.reportList.fatherId = id;
                this.reportShow = true;
            },
            change(index) {
                this.current = index;
            },

            navToTwo(userId) {
                if (userId == this.vuex_user.id) {
                    uni.switchTab({url: '/pages/sys/user/index'})
                }
                else {
                    uni.navigateTo({
                        url: '/pages/sys/user/otherUser?userId=' + userId
                    });
                }
            },
            navTo(url) {
                uni.navigateTo({
                    url: url,
                });
            },
            // 点赞
            getLike(index) {
                this.likeList.fatherId = this.userList[index].id;
                this.$u.api.qxLikes.add(this.likeList);
                this.userList[index].islike = !this.userList[index].islike;
                if (this.userList[index].islike) {
                    this.userList[index].praiseNumber++;
                } else {
                    this.userList[index].praiseNumber--;
                }
            },
            //举报
            report() {
                this.reportShow = false;
                const oneThis = this;
                uni.showModal({    // 弹框询问是否进行下一步事件
                    title: '提示',
                    content: '是否举报该内容有违规行为',
                    success: function (res) {
                        if (res.confirm) {
                            oneThis.$u.api.qxReport.add(oneThis.reportList).then(res => {
                                oneThis.$u.api.getInvitation({}).then(res => {
                                    oneThis.userList = res.rows;
                                    uni.showToast({
                                        title: '已为您隐藏该内容，举报受理中',
                                        duration: 1500
                                    });

                                });
                            });
                        } else if (res.cancel) {
                            return
                        }
                    }
                });
            },
            // 点击查看图片
            imgPreview(url,index){
                uni.previewImage({
                    current: index,
                    indicator:"number",
                    urls: url
                })
            },
        }
    };
</script>
<style lang="scss">
    @import 'index.scss';

    .demo-layout {
        height: 80 rpx;
        border-radius: 4px;
    }

    .banner-box {
        padding: 0 2%;
        width: 96%;
        height: 170 rpx;
        margin: 30 rpx 0 30 rpx;
    }

    .u-swiper-wrap {
        padding: 0 10px;
    }

    .banner-pic {
        width: 47%;
        float: left;
        display: inline-block;
        margin: 0 1.5%;
    }

    .banner-pic image {
        width: 100%;
        height: 170 rpx;
        border-radius: 12 rpx;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    .u-mode-light-info {
        background-color: #ffffff;
        color: #666666;
        border: 1px solid #e9ecf6;
        font-size: 12px;
        padding: 2px 8px;
        position: relative;
        top: -3px;
    }

    .floatbtn {
        background-color: #007AFF;
        color: #fff;
        width: 100rpx;
        height: 100rpx;
        position: fixed;
        right: 15rpx;
        bottom: 110rpx;
        border-radius: 120rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 15rpx;
    }
    .report{
        display: flex;
        font-size: 30rpx;
        flex-direction: column;
        padding: 0 20rpx;

        view{
            height: 80rpx;
        }
        .bor-b{
            padding-left: 20rpx ;
            border-bottom: 1rpx solid #dcdcdc;
        }
    }
    uni-image>div{
        background-position: left!important;
    }
</style>
