<template>
	<view class="container-conversation">
		<view class="scroll-box">
			<view class="uni-list margintop-bar">
				<view v-for="item in conversationList" :key="item.conversationID" @tap="handleRoute(item.conversationID)">
					<TUI-conversation-item :data-type="item.type" :conversation="item"></TUI-conversation-item>
				</view>
			</view>
		</view>
	</view>
</template>
<!-- 这里有个加载的补丁逻辑待优化，页面向SDK请求conversationList的时候会有时延，
造成页面的一个抖动，这里加一个if逻辑打一个补丁，后续继续优化 -->
<script>
	import logger from '../../../utils/logger';
	import TUIConversationItem from '../../../components/tui-conversation/conversation-item/index';
	import TUIMessageList from '../../../components/tui-chat/message-list/index';
	import {genTestUserSig} from "@/debug/GenerateTestUserSig.js";

	export default {
		data() {
			return {
				conversationList: [],
			};
		},

		components: {
			TUIConversationItem,
			TUIMessageList
		},
		props: {},
		onShow(){
			this.checkTokenForIM();
			uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad() {
			this.checkTokenForIM();
			this.getConversationList();
			uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload() {
			uni.$TUIKit.off(uni.$TUIKitEvent.SDK_READY, this.onConversationListUpdated);
		},
		onTabItemTap(e) {
			this.checkTokenForIM();
			this.getConversationList();
			uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
		},
		methods: {
			checkTokenForIM(){
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
							setTimeout(res => {
								this.getConversationList();
							}, 2000);
						}).catch((error) => {
							console.log('=== IM 自动登陆失败 ===');
						})
					}
				}
			},
			handleRoute(id) {
				const url = `../../TUI-Chat/chat?conversationID=${id}`;
				uni.navigateTo({
					url
				});
			},
			onConversationListUpdated(event) {
				logger.log('TUI-conversation | onConversationListUpdated  |ok');
				this.setData({
					conversationList: event.data
				});
			},

			getConversationList() {
				uni.$TUIKit.getConversationList().then(imResponse => {
					logger.log(`TUI-conversation | getConversationList | getConversationList-length: ${imResponse.data.conversationList.length}`);
					this.setData({
						conversationList: imResponse.data.conversationList
					});
				});
			},

			goHomePage() {
				// uni.navigateTo 不能跳转到 tabbar 页面，使用 uni.switchTab 代替
				uni.switchTab({
					url: '../../TUI-Index/index'
				});
			},


			$createConversation() {
				uni.navigateTo({
					url: '../create-conversation/create'
				});
			},

			$createGroup() {
				uni.navigateTo({
					url: '../../TUI-Group/create-group/create'
				});
			},

			$joinGroup() {
				uni.navigateTo({
					url: '../../TUI-Group/join-group/join'
				});
			}
		}
	};
</script>
<style scoped>
	@import './conversation.css';
</style>
