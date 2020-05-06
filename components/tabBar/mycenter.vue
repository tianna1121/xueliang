<template>
	<view class="main">
		<!-- 背景图 -->
		<image class="center-img" src="../../static/img/news/bg.png" mode=""></image>
		<view class="top-box">
			<view class="avatar-box" @tap="changeAvatar">
				<image class="avatar" :src="userInfo.avatar" mode=""></image>
				<image class="icon-avatar" src="../../static/img/news/avatar.png" mode=""></image>
			</view>
			<view class="name">{{ userInfo.username }}</view>
			<view class="unit">单位：{{ userInfo.unit||'未设置' }} | 角色：{{ userInfo.jue ||"未设置"}}</view>
		</view>
		<view class="item">
			<view class="item-title">账号</view>
			<view class="item-next">{{ userInfo.account }}</view>
		</view>
		<view class="item">
			<view class="item-title">性别</view>
			<view class="item-next">{{ userInfo.sex == '1' ? '男' : '女' }}</view>
		</view>
		<view class="item">
			<view class="item-title">身份证号</view>
			<view class="item-next">{{ userInfo.idCard }}</view>
		</view>
		<view class="item">
			<view class="item-title">手机号码</view>
			<view class="item-next" @tap="changePhone">
				<view class="uni-input">{{ userInfo.phone }}</view>
				<uni-icons style="margin-top: 5rpx;" type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">注册时间</view>
			<view class="item-next">{{ userInfo.creatTime }}</view>
		</view>
		<view class="myrport" @tap="myUpdata">我的上报</view>
		<view class="myrport myrport1" @tap="loginOut">退出登录</view>
		<uni-popup ref="showtip" type="center" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">退出登录</text>
				<text class="uni-tip-content">您确定要退出登录吗？</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button uni-tip-button1 " @click="cancel('tip')">取消</text>
					<text class="uni-tip-button" @click="loginout">退出登录</text>
				</view>
			</view>
		</uni-popup>
		<action ref="action" @itemClick="itemClick" @titleClick="titleClick"></action>
	</view>
</template>

<script>

import action from '@/components/shufei-action/action.vue';
export default {
	components: { action },
	data() {
		return {
			userInfo: {},
			isTrue:false
		};
	},
	methods: {
		ontrueGetList() {
			// uni.showToast({
			// 	title: '个人中心'
			// });
			console.log('加载了个人中心，可以把网络请求放这里');
			
			this.getMsg()
		},
		//获取个人中心基本信息
		getMsg(){
			if(this.isTrue){
				return
			}
			console.log("个人数据")
			this.$http
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-grzxsj.htm')
				.then(res => {
					
					console.log(res);
					if (res.data.msgState == 1) {
						var userInfo=res.data.list[0]
						this.userInfo=userInfo
						if(this.userInfo.avatar.length<10){
						this.userInfo.avatar="http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg"	
						}
						
					}
					
				})
				.catch(err => {
					console.log(err);
					
				});
		},
		//修改头像
		changeAvatar(e) {
			this.$refs.action.actionConfig = {
				 // title: '选择',
				list: ['预览头像', '拍摄照片', '从相册选择'],
				type: 0,
				isBorderColor: false,
				specClass: 'show'
			};
		},
		itemClick(index, type) {
			this.isTrue=true
			//这里根据不同的类型点击的索引值,做对应的逻辑处理
			console.log(`你点击的action-sheet的类型是${type},list对应的索引值是${index}`);
			var _this = this;
			var sourceType = ['album'];
			switch (index) {
				case 0:
					var imglist = [];
					imglist.push(this.userInfo.avatar);
					uni.previewImage({
						urls:imglist
					});
					break;
				case 1:
					sourceType = ['camera'];
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['camera'], //拍照
						success: function(res) {
							_this.chooseImage1(res.tempFilePaths[0]) ;
							// console.log(JSON.stringify(res.tempFilePaths[0]));
						}
					});
					break;
				case 2:
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							_this.chooseImage1(res.tempFilePaths[0]) ;
							//_this.userInfo.img = res.tempFilePaths[0];
							//console.log(JSON.stringify(res.tempFilePaths[0]));
						}
					});
					break;
				default:
					break;
			}
		},
		//上传头像
		chooseImage1(val){
			uni.showLoading({
				title: '上传中...',
				mask: true
			})
			uni.uploadFile({
				url: 'https://app8848.com/interface/rest/file/upload/util/uploadFile.htm', //仅为示例，非真实的接口地址
				 header:{token:"311288512_eN2cdo2snJhQbJO2mC36zszJLC2kaomWjJlQbklk3cXOLC2lbpFWbC363i3T3ZmNbJ0ixcAT3ZlRmZ92mC36zCPiaoy8bJGZao2S3cXOLC2TbJdWbluWbpUixcE1x8vGzckPzc3Hy8vT3Z1haZ9Napvixi3iLC2SmpG1tpvixcE1yMUT3ZGWnJSxnp1l3cXiGnin6362GXCd3iPij5hQbZUixi3iLC2Papvixi3OzsEOzsEOzsEOzsEOzsEiLC2NmpFTsZFSmt363Rp3ZxixieaAYt3T3Y2Qb5UixcvT3Yyca59QbEGhbpUixiLlhb8Wg2slWKflraniLC2Mmpy1jZl0eVBhjIyIbI2k3cXix8nMysvPx8dfnkdHek1UtoWyeklH3iPijJhQjYuxnp1l3cXisFunpt3T3YuJVoyljklk3cXPLC21bZl03cXibYVTbC3T3YVMmo22mC36zszJx8kHLC21jJVNsZFSmt363ZOWdpOWjJkiLC2Ie4VMmo2WmC363ZOWdpOWjJkifv"},
				filePath: val,
				name: 'file',
				
				success: (uploadFileRes) => {
					// console.log("图片上传+++++++")
					// console.log(JSON.parse(uploadFileRes.data));
					
					var datas=JSON.parse(uploadFileRes.data)
					if(datas.msgState==1){
						this.isTrue=true
						//将返回的数据存入img,并通知外界
						// 默认返回的有路径，字段名 url
						this.updata(datas.result);
						return datas.result;
						
						
					}else{
						this.isTrue=false
						uni.showToast({
						    title: '上传失败，请重新上传',
						    duration: 2000
						});
					
					}
					
				}
			});
			
			},
		updata(val){
			var obj={avatar:val}
			var that=this
			this.$http
				.post('/interface/rest/http/xlwb/xlgc-wb-xcx-grzx-xgtx.htm', obj)
				.then(res => {
					console.log('图像上传');
					console.log(res);
					if (res.data.msgState == 1) {
						this.userInfo.avatar=val
					}
					uni.showToast({
						title: res.data.msg,
						duration: 2000
					});
				})
				.catch(err => {
					console.log(err);
			
				});
		},
		titleClick(type) {
			//这里根据不同的类型做对应的逻辑处理
			console.log(type);
		},
		//修改手机号
		changePhone() {
			let data = {
				phone: this.userInfo.phone
			};
			let url = 'change-phone';

			uni.navigateTo({
				url: `/pages/change-phone/${url}?data=${JSON.stringify(data)}`
			});
		},
		loginOuts() {
			this.$refs.showtip.open();
		},
		cancel(type) {
			this.$refs.showtip.close();
		},
		//退出登陆
		loginOut() {
			uni.redirectTo({
				url: `/pages/login/login`
			});
		},
		//我的上报
		myUpdata(){
			uni.navigateTo({
				url: `/pages/my-report/my-report`
			});
		}
	}
};
</script>

<style lang="scss">
.main {
	position: relative;
}

// padding-bottom:120rpx;box-sizing: border-box;重要*************************保证页面底部内容不被隐藏也不会出现多余的滚动条
.main_box {
	width: 100vw;
	height: 100vh;
	padding-bottom: 120rpx;
	box-sizing: border-box;
}

.main_centent {
	width: 100%;
	height: 100vh;
	color: #fff;
	letter-spacing: 4rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

image {
	width: 750rpx;
	height: 750rpx;
}

.center-img {
	width: 750rpx;
	height: 460rpx;
	position: absolute;
	z-index: -1;
}

.top-box {
	width: 750rpx;
	height: 460rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	z-index: 1000;
	flex: 1;
}

.avatar-box {
	position: relative;
	text-align: center;
	margin: 50rpx auto 0;
}

.icon-avatar {
	position: absolute;
	top: 160rpx;
	left: 125rpx;
	width: 30rpx;
	height: 30rpx;
}

.avatar {
	width: 190rpx;
	height: 190rpx;
	border-radius: 190rpx;
}

.name {
	font-size: 36rpx;
	color: #ffffff;
	font-weight: 600;
	margin: 32rpx auto 20rpx;
}

.unit {
	font-size: 28rpx;
	color: #ffffff;
	font-weight: 600;
	margin: 0rpx auto;
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
.myrport {
	width: 750rpx;
	height: 90rpx;
	margin: 20rpx auto;
	color: #2256d8;
	font-size: 32rpx;
	text-align: center;
	line-height: 90rpx;
	background-color: #ffffff;
}
.myrport1 {
	color: #000000;
}
</style>
