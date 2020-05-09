<template>
	<view class="main">
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" title="我要上报" />
		<view class="main_box">
		<view class="item">
			<view class="item-title">事件类型</view>
			<view class="item-next">
				<picker :range="type1" @change="sizeTypeChange" :value="typeNum1" mode="selector">
					<view class="uni-input">{{ type1[typeNum1] }}</view>
				</picker>
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">事件类别</view>
			<view class="item-next" @click="tosts">
				<picker :disabled="disabled" :range="type2" @change="sizeType2Change" :value="typeNum2" mode="selector">
					<view class="uni-input">{{ type2[typeNum2] }}</view>
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
				<view class="adresss" @tap="get_location">{{ upData.address }}</view>
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
		<view class="end">
			
		</view>
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
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import hUpload from '@/components/h-upload/h-upload.vue';
export default {
	components: {
		uniNavBar,
		hUpload
	},
	data() {
		return {
			type1: [],
			typeNum1:0,
			type2: [],
			typeNum2:0,
			type2Index: 0,
			dates: '',
			upData: {
				type: '0',
				category: '0',
				time: '点击选择',

				address: '选择地点',
				longitude: '',
				latitude: '',

				content: '',
				imgList: '',
				videoSrc:""
			},
			imgList: [],
			videoList:[],
			typeList:[],
			childList:[],
			disabled:true
		};
	},
	onReady() {
		//获取上报事件
		this.getType();
		this.dates = this.getNowFormatDate()
	},

	methods: {
		tosts(){
			if(this.type2.length<=1){
				uni.showToast({
				    title: '请先选择类型',
				    duration: 2000,
					icon:"none"
				});	
				return
			}
		},
		 // 获取当前系统时间戳
		  getNowFormatDate() {
		      var date = new Date();
		      var seperator1 = "-";
		      var seperator2 = ":";
		      var month = date.getMonth() + 1;
		      var strDate = date.getDate();
		      if (month >= 1 && month <= 9) {
		          month = "0" + month;
		      }
		      if (strDate >= 0 && strDate <= 9) {
		          strDate = "0" + strDate;
		      }
		      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		              + " " + date.getHours() + seperator2 + date.getMinutes()
		              + seperator2 + date.getSeconds();
		      return currentdate;
		  },
		
		schange(val) {
			console.log(111);
			console.log(val);
		},
		setAttachData(val) {
			console.log(222);
			console.log(val);
			
			this.imgList = val.img;
			this.videoList=val.video
			console.log(this.imgList);
		},
		updataJump() {
			console.log('上报提交');
			//console.log(this.upData);
			
			console.log(this.upData);
			this.upData.imgList=this.imgList
			this.upData.videoSrc=this.videoList
			console.log(this.upData);
			uni.showLoading({
				title: 'loading'
			});
			this.$http
				.post('/interface/rest/http/xlwb/xlgc-wb-xcx-grzx-wysb.htm', this.upData, { params: {} })
				.then(res => {
					uni.hideLoading();
					console.log('上报结果++++++');
					console.log(res);
					if (res.data.msgState == 1) {
						this.cleanData();
						uni.showToast({
							title: res.data.msg,
							duration: 2000
						});
						
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:"none"
						});
					}
					
				})
				.catch(err => {
					console.log(err);
					uni.hideLoading();
				});
			// setTimeout(() => {
			// 	uni.hideLoading();
			// 	uni.showToast({
			// 	    title: '上报成功',
			// 	    duration: 2000
			// 	});
			// 	this.cleanData();
			// }, 1000);
		},
		ontrueGetList() {
			
			
			this.dates = this.getNowFormatDate()
			//获取上报类型
			//this.getType1()
		},
		getType() {
			this.$http
				.get('/interface/rest/http/condition/xltz-sjlxlb.htm', { params: {} })
				.then(res => {
			//console.log('事件类型');
				//	console.log(res);
					if (res.data.msgState == 1) {
						var obj1 = [{ id: '0', name: '点击选择' }];
						var data = res.data.result;
						this.typeList= [...obj1, ...data];
						this.type1 = this.typeChange(this.typeList);
					
						this.type2=	this.typeChange(obj1)
					} else {
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:"none"
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
							var obj1=[{id:'0',name:"点击选择"}]
							var data=res.data.list
							var obj=[...obj1,...data]
						this.type2=	this.typeChange(obj)
					} else {
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:"none"
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		//处理函数
		typeChange(val) {
			var arr = [];
			for (let item in val) {
				//console.log(val[item].name);
				arr.push(val[item].name);
			}

			return arr;
		},
		cleanData() {
			this.$refs.upload.cleanAll();
			var upData = {
				type: '0',
				category: '0',
				time: '点击选择',

				address: '选择地点',
				longitude: '',
				latitude: '',

				content: '',
				imgList: ""
			};
			this.typeNum1=0
			this.typeNum2=0
			this.imgList=[]
			this.upData = upData;
		},
		sizeTypeChange(e) {
			
			var num=parseInt(e.detail.value)
			this.typeNum1=num
			this.upData.type =this.typeList[num].id ;
			var dataa=this.typeList[num].child
			
			var obj1=[{id:'0',name:"点击选择"}]
			this.childList=[...obj1,...dataa]
			this.type2=	this.typeChange(this.childList)
			this.disabled=false
			//console.log(this.type2)
			
		},
		sizeType2Change(e) {
			var num1=parseInt(e.detail.value)
			this.typeNum2=num1
			this.upData.category = this.childList[num1].id;
			//console.log(this.upData.type)
			//console.log(this.upData.category)
		},
		get_location() {
			const that = this;
			uni.showLoading({
				title: '加载中',
				mask: true
			});

			//#ifdef MP-WEIXIN
			uni.getSetting({
				success(res) {
					uni.hideLoading();
					if (!res.authSetting['scope.userLocation']) {
						uni.authorize({
							scope: 'scope.userLocation',
							success() {
								that.chooseLocation();
								return;
							},

							fail() {
								uni.showToast({
									title: '无法获取地图权限',
									duration: 2000,
									icon:"none"
								});
							}
						});
					} else {
						that.chooseLocation();
						return;
					}
				}
			});
			//#endif
			//that.chooseLocation()
			//uni.hideLoading()
		},
		chooseLocation: function() {
			uni.chooseLocation({
				success: res => {
					console.log(res.name);
					console.log(res.address);
					console.log(res.longitude);
					console.log(res.latitude);
					// this.location = formatLocation(res.longitude, res.latitude),
					this.upData.address= res.name;
					this.upData.longitude = res.longitude;
					this.upData.latitude = res.latitude;
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
		upLoadImg() {
			console.log('根据选择调用不同的api');
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
.main{
	
}
// .main_box{
// 	// height: 100vh;
// 	padding-bottom: 150rpx;
// 	box-sizing: border-box;
// }
.end{
	height: 125rpx;
	//background-color: red;
}
.item {
	
	width: 690rpx;
	min-height: 54rpx;
	display: flex;
	flex-direction: row;
	flex: 1;
	justify-content: space-between;
	padding: 18rpx 30rpx;
	background-color: #ffffff;
	//border-top: 1rpx #DDDDDD solid;
	border-bottom: 1rpx #dddddd solid;
	line-height: 54rpx;

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
	text-align: right;
	width: 500rpx;
	line-height: 40rpx;
	overflow: hidden;
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
	
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
	margin: 72rpx auto 50rpx;
	color: #ffffff;
	font-size: 36rpx;
	width: 690rpx;
	height: 94rpx;
	background: #2256d8 !important;
	border-radius: 10rpx;
}
</style>
