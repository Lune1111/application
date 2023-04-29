<template>
  <view class="wrap">
    <u-form :model="form" ref="uForm">
      <u-form-item label="密码" prop="password">
        <u-input v-model="form.password" />
      </u-form-item>
    </u-form>
    <u-row gutter="32" class="bottom-box" justify="center">
      <u-col span="10">
        <view><u-button  shape="circle" @click="navTo(form)">确定</u-button></view>
      </u-col>
    </u-row>
  </view>
</template>

<script>
/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
export default {
  data() {
    return {
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
  },
  created() {
    this.timer = setInterval(this.getTime, 1000)
  },
  computed: {

  },
  methods: {
    navTo(e){
      e.phone=this.form.phone;
      this.$u.api.user.upUserPwd(e).then(res=>{
        if(res.code==200){
          uni.reLaunch({
            url: '/pages/sys/login/index'
          });
        }
      })
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
