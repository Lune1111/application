/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {
	
	// 参数配置对象
	const config = vm.vuex_config;
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		// 基础服务：登录登出、身份信息、菜单授权、切换系统、字典数据等
		lang: (params = {}) => vm.$u.get('/lang/'+params.lang),
		index: (params = {}) => vm.$u.get(config.adminPath+'/mobile/index', params),
		getUserInfo: (params = {}) => vm.$u.get(config.adminPath+'/mobile/user/getUserInfo', params),
		//帖子需求
        getInvitation: (params = {}) => vm.$u.get(config.adminPath+'/app/invitation/plazaList', params),
        //查询id帖子
        getInInvitation: (params = {}) => vm.$u.get(config.adminPath+'/app/invitation/getInInvitation', params),
        //上传帖子图片集合
        getInvitationPhoto: (params = {}) => vm.$u.post(config.adminPath+'/app/invitation/uploadPhoto', params, {'Content-Type':'application/x-www-form-urlencoded'}	),
        InvitationLikes:(params = {}) => vm.$u.get(config.adminPath+'/app/invitation/InvitationLikes', params),
		login: (params = {}) => vm.$u.post(config.adminPath+'appLogin', params),
		smslogin: (params = {}) => vm.$u.post(config.adminPath+'smslog', params),
		sendCode: (params = {}) => vm.$u.post(config.adminPath+'textmessage', params),
		sendSms: (params = {}) => vm.$u.get(config.adminPath+'/sms',params),
		sendSmslogon: (params = {}) => vm.$u.post(config.adminPath+'smslogon',params),
		registerUser: (params = {}) => vm.$u.post(config.adminPath+'/mobile/user/registerUser', params),
		//首页相关api
		getIndexCardInfo: (params = {}) => vm.$u.get(config.adminPath+'/mobile/index/getIndexCardInfo', params),
		getM2mOrderFlowList: (params = {}) => vm.$u.get(config.adminPath+'/mobile/index/getM2mOrderFlowList', params),
		//获取卡可购买套餐包
		getM2mOrderPackageList: (params = {}) => vm.$u.get(config.adminPath+'/mobile/index/getM2mOrderPackageList', params),
		
		logout: (params = {}) => vm.$u.get(config.adminPath+'/logout', params),
		authInfo: (params = {}) => vm.$u.get(config.adminPath+'/authInfo', params),
		menuTree: (params = {}) => vm.$u.get(config.adminPath+'/menuTree', params),
		switchSys: (params = {}) => vm.$u.get(config.adminPath+'/switch/'+params.sysCode),
		dictData: (params = {}) => vm.$u.get(config.adminPath+'/system/dict/data/type/'+params.dictType),
		
		// 账号服务：验证码接口、忘记密码接口、注册账号接口等
		validCode: (params = {}) => vm.$u.getText('/validCode', params),
		getFpValidCode: (params = {}) => vm.$u.post('/account/getFpValidCode', params),
		savePwdByValidCode: (params = {}) => vm.$u.post('/account/savePwdByValidCode', params),
		getRegValidCode: (params = {}) => vm.$u.post('/account/getRegValidCode', params),
		saveRegByValidCode: (params = {}) => vm.$u.post('/account/saveRegByValidCode', params),
		
		// APP公共服务
		upgradeCheck: () => vm.$u.post('/app/upgrade/check', {appCode: config.appCode, appVersion: config.appVersion}),
		commentSave: (params = {}) => vm.$u.post('/app/comment/save', params),
		
		// 个人信息修改
		user: {
			upUserPwd: (params = {}) => vm.$u.put(config.adminPath+'/app/user/uppwd', params),
			saveUserInfo: (params = {}) => vm.$u.post(config.adminPath+'/app/user', params),
			infoSavePwd: (params = {}) => vm.$u.put(config.adminPath+'/system/user/profile/updatePwd', params),
			infoSavePqa: (params = {}) => vm.$u.post(config.adminPath+'/sys/user/infoSavePqa', params),
		},
		
		// 员工用户查询
		empUser: {
			listData: (params = {}) => vm.$u.get(config.adminPath+'/sys/empUser/listData', params),
		},
		
		// 组织机构查询
		office: {
			treeData: (params = {}) => vm.$u.get(config.adminPath+'/sys/office/treeData', params),
		},
		
		// 增删改查例子
		testData: {
			form: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/form', params),
			list: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/listData', params),
			save: (params = {}) => vm.$u.postJson(config.adminPath+'/test/testData/save', params),
			disable: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/disable', params),
			enable: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/enable', params),
			delete: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/delete', params),
		},
		qxUser:{
			ground:(params = {}) => vm.$u.put(config.adminPath+'/app/user/ground', params),
			list: (params = {}) => vm.$u.get(config.adminPath+'/app/user/list', params),
			getInfo: (params = {}) => vm.$u.get(config.adminPath+'/app/user', params),
			update: (params = {}) => vm.$u.put(config.adminPath+'/app/user', params),
		},
		//关系api
		qxRelation: {
			list: (params = {}) => vm.$u.get(config.adminPath + '/app/relation/list', params),
            listTwo: (params = {}) => vm.$u.get(config.adminPath + '/app/relation/listTwo', params),
            update: (params = {}) => vm.$u.post(config.adminPath + '/app/relation/add', params),
            invitationUser: (params = {}) => vm.$u.get(config.adminPath + '/app/relation/invitationUser', params),
            invitationAdd: (params = {}) => vm.$u.post(config.adminPath + '/app/relation/invitationAdd', params),
        },
		//点赞api
		qxLikes: {
			add: (params = {}) => vm.$u.post(config.adminPath + '/app/likes/add', params),
		},
		//评论api
		qxComment:{
			list: (params = {}) => vm.$u.get(config.adminPath + '/app/comment/list', params),
			add: (params = {}) => vm.$u.post(config.adminPath + '/app/comment/add', params),
            delete: (params = {}) => vm.$u.get(config.adminPath + '/app/comment/delete', params),
        },
        Invitation:{
			delete:(params = {}) => vm.$u.get(config.adminPath + '/app/invitation/delete', params)
		},
        //举报api
        qxReport:{
            add: (params = {}) => vm.$u.post(config.adminPath + '/app/report/add', params),
        }
	};
	
}

export default {
	install
}