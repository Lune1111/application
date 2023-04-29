<template>
    <view class="wrap">
        <u-form :model="form" ref="uForm">
            <view class="demo-layout u-flex u-row-center u-m-b-20">
                <u-avatar
                        :size="170"
                        :src="avatarUrl"
                        @click="chooseAvatar"
                        bg-color='#000;'
                ></u-avatar>
            </view>

            <u-form-item label="密码" prop="password">
                <u-input v-model="form.password" />
            </u-form-item>
            <u-form-item label="昵称" prop="nickName">
                <u-input v-model="form.nickName" />
            </u-form-item>
            <u-form-item label="性别">
                <u-radio-group v-model="radio">
                    <u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled"
                             :checked="item.checked">
                        {{ item.name }}
                    </u-radio>
                </u-radio-group>
            </u-form-item>
        </u-form>
        <u-row gutter="32" class="bottom-box" justify="center">
            <u-col span="10">
                <view><u-button  shape="circle" @click="navTo(form)">确定</u-button></view>
            </u-col>
        </u-row>
      <u-modal v-model="popshow" :content='content'></u-modal>
    </view>

</template>
<script>
    /**
     * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
     */
    export default {
        data() {
            return {
               content:'',
               popshow: false,
                show: false,
                areashow: false,
                model: {
                },
                rules: {},
                avatarBase64: '',
                form: {
                    nickName: '',
                    intro: '这里还没有简介哦~',
                    sex: '1',
                    birthday: '',
                    area: '',
                    avatar: '',
                    age:'',
                    phone:'',
                    password:'',
                },
                radioList: [
                    {
                        name: '男',
                        checked: true,
                        disabled: false
                    },
                    {
                        name: '女',
                        checked: false,
                        disabled: false
                    }
                ],
                radio: '男',
                switchVal: false,

            };
        },
        onLoad(option) {
            this.form.phone=option.phoneNo;
            uni.$on('uAvatarCropper', path => {
                this.avatarBase64 = path;
            })
        }
        ,
        computed: {
            avatarUrl() {
                if (this.avatarBase64 != '') {
                    return this.avatarBase64;
                }
                let url = this.vuex_config.baseUrl + this.vuex_user.avatar || this.form.avatar;
                url = this.replaceAll(url, '\\', '/');
                //url = url.replace('/aidex/', this.vuex_config.baseUrl + '/');
                /* alert(url); */
                return url;
            }
        },
        methods: {
            chooseAvatar() {
                this.$u.route({
                    url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
                    params: {
                        destWidth: 200, // 输出图片宽高
                        rectWidth: 200, // 裁剪框的宽高
                        fileType: 'jpg', // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
                    }
                })
            },
          navTo(form){
            if(this.form.nickName!='' && this.form.password!=''){
              if(this.form.nickName.length<30 && this.form.password.length<30){
                if (this.avatarBase64 != '' && !this.avatarBase64.startsWith('data:')) {
                  this.avatarBase64 = 'data:image/jpeg;base64,' + uni.getFileSystemManager()
                      .readFileSync(this.avatarBase64, "base64")
                }
                this.form.avatar =this.avatarBase64;
                this.$u.api.user.saveUserInfo(form).then(res=>{
                  if(res.code==200){
                    uni.reLaunch({
                      url: '/pages/sys/login/index'
                    });
                  }
                })
              }else{
                this.content='已超过最大文本限制！！';
                this.popshow=true;
              }
            }else{
              this.content='输入的内容不可为空！！！';
              this.popshow=true;
            }
          }
        }
    };
</script>
<style lang="scss" scoped>
    page {
        background: #ffffff;
    }

    .u-form {
        background: #fff;
        padding: 300rpx 100rpx;
    }
    .u-demo-wrap {
        border-width: 1px;
        border-color: #ddd;
        border-style: dashed;
        background-color: rgb(250, 250, 250);
        padding: 20px 10px;
        border-radius: 3px;
    }
</style>
