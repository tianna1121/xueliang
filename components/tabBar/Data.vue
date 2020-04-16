<template>
	<view class="main">
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" title="我要上报" />
		<view class="item">
			<view class="item-title">事件类型</view>
			<view class="item-next">
				<picker :range="type1" @change="sizeTypeChange" :value="type1Index" mode="selector">
					<view class="uni-input">{{upData.type}}</view>
				</picker>
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">事件类别</view>
			<view class="item-next">
				<picker :range="type2" @change="sizeType2Change" :value="type2Index" mode="selector">
					<view class="uni-input">{{ upData.category }}</view>
				</picker>
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">事发时间</view>
			<view class="item-next" @tap="showPicker">
				<view class="uni-input">{{ upData.time }}</view>
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">事发地点</view>
			<view class="item-next">
				<view class="adresss" @tap="chooseLocation">{{ upData.address.address_content }}</view>
				<image class="address-icon" src="../../static/img/news/location1.png"></image>
			</view>
		</view>
		<view class="item1">
			<view class="item-title1">事件描述</view>
			<textarea maxlength="200" v-model="upData.content" class="mark-ipt" placeholder="请输入文字描述" type="text" auto-height placeholder-class="placeholder" />
		</view>
		<view class="item2">
			<view class="item-title1">图片/视频</view>
			<hUpload @schange="schange" @upload="setAttachData" ref="upload"></hUpload>
			<!-- <image class="uplaod-img" src="../../static/img/news/upload.png" @tap="upLoadImg"></image> -->
			<view class="tip-uplaod">点击上传图片/视频</view>
		</view>
		<button type="primary" class="btn-login" @tap="updataJump">上报</button>
		<w-picker
			mode="date"
			startYear="2020"
			endYear="2030"
			:value="dates"
			:current="false"
			fields="second"
			@confirm="onConfirm($event, 'date1')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="date1"
		></w-picker>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import hUpload from "@/components/h-upload/h-upload.vue"
export default {
	components: {
		uniNavBar,
		hUpload
	},
	data() {
		return {
			type1: ['点击选择', '类型1', '类型2'],
			type1Index: 0,
			type2: ['点击选择', '类别1', '类别2'],
			type2Index: 0,
			dates: '',
			upData:{
				type:"点击选择",
				category:"点击选择",
				time:"点击选择",
				address:{
					address_content:'选择地点',
					longitude:"",
					latitude:"",	
				},
				content:"",
				imgList:[]
			}
		};
	},
	onReady() {
		
		var dateee = new Date().toJSON();
		this.dates = new Date(+new Date(dateee) + 8 * 3600 * 1000)
			.toISOString()
			.replace(/T/g, ' ')
			.replace(/\.[\d]{3}Z/, '');
	
	},

	methods: {
		schange(val){
			console.log(111)
			console.log(val)
		},
		setAttachData(val){
			console.log(222)
			console.log(val)
			this.upData.imgList=val
		},
		updataJump() {
			console.log('上报提交');
			
			console.log(this.upData)
			uni.showLoading({
				title: 'loading'
			});
			setTimeout(() => {
				uni.hideLoading();
				uni.showToast({
				    title: '上报成功',
				    duration: 2000
				});
				this.cleanData();
			}, 1000);
		},
		ontrueGetList() {
			
			
		},
		cleanData(){
			this.$refs.upload.cleanAll()
			var upData={
				type:"点击选择",
				category:"点击选择",
				time:"点击选择",
				address:{
					address_content:'选择地点',
					longitude:"",
					latitude:"",	
				},
				content:"",
				imgList:[]
			}
			this.upData=upData
		},
		sizeTypeChange(e) {
			this.type1Index = parseInt(e.detail.value);
			this.upData.type=this.type1[parseInt(e.detail.value)]
		},
		sizeType2Change(e) {
			this.type2Index = parseInt(e.detail.value);
			this.upData.category=this.type2[parseInt(e.detail.value)]
		},
		
		chooseLocation: function() {
			uni.chooseLocation({
				success: res => {
					console.log(res.name);
					console.log(res.address);
					console.log(res.longitude);
					console.log(res.latitude);
					// this.location = formatLocation(res.longitude, res.latitude),
					this.upData.address.address_content = res.name;
					this.upData.address.longitude = res.longitude;
					this.upData.address.latitude = res.latitude;
				}
			});
		},
		showPicker() {
			this.$refs.date1.show();
		},
		onConfirm(res, type) {
			this.upData.time = res.result;
			console.log(res.result);
		},
		//上传图片/视频
		upLoadImg(){
			console.log("根据选择调用不同的api")
			
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
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
	}
	.item-next {
		color: #888888;
		font-size: 32rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.item-next1 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #888888;
		font-size: 32rpx;
	}

	.right-title {
		margin-right: 10rpx;
	}

	.ipt {
		text-align: right;
		width: 400rpx;
		height: 32rpx;
		margin-right: 50rpx;
	}
}

.adresss {
}
.address-icon {
	width: 36rpx;
	height: 36rpx;
	margin-left: 2rpx;
}
.item1 {
	width: 690rpx;

	display: flex;
	flex-direction: column;
	flex: 1;

	padding: 0 30rpx 70rpx;
	background-color: #ffffff;
	//border-top: 1rpx #DDDDDD solid;
	border-bottom: 1rpx #dddddd solid;
	.item-title1 {
		margin: 20rpx 0;
		font-size: 34rpx;
	}
}

.mark-ipt {
	width: 100%;
	line-height: 51rpx;
	font-size: 34rpx;
}
.uplaod-img {
	width: 158rpx;
	height: 158rpx;
}
.item2 {
	width: 690rpx;
	display: flex;
	flex-direction: column;
	flex: 1;

	padding: 0 30rpx 20rpx;
	background-color: #ffffff;

	.item-title1 {
		margin: 20rpx 0;
		font-size: 34rpx;
	}
}
.tip-uplaod {
	font-size: 20rpx;
	color: #bbbbbb;
	margin-top: 10rpx;
}
.btn-login {
	margin: 72rpx auto;
	color: #ffffff;
	font-size: 36rpx;
	width: 690rpx;
	height: 94rpx;
	background: #2256d8 !important;
	border-radius: 10rpx;
}
</style>
