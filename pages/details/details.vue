<template>
	<view>
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" left-icon="arrowleft" left-text="返回" title="事件详情" @clickLeft="back" />
		<!-- 内容 -->
		<view class="main-title1">事件信息</view>
		<view class="item">
			<view class="item-title">上报终端</view>
			<view class="item-next">{{ detailData.up_report }}</view>
		</view>
		<view class="item">
			<view class="item-title">事件类型</view>
			<view class="item-next">{{ detailData.type }}</view>
		</view>
		<view class="item">
			<view class="item-title">事件类别</view>
			<view class="item-next">{{ detailData.category}}</view>
		</view>
		<view class="item">
			<view class="item-title">事发时间</view>
			<view class="item-next">{{ detailData.time }}</view>
		</view>
		<view class="item1">
			<view class="item-title1">事件描述</view>
			<view class="conents1">{{ detailData.content }}</view>
		</view>

		<view class="item2">
			<view class="item-title1">图片/视频</view>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<image v-for="(image, index) in detailData.imgList" :key="index" class="uplaod-img" @tap="previewImage" :data-src="image" :src="image"></image>
			</scroll-view>
		</view>
		<view class="item">
			<view class="item-title">事发地点</view>
			<view class="item-next">
				<view class="adresss">{{ detailData.address }}</view>
				<image class="address-icon" src="../../static/img/news/location1.png"></image>
			</view>
		</view>
		<!-- 地图占位 -->
		<view class="map-box"><map style="width: 750rpx; height:386rpx;" :latitude="detailData.latitude" :longitude="detailData.longitude" :markers="covers"></map></view>
		<view class="main-title2">当前状态</view>
		<view class="item">
			<view class="item-title">当前状态</view>
			<view class="item-next1">{{ statusChange(detailData.status) }}</view>
		</view>
		<view class="item1 item11">
			<view class="item-title1">处理进程</view>
			<view class="conents2"><uni-steps :options="detailData.processingProcess" :active="detailData.status" /></view>
		</view>
		<view class="item1 ">
			<view class="item-title1">反馈内容</view>
			<view class="conents1">{{ detailData.feedback_content||'暂无反馈' }}</view>
			<view class="times1">{{ detailData.feedback_time }}</view>
		</view>
		<view class="main-title1">处理队员信息</view>
		<uni-list><uni-list-item :title="detailData.name" :rightText="detailData.phone" :show-arrow="false" :thumb="detailData.url" /></uni-list>
		<button type="primary" class="btn-login" @tap="submitMsg">处理完成</button>

		<image src="../../static/img/news/aa.png" class="fabs" @tap="alertMsg"></image>

		<uni-popup ref="showtip" type="center" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">处理完成</text>
				<text class="uni-tip-content">确认事件已经处理完成？</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button uni-tip-button1 " @click="cancel('tip')">取消</text>
					<text class="uni-tip-button" @click="submitOver">处理完成</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="showtip1" :type="showtip1" :mask-click="false">
			<view class="uni-tip1">
				<text class="uni-tip-title1">我要反馈</text>
				<textarea
					class="popup_textarea uni-input"
					cursor-spacing="20px"
					:adjust-position="true"
					:show-confirm-bar="flase"
					placeholder="输入内容..."
					v-model="feedbackContent"
				></textarea>
				<view class="uni-tip-group-button1">
					<text class="uni-tip-buttons uni-tip-button11 " @click="cancel('tip')">关闭</text>
					<text class="uni-tip-buttons" @click="submitFeedbackContent">提交</text>
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
			id:"",
			showtip1: 'center',
			detailData: {},
			imgList: [],
			active: 1,
type1:[],
category:[],
			userFeedbackHidden: true, // 默认隐藏
			feedbackContent: '', // 用户反馈内容
			latitude: 30.663429,
			longitude: 104.072422,
			covers: [
				{
					latitude: 30.663429,
					longitude: 104.072422,
					iconPath: '../../static/location.png',
					width: 50,
					height: 50
				}
			]
		};
	},
	onLoad(options) {
		var detailData = JSON.parse(options.data);
		this.id=detailData.id;
		console.log(this.id)
		// this.detailData = json.detail.data;
		//this.loadNewsList();
		//获取上报事件
		this.getType();
		//获取上报类型
		this.getType1()
	},
	onReady(){this.loadNewsList()},
	methods: {
		getType() {
			this.$http
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-sjlxxz.htm', { params: {} })
				.then(res => {
					console.log('事件类型');
					console.log(res);
					if (res.data.msgState == 1) {
						this.type1= res.data.list;
						
					} else {
						uni.showLoading({
							title: '获取事件类型失败'
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getType1() {
			this.$http
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-sjlbxz.htm', { params: {} })
				.then(res => {
					console.log('事件类别');
					console.log(res);
					if (res.data.msgState == 1) {
							this.category=res.data.list
					} else {
						uni.showLoading({
							title: '获取事件类别失败'
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		//处理函数
		typeChange() {
			
			console.log( this.type1)
			for (let i = 0; i < this.type1.length; i++) {
				if(this.type1[i].id==this.detailData.type){
					this.detailData.type=this.type1[i].name
				}
			}
			return '无';
		},
		//处理函数
		typeChange1(val) {
			console.log(val)
			console.log( this.category)
			for (let i = 0; i < this.category.length; i++) {
				if(this.category[i].id==this.detailData.category){
					this.detailData.category=this.category[i].name
				}
			}
			return '无';
		},
		//获取推荐列表
		async loadNewsList() {
			uni.showLoading({
				title: '加载中...'
			});
			// this.detailData = json.detail.data;
			// console.log(this.detailData);
			this.$http
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-sjzx-sjxq.htm', {
					params: {
						id: this.id
					}
				})
				.then(res => {
					uni.hideLoading();
					console.log(res);
					if (res.data.msgState == 1) {
						var list = res.data.list;
						console.log('list');
						console.log(list);
						this.detailData=list[0];
						this.covers[0].latitude= list[0].latitude;
						this.covers[0].longitude= list[0].longitude;
						//处理进度
						this.processingProcess()
						//处理图片
						this.imgsrc()
						//处理类型
					   this.typeChange1()
					   this.typeChange()
					} else {
						uni.showToast({
							title:"请求失败"
						})
					}
				})
				.catch(err => {
					console.log(err);
					uni.hideLoading();
				});
		},
		imgsrc(){
			if(this.detailData.imgsrc.length>0){
				var str=this.detailData.imgsrc.split(',');
				console.log(str)
				this.detailData.imgList=[...str]
				
			}
			
		},
		processingProcess(){
			var str=this.detailData.jd.split(',');
			console.log(str)
			var processingProcess=[]
			for (var i = 0; i < str.length; i++) {
				var os=str[i].split('  ');
				console.log(os)
				var obj={}
				obj.title=os[0];
				obj.desc=os[1];
				processingProcess.push(obj)
			}
			console.log(processingProcess)
			this.detailData.processingProcess=processingProcess
			
		},
		statusChange(index) {
			switch (index) {
				case 0:
					return '待处理';
					break;
				case 1:
					return '待办';
					break;
				case 2:
					return '待办结';
					break;

				case 3:
					return '已办结';
					break;
					case 3:
						return '无效';
						break;
				default:
					return '待处理';
			}
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
			console.log('current');
			console.log(current);
			uni.previewImage({
				current: current,
				urls: this.detailData.imgList
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
			});
		},

		submitFeedbackContent() {
			
			var obj={feedback_content:this.feedbackContent,id:this.id}
			//发起请求
			this.$refs.showtip1.close();
			uni.showLoading({
				title: 'loading'
			});
			this.$http.post('/interface/rest/http/xlwb/xlgc-wb-xcx-sjzx-wyfk.htm',obj).then(res => {
				uni.hideLoading();
				console.log(res.data);
				if(res.data.msgState==1){
					
					this.detailData.feedback_content = this.feedbackContent;
					
					
				}
				uni.showToast({
				    title: res.data.msg,
				    duration: 2000
				});
			}).catch(err => {
				console.log(err);
				uni.hideLoading();
			})
			
		},
		submitOver(){
				this.$refs.showtip.close();
			this.$http
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-sjzx-clwc.htm', {
					params: {
							id: this.id
					}
				})
				.then(res => {
					console.log(res);
					if (res.data.msgState == 1) {
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000
						});
						setTimeout(() => {
							this.back()
						}, 1000);
						 
					} else {
						uni.showLoading({
							title: '请求失败'
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
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

.adresss {
}

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
