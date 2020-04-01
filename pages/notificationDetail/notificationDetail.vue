<template>
	<view class="detail-box" id="bigboxs">
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" left-icon="arrowleft"
		 left-text="返回" title="消息详情" @clickLeft="back" />
		<!-- 内容 -->
		<view class="title-box">{{ detailData.title }}</view>
		<view class="content">{{ detailData.content }}</view>
		<!-- 反馈内容 -->
		<view class="fan-box">
			<text>我的反馈</text>
			<text>2019-12-22 13:25:33</text>
		</view>
		<view class="fan-content">该区域为队员回复内容，可以展示队员看到相关工作安排之后的回复内容。</view>
		<!-- 通知公告确认按钮 -->
		<button v-if="detailData.title=='工作'" type="primary" class="btn-login" :class="{'isFlxed':isFxid}" @tap="fanKui">反馈</button>
		<button v-else type="primary" class="btn-login" :class="{'isFlxed':isFxid}" @tap="confirmMsg">确认收到</button>

		<uni-popup ref="showtip" type="center" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">我要反馈</text>
				<textarea class="popup_textarea" focus placeholder="输入内容..." v-model="feedbackContent"></textarea>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button uni-tip-button1 " @click="cancel('tip')">关闭</text>
					<text class="uni-tip-button" @click="cancel('tip')">提交</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniNavBar,
			uniPopup
		},
		data() {
			return {
				detailData: {},
				isFxid: false,
				userFeedbackHidden: true, // 默认隐藏
				feedbackContent: '' // 用户反馈内容
			};
		},
		//接受上个页面传过来的值
		onLoad(options) {
			this.detailData = JSON.parse(options.data);
			this.loadNewsList();
			var windowHeight = uni.getSystemInfoSync().windowHeight;
			console.log('windowHeight')
			console.log(windowHeight)
			let hel = 0
			const query = uni.createSelectorQuery().in(this);
			query.select('#bigboxs').boundingClientRect(data => {

				hel = data.height;
				console.log(hel)
				console.log(windowHeight)
				if (hel < windowHeight) {
					console.log(666)
					this.isFxid = true
				}
			}).exec();




		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			//初始化消息
			loadNewsList() {
				console.log('获取内容');
				console.log(this.detailData);
			},
			//通知公告确认
			confirmMsg() {
				console.log('确认弹出框');
				uni.showLoading({
					title: 'loading'
				});
				setTimeout(() => {
					uni.hideLoading();
				}, 3000)
			},
			//反馈
			fanKui() {
				console.log('反馈');
				this.$nextTick(() => {
					this.$refs.showtip.open();
				});
			},

			cancel(type) {
				this.$refs.showtip.close();
			},

		}
	}
</script>

<style lang="scss">
	page {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.title-box {
		font-size: 34rpx;
		color: #000000;
		width: 750rpx;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		font-weight: 500;
	}

	.content {
		font-size: 28rpx;
		line-height: 48rpx;
		padding: 30rpx;
	}

	.isFlxed {
		position: fixed;
		bottom: 4rpx;
		left: 30rpx;
	}

	.btn-login {
		margin: 140rpx auto 44rpx;
		color: #ffffff;
		font-size: 36rpx;
		width: 690rpx;
		height: 94rpx;
		background: #2256d8 !important;
		border-radius: 10rpx;
	}

	.fan-box {
		display: flex;
		flex-direction: row;
		padding: 30rpx 30rpx 10rpx 30rpx;
		justify-content: space-between;
		color: #8D8D8D;
		font-size: 28rpx;
	}

	.fan-content {
		padding: 30rpx 30rpx 0 30rpx;
		color: #8D8D8D;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */

		width: 540rpx;
		height: 424rpx;
		background-color: #fff;
		border-radius: 14rpx;
	}

	.uni-tip-title {
		margin-top: 27rpx;
		margin-bottom: 45rpx;
		text-align: center;
		font-size: 36rpx;
		color: #000;
	}

	.popup_textarea {
		width: 430rpx;
		height: 195rpx;
		font-size: 28rpx;
		margin-left: 55rpx;
		border: 1px #f1f1f1 solid;
		margin-bottom: -15rpx;
	}

	.uni-tip-content {
		/* padding: 15px;
	 */
		font-size: 30rpx;
		color: #888888;
		text-align: center;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		text-align: center;
		margin-top: 40rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-top: 1rpx solid #f1f1f1;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 36rpx;
		color: #4399fc;
	}

	.uni-tip-button1 {
		color: #0a0a0a;
		border-right: 1rpx solid #f1f1f1;
	}
</style>
