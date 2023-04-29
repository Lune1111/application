<template>
    <view class="wrap">
        <u-navbar
                :title="all.nickName"
                :autoBack="true"
        >
        </u-navbar>
        <view>
            <u-image width="100%" height="250rpx" :src="all.bground">
            </u-image>
        </view>

        <view class="u-demo-block">
            <view class="u-demo-block__content" style="margin: 10rpx 0">
                <u-row justify="space-between" customStyle="margin-bottom: 10px">
                    <u-avatar class="userAvatar" size="130" :src="all.avatar"></u-avatar>
                    <u-col span="12">
                        <view class="demo-layout ">
                            <u-row
                                    justify="right"
                                    customStyle="margin-bottom: 10px">
                                <u-col span="2">
                                    <u-button size="mini" text="私信" shape="circle" @click="bindConfirmInvite()">
                                        私信
                                    </u-button>
                                </u-col>
                                <u-col span="2">
                                    <view class="demo-layout u-flex u-row-center "
                                          v-if="invitationUser===3||invitationUser===2">
                                        <u-button size="mini" shape="circle" type="primary"
                                                  @click="update(invitationUser)"
                                                  text="关注">关注
                                        </u-button>
                                    </view>
                                    <view class="demo-layout u-flex u-row-center " v-if="invitationUser===1">
                                        <u-button style="background:#f2f2f2;color:black;"
                                                  @click="update(invitationUser)" size="mini" shape="circle"
                                                  type="primary"
                                                  text="关注">已关注
                                        </u-button>
                                    </view>
                                    <view class="demo-layout u-flex u-row-center " v-if="invitationUser===0">
                                        <u-button style="background:#f2f2f2;color:black;"
                                                  @click="update(invitationUser)" size="mini" shape="circle"
                                                  type="primary"
                                                  text="关注">互相关注
                                        </u-button>
                                    </view>
                                </u-col>
                            </u-row>
                        </view>
                    </u-col>
                </u-row>
                <view style="padding:  20rpx 20rpx ">
                    <view class="demo-layout  b" style="font-size: 30rpx">{{all.nickName}}
                        <u-icon v-if="all.sex==1" name="man" color="blue"></u-icon>
                        <u-icon v-if="all.sex!=1" name="woman" color="pink"></u-icon>
                    </view>
                    <view class="demo-layout ">
                        <u-tag class=" u-m-r-10" size="mini" :text="all.area"></u-tag>
                        <u-tag class=" u-m-r-10" size="mini" :text="this.age+'岁'"></u-tag>
                    </view>
                    <view class ="i" >
                        <span v-text="this.intro"></span>
                        <span style="color:#2979ff;" v-if="showLong" @click.stop="textSwitch" v-text="introSwitch ? '收起':'展开'"></span>
                    </view>
                </view>

            </view>
        </view>
        <u-gap height="5" bg-color="#f5f5f5"></u-gap>

        <view class="u-demo-block"
              @click="navTo('/pages/sys/home/detail?item='+ encodeURIComponent(JSON.stringify(item.id)))"
              v-for="(item,index) in userQxInvitation" style="margin: 10rpx 0">
            <view class="u-demo-block__content" style="margin: 10rpx 0">
                <u-row justify="space-between" gutter="10">
                    <u-col span="2" class="u-p-l-15 u-p-t-15">
                        <u-avatar
                                :src="item.qxUser.avatar"
                        ></u-avatar>
                    </u-col>
                    <u-col span="9">
                        <view style="font-weight: 900">{{all.nickName}}
                            <u-icon v-if="all.sex==1" name="man" color="blue"></u-icon>
                            <u-icon v-if="all.sex!=1" name="woman" color="pink"></u-icon>
                        </view>
                        <view class="u-m-t-5 u-font-20 u-type-info" >{{all.area}}</view>
                    </u-col>
                    <u-col span="1">
                        <view class="demo-layout u-flex u-row-center">
                            <u-icon name="more-dot-fill"></u-icon>
                        </view>
                    </u-col>
                </u-row>
                <u-row
                        justify="space-between"
                        customStyle="margin-bottom: 10px"
                >
                    <u-col span="10" offset="2" class="u-m-b-20 ">
                        <view @tap.stop v-if="item.photoList.length ===1" v-for="(photo,indexPhoto) in item.photoList"  class="u-m-t-20 u-m-b-20">
                            <u-image @click="imgPreview(item.photoList,indexPhoto)" width="100%" height="350rpx" :src="photo"></u-image>
                        </view>
                        <view @tap.stop v-if="item.photoList.length ===2"  class="u-m-t-20 u-flex">
                            <u-image @click="imgPreview(item.photoList,indexPhoto)" v-for="(photo,indexPhoto) in item.photoList" width="200rpx" height="200rpx" class="u-m-r-30" :src="photo"></u-image>
                        </view>
                        <view @tap.stop v-if="item.photoList.length >=3 && item.photoList.length <=4"  class="u-flex u-flex-wrap"  >
                            <u-image @click="imgPreview(item.photoList,indexPhoto)" width="200rpx" height="200rpx" class="u-m-r-10 u-m-t-10"   v-for="(photo,indexPhoto) in item.photoList" :src="photo"></u-image>
                        </view>
                        <view @tap.stop v-if="item.photoList.length >=5"  class="u-flex u-flex-wrap"  >
                            <u-image @click="imgPreview(item.photoList,indexPhoto)" width="190rpx" height="190rpx" class="u-m-r-10 u-m-t-10"   v-for="(photo,indexPhoto) in item.photoList" :src="photo"></u-image>
                        </view>                    </u-col>
                </u-row>
                <u-row
                        justify="space-between"
                        customStyle="margin-bottom: 10px"
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
            <u-gap height="5" bg-color="#f5f5f5" style="margin: 10rpx 0"></u-gap>
        </view>
        <view class="u-demo-block" v-if="userQxInvitation.length==0">
            <u-image width="100%" height="650" :src="background" ></u-image>
        </view>
    </view>
</template>
<script>
    import UImage from "../../../uview-ui/components/u-image/u-image";
    import UIcon from "../../../uview-ui/components/u-icon/u-icon";

    export default {
        components: {UIcon, UImage},
        data() {
            return {
                all: [],
                age: '',
                userQxInvitation: [],
                relationFrom: {
                    userId: '',
                    fromId: '',
                    toId: '',
                    deleted: '',
                    type: '1',
                },
                likeList: {
                    fatherId: '',
                    type: '1',
                    deleted: '0',
                },
                invitationUser: '',
                invitationUserStasus: '',
                likesList: [],
                current: 0,
                iconSize: 38,
                background:"/static/blue.png",
                src: "/static/blue.png",
                showLong:false,
                introSwitch:false,
                intro:''
            };
        },
        onLoad(option) {
          this.getList(option.userId);
        },
        methods: {
            textSwitch(){
                if(!this.introSwitch){
                    this.intro=this.all.intro;
                }
                else{
                    this.intro=this.intro.substring(0,80)+'......';
                }
                this.introSwitch = !this.introSwitch;
            },
            getList(userId) {
                this.$u.api.qxUser.getInfo({userId: userId}).then(res => {
                    this.all = res.rows;
                    this.age = res.age.birthday;
                    this.intro=this.all.intro;
                    if(this.all.bground==null){
                      this.all.bground="/static/blue.png"
                    }
                    if(this.intro.length>80){
                        this.showLong = true;
                        this.intro=this.intro.substring(0,80)+'......';
                    }
                    this.$u.api.getInvitation({othersId:userId}).then(res => {
                        this.userQxInvitation = res.rows;
                    });
                });
                this.relationFrom.userId = userId;
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
            },
            change(index) {
                this.current = index;
            },
            navTo(url) {
                uni.navigateTo({
                    url: url
                });
            },
            // 点赞
            getLike(index) {
                this.likeList.fatherId = this.userQxInvitation[index].id;
                this.$u.api.qxLikes.add(this.likeList);
                this.userQxInvitation[index].islike = !this.userQxInvitation[index].islike;
                if (this.userQxInvitation[index].islike) {
                    this.userQxInvitation[index].praiseNumber++;
                } else {
                    this.userQxInvitation[index].praiseNumber--;
                }
            },
            bindConfirmInvite() {
                console.log(this.all.id);
                uni.navigateTo({
                    url: `/pages/TUI-Chat/chat?conversationID=C2C${this.all.phone}`
                });
            },
            //修改关系
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
    .i{
        color: #727272;
        max-height: 400rpx;
        font-size: 10rpx;
    }
    .b{
        font-weight: 600;
    }
    .demo-layout {
        height: 25px;
        border-radius: 4px;
    }
    .set{
        position: absolute;
        top: 10rpx;
        right: 10rpx;
        border-radius: 60px;
        display: flex;
    }
    .userAvatar {
        border: 10rpx solid #ffffff;
        position: absolute;
        left: 48rpx;
        top: 280rpx;
        border-radius: 60px;
        display: flex;
    }
</style>
