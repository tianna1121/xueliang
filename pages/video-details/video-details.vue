<template>
	<view class="bigboxxs">
		<video
			id="myVideo"
			:src="src"
			:show-center-play-btn="false"
			@fullscreenchange="fullscreenchange"
			:controls="false"
			:loop="true"
			@error="videoErrorCallback"
			@click="clk"
			enable-danmu="flase"
		>
			<!--顶部栏 竖屏-->
			<cover-view class="video-control">
				<cover-view class="video-control-back" @tap.native.stop="backup"><cover-image src="../../static/img/news/back.png"></cover-image></cover-view>
				<cover-view class="video-control-text" @tap.native.stop="backup">{{ title }}</cover-view>
				<cover-view class="video-control-more" @tap="choosed">
					<cover-view v-if="isMenu1">
						<cover-image src="../../static/img/news/menu@2x.png"></cover-image>
						<cover-view class="video-control-text1">视频选择</cover-view>
					</cover-view>
					<cover-view v-else></cover-view>
				</cover-view>
			</cover-view>
			<!-- 一键求助 -->
			<cover-view class="sos-box" @tap="sosPopup"><cover-image class="sos-img" src="../../static/img/news/sos.png"></cover-image></cover-view>
			<!-- 位置 -->
			<cover-view class="adress-box">
				<cover-image class="adress-img" src="../../static/img/news/location.png"></cover-image>
				<cover-view class="adresss">{{ adress }}</cover-view>
			</cover-view>
			<!-- 右侧导航栏 -->
			<cover-view class="multi-list rate" :class="{ active: rateShow }" @tap.native.stop>
				<cover-view class="top-close" @tap="closeedMenu">
					<cover-image class="close-img" src="../../static/img/news/close@2x.png"></cover-image>
					<cover-view class="closeds">关闭</cover-view>
				</cover-view>
				<cover-view class="blaks"></cover-view>
				<cover-view class="list-box" scroll-top="50">
					<cover-view v-for="(item, index) in list" :key="index" class="multi-item rate" @tap="switchRate(item.id)" :class="{ active: item.id == currentRate }">
						{{ item.adress }}
					</cover-view>
				</cover-view>
			</cover-view>
		</video>

		<uni-popup ref="showtip1" type="center" :mask-click="false">
			<view class="uni-tip1">
				<text class="uni-tip-title1">一键求助</text>
				<textarea class="popup_textarea uni-input" :show-confirm-bar="flase" cursor-spacing="0" placeholder="输入内容..." v-model="feedbackContent"></textarea>
				<view class="uni-tip-group-button1">
					<text class="uni-tip-buttons uni-tip-button11 " @click="cancel('tip')">关闭</text>
					<text class="uni-tip-buttons" @click="cancel('tip')">提交</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-01.mp4',
			list: [
				{ id: 1, adress: '美星镇-新街村' },
				{ id: 2, adress: '美星镇-新街村' },
				{ id: 3, adress: '美星镇-新街村' },
				{ id: 4, adress: '美星镇-新街村' },
				{ id: 5, adress: '美星镇-新街村' },
				{ id: 6, adress: '美星镇-新街村' },
				{ id: 7, adress: '美星镇-新街村' },
				{ id: 8, adress: '美星镇-新街村' },
				{ id: 111, adress: '美星镇-新街村' },
				{ id: 12, adress: '美星镇-新街村' },
				{ id: 13, adress: '美星镇-新街村' },
				{ id: 41, adress: '美星镇-新街村' },
				{ id: 15, adress: '美星镇-新街村' },
				{ id: 16, adress: '美星镇-新街村' },
				{ id: 17, adress: '美星镇-新街村' },
				{ id: 18, adress: '美星镇-新街村' }
			],
			currentRate: 1, //当前播放id
			rateShow: false, //右侧弹出选项
			detailData: {},
			title: '2019-12-12 13:24:30 星期三',
			adress: '美星镇-新街村',
			isMenu: false,
			isshow: false,
			isMenu1: true,
			feedbackContent: ''
		};
	},
	onLoad(options) {
		this.detailData = JSON.parse(options.data);
		this.loadNewsList();
	},
	onReady: function(res) {
		// #ifndef MP-ALIPAY
		this.videoContext = uni.createVideoContext('myVideo');
		// #endif
		this.videoContext.requestFullScreen();
		this.videoContext.play();
	},
	methods: {
		fullscreenchange(event) {
			console.log(event.detail.fullScreen);

			// 	if (!event.detail.fullScreen) {
			// 		this.backup()
			// 	}
		},
		backup() {
			uni.navigateBack({
				delta: 1
			});
		},
		clk() {
			let that = this;
			that.isMenu = !that.isMenu;
		},
		loadNewsList() {
			console.log(this.detailData);
		},
		videoErrorCallback: function(e) {
			uni.showModal({
				content: e.target.errMsg,
				showCancel: false
			});
		},
		//一键求助弹出框

		sosPopup() {
			console.log('我要反馈');
			this.videoContext.exitFullScreen();
			this.$nextTick(() => {
				this.$refs.showtip1.open();
				this.isshow = true;
			});
		},
		cancel(type) {
			this.$refs.showtip1.close();
			//this.videoContext.requestFullScreen();
			this.isshow = false;
		},
		choosed() {
			this.rateShow = true;
			this.isMenu1 = false;
		},
		closeedMenu() {
			this.rateShow = false;
			this.isMenu1 = true;
		},
		//选择视频播放
		switchRate(id) {
			let that = this;
			that.currentRate = id;
			that.rateShow = false;
			this.isMenu1 = true;
			console.log(id);
		}
	}
};
</script>

<style lang="scss">
.page {
	flex: 1;
	width: 750rpx;
}
.bigboxxs {
	width: 100%;
}
#myVideo {
	width: 100%;
	flex: 1;
	/* #ifndef APP-PLUS */
	width: 100%;
	/* #endif */
}

.swiper-item {
	flex: 1;
}

.video-control {
	background-color: rgba(0, 0, 0, 0.2);
	height: 100rpx;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 999;
	flex-direction: row;
	display: flex;
	justify-content: space-between;
}
.video-control-back {
	position: relative;
	width: 60rpx;
	height: 100%;
	line-height: 100rpx;
}
.video-control-back cover-image {
	position: absolute;
	top: 34rpx;
	left: 20rpx;
	width: 20rpx;
	height: 34rpx;
}
.video-control-text {
	color: #ffffff;
	width: 70%;
	height: 100%;
	text-align: left;
	line-height: 100rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	font-size: 32rpx;
}
.video-control-more {
	position: relative;
	height: 100%;
	width: 178rpx;
	right: 20rpx;
	font-size: 32rpx;
}
.video-control-more cover-image {
	position: absolute;
	top: 20rpx;
	left: 10rpx;
	width: 44rpx;
	height: 44rpx;
}
.video-control-text1 {
	width: 128rpx;
	text-align: right;
	height: 100%;
	line-height: 80rpx;
	margin-left: 50rpx;
	color: #ffffff;
}
.sos-box {
	height: 120rpx;
	position: absolute;
	bottom: 24rpx;
	left: 19rpx;
	width: 120rpx;
	z-index: 999;
	flex-direction: row;
	display: flex;

	.sos-img {
		width: 120rpx;
		height: 120rpx;
	}
}

.adress-box {
	background-color: rgba(0, 0, 0, 0.1);
	height: 55rpx;
	line-height: 55rpx;
	position: absolute;
	bottom: 24rpx;
	right: 0;
	padding: 10rpx;
	z-index: 999;
	flex-direction: row;
	display: flex;
	justify-content: center;
	align-items: center;

	.adress-img {
		width: 32rpx;
		height: 32rpx;
	}
	.adresss {
		font-size: 32rpx;
		color: #ffffff;
		margin-left: 5rpx;
	}
}
// 侧面导航
.multi-list {
	position: absolute;
	height: 100%;
	width: 0;
	background-color: rgba(0, 0, 0, 0.2);
	top: 0;
	right: 0;
	transition: width 0.3s ease;
	z-index: 999;
	box-sizing: border-box;
	padding: 21rpx;
	overflow: hidden;
}
.multi-list.rate {
	padding: 25rpx 0;
}
.multi-list.active {
	width: 373rpx;
}
.blaks {
	height: 66rpx;
	width: 100%;
}
.list-box {
	box-sizing: border-box;
	height: 100%;
	padding: 1rpx;
	overflow-y: scroll;
}

.multi-item {
	text-align: left;
	color: #fff;
	width: 100%;
	height: 60rpx;
	padding-left: 20rpx;
	line-height: 60rpx;
	transition: color ease 0.3s;
	border-bottom: solid 2rpx #ffffff;
}
.multi-item.rate {
	line-height: 60rpx;
}
.multi-item:hover,
.multi:hover {
	color: #00d8ff;
}
.multi-item.active {
	color: #00d8ff;
}

.top-close {
	z-index: 1000;
	width: 100%;
	height: 62rpx;
	padding-left: 18rpx;
	position: fixed;

	flex-direction: row;
	display: flex;
	justify-content: left;
	align-items: flex-start;
	border-bottom: 2rpx solid #ffffff;
	.close-img {
		width: 44rpx;
		height: 44rpx;
	}
	.closeds {
		font-size: 32rpx;
		color: #ffffff;
		margin-left: 5rpx;
	}
}
/* 提示窗口 */
.uni-tip1 {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */

	width: 540rpx;
	height: 424rpx;
	background-color: #fff;
	border-radius: 14rpx;
}

.uni-tip-title1 {
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

.uni-tip-group-button1 {
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

.uni-tip-buttons {
	flex: 1;
	text-align: center;
	font-size: 36rpx;
	color: #4399fc;
}

.uni-tip-button11 {
	color: #0a0a0a;
	border-right: 1rpx solid #f1f1f1;
}
</style>
