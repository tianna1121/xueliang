<template>
	<view class="main">
		<view class="item">
			<view class="item-title">事件类型</view>
			<view class="item-next">
				<picker :range="type1" @change="sizeTypeChange" :value="type1Index" mode="selector">
					<view class="uni-input">{{type1[type1Index]}}</view>
				</picker>
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">事件类别</view>
			<view class="item-next">
				<picker :range="type2" @change="sizeType2Change" :value="type2Index" mode="selector">
					<view class="uni-input">{{type2[type2Index]}}</view>
				</picker>
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">事发时间</view>
			<view class="item-next">
				<view class="uni-input">{{date}}</view>
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">事发地点</view>
			<view class="item-next">
				<view class="adresss" @tap="chooseLocation">{{locationAddress}}</view>
				<image class="address-icon" src="../../static/img/news/location1.png"></image>
			
			</view>
		</view>
		<view class="item1">
			<view class="item-title1">事件描述</view>
			<textarea maxlength='200' v-model="mark" class="mark-ipt" placeholder="请输入文字描述"  type="text" auto-height placeholder-class="placeholder"/>
		</view>
		<view class="item2">
			<view class="item-title1">图片/视频</view>
			<image class="uplaod-img" src="../../static/img/news/upload.png"></image>
		  <view class="tip-uplaod">
		  	点击上传图片/视频
		  </view>
		</view>
		<button type="primary" class="btn-login" @tap="updataJump">上报</button>
	</view>
</template>

<script>
	
	export default{
		data() {
			 const currentDate = this.getDate({
			            format: true
			        })
			return{
				type1: ['点击选择', '类型1', '类型2'],
				  type1Index: 0,
				  type2: ['点击选择', '类别1', '类别2'],
				    type2Index: 0,
					 date: currentDate,
					 locationAddress:"选择地点",
					 mark:""
			}
		},
		  computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		methods: {
             updataJump(){
				 console.log("上报提交")
			 },
			ontrueGetList(){
				uni.showToast({
					title:'我要上报'
				})
				uni.setNavigationBarTitle({
				    title: '我要上报'
				});
				console.log("加载了第三个页面，可以把网络请求放这里")
			},
			sizeTypeChange(e){
				this.type1Index = parseInt(e.detail.value)
			},
			sizeType2Change(e){
				this.type2Index = parseInt(e.detail.value)
			},
			  bindDateChange: function(e) {
			            this.date = e.target.value
			        },
					   getDate(type) {
					            const date = new Date();
					            let year = date.getFullYear();
					            let month = date.getMonth() + 1;
					            let day = date.getDate();
					
					            if (type === 'start') {
					                year = year - 60;
					            } else if (type === 'end') {
					                year = year + 2;
					            }
					            month = month > 9 ? month : '0' + month;;
					            day = day > 9 ? day : '0' + day;
					            return `${year}-${month}-${day}`;
					        },
							chooseLocation: function () {
								uni.chooseLocation({
									success: (res) => {
										  console.log( res.name)
										  console.log( res.address)
											// this.location = formatLocation(res.longitude, res.latitude),
											this.locationAddress = res.name
									}
								})
							},
			
		}
	}
</script>

<style lang="scss">
	page{
	background-color: #F8F8F8;
	}
	
	.item{
		width: 690rpx;
		height: 90rpx;
		display:flex;
		flex-direction: row;
		flex: 1;
		justify-content: space-between;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		//border-top: 1rpx #DDDDDD solid;
		border-bottom: 1rpx #DDDDDD solid;
		line-height: 90rpx;
			
		.item-title{
			font-size: 34rpx;
		}
		.item-next{
			color: #888888;
			font-size: 32rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
			
		.item-next1{
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: #888888;
			font-size: 32rpx;
		}
			
		.right-title{
			margin-right: 10rpx;
		}
			
		.ipt{
			text-align: right;
			width: 400rpx;
			height: 32rpx;
			margin-right: 50rpx;
		}
	}
			
		.adresss{
		}
	.address-icon{
		width: 36rpx;
		height: 36rpx;
		margin-left: 2rpx;
	}
	.item1{
		width: 690rpx;
		
		display:flex;
		flex-direction: column;
		flex: 1;
		
		padding: 0 30rpx 70rpx;
		background-color: #FFFFFF;
		//border-top: 1rpx #DDDDDD solid;
		border-bottom: 1rpx #DDDDDD solid;
		.item-title1{
			margin: 20rpx 0;
			font-size:34rpx;
		}
		}
			
		.mark-ipt{
			width: 100%;
			line-height:51rpx;
			font-size:34rpx;
		}
		.uplaod-img{
			width: 158rpx;
			height: 158rpx;
		}
			.item2{
				width: 690rpx;
				display:flex;
				flex-direction: column;
				flex: 1;
				
				padding: 0 30rpx 20rpx;
				background-color: #FFFFFF;
				
				.item-title1{
					margin: 20rpx 0;
					font-size:34rpx;
				}
				}
		.tip-uplaod{
			font-size: 20rpx;
			color: #BBBBBB;
			margin-top: 10rpx;
		}
		.btn-login{
				margin: 72rpx auto;
				color: #FFFFFF;
				font-size:36rpx;
				width:690rpx;
				height:94rpx;
				background:#2256D8 !important;
				border-radius:10rpx;
			}
</style>
