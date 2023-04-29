<template>
    <view class="wrap" style="padding-bottom: 60px;">
        <u-navbar
                title="发布帖子"
                @click="navTo('/pages/sys/home/index')"
                :autoBack="true"
                style="padding: 15rpx 0">
            <view slot="right" style="padding: 20px">
                <u-button
                        style="background-color: #2979ff;color: rgb(255,252,243) ;height: 60rpx;"
                        shape="circle"
                        @click="submit()">
                    发布
                </u-button>
            </view>
        </u-navbar>
        <view>
            <u-form class="apply-form-field">
                <u-form-item>
                    <u-input type="textarea"
                             v-model="textarea"
                             placeholder="分享生活，提出困惑···"
                             height="400"
                             :clearable="false"/>
                </u-form-item>
            </u-form>
        </view>
        <view class="choose-box">
            <u-upload
                    max-count="9"
                    ref="uUpload"
                    name="files"
                    :action="uploadUrl"
                    :auto-upload="false"
                    :show-tips="false"
                    :show-progress="false"
                    @on-remove="remove">
            </u-upload>
        </view>
        <view>
            <u-toast ref="uToast" />
        </view>
    </view>

</template>
<script>
    export default {
        data() {
            return {
                textarea:'',
                showCropper: false,
                imgNum: 0,
                form: {imgList: []},
                newFile: [],
                fileList3: [],
                show: false,
                m2mSimflowList: [],
                current: 0,
                status: 'loadmore',
                iconType: 'circle',
                isDot: false,
                loadText: {
                    loadmore: '点击加载更多',
                    loading: '正在加载...',
                    nomore: '没有更多了',
                    raw: 1
                },
                dataURL: null,

            }
        },
        created() {
        },
        computed: {
            uploadUrl() {
                return `http://127.0.0.1:8082/app/invitation/uploadPhoto`;
            },
        },
        methods: {
            remove(){
                this.imgNum--;
            },
            submit() {
                let files = [];
                files = this.$refs.uUpload.lists;
                console.log(this.textarea);
                if((this.textarea==null || this.textarea=='')&&files.length==0){
                    this.$refs.uToast.show({
                        title: '啥也没写，不样发',
                        type: 'error',
                        position:"bottom"
                    })
                    return
                }
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
                    var base64 = canvas.toDataURL("image/png", 0.8);
                    this.newFile.unshift(base64);
                });
                }
                this.$u.api.getInvitationPhoto({fileList: this.newFile,textarea:this.textarea}).then(res => {
                    uni.switchTab({url: '/pages/sys/home/index' });
                });

            },
    },
        navTo(url) {
            uni.navigateTo({
                url: url
            });
        },

    }
</script>
<style lang="scss" scoped>
    @import 'index.scss';

    .wrap .search {
        background: #ffffff;
    }

    .apply-text {
        font-size: 28 rpx;
        color: #333333;
        span {
            color: #999999;
        }
    }

    .user-images {
        width: 28px;
        height: 28px;
        margin-right: 8px;
    }

    .apply-list-foot {
        font-size: 28 rpx;
    }

    .personnel-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .personnel-user {
            position: relative;
            margin: 5px 9px 0;
        }
        .user-images {
            width: 48px;
            height: 48px;
            margin-right: 0;

        }
        .iconfont {
            position: absolute;
            top: -12px;
            right: -5px;
            color: #FE0100;
        }
    }


    .choose-box {
        height: 150rpx;
    }

    .choose-img {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20rpx;
        margin-top: 40rpx;
        width: 150rpx;
        height: 150rpx;
        border-radius: 4rpx;
        background-color: rgba(255, 255, 255, 100);
        text-align: center;
        border: 2rpx dashed rgba(194, 199, 204, 100);
    }


</style>
