<template>
	<view class="bigboxxs">
		<video
			id="myVideo"
			src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
			:show-center-play-btn="false"
			@fullscreenchange="fullscreenchange"
			:controls="false"
			:loop="true"
			@error="videoErrorCallback"
			@click="clk"
			enable-danmu="flase"
		>
		<!--顶部栏 竖屏-->
		<cover-view class="video-control" >
			<cover-view class="video-control-back" @tap.native.stop="backup"><cover-image src="../../static/img/news/back.png"></cover-image></cover-view>
			<cover-view class="video-control-text" @tap.native.stop="backup">{{ title }}</cover-view>
			<cover-view class="video-control-more"><cover-image src="../../static/img/news/menu@2x.png"></cover-image>
				<cover-view class="video-control-text1" >视频选择</cover-view></cover-view>
		
		</cover-view>
		</video>
	</view>
</template>

<script>
export default {
	data() {
		return {
			detailData: {},
			title: '2019-12-12 13:24:30 星期三',
			isMenu: false
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

			// if (!event.detail.fullScreen) {
			// 	this.backup()
			// }
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
		}
	}
};
</script>

<style lang="scss">
	video{
		width: 100%;
	}
	video::-webkit-media-controls{
		display:none !important;
	 }
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
	height: 80upx;
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
	line-height: 80upx;
}
.video-control-back cover-image {
	position: absolute;
	top: 20rpx;
	left: 20rpx;
	width: 20rpx;
	height: 34rpx;
}
.video-control-text {
	color: #ffffff;
	width: 70%;
	height: 100%;
	text-align: left;
	line-height: 80upx;
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
	width:178rpx;
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
	width:128rpx;
	text-align: right;
	height: 100%;
	line-height: 80rpx;
	margin-left: 50rpx;
	color: #ffffff;
}

</style>
