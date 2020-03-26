<template>
	<view class="login_box">
		<image  mode="widthFix"  class="bg-img" src="../../static/img/news/login_bg.png"></image>
	    <!-- logo图 -->
		<view class="main">
			<image class="logo-img" src="../../static/img/news/bg.png"></image>
			<view class="title">雪亮工程</view>
			<view class="acount-box">
				<text class="account-title">账号：</text>
				<input v-model="tel" class="ipt-tel" placeholder="请输入注册手机号"  type="number" placeholder-class="placeholder"/>	
			</view>
			<view class="acount-box passwd">
				<text class="account-title">密码：</text>
				<input v-model="passData" class="ipt-tel " placeholder="初始密码为身份证后六位"  type="text" placeholder-class="placeholder"/>	
			</view>
			<button type="primary" class="btn-login" >登录</button>
			<view class="jump-reg" @tap="jumpRegster">注册账号</view>
		</view>
		 
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				tel:"",
				passData:'', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components:{
			
		},
		mounted() {
			
		},
		methods:{
			jumpRegster(){
				uni.redirectTo({
				    url: '../register/register',
					
				});
			}
		}
	
	}
	
</script>

<style lang='scss'>
			
		.bg-img{
			width: 750rpx;
			position: absolute;
			height: 1334rpx;
			
		}
			
		.main{
			z-index: 100;
			display: flex;
			flex-direction: column;
			flex: 1;
			
		}
		.login-box{
			display: flex;
			flex-direction: column;
			flex: 1;
		}
		.logo-img{
			width: 330rpx;
			height: 330rpx;
			margin: 128rpx auto 0;
			border-radius: 50%;
			
		}
		.title{
			font-size:70rpx;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
		}
			
		.acount-box{
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
				width:136rpx;
				height:68rpx;
				font-size:34rpx;
				
				color:#FFFFFF;
				line-height:68rpx;
				margin: 155rpx auto 0
			}
	
</style>
