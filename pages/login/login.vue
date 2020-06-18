<template>
	<view class="login_box">
		<image  mode="scaleToFill"  class="bg-img" src="../../static/img/news/login_bg.png"></image>
	    <!-- logo图 -->
		<view class="main">
			<image class="logo-img" :src="logoObj.logo"></image>
			<view class="title">{{logoObj.name}}</view>
			<view class="acount-box">
				<text class="account-title">账号：</text>
				<input v-model="userInfo.username" class="ipt-tel" placeholder="请输入注册手机号"  type="number" placeholder-class="placeholder"/>	
			</view>
			<view class="acount-box passwd">
				<text class="account-title">密码：</text>
				<input v-model="userInfo.password" password class="ipt-tel " placeholder="初始密码为身份证后六位"  type="text" placeholder-class="placeholder"/>	
			</view>
			<button type="primary" class="btn-login" @tap="loginJump">登录</button>
			<view class="jump-reg" @tap="jumpRegster">注册账号</view>
		</view>
		 
	</view>
</template>

<script>
	
	import {
	  setTokenStorage,
	  getTokenStorage,
	  setPhoneStorage,
	  getOpenIdStorage
	} from '@/test/tool.js'
	//import '@/components/shoyu-xxtea/shoyu-xxtea';
	//import md5 from '@/js_sdk/ccdzhang-dokey/md5.js'
	export default {
		data() {
			return {
				logoObj:{},
				userInfo:{
					username:"",
					password:""
				}
			};
		},
		components:{
		
		},
		mounted() {
		},
		onReady(){
			this.getLogo()
			
		},
		methods:{
			//获取logo
			getLogo(){
				console.log('++++++++')
				//发起请求
				var token=`281179305_eN2cdo2snJhvbJO2ZC3FzMUNLC2kloZWjJavbkak3cXOLC2abp6WbC3F3i3T3mZNbJ0ixc_T3maRZm92ZC3FzCwiloy8bJ5mlo2S3cXOLC2TbJdWbauWbpUixcEKx8f5z8_Kzs_JzM3T3mKhlm9NlpQixi3w3iwibpqRdUak3cX0zs_0zskOzMET3m5WnJSxnpKa3cXidGqMd8zKzcQO3iwijGhvbmUixi3iLC2wlpQixi3iLC2NZp6Tsm6SZt3F3YuajIQMys30zt3T3Y2vbGUixcQT3YyclG9vbE5hbpUixiLWmFrkRV7aSFoYV3TiLC2MZpyKjma0eqBhjIyIbI2k3cXizsQNzcQNx8_Oya9rt4ZHemyFsoWcyN3T3YyXbI20sm6SZt3F3YhTZJziLC20daqMZo22ZC3FzCwidp5WdC3F3m5KbGwiLC2KjJqNtpQixczKzcQT3YqMZo2xnpKa3cXidGqMd8zKzcQO3iwidIhKjJqNlpQixi20Zoy0zMUNy8EigQ`
				setTokenStorage(token)
				this.$http.get('/interface/rest/http/xlwb/xlgc-wb-xcx-logo.htm').then(res => {
					
					console.log("logo获取");
					console.log(res.data);
					if(res.data.msgState==1){
						this.logoObj=res.data.list[0]
							setTokenStorage('')
							}else{
						uni.showToast({
							 title: res.data.msg,
							 duration: 2000,
							 icon:'none'
						})
						
					}
				}).catch(err => {
					console.log(err);
					
					uni.showToast({
						 title: '获取logo失败！',
						 duration: 2000,
						 icon:'none'
					})
				})
				
			},
			jumpRegster(){
				
				var token=`281179305_eN2cdo2snJhvbJO2ZC3FzMUNLC2kloZWjJavbkak3cXOLC2abp6WbC3F3i3T3mZNbJ0ixc_T3maRZm92ZC3FzCwiloy8bJ5mlo2S3cXOLC2TbJdWbauWbpUixcEKx8f5z8_Kzs_JzM3T3mKhlm9NlpQixi3w3iwibpqRdUak3cX0zs_0zskOzMET3m5WnJSxnpKa3cXidGqMd8zKzcQO3iwijGhvbmUixi3iLC2wlpQixi3iLC2NZp6Tsm6SZt3F3YuajIQMys30zt3T3Y2vbGUixcQT3YyclG9vbE5hbpUixiLWmFrkRV7aSFoYV3TiLC2MZpyKjma0eqBhjIyIbI2k3cXizsQNzcQNx8_Oya9rt4ZHemyFsoWcyN3T3YyXbI20sm6SZt3F3YhTZJziLC20daqMZo22ZC3FzCwidp5WdC3F3m5KbGwiLC2KjJqNtpQixczKzcQT3YqMZo2xnpKa3cXidGqMd8zKzcQO3iwidIhKjJqNlpQixi20Zoy0zMUNy8EigQ`
				setTokenStorage(token)
				uni.redirectTo({
				    url: '../register/register',
					
				});
			},
			loginJump(){
				let openid=getOpenIdStorage();
				setTokenStorage('')
				var that=this;
				console.log(this.userInfo);
				if(this.userInfo.username.length<1){
					uni.showModal({
						 // title: "登录提示",
						content: "请输入账号!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				};
				if(this.userInfo.password.length<1){
					uni.showModal({
						 // title: "登录提示",
						content: "请输入密码!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				};
					this.userInfo.openId=openid
				var obj= Object.assign({}, this.userInfo);
				//obj.password=md5(obj.password)
				console.log(obj.password)
				uni.showLoading({
					title: 'loading'
				});
				//发起请求
				this.$http.post('/interface/rest/http/xlwb/xlgc-wb-jdh-yhdl.htm',obj).then(res => {
					uni.hideLoading();
					console.log(res.data);
					if(res.data.msgState==1){
						
							uni.showToast({
								 title: '登陆成功！',
								 duration: 2000,
								 
							})
							//设置token
							 setTokenStorage(res.data.token) // todo 储存token，可更换为自己的储存token逻辑
						   setPhoneStorage(that.userInfo.username)
							uni.redirectTo({
							    url: '../index/index?show_index=0',
								
							});
							}else{
						uni.showToast({
							 title: res.data.msg.split('。')[1],
							 duration: 2000,
							 icon:'none'
						})
						
					}
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						 title: '登陆失败！',
						 duration: 2000,
						 icon:'none'
					})
				})
				//TODO
				// uni.redirectTo({
				//     url: '../index/index',
					
				// });
			}
		}
			
		
	
	}
	
</script>

<style lang='scss'>
			page{
				position: relative;
				width: 100%;
				height: 100%;
			}
		.bg-img{
			width: 750rpx;
			position: absolute;
			height: 100%;
			
		}
			
		.main{
			z-index: 100;
			display: flex;
			flex-direction: column;
			flex: 1;
			
		}
		.login-box{
			z-index: 100;
			display: flex;
			flex-direction: column;
			flex: 1;
		}
		.logo-img{
			z-index: 100;
			width: 330rpx;
			height: 330rpx;
			margin: 128rpx auto 0;
			border-radius: 50%;
			
		}
		.title{
			z-index: 100;
			font-size:70rpx;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
		}
			
		.acount-box{
			z-index: 100;
			width: 630rpx;
			height: 50rpx;
			margin: 88rpx auto 12rpx;
			background:rgba(255,255,255,0.2);
			border-radius:5rpx;
	        display: flex; 
			flex-direction:row;
			flex: 1;
			padding: 20rpx 30rpx;
		}
			
		.account-title{
			z-index: 100;
			color: #DAE1EC;
			font-size:34rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		
		.ipt-tel{
			color: #FFFFFF;
			font-size: 34rpx;
			display: flex;
			height: 54rpx;
			width: 400rpx;
			flex-direction: column;
			justify-content: center;
			
		}
		.placeholder{
			color: #DAE1EC;
		}
		.passwd{
			margin-top: 25rpx;
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
				
			.jump-reg{
				z-index: 100;
				width:136rpx;
				height:68rpx;
				font-size:34rpx;
				
				color:#FFFFFF;
				line-height:68rpx;
				margin: 155rpx auto 0
			}
	
</style>
