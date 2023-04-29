// 页面白名单，不受拦截
const whiteList = [
    'reg',
    'registration',
    '/pages/sys/login/registerCode',
    '/pages/sys/login/code',
    '/pages/sys/login/forget'
]
function hasPermission (url) {
    let urlTwo=url;
    if(urlTwo.includes("?")){
        urlTwo=url.split('?')[0];
    }
    let islogin = uni.getStorageSync('isLogin');//在这可以使用token,isLogin是登录成功后在本地存储登录标识
    islogin = Boolean(Number(islogin));//返回布尔值
    // 在白名单中或有登录判断条件可以直接跳转
    if(whiteList.indexOf(urlTwo) !== -1 || islogin) {
        console.log('通过')
        return true
    }
    console.log('失败')
    return false
}
uni.addInterceptor('navigateTo', {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
    invoke (e) {
        if(!hasPermission(e.url)){
            uni.reLaunch({
                url: '/pages/sys/login/index'
            })
            return false
        }
        return true
    },
    success (e) {

    }
})

uni.addInterceptor('switchTab', {
    // tabbar页面跳转前进行拦截
    invoke (e) {
        if(!hasPermission(e.url)){
            uni.reLaunch({
                url: '/pages/sys/login/index'
            })
            console.log('不在白名单内')
            return false
        }
        console.log('在白名单内')
        return true
    },
    success (e) {

    }
})