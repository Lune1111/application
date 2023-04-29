<template>
  <view class="wrap">
    <u-form :model="form" ref="uForm">
      <u-form-item label="头像" prop="avatar">
        <u-avatar size="60" bg-color='#000;' :src="avatarUrl" @click="chooseAvatar"
                  style="position: absolute;right: 20rpx;top:24rpx;"></u-avatar>
      </u-form-item>

      <u-form-item label="昵称" prop="nickName">
        <u-input v-model="form.nickName" v-text=""/>
      </u-form-item>
      <u-form-item label="简介" prop="intro">
        <u-input type="textarea" v-model="form.intro" laceholder="请输入内容" height="200" />
      </u-form-item>
      <u-form-item label="性别">
        <u-radio-group v-model="radio=form.sex==1?'男':'女'">
          <u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled"
                   :checked="item.checked">
            {{ item.name }}
          </u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item label="所在地区" prop="form.area" label-width="150">
        <text @click="showChangeAreaShow">{{ form.area ? form.area : "请选择所在地区 >" }}</text>
        <u-picker v-model="areashow" :columns="form.area" mode="region" @confirm="sureChoose"
                  @cancel="cancelChoose"></u-picker>
      </u-form-item>
      <u-form-item label="生日" prop="form.birthday" label-width="150">
        <u-calendar v-model="show" ref="calendar" @change="change"
                    :range-color="rangeColor"
                    :range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
                    min-date="1980-01-01"
                    max-date="2003-01-01"
        >
        </u-calendar>
        <u-input type="select" v-model="form.birthday"
                 placeholder="请选择生日" @click="showChange"></u-input>
      </u-form-item>
      <u-button style="margin-top: 40rpx" @click="submit">提交</u-button>
    </u-form>

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
      result: "请选择日期",
      rangeColor: '#2979ff',
      rangeBgColor: 'rgba(41,121,255,0.13)',
      activeBgColor: '#2979ff',
      btnType: 'primary',
      model: {
        region: '',
      },
      rules: {},
      avatarBase64: '',
      form: {
        nickName: '',
        intro: '',
        sex: '1',
        birthday: '',
        area: '',
        avatar: '',
        age:'',
      },
      radioList: [
        {
          name: '男',
          checked: true,
          disabled: true
        },
        {
          name: '女',
          checked: false,
          disabled: true
        }
      ],
      radio: '',
      switchVal: false,

    };
  },
  onLoad() {
    this.$u.api.qxUser.getInfo().then(res => {
      if (res.code == '200') {
        this.form= {
          avatar:res.rows.avatar,
          area:res.rows.area,
          intro:res.rows.intro,
          sex:res.rows.sex,
          birthday:res.rows.birthday,
          nickName:res.rows.nickName,
          age:res.age.birthday,
        }
        this.avatarBase64=this.form.avatar;
      } else if (res.result == 'login') {
        uni.reLaunch({
          url: '/pages/sys/login/index'
        });
      } else {
        this.$u.toast(res.message);
      }
    });
    uni.$on('uAvatarCropper', path => {
      this.avatarBase64 = path;
    })
  },
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
  // onReady() {
  //     this.$refs.uForm.setRules(this.rules);
  // },
  methods: {
    // 地区
    showChangeAreaShow(){
      this.areashow = this.areashow ? false :true
    },
    // 日历 start
    showChange(index) {
      this.show = ! index;
    },
    change(e) {
      this.form.birthday = e.result
    },
    // 日历 end
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
    submit() {
      if(this.form.nickName!='' && this.form.intro!=''){
        if(this.form.nickName.length<30 && this.form.intro.length<100){
          this.$refs.uForm.validate(valid => {
            if (valid) {
              // #ifdef MP-WEIXIN || MP-TOUTIAO
              this.$u.toast('您填写的信息有误，11。');
              if (this.avatarBase64 != '' && !this.avatarBase64.startsWith('data:')) {
                this.avatarBase64 = 'data:image/jpeg;base64,' + uni.getFileSystemManager()
                    .readFileSync(this.avatarBase64, "base64")
              }
              // #endif
              this.form.avatar = this.avatarBase64;
              console.log(this.form.avatar)
              this.$u.api.qxUser.update(this.form).then(res => {
                if (res.code == '200') {
                  this.vuex_user.nickName = this.form.nickName;
                  this.vuex_user.avatar = res.avatar;
                  this.$u.vuex('vuex_user', this.vuex_user);
                  if(this.vuex_token){
                    if(!this.isImReady){
                      const user = this.vuex_user;
                      const  userID= user.phone+'';
                      const  userSig= genTestUserSig(userID).userSig;
                      uni.$TUIKit.login({
                        userID: userID,
                        userSig: userSig
                      }).then(() => {
                        uni.setStorageSync('isLogin',1);
                        console.info('=== IM 自动登陆成功 ===');
                        setTimeout(function () {
                          this.getConversationList();
                        }, 2000);

                      }).catch((error) => {
                        console.log('=== IM 自动登陆失败 ===');
                      })
                    }
                  }
                  uni.$TUIKit.updateMyProfile({
                    nick:this.form.nickName,
                    avatar:res.avatar
                  }).then(imResponse => {
                    this.setData({
                      userInfo: imResponse.data,
                      popupToggle: false
                    });
                  })
                  .catch(imError => {
                    this.setData({
                      popupToggle: false
                    });
                    console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
                  });
                  uni.showLoading({
                    title: '修改中',
                    duration: 1000,
                    mask:true,
                    complete: function () {
                      setTimeout(function () {
                        uni.hideLoading();
                        uni.showToast({
                          title: '修改成功',
                          duration: 1000,
                          mask:true,
                          complete:res1 => {
                            setTimeout(function () {
                              uni.hideLoading();
                            uni.switchTab({
                              url: '/pages/sys/user/index',
                            })
                            }, 1000);
                          }
                        })
                      }, 1500);
                    }
                  });
                } else {
                  this.$u.toast(res.msg);
                }
              });
            } else {
              this.$u.toast('您填写的信息有误，请根据提示修正。');
            }
          });
        }else {
          this.content="已超过最大文本限制！！";
          this.popshow=true;
        }
        } else{
        this.content='输入的内容不可为空！！！',
        this.popshow=true;
      }
    },

    cancel() {
      uni.navigateBack();
    },
    sureChoose(e) {
      this.areashow = false
      this.form.area = e.province.label + '-' + e.city.label;
    },
    cancelChoose(e) {
      this.areashow = false
    },
  }
};
</script>
<style lang="scss" scoped>
page {
  background: #ffffff;
}

.u-form {
  background: #fff;
  padding: 0 15px;
}

.u-size-medium {
  height: 60 rpx;
  line-height: 60 rpx;
  padding: 0 20px;
  font-size: 28 rpx;
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
  border: 1px solid #5186e7;
}

.u-hairline-border:after {
  border: 1px solid #5186e7 !important;
}

/*.input-placeholder {*/
/*text-align: right;*/
/*}*/

.u-input {
  text-align: left !important;
}

.u-form-item {
  font-size: 36 rpx;
}
</style>
