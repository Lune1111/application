<template>
    <view class="wrap">
        <!--<view @click="navTo('/pages/sys/user/index')" >-->
        <!--<u-icon name="arrow-left" class="arrow-l"></u-icon>-->
        <!--</view>-->
        <u-sticky>
            <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
        </u-sticky>
        <u-sticky offset-top="80">
            <view class="search">
                <u-search v-model="relationFrom.nickName" @custom="search" @search="search"></u-search>
            </view>
        </u-sticky>
        <view class="personal-listitem">
            <view class="user-name">
                    <span style="padding-left: 25rpx;padding-top: 10rpx;padding-bottom: 15rpx;font-size: 25rpx;color: #8e8e8e">
                       {{current=='0'? '我的关注&nbsp('+typeOneNumber: '我的粉丝&nbsp('+typeTwoNumber}}人)</span>
            </view>
            <view class="list-cell" v-for="(item, index) in (current=='0'?typeOneList:typeTwoList)" :key="index"
                  @click="navTo(current=='0'?item.toId:item.fromId)">
                <view style="padding-left: 25rpx">
                    <u-avatar :src="item.qxUser.avatar"></u-avatar>
                </view>
                <view class="user-name">
                    <span>{{item.qxUser.nickName}}
                        <u-icon v-if="item.qxUser.sex==1" name="man" color="blue"></u-icon>
                        <u-icon v-if="item.qxUser.sex!=1" name="woman" color="pink"></u-icon>
                    </span>
                    <span class="user-other">{{item.qxUser.area}}</span>
                </view>
                <view>
                    <u-button @click="update(item)" v-if="current==0&&item.deleted==0" type="error"
                              size="mini"
                              style="background:#f2f2f2;margin-right: 10rpx;color:black">{{!item.relation?'已关注':'互相关注'}}
                    </u-button>
                    <u-button @click="update(item)" v-if="current==1&&item.relation&&item.deleted==0" type="error"
                              size="mini"
                              style="background:#f2f2f2;margin-right: 10rpx;color:black">{{'互相关注'}}
                    </u-button>
                    <u-button @click="update(item)" v-if="current==1&&!item.relation" type="error"
                              size="mini"
                              style="background:#fb2b55;margin-right: 10rpx;color:black">{{'回关'}}
                    </u-button>
                    <u-button @click="update(item)" v-if="current==0&&item.deleted==1" type="error"
                              size="mini"
                              style="background:#fb2b55;margin-right: 10rpx;color:black">{{'关注'}}
                    </u-button>
                </view>
            </view>
        </view>
        <u-divider>已经到底了</u-divider>
    </view>

</template>

<script>
    import UIcon from "../../../uview-ui/components/u-icon/u-icon";
    import UDivider from "../../../uview-ui/components/u-divider/u-divider";
    import URow from "../../../uview-ui/components/u-row/u-row";
    import UCol from "../../../uview-ui/components/u-col/u-col";

    export default {
        components: {UCol, URow, UDivider, UIcon},
        data() {
            return {
                list: [{
                    name: '关注',
                },
                    {
                        name: '粉丝'
                    }],
                relationFrom: {
                    type: "",
                    nickName: null,
                },
                show: false,
                current: 0,
                typeOneNumber: 0,
                typeTwoNumber: 0,
                typeOneList: [],
                typeTwoList: [],
                imageList: ['user01', 'user02', 'user03', 'user04', 'user05', 'user06'],
            }
        },
        onLoad(option) {
            this.getList();
            this.getListTwo();
            this.change(option.current);
        },

        methods: {
            getList() {
                this.relationFrom.type = "1";
                this.$u.api.qxRelation.list(this.relationFrom, this.relationFrom.nickName).then(res => {
                    this.typeOneList = res.data.typeOne;
                    this.typeOneNumber = this.typeOneList.length;
                });
            },
            getListTwo() {
                this.relationFrom.type = "1";
                this.$u.api.qxRelation.listTwo(this.relationFrom, this.relationFrom.nickName).then(res => {
                    this.typeTwoList = res.data.typeTwo;
                    this.typeTwoNumber = this.typeTwoList.length;
                });
            },
            change(index) {
                this.relationFrom.nickName = '';
                this.current = index;
            },
            navTo(userId) {
                if (userId == this.vuex_user.id) {
                    uni.switchTab({url: '/pages/sys/user/index'})
                }
                else {
                    uni.navigateTo({
                        url: '/pages/sys/user/otherUser?userId=' + userId
                    });
                }
            },
            //搜索框
            search() {
                if (this.current == 0)
                    this.getList();
                else
                    this.getListTwo();
            },
            //修改关系
            update(row) {
                if (this.current == 0 && row.deleted == 0) {
                    row.deleted = 1;
                    this.typeOneNumber -= 1;
                }
                else if (this.current == 0 && row.deleted == 1) {
                    row.deleted = 0;
                    this.typeOneNumber += 1;
                }
                else if (this.current == 1 && !row.relation) {
                    row.relation = 1;
                    row.deleted = 0;
                    this.typeOneNumber += 1;
                }
                else if (this.current == 1 && row.relation) {
                    row.relation = null;
                    row.deleted = 1;
                    this.typeOneNumber -= 1;
                }
                row.current = this.current;
                this.$u.api.qxRelation.update(row).then(res => {
                    if (row.current == 0)
                        this.getListTwo();
                    else
                        this.getList();
                });

            }
        }
    };
</script>
<style lang="scss">
    @import 'index.scss';

    .arrow-l {
        border: 10 rpx solid #ffffff;
        position: absolute;
        left: 30 rpx;
        top: 26 rpx;
        z-index: 99999;
        border-radius: 60px;
        display: flex;
    }

    .wrap .search {
        background: #ffffff;
    }

    .list-cell {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 8px 24 rpx;
        overflow: hidden;
        color: #323233;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;
        align-items: center;
        border-bottom: 1px solid #ececec !important;
    }

    .personal-listitem .list-cell:last-of-type {
        border-bottom: 0 !important;
    }

    .user-images {
        width: 80 rpx;
        height: 80 rpx;
        margin-right: 10px;
    }

    .user-name {
        font-size: 32 rpx;
        color: #000000;
        flex: 1;

        span {
            display: block;
        }

        .user-other {
            font-size: 26 rpx;
            color: #999999;
            font-weight: normal;
        }
    }
</style>