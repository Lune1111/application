<template>
    <view class="wrap">
        <view>
            <u-icon name="setting" size="40" color="#ffffff" class="set"
                    @click="navTo('/pages/sys/user/setting')"></u-icon>
            <u-image width="100%" height="250rpx" :src="all.bground ? all.bground:src" @click="replaceBg()" >
            </u-image>
            <view>
                <u-upload style="display: none" ref="uUpload" name="files"  :action="uploadUrl" :auto-upload="false"
                          :show-tips="false" ></u-upload>
            </view>
            <u-popup
                    mode="bottom"
                    v-model="replaceShow"
                    length="15%"
            >
                <view class="report" style="">
                    <view class="bor-b"  @click="chooseImg()"  >
                        <u-icon color="#2979ff" name="trash" size="35" class="u-p-r-20">
                        </u-icon>更改背景图
                    </view>
                    <view class="u-text-center " style="line-height:70rpx;" @click="replaceShow = false">
                        关闭
                    </view>

                </view>
            </u-popup>
        </view>

        <view class="u-demo-block" @click="navTo('info')">
            <view class="u-demo-block__content" style="margin: 10rpx 0">
                <u-row justify="space-between" customStyle="margin-bottom: 10px">
                    <u-avatar class="userAvatar" size="130" :src="all.avatar"></u-avatar>
                    <u-col span="12" offset="2">
                        <view class="demo-layout ">
                            <u-row justify="center"
                                   customStyle="margin-bottom: 10px">
                                <u-col span="4" class=" u-text-center b">
                                    <view class=" u-text-center b "
                                          @click.stop="navTo('/pages/sys/user/follow_fan?current=0')">
                                        {{this.typeOneList.length}}
                                    </view>
                                    <view class="u-text-center u-font-20" style="font-weight:200">关注</view>
                                </u-col>
                                <u-col span="4" class=" u-text-center b">
                                    <view class="u-text-center b"
                                          @click.stop="navTo('/pages/sys/user/follow_fan?current=1')">
                                        {{this.typeTwoList.length}}
                                    </view>
                                    <view class="u-text-center u-font-20" style="font-weight:200">粉丝</view>
                                </u-col>
                            </u-row>
                        </view>
                    </u-col>
                </u-row>
                <view style="padding:  20rpx 20rpx ">
                    <view class="demo-layout  b" style="font-size: 30rpx">{{this.all.nickName}}
                        <u-icon v-if="this.all.sex==1" name="man" color="blue"></u-icon>
                        <u-icon v-if="this.all.sex!=1" name="woman" color="pink"></u-icon>
                    </view>
                    <view class="demo-layout ">
                        <u-tag class=" u-m-r-10" size="mini" :text="this.all.area"></u-tag>
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

        <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
        <view class="u-demo-block"
              @click="navTo('/pages/sys/home/detail?item='+
              encodeURIComponent(JSON.stringify(item.id)))"
              v-for="(item,index) in (current=='0'?userQxInvitation:likesList)" style="margin: 10rpx 0">
            <view class="u-demo-block__content" style="margin: 10rpx 0">
                <u-row justify="space-between" gutter="10">
                    <u-col span="2" class="u-p-l-15 u-p-t-15">
                        <u-avatar
                                :src="item.qxUser.avatar"
                        ></u-avatar>
                    </u-col>
                    <u-col span="9">
                        <view style="font-weight: 900">{{item.qxUser.nickName}}
                            <u-icon v-if="item.qxUser.sex==1" name="man" color="blue"></u-icon>
                            <u-icon v-if="item.qxUser.sex!=1" name="woman" color="pink"></u-icon>
                        </view>
                        <view class="u-m-t-5 u-font-20 u-type-info" >{{item.qxUser.area}}</view>
                    </u-col>
                    <u-col span="1">
                        <view class="demo-layout u-flex u-row-center" @click.stop="reportS">
                            <u-icon name="more-dot-fill" @click="moreId = item.id" ></u-icon>
                        </view>
                    </u-col>
                </u-row>
                <u-row
                        justify="space-between"
                        customStyle="margin-bottom: 10px"
                >
                    <u-col span="10" offset="2" class="u-m-b-20 ">
                        <view v-if="item.content !=''" class="demo-layout " style="min-height: 20rpx;">
                            {{item.content}}
                        </view>
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
                        </view>
                    </u-col>
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
        <view class="reportNull"  style="flex-direction: column;" v-if="current=='0' && userQxInvitation.length==0">
            <view>
                <u-image :fade="false"
                         :show-loading="false"
                         :lazy-load="false"
                         mode="aspectFit"
                         :src="background"
                         height="300"
                         width="480">
                </u-image>
            </view>
            <view>
                发布你的第一条帖子吧~~
            </view>
        </view>
        <view class="reportNull"  style="flex-direction: column;" v-if="current!='0' && likesList.length==0">
            <view>
                <u-image :fade="false"
                         :show-loading="false"
                         :lazy-load="false"
                         mode="aspectFit"
                         :src="background"
                         height="300"
                         width="480">
                </u-image>
            </view>
            <view>
                快去点赞吧~~
            </view>
        </view>
      <u-toast ref="uToast"/>
        <u-popup
                mode="bottom"
                v-model="reportShow"
                :length="current=='0'? '14%':'20%'"
        >
            <view class="report">
                <view class="bor-b"  @click="isDeleted()" v-if="current=='0'?true:false" >
                    <u-icon color="#2979ff" name="trash" size="35" class="u-p-r-20">
                    </u-icon>删除
                </view>
                <view class="bor-b" v-if="current=='0'?false:true">
                    <u-icon color="#2979ff" name="warning" size="35" class="u-p-r-20"></u-icon>
                    举报
                </view>
                <view class="bor-b" v-if="current=='0'?false:true">
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
    import UImage from "../../../uview-ui/components/u-image/u-image";
    import UIcon from "../../../uview-ui/components/u-icon/u-icon";

    export default {
        components: {UIcon, UImage},
        data() {
            return {
                base64:null,
                uUpload:null,
                uploadUrl: `http://127.0.0.1:8082/app/invitation/uploadPhoto`,
                all: [{avatar:''}],
                age: '',
                userQxInvitation: [],
                list: [{
                    name: '我的帖子'
                }, {
                    name: '我的点赞',
                }],
                relationFrom: {
                    type: "",
                },
                likeList: {
                    fatherId: '',
                    type: '1',
                    deleted: '0',
                },
                likesList: [],
                typeOneList: [],
                typeTwoList: [],
                current: 0,
                iconSize: 38,
                src: "/static/blue.png",
                background:"/static/aidex/banner/in_null.jpg",
                showLong:false,
                introSwitch:false,
                intro:'',
                reportShow: false,
                replaceShow:false,
                imgNum:0,
                moreId:null
            };
        },
        onShow() {
            this.getList();
        },
        onTabItemTap() {
            this.getList();
        },
        created() {
            this.getList()
        },
        methods: {
            isDeleted(){
                this.$u.api.Invitation.delete({id:this.moreId}).then(res => {
                  if(res.code==200){
                    this.reportShow = false;
                    this.$refs.uToast.show({
                      title: '删除成功',
                      type: 'success',
                      duration: 5000,
                      position:"center"
                    })
                    this.getList();
                  }else {
                    this.$refs.uToast.show({
                      title: '删除失败',
                      type: 'error',
                      duration: 5000,
                      position:"bottom"
                    })
                  }
                })
            },
            replaceBg(){
                this.replaceShow=true
            },
            reportS(){
                this.reportShow=true;
            },
            textSwitch(){
                if(!this.introSwitch){
                    this.intro=this.all.intro;
                }
                else{
                    this.intro=this.intro.substring(0,80)+'......';
                }
                this.introSwitch = !this.introSwitch;
            },
            chooseImg() {
                uni.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['camera', 'album'],
                    success: res => {
                        const { tempFilePaths, tempFiles } = res;
                        //获取图片的数据插入到upload中

                        if (this.imgNum === 2) {
                            uni.showToast({
                                title: '超过最大数量',
                                duration: 2000,
                                icon: 'error'
                            });
                        } else {
                            //循环插入到upload的list中
                            tempFilePaths.forEach((item, index) => {
                                this.$refs.uUpload.lists.push({
                                    error: false,
                                    file: tempFiles[index],
                                    progress: 0,
                                    url: item
                                });
                            });
                            this.replaceShow = false
                            let that=this;
                                    uni.showModal({    // 弹框询问是否进行下一步事件
                                        title: '提示',
                                        content: '是否更改背景图片',
                                        success: function (res) {
                                            if (res.confirm) {
                                                that.ti();
                                            } else if (res.cancel) {
                                                that.$refs.uUpload.lists=[];
                                            }
                                        }.bind(this),
                                    })
                                }
                        }
                });
            },
            ti(){
                let files = [];
                files = this.$refs.uUpload.lists;
                if(files!=null){
                    files.forEach((item, index) =>
                    {
                        var img = new Image();
                        img.src = files[index].url;
                        //创建canvas画布
                        var canvas = document.createElement("canvas");
                        //在css中不要直接给img设置宽高,否则此处会获取到css设置的值
                        var width = img.width;
                        var height = img.height;
                        let imgClass = null
                        //比较图片宽高设置图片显示和canvas画布尺寸
                        if (width > height) {
                            imgClass = 'height';
                            if (width > 500) {
                                height = Math.round(height *= 500 / width);
                                width = 500;
                            }
                        } else {
                            imgClass = 'width';
                            if (height > 500) {
                                width = Math.round(width *= 500 / height);
                                height = 500;
                            }
                        }
                        canvas.width = width; //设置新的图片的宽度
                        canvas.height = height; //设置新的图片的长度
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height); //绘图
                        this.base64 = canvas.toDataURL("image/png", 0.8);
                    });
                }
                this.$u.api.qxUser.ground({ground:this.base64}).then(res => {
                    this.getList();
                });
            },
            getList() {
                this.$u.api.qxUser.getInfo({}).then(res => {
                    this.all = res.rows;
                    this.all.avatar=res.rows.avatar;
                    console.log("头像地址"+this.all.avatar);
                    this.age = res.age.birthday;
                    this.intro=this.all.intro;
                    if(this.intro.length>80){
                        this.showLong = true;
                        this.intro=this.intro.substring(0,80)+'......';
                    }
                    this.$u.api.InvitationLikes().then(res => {
                        this.userQxInvitation = res.data.InvitationVoList;
                        this.likesList = res.data.likesList;
                    });
                });
                this.relationFrom.type = "1";
                this.$u.api.qxRelation.list(this.relationFrom).then(res => {
                    this.typeOneList = res.data.typeOne;
                });
                this.$u.api.qxRelation.listTwo(this.relationFrom).then(res => {
                    this.typeTwoList = res.data.typeTwo;
                });

            },
            change(index) {
                this.current = index;
                this.getList();
            },
            navTo(url) {
                uni.navigateTo({
                    url: url
                });
            },
            // 点赞
            getLike(index) {
                let list = this.userQxInvitation;
                if (this.current == 1) {
                    list = this.likesList;
                }
                this.likeList.fatherId = list[index].id;
                this.$u.api.qxLikes.add(this.likeList);
                list[index].islike = !list[index].islike;
                if (list[index].islike) {
                    list[index].praiseNumber++;
                } else {
                    list[index].praiseNumber--;
                }
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
        z-index: 99999;
        border-radius: 60px;
        display: flex;
    }
    .userAvatar {
        border: 10rpx solid #ffffff;
        position: absolute;
        left: 48rpx;
        top: 198rpx;
        border-radius: 60px;
        display: flex;
    }
    .report{
        display: flex;
        font-size: 30rpx;
        flex-direction: column;
        padding: 0 20rpx;

        view{
            height: 90rpx;
        }
        .bor-b{
            padding-left: 20rpx ;
            border-bottom: 1rpx solid #dcdcdc;
        }
    }
</style>
