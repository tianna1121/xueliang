<template>
	<view>
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" left-icon="arrowleft"
		 left-text="返回" title="事件详情" @clickLeft="back" />
		<!-- 内容 -->
		<view class="main-title1">事件信息</view>
		<view class="item">
			<view class="item-title">上报终端</view>
			<view class="item-next">小程序</view>
		</view>
		<view class="item">
			<view class="item-title">事件类型</view>
			<view class="item-next">类型一</view>
		</view>
		<view class="item">
			<view class="item-title">事件类别</view>
			<view class="item-next">类别1</view>
		</view>
		<view class="item">
			<view class="item-title">事发时间</view>
			<view class="item-next">{{ detailData.time }}</view>
		</view>
		<view class="item1">
			<view class="item-title1">事件描述</view>
			<view class="conents1">在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。</view>
		</view>

		<view class="item2">
			<view class="item-title1">图片/视频</view>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<image v-for="(image, index) in imgList" :key="index" class="uplaod-img" @tap="previewImage" :data-src="image" :src="image"></image>
			</scroll-view>
		</view>
		<view class="item">
			<view class="item-title">事发地点</view>
			<view class="item-next">
				<view class="adresss">美兴镇-营盘村</view>
				<image class="address-icon" src="../../static/img/news/location1.png"></image>
			</view>
		</view>
		<!-- 地图占位 -->
		<view class="map-box"></view>
		<view class="main-title2">当前状态</view>
		<view class="item">
			<view class="item-title">当前状态</view>
			<view class="item-next1">待办结</view>
		</view>
		<view class="item1 item11">
			<view class="item-title1">处理进程</view>
			<view class="conents2">
				<uni-steps :options="list2" active-color="#007AFF" :active="active" />
			</view>
		</view>
		<view class="item1 ">
			<view class="item-title1">反馈内容</view>
			<view class="conents1">请更换附近队员进行处理,在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。</view>
			<view class="times1">2019-10-21 13:20:30</view>
		</view>
		<view class="main-title1">处理队员信息</view>
		<uni-list>
			<uni-list-item title="张三" rightText="13812345678" :show-arrow="false" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
		</uni-list>
		<button type="primary" class="btn-login" @tap="submitMsg">处理完成</button>

		<image src="../../static/img/news/aa.png" class="fabs" @tap="alertMsg"></image>

		<uni-popup ref="showtip" type="center" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">处理完成</text>
				<text class="uni-tip-content">确认事件已经处理完成？</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button uni-tip-button1 " @click="cancel('tip')">取消</text>
					<text class="uni-tip-button" @click="cancel('tip')">处理完成</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="showtip1" type="center" :mask-click="false">
			<view class="uni-tip1">
				<text class="uni-tip-title1">我要反馈</text>
				<textarea class="popup_textarea" focus placeholder="输入内容..." v-model="feedbackContent"></textarea>
				<view class="uni-tip-group-button1">
					<text class="uni-tip-buttons uni-tip-button11 " @click="cancel('tip')">关闭</text>
					<text class="uni-tip-buttons" @click="cancel('tip')">提交</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import uniSteps from '@/components/uni-steps/uni-steps.vue';
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import json from '@/json';

	export default {
		components: {
			uniNavBar,
			uniSteps,
			uniList,
			uniListItem,
			uniPopup
		},
		data() {
			return {
				detailData: {},
				imgList: [],
				active: 1,
				list2: [{
						title: '待处理',
						desc: '2018-11-11'
					},
					{
						title: '待办',
						desc: '2018-11-12'
					},
					{
						title: '处理中',
						desc: '2018-11-13'
					},
					{
						title: '待办结',
						desc: '2018-11-14'
					},
					{
						title: '已办结',
						desc: '2018-11-14'
					}
				],
				userFeedbackHidden: true, // 默认隐藏
				feedbackContent: '' // 用户反馈内容
			};
		},
		onLoad(options) {
			this.detailData = JSON.parse(options.data);
			this.loadNewsList();
		},
		methods: {
			//获取推荐列表
			async loadNewsList() {
				console.log(this.detailData);
				this.imgList = [
					'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
					'http://fc-feed.cdn.bcebos.com/0/pic/dc4b0610241d7016279f4f4652ea0886.jpg',
					'http://fc-feed.cdn.bcebos.com/0/pic/0f6effa42536fb5c2ca945bd46c59335.jpg',
					'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2133231534,4242817610&fm=173&app=49&f=JPEG?w=218&h=146&s=4FB42BC55E2A26076B2D1301030060C6',
					'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1276936674,3021787485&fm=173&app=49&f=JPEG?w=218&h=146&s=4FB02FC40B00064332AD45170300D0C7',
					'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1909353310,863816541&fm=173&app=49&f=JPEG?w=218&h=146&s=25F67E844C002445437DE8810300E0D3'
				];
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			scroll(e) {
				console.log(e.detail.scrollTop);
			},
			//图片预览
			previewImage(e) {
				
				var current = e.target.dataset.src;
				console.log('current')
				console.log(current)
				uni.previewImage({
					current: current,
					urls: this.imgList
				});
			},
			submitMsg() {
				console.log('確認完成');
				this.$nextTick(() => {
					this.$refs.showtip.open();
				});
			},
			alertMsg() {
				console.log('我要反馈');
				this.$nextTick(() => {
					this.$refs.showtip1.open();
				});;
			},


			cancel(type) {

				this.$refs.showtip.close();
				this.$refs.showtip1.close();
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.main-title1 {
		font-size: 28rpx;
		color: #888888;
		background-color: #f5f5f9;
		width: 719rpx;
		height: 36rpx;
		padding: 40rpx 0 20rpx 31rpx;
	}

	.item {
		width: 690rpx;
		height: 90rpx;
		display: flex;
		flex-direction: row;
		flex: 1;
		justify-content: space-between;
		padding: 0 30rpx;
		background-color: #ffffff;
		//border-top: 1rpx #DDDDDD solid;
		border-bottom: 1rpx #dddddd solid;
		line-height: 90rpx;

		.item-title {
			font-size: 34rpx;
			color: #000000;
		}

		.item-next {
			color: #888888;
			font-size: 32rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	}

	.item1 {
		width: 690rpx;

		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0 30rpx 20rpx;
		border-bottom: 1rpx #dddddd solid;
		background-color: #ffffff;

		.item-title1 {
			margin: 20rpx 0;
			font-size: 34rpx;
		}

		.conents1 {
			font-size: 34rpx;
			color: #919191;
		}

		.conents2 {
			font-size: 28rpx;
			margin: 30rpx auto;
		}

		.times1 {
			color: #888888;
			font-size: 28rpx;
			margin: 78rpx 0 18rpx 0;
		}
	}

	.item11 {
		border-bottom: none;
		margin-top: 0;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.uplaod-img {
		width: 202rpx;
		height: 202rpx;
		margin-left: 20rpx;
	}

	.item2 {
		width: 690rpx;
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0 30rpx 70rpx;
		border-bottom: 1rpx #dddddd solid;
		background-color: #ffffff;

		.item-title1 {
			margin: 20rpx 0;
			font-size: 34rpx;
		}
	}

	.adresss {}

	.address-icon {
		width: 36rpx;
		height: 36rpx;
		margin-left: 2rpx;
	}

	.map-box {
		width: 100%;
		height: 386rpx;
		background-color: blue;
	}

	.main-title2 {
		font-size: 28rpx;
		color: #888888;
		background-color: #f5f5f9;
		width: 719rpx;
		height: 36rpx;
		padding: 20rpx 0 20rpx 31rpx;
	}

	.item-next1 {
		color: #108ee9;
		font-size: 32rpx;
	}

	.btn-login {
		margin: 52rpx auto;
		color: #ffffff;
		font-size: 36rpx;
		width: 690rpx;
		height: 94rpx;
		background: #2256d8 !important;
		border-radius: 10rpx;
	}

	/*
		*悬浮按钮图片
		*/

	.fabs {
		width: 140rpx;
		height: 140rpx;
		position: fixed;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		z-index: 10;
		bottom: 300rpx;
		right: 22rpx;
	}

	/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15rpx;
		width: 540rpx;
		height: 270rpx;
		background-color: #fff;
		border-radius: 14rpx;
	}

	.uni-tip-title {
		margin-top: 27rpx;
		margin-bottom: 10px;
		text-align: center;
		font-size: 36rpx;
		color: #000;
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
		margin-top: 20px;
		height: 100rpx;
		line-height: 100rpx;
		border-top: 1rpx solid #f1f1f1;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 36rpx;
		color: #0a0a0a;
	}

	.uni-tip-button1 {
		border-right: 1rpx solid #f1f1f1;
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
