<template>
	<view class="detail-box" id="bigboxs">
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" left-icon="arrowleft" left-text="返回" title="消息详情" @clickLeft="back" />
		<!-- 内容 -->
		<view class="title-box">{{ detailData.title }}</view>
		<view class="content">{{ detailData.content }}</view>
		<!-- 通知公告确认按钮 -->
		<button type="primary" class="btn-login" @tap="confirmMsg">确认收到</button>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
export default {
	components: {
		uniNavBar
	},
	data() {
		return {
			detailData: {}
		};
	},
	//接受上个页面传过来的值
	onLoad(options) {
		this.detailData = JSON.parse(options.data);
		this.loadNewsList();
	var	windowHeight = uni.getSystemInfoSync().windowHeight;
	console.log('windowHeight')
	console.log(windowHeight)
	let hel=0
const query = uni.createSelectorQuery().in(this);
query.select('#bigboxs').boundingClientRect(data => {

  hel=data.height;
}).exec();
		if(hel>windowHeight){
			console.log(666)
		}
				
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

.btn-login {
	margin: 340rpx auto 44rpx;
	color: #ffffff;
	font-size: 36rpx;
	width: 690rpx;
	height: 94rpx;
	background: #2256d8 !important;
	border-radius: 10rpx;
}
</style>
