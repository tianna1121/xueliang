<template>
	<view class="detail-box" id="bigboxs">
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" left-icon="arrowleft" left-text="返回" title="消息详情" @clickLeft="back" />
		<!-- 内容 -->
		<view class="title-box">{{ statusChange(detailData.category) }}</view>
		<view class="content">{{ detailData.content }}</view>
		<!-- 反馈内容 -->
		<view class="fan-box" v-if="detailData.feedback_content.length > 0">
			<text>我的反馈</text>
			<text>{{ detailData.feedback_time }}</text>
		</view>
		<view class="fan-content" v-if="detailData.feedback_content.length > 0">{{ detailData.feedback_content }}</view>
		<!-- 通知公告确认按钮 -->
		<button v-if="detailData.category == 3" type="primary" class="btn-login" :class="{ isFlxed: isFxid }" @tap="fanKui">反馈</button>
		<button v-else type="primary" class="btn-login" :class="{ isFlxed: isFxid }" @tap="confirmMsg">确认收到</button>

		<uni-popup ref="showtip" type="center" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">我要反馈</text>
				<textarea class="popup_textarea" placeholder="输入内容..." v-model="feedbackContent"></textarea>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button uni-tip-button1 " @click="cancel('tip')">关闭</text>
					<text class="uni-tip-button" @click="submitMgs">提交</text>
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
		console.log('windowHeight');
		console.log(windowHeight);
		let hel = 0;
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#bigboxs')
			.boundingClientRect(data => {
				hel = data.height;
				console.log(hel);
				console.log(windowHeight);
				if (hel < windowHeight) {
					console.log(666);
					this.isFxid = true;
				}
			})
			.exec();
	},
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		statusChange(index) {
			switch (index) {
				case 1:
					return '通知';
					break;
				case 2:
					return '公告';
					break;

				case 3:
					return '工作';
					break;
				default:
					return '通知';
			}
		},
		//初始化消息
		loadNewsList() {
			console.log('获取内容');
			console.log(this.detailData);
		},
		//通知公告确认
		confirmMsg() {
			uni.showLoading({
				title: 'loading'
			});
			this.$http
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-tzgg-receive.htm', {
					params: {
						id: this.detailData.id
					}
				})
				.then(res => {
					uni.hideLoading();
					console.log(res.data);
					if (res.data.msgState == 1) {
						this.back()
					}
					uni.showToast({
						title: res.data.msg,
						duration: 2000
					});
				})
				.catch(err => {
					console.log(err);
					uni.hideLoading();
				});		
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
		submitMgs() {
			uni.showLoading({
				title: 'loading'
			});
			var obj = { feedback_content: this.feedbackContent,id:this.detailData.id};
			//发起请求
			this.$refs.showtip1.close();
			uni.showLoading({
				title: 'loading'
			});
			this.$http
				.post('/interface/rest/http/xlwb/xlgc-wb-xcx-sjsb-feedback.htm', obj)
				.then(res => {
					uni.hideLoading();
					console.log(res.data);
					if (res.data.msgState == 1) {
						this.detailData.feedback_content = this.feedbackContent;
						var dateee = new Date().toJSON();
						var dates = new Date(+new Date(dateee) + 8 * 3600 * 1000)
							.toISOString()
							.replace(/T/g, ' ')
							.replace(/\.[\d]{3}Z/, '');
						this.detailData.feedback_time = dates;
						this.$refs.showtip.close();
						this.back()
					}
					uni.showToast({
						title: res.data.msg,
						duration: 2000
					});
				})
				.catch(err => {
					console.log(err);
					uni.hideLoading();
				});
		}
	}
};
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
	color: #8d8d8d;
	font-size: 28rpx;
}

.fan-content {
	padding: 30rpx 30rpx 0 30rpx;
	color: #8d8d8d;
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
