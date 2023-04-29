<template>
    <view class="wrap">
        <view class="body">
            <u-gap height="5" bg-color="#f5f5f5" style="margin: 10rpx 0"></u-gap>
            <view class="u-demo-block__content">
                <u-row justify="space-between" gutter="10">
                    <u-col span="2" class="u-p-l-15 u-p-t-15" @click="navTo(formList.userId)">
                        <u-avatar
                                :src="formList.qxUser.avatar"
                        ></u-avatar>
                    </u-col>
                    <u-col span="8" @click="navTo(formList.userId)">
                        <view style="font-weight: 900">{{formList.qxUser.nickName}}
                            <u-icon v-if="formList.qxUser.sex==1" name="man" color="blue"></u-icon>
                            <u-icon v-if="formList.qxUser.sex!=1" name="woman" color="pink"></u-icon>
                        </view>
                        <view class="u-m-t-5 u-font-20 u-type-info">{{formList.qxUser.area}}</view>
                    </u-col>
                    <u-col span="2">
                        <view class="demo-layout u-flex u-row-center "
                              v-if="(invitationUser===3||invitationUser===2)&&formList.userId!==vuex_user.id">
                            <u-button size="mini" shape="circle" type="primary" @click="update(invitationUser)"
                                      text="关注">关注
                            </u-button>
                        </view>
                        <view class="demo-layout u-flex u-row-center "
                              v-if="invitationUser===1&&formList.userId!==vuex_user.id">
                            <u-button style="background:#f2f2f2;color:black;" @click="update(invitationUser)"
                                      size="mini" shape="circle" type="primary"
                                      text="关注">已关注
                            </u-button>
                        </view>
                        <view class="demo-layout u-flex u-row-center "
                              v-if="invitationUser===0&&formList.userId!==vuex_user.id">
                            <u-button style="background:#f2f2f2;color:black;" @click="update(invitationUser)"
                                      size="mini" shape="circle" type="primary"
                                      text="关注">互相关注
                            </u-button>
                        </view>
                    </u-col>
                </u-row>
                <u-row justify="space-between" customStyle="margin-bottom: 10px">
                    <u-col span="12">
                        <view class=" margin-min-lr " style="min-height: 20rpx;">
                            {{formList.content}}
                        </view>
                    </u-col>

                </u-row>
                <u-row justify="space-between" customStyle="margin-bottom: 10px">
                    <u-col span="12">
                        <view v-if="formList.photoList.length ===1" v-for="(photo,index) in formList.photoList"
                              class="u-m-t-20">
                            <u-image @click="imgPreview(formList.photoList,index)" width="100%" height="350rpx"
                                     :src="photo"></u-image>
                        </view>
                        <view v-if="formList.photoList.length ===2" class="u-flex">
                            <u-image @click="imgPreview(formList.photoList,index)"
                                     v-for="(photo,index) in formList.photoList" width="200rpx" height="200rpx"
                                     class="u-m-r-30" :src="photo"></u-image>
                        </view>
                        <view v-if="formList.photoList.length >=3 && formList.photoList.length <=4"
                              class="u-flex u-flex-wrap">
                            <u-image @click="imgPreview(formList.photoList,index)" width="250rpx" height="250rpx"
                                     class="u-m-r-10 u-m-t-10" v-for="(photo,index) in formList.photoList"
                                     :src="photo"></u-image>
                        </view>
                        <view v-if="formList.photoList.length >=5" class="u-flex u-flex-wrap">
                            <u-image @click="imgPreview(formList.photoList,index)" width="230rpx" height="230rpx"
                                     class="u-m-r-10 u-m-t-10" v-for="(photo,index) in formList.photoList"
                                     :src="photo"></u-image>
                        </view>
                    </u-col>

                </u-row>
            </view>
            <u-row justify="space-between" customStyle="margin-bottom: 10px">
                <u-col span="3">
                    <view class="demo-layout u-flex u-p-l-18" style="font-size: 10px;color: #cacaca">
                        {{formList.date}}
                    </view>
                </u-col>
                <u-col span="1">
                    <view v-if="formList.userId!=vuex_user.id" class="demo-layout u-flex u-row-center"
                          @click.stop="reportS(formList.id,'1')">
                        <u-icon name="more-dot-fill"></u-icon>
                    </view>
                </u-col>
            </u-row>
            <view style="padding-left: 20rpx;margin-bottom: 20rpx" v-for="(sub,index) in formList.qxSubjectList">
                <u-button
                        class="bu"
                        shape="circle"
                        size="mini"
                        type="success"
                >#前端
                </u-button>
            </view>

            <u-gap height="5" bg-color="#f5f5f5" style="margin: 10rpx 0"></u-gap>

            <view style="margin-top:20rpx;padding-left: 20rpx;font-weight: 600;font-size: 30rpx">
                评论{{formList.commentNumber}}
            </view>
            <view class="comment" v-for="(res, index) in commentList" :key="res.id" v-if="!res.isReport && commentList.length!=0">
                <view class="left" @click="navTo(res.userId)">
                    <image :src="res.avatar" mode="aspectFill"></image>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="name" @click="navTo(res.userId)">{{ res.nickName }}</view>
                        <view class="like" :class="{ highlight: res.isLike }">
                            <view v-if="!res.deleted" class="num">{{ res.praiseNumber }}</view>
                            <u-icon v-if="!res.isLike&&!res.deleted" name="thumb-up" :size="30" color="#9a9a9a"
                                    @click="getLike(res,'2')"></u-icon>
                            <u-icon v-if="res.isLike&&!res.deleted" name="thumb-up-fill" :size="30"
                                    @click="getLike(res,'2')"></u-icon>
                        </view>
                    </view>
                    <view class="content" v-if="!res.deleted" @click="comment(res,res)"
                          @longpress="onLongPress(res.id,res.userId)">{{res.content}}
                    </view>
                    <view class="reply-box">
                        <view class="item" v-for="(item, indexComment) in res.qxCommentList" :key="item.index"
                              v-if="!item.isReport"
                              @longpress="onLongPress(item.id,item.userId)">
                            <view class="username top ">
                                <view class="left" @click="navTo(item.userId)">
                                    <image :src="item.avatar" mode="aspectFill"
                                           style="width: 50rpx;height: 50rpx;"></image>
                                </view>
                                <view class="name u-flex-1" @click="navTo(item.userId)"
                                      style="color: #000000 !important;font-weight: 400">
                                    {{ item.nickName }}
                                </view>
                                <view class="like">
                                    <view v-if="!item.deleted" class="num">{{ item.praiseNumber }}</view>
                                    <u-icon v-if="!item.isLike&&!item.deleted" name="thumb-up" :size="30"
                                            color="#9a9a9a"
                                            @click="getLike(item,'2')"></u-icon>
                                    <u-icon v-if="item.isLike&&!item.deleted" name="thumb-up-fill" :size="30"
                                            @click="getLike(item,'2')"></u-icon>
                                </view>
                            </view>
                            <view class="text" v-if="!item.deleted" @click="comment(item,res)">{{'回复 '+
                                item.replyName+':'+item.content}}
                            </view>
                            <view class="bottom">
                                {{ item.date }}
                                <view class="reply">回复</view>
                            </view>
                            <u-col span="1">
                                <view v-if="item.userId!=vuex_user.id" class="demo-layout u-flex u-row-center"
                                      @click.stop="reportS(item.id,'2')">
                                    <u-icon name="more-dot-fill"></u-icon>
                                </view>
                            </u-col>
                        </view>
                        <view class="all-reply" @tap="toAllReply" v-if="res.qxCommentList.length>2">
                            共{{ res.qxCommentList.length }}条回复
                            <u-icon class="more" name="arrow-right" :size="26"></u-icon>
                        </view>
                    </view>
                    <view class="bottom">
                        {{ res.date }}
                        <view class="reply">回复</view>
                        <view v-if="res.userId!=vuex_user.id" style="margin-left: auto;"
                              @click.stop="reportS(res.id,'2')">
                            <u-icon name="more-dot-fill"></u-icon>
                        </view>
                    </view>

                </view>
            </view>
            <view v-if="commentList.length===0" class="reportNull">
                这里空空的，发布你的评论吧
                <u-icon name="chat"></u-icon>
            </view>
        </view>
        <view>
            <view class="send">
                <u-input
                        class="u-m-10"
                        :placeholder="placeholder"
                        border="surround"
                        shape="circle"
                        style=" border-radius: 50rpx; background:#f6f6f6; width: 520rpx"
                        v-model="commentFrom.content"
                        @blur="lostFocus()"
                ></u-input>
                <u-button
                        :style="commentFrom.content?('background-color: #2979ff;color: rgb(255,252,243)'):('background-color: rgba(41,121,255,0.35);color: rgba(255,252,243,0.35)')"
                        @click="commentFrom.content?getComment():null" shape="circle"
                        size="mini">发送
                </u-button>
                <u-icon v-if="!formList.islike"
                        name="thumb-up"
                        :size="30" color="#9a9a9a"
                        @click="getLike(commentList[0],'1')">
                </u-icon>
                <u-icon v-if="formList.islike"
                        name="thumb-up-fill"
                        :size="30"
                        @click="getLike(commentList[0],'1')">

                </u-icon>
                {{formList.praiseNumber }}
            </view>
            <u-popup
                    mode="bottom"
                    v-model="reportShow"
                    length="18%"
            >
                <view class="report">
                    <view class="bor-b" @click="report()">
                        <u-icon color="#2979ff" name="warning" size="35"
                                class="u-p-r-20"></u-icon>
                        举报
                    </view>
                    <view class="bor-b">
                        <u-icon color="#2979ff" name="close-circle" size="35" class="u-p-r-20">
                        </u-icon>
                        加入黑名单
                    </view>
                    <view class="u-text-center " style="line-height:70rpx;"
                          @click="reportShow = false">
                        关闭
                    </view>
                </view>

            </u-popup>
        </view>
    </view>
</template>

<script>
    import HeadNavBar from '@/components/headnavbar/index';
    import UIcon from "../../../uview-ui/components/u-icon/u-icon";

    /**
     * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
     */
    export default {
        components: {
            UIcon,
            HeadNavBar
        },
        data() {
            return {
                commentList: [],
                invitationList: [],
                list: [{
                    name: '推荐'
                }],
                commentFrom: {
                    invitationId: '',
                    fatherId: '',
                    type: '1',
                    deleted: '0',
                    replyUserId: '',
                    parentId: '',
                    content: '',
                },
                relationFrom: {
                    userId: '',
                    fromId: '',
                    toId: '',
                    deleted: '',
                    type: '1',
                },
                reportList: {
                    type: '',
                    fatherId: '',
                },
                reportShow: false,
                option: '',
                invitationUser: '',
                invitationUserStasus: '',
                formList: {},
                placeholder: '用评论温暖ta的❤~',
                show: false,
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
                todoCount: 3
            };
        },
        onShow() {
            this.getList(this.option);
        },
        onLoad(option) {
            this.option = option;
            this.getList(option);
        },
        methods: {
            getList(option) {
                const item = JSON.parse(decodeURIComponent(option.item));
                this.$u.api.getInvitation({id: item}).then(res => {
                    this.formList = res.rows[0];
                    this.commentFrom.invitationId = this.formList.id;
                    this.commentFrom.replyUserId = this.formList.userId;
                    this.$u.api.qxComment.list(this.commentFrom).then(res => {
                        this.commentList = res.rows;
                    });
                    this.relationFrom.userId = this.formList.userId;
                    this.$u.api.qxRelation.invitationUser(this.relationFrom).then(res => {
                        this.invitationUser = res.data.invitationRelation;
                        if (this.invitationUser == 0 || this.invitationUser == 1) {
                            this.invitationUserStasus = 3;
                        }
                        if (this.invitationUser == 2) {
                            this.invitationUserStasus = 0;
                        }
                        if (this.invitationUser == 3) {
                            this.invitationUserStasus = 1;
                        }
                    });
                });
            },
            update(invitationUser) {
                if (invitationUser == 0 || invitationUser == 1) {
                    this.invitationUser = this.invitationUserStasus;
                    this.relationFrom.deleted = '1';
                    this.invitationUserStasus = invitationUser;
                }
                if (invitationUser == 2) {
                    this.invitationUser = this.invitationUserStasus;
                    this.relationFrom.deleted = '0';
                    this.invitationUserStasus = invitationUser;
                }
                if (invitationUser == 3) {
                    this.invitationUser = this.invitationUserStasus;
                    this.relationFrom.deleted = '0';
                    this.invitationUserStasus = invitationUser;
                }
                this.relationFrom.toId = this.relationFrom.userId;
                this.$u.api.qxRelation.invitationAdd(this.relationFrom);
            },
            change(index) {
                this.current = index;
            },

            navTo(userId) {
                if (userId == this.vuex_user.id) {
                    uni.switchTab({url: '/pages/sys/user/index'})
                } else {
                    uni.navigateTo({
                        url: '/pages/sys/user/otherUser?userId=' + userId
                    });
                }
            },
            // 跳转到全部回复
            toAllReply() {
                uni.navigateTo({
                    url: '/pages/template/comment/reply'
                });
            },
            // 点赞
            getLike(index, type) {
                this.commentFrom.type = type;
                this.commentFrom.fatherId = index.id;
                if (type == '1') {
                    if (this.formList.islike) {
                        this.formList.praiseNumber -= 1;
                    } else {
                        this.formList.praiseNumber += 1;
                    }
                    this.formList.islike = !this.formList.islike;
                    this.commentFrom.fatherId = index.invitationId;
                } else {
                    index.isLike = !index.isLike;
                    if (index.isLike) {
                        index.praiseNumber++;
                    } else {
                        index.praiseNumber--;
                    }
                }
                this.$u.api.qxLikes.add(this.commentFrom);
            },
            comment(item, res) {
                if (this.commentFrom.content === '') {
                    this.commentFrom.replyUserId = item.userId;
                    this.commentFrom.parentId = res.id;
                    this.placeholder = '回复: ' + item.nickName;
                }
            },
            getComment() {
                this.$u.api.qxComment.add(this.commentFrom).then(res => {
                    if (res.code == '200') {
                        uni.showToast({
                            title: '评论成功',
                            icon: 'none',
                            duration: 1500
                        }) ,
                            this.commentFrom.content = '',
                            this.getList(this.option);
                    }
                    else {
                        uni.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 1500
                        })
                    }

                });
            },
            lostFocus() {
                if (this.commentFrom.content == '') {
                    this.commentFrom.parentId = '';
                    this.placeholder = '用评论温暖ta的❤~';
                }
            },
            //删除评论
            onLongPress(id, userId) {
                if (this.vuex_user.id === userId) {
                    const oneThis = this;
                    uni.showModal({    // 弹框询问是否进行下一步事件
                        title: '提示',
                        content: '删除评论后将不可恢复，是否继续？',
                        success: function (res) {
                            if (res.confirm) {
                                oneThis.$u.api.qxComment.delete({id: id});
                                uni.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 1500
                                });
                                oneThis.getList(oneThis.option);
                            } else if (res.cancel) {
                                return
                            }
                        }
                    });
                }
            },
            //弹出层
            reportS(id, type) {
                this.reportList.type = type;
                this.reportList.fatherId = id;
                this.reportShow = true;
            },
            //举报
            report() {
                this.reportShow = false;
                const oneThis = this;
                uni.showModal({    // 弹框询问是否进行下一步事件
                    title: '提示',
                    content: '是否举报该内容有违规行为',
                    success: function (res) {
                        if (oneThis.reportList.type == '1') {
                            if (res.confirm) {
                                oneThis.$u.api.qxReport.add(oneThis.reportList).then(res => {
                                    uni.showLoading({
                                        title: '已为您隐藏该内容，举报受理中',
                                        duration: 1500,
                                        complete: function () {
                                            setTimeout(function () {
                                                uni.hideLoading();
                                                uni.switchTab({
                                                    url: '/pages/sys/home/index',
                                                })
                                            }, 1000);
                                        }
                                    });
                                });
                            } else if (res.cancel) {
                                return
                            }
                        }
                        else {
                            if (res.confirm) {
                                oneThis.$u.api.qxReport.add(oneThis.reportList).then(res => {
                                    uni.showToast({
                                        title: '已为您隐藏该内容，举报受理中',
                                        duration: 1500
                                    });
                                    oneThis.getList(oneThis.option)
                                });
                            } else if (res.cancel) {
                                return
                            }
                        }
                    }

                });
            },
            // 点击查看图片
            imgPreview(url, index) {
                uni.previewImage({
                    current: index,
                    indicator: "number",
                    urls: url
                })
            },
        }
    };
</script>
<style lang="scss">
    @import 'index.scss';
    .wrap{
        width: 100vw;
        height: 94vh;
        display: flex;
        position: fixed;
        flex-direction: column;
    }
    .body{
        flex: 1;
        width: 100vw;
        overflow-y: scroll;
    }
    .demo-layout {
        height: 80rpx;
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


    .margin-min-lr{
        margin: 0 15rpx ;

    }

    .bu{
        color: #5d5d5d;
        font-weight: 600;
        border-color: #ebebeb !important;
        background-color: #ebebeb;
    }
    .comment {
        display: flex;
        padding: 30rpx;
        .left {
            image {
                width: 64rpx;
                height: 64rpx;
                border-radius: 50%;
                background-color: #f2f2f2;
            }
        }
        .right {
            flex: 1;
            padding-left: 20rpx;
            font-size: 30rpx;
            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10rpx;
                .name {
                    font-weight: 900;
                    color: #000000;
                }
                .like {
                    display: flex;
                    align-items: center;
                    color: #9a9a9a;
                    font-size: 26rpx;
                    .num {
                        margin-right: 4rpx;
                        color: #9a9a9a;
                    }
                }
                .highlight {
                    color: #5677fc;
                    .num {
                        color: #5677fc;
                    }
                }
            }
            .content {
                margin-bottom: 10rpx;
            }
            .reply-box {
                background-color: rgb(242, 242, 242);
                border-radius: 12rpx;
                .item {
                    padding: 20rpx;
                    border-bottom: solid 2rpx $u-border-color;
                    .username {
                        font-size: 24rpx;
                        color: #999999;
                    }
                }
                .all-reply {
                    padding: 20rpx;
                    display: flex;
                    color: #5677fc;
                    align-items: center;
                    .more {
                        margin-left: 6rpx;
                    }
                }
            }
            .bottom {
                margin-top: 20rpx;
                display: flex;
                font-size: 24rpx;
                color: #9a9a9a;
                .reply {
                    color: #5677fc;
                    margin-left: 10rpx;
                }
            }
        }
    }
    .send{
        display: flex;
        padding: 10rpx;
        border-top: 1rpx solid #c4c4c4;
        width: 100vw;
        align-items: center;
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
</style>


