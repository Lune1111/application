<script>
    import TIM from 'tim-wx-sdk';
    import Aegis from 'aegis-mp-sdk';
    import logger from './utils/logger';
    import TIMUploadPlugin from 'tim-upload-plugin';
    const aegis = new Aegis({
        id: 'iHWefAYqKznuxWjLnr', // 项目key
        reportApiSpeed: true, // 接口测速
    });
    uni.$aegis = aegis
    import {
        genTestUserSig
    } from './debug/GenerateTestUserSig.js';
    export default {
        onLaunch() {
            const SDKAppID = genTestUserSig('').sdkAppID;
            uni.$aegis.reportEvent({
                name: 'onLaunch',
                ext1: 'onLaunch-success',
                ext2: 'uniTuikitExternal',
                ext3: `${SDKAppID}`,
            })
            uni.setStorageSync(`TIM_${SDKAppID}_isTUIKit`, true);
            uni.$TUIKit = TIM.create({
                SDKAppID: SDKAppID
            });
            uni.$TUIKit.registerPlugin({
                "tim-upload-plugin": TIMUploadPlugin,
            });
            uni.$TUIKitTIM = TIM;
            uni.$TUIKitEvent = TIM.EVENT;
            uni.$TUIKitVersion = TIM.VERSION;
            uni.$TUIKitTypes = TIM.TYPES; // 监听系统级事件

            uni.$resetLoginData = this.resetLoginData();
            uni.$TUIKit.on(uni.$TUIKitEvent.SDK_READY, this.onSDKReady);
            uni.$TUIKit.on(uni.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady);
            uni.$TUIKit.on(uni.$TUIKitEvent.KICKED_OUT, this.onKickedOut);
            uni.$TUIKit.on(uni.$TUIKitEvent.ERROR, this.onTIMError);
            uni.$TUIKit.on(uni.$TUIKitEvent.NET_STATE_CHANGE, this.onNetStateChange);
            uni.$TUIKit.on(uni.$TUIKitEvent.SDK_RELOAD, this.onSDKReload);

            // 国际化，设置当前语言
            if (this.vuex_locale){
                this.$i18n.locale = this.vuex_locale;
                this.$u.api.lang({lang: this.vuex_locale});
            }
            // // 设置底部导航栏角标
            // uni.setTabBarBadge({
            //   index: 0,
            //   text: '3'
            // });
            // uni.removeTabBarBadge({
            //   index: 0
            // });
        },
        globalData: {
            // userInfo: userID userSig token phone
            userInfo: null,
            // 个人信息
            userProfile: null,
            isTUIKit: true,
            headerHeight: 0,
            statusBarHeight: 0,
            SDKAppID: genTestUserSig('').sdkAppID
        },
        methods: {
            // TODO:
            resetLoginData() {
                this.globalData.expiresIn = '';
                this.globalData.sessionID = '';
                this.globalData.userInfo = {
                    userID: '',
                    userSig: '',
                    token: '',
                    phone: ''
                };
                this.globalData.userProfile = null;
                logger.log(`| app |  resetLoginData | globalData: ${this.globalData}`);
            },
            onTIMError() {},
            onSDKReady({name}) {
                const isSDKReady = name === uni.$TUIKitEvent.SDK_READY ? true : false;
                this.$u.vuex('isImReady',true);
                // 将用户存储到im系统中去
                uni.$TUIKit.updateMyProfile({
                    nick:this.vuex_user.nickName,
                    avatar:this.vuex_user.avatar
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

                uni.$emit('isSDKReady', {
                    isSDKReady: true
                });
            },
            onNetStateChange() {},
            onSDKReload() {},
            onSdkNotReady() {},
            onKickedOut() {
                uni.showToast({
                    title: '您被踢下线',
                    icon: 'error'
                });
                uni.navigateTo({
                    url: './pages/TUI-Login/login'
                });
            }
        }
    }
</script>
<style>
    @import url("~@/static/iconfont/iconfont.css");
</style>
<style lang="scss">
    @import "uview-ui/index.scss";
    @import "pages/common/aidex.scss";
</style>