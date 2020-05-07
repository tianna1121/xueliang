<template>
	<view class="login_box">
		<image  mode="scaleToFill"  class="bg-img" src="../../static/img/news/login_bg.png"></image>
	    <!-- logo图 -->
		<view class="main">
			<image class="logo-img" src="../../static/img/news/xuelogo.png"></image>
			<view class="title">雪亮工程</view>
			<view class="acount-box">
				<text class="account-title">账号：</text>
				<input v-model="userInfo.username" class="ipt-tel" placeholder="请输入注册手机号"  type="number" placeholder-class="placeholder"/>	
			</view>
			<view class="acount-box passwd">
				<text class="account-title">密码：</text>
				<input v-model="userInfo.password" class="ipt-tel " placeholder="初始密码为身份证后六位"  type="idcard" placeholder-class="placeholder"/>	
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
	  configHandle
	} from '@/test/tool.js'
	//import '@/components/shoyu-xxtea/shoyu-xxtea';
	export default {
		data() {
			return {
				userInfo:{
					username:"",
					password:""
				}
			};
		},
		components:{
			
		},
		mounted() {
			setTokenStorage('')
		},
		methods:{
			jumpRegster(){
				var token=`311288512_eN2cdo2snJhQbJO2mC36zszJLC2kaomWjJlQbklk3cXOLC2lbpFWbC363i3T3ZmNbJ0ixcAT3ZlRmZ92mC36zCPiaoy8bJGZao2S3cXOLC2TbJdWbluWbpUixcE1x8vGzckPzc3Hy8vT3Z1haZ9Napvixi3iLC2SmpG1tpvixcE1yMUT3ZGWnJSxnp1l3cXiGnin6362GXCd3iPij5hQbZUixi3iLC2Papvixi3OzsEOzsEOzsEOzsEOzsEiLC2NmpFTsZFSmt363Rp3ZxixieaAYt3T3Y2Qb5UixcvT3Yyca59QbEGhbpUixiLlhb8Wg2slWKflraniLC2Mmpy1jZl0eVBhjIyIbI2k3cXix8nMysvPx8dfnkdHek1UtoWyeklH3iPijJhQjYuxnp1l3cXisFunpt3T3YuJVoyljklk3cXPLC21bZl03cXibYVTbC3T3YVMmo22mC36zszJx8kHLC21jJVNsZFSmt363ZOWdpOWjJkiLC2Ie4VMmo2WmC363ZOWdpOWjJkifv`
				setTokenStorage(token)
				uni.redirectTo({
				    url: '../register/register',
					
				});
			},
			loginJump(){
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
					
				var obj= Object.assign({}, this.userInfo);
				//obj.password=Base64.encode(obj.password)
				console.log(obj.password)
				uni.showLoading({
					title: 'loading'
				});
				//发起请求
				this.$http.post('/interface/rest/http/xlwb/xlgc-wb-jdh-yhdl.htm',obj).then(res => {
					uni.hideLoading();
					console.log(res.data);
					if(res.data.msgState==1){
						if(res.data.list.length>0){
							uni.showToast({
								 title: '登陆成功！',
								 duration: 2000,
								 
							})
							//设置token
							 setTokenStorage(res.data.list[0].token) // todo 储存token，可更换为自己的储存token逻辑
							uni.redirectTo({
							    url: '../index/index?show_index=0',
								
							});
							
						}else{
							uni.showToast({
								 title: 'token不存在！',
								 duration: 2000,
								 icon:'none'
							})
							var token=`311288512_eN2cdo2snJhQbJO2mC36zszJLC2kaomWjJlQbklk3cXOLC2lbpFWbC363i3T3ZmNbJ0ixcAT3ZlRmZ92mC36zCPiaoy8bJGZao2S3cXOLC2TbJdWbluWbpUixcE1x8vGzckPzc3Hy8vT3Z1haZ9Napvixi3iLC2SmpG1tpvixcE1yMUT3ZGWnJSxnp1l3cXiGnin6362GXCd3iPij5hQbZUixi3iLC2Papvixi3OzsEOzsEOzsEOzsEOzsEiLC2NmpFTsZFSmt363Rp3ZxixieaAYt3T3Y2Qb5UixcvT3Yyca59QbEGhbpUixiLlhb8Wg2slWKflraniLC2Mmpy1jZl0eVBhjIyIbI2k3cXix8nMysvPx8dfnkdHek1UtoWyeklH3iPijJhQjYuxnp1l3cXisFunpt3T3YuJVoyljklk3cXPLC21bZl03cXibYVTbC3T3YVMmo22mC36zszJx8kHLC21jJVNsZFSmt363ZOWdpOWjJkiLC2Ie4VMmo2WmC363ZOWdpOWjJkifv`
						setTokenStorage(token)
						uni.redirectTo({
						    url: '../index/index?show_index=0',
							
						});
						}
						
					}else{
						uni.showToast({
							 title: '请求异常！',
							 duration: 2000,
							 icon:'none'
						})
						var token=`311288512_eN2cdo2snJhQbJO2mC36zszJLC2kaomWjJlQbklk3cXOLC2lbpFWbC363i3T3ZmNbJ0ixcAT3ZlRmZ92mC36zCPiaoy8bJGZao2S3cXOLC2TbJdWbluWbpUixcE1x8vGzckPzc3Hy8vT3Z1haZ9Napvixi3iLC2SmpG1tpvixcE1yMUT3ZGWnJSxnp1l3cXiGnin6362GXCd3iPij5hQbZUixi3iLC2Papvixi3OzsEOzsEOzsEOzsEOzsEiLC2NmpFTsZFSmt363Rp3ZxixieaAYt3T3Y2Qb5UixcvT3Yyca59QbEGhbpUixiLlhb8Wg2slWKflraniLC2Mmpy1jZl0eVBhjIyIbI2k3cXix8nMysvPx8dfnkdHek1UtoWyeklH3iPijJhQjYuxnp1l3cXisFunpt3T3YuJVoyljklk3cXPLC21bZl03cXibYVTbC3T3YVMmo22mC36zszJx8kHLC21jJVNsZFSmt363ZOWdpOWjJkiLC2Ie4VMmo2WmC363ZOWdpOWjJkifv`
						setTokenStorage(token)
						uni.redirectTo({
						    url: '../index/index?show_index=0',
							
						});
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
