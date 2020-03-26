<template>
	<view class="big-box">
		<image class="img-res" src="../../static/img/news/reg_pass.png"></image>
		<view class="msg">
			您的账号审核通过
		</view>
		<view class="msg1">
			 温馨提示
		</view>
		<view class="msg1">
			 登陆账号为注册手机号
		</view>
		<view class="msg1">
		密码为身份证后6位
		</view>
		<view class="jump-reg" @tap="jumpRegster">点击进入登陆页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow(){
		uni.hideHomeButton()
		},
			
		methods:{
			jumpRegster(){
				uni.redirectTo({
				    url: '../login/login',
					
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
	background-color: #F5F5F9;
	}
		
	.big-box{
		display: flex;
	
		flex-direction: column;
		justify-content: center;
	}
.img-res{
	width: 118rpx;
	height: 118rpx;
	margin: 150rpx auto 0;
}
.msg{
	font-size:50rpx;
	color: #000000;
	margin: 66rpx auto 0;
	height: 100rpx;
	line-height: 100rpx;
}
.msg1{
	font-size:34rpx;
	margin: 30rpx auto 0;
}
.jump-reg{
				
				height:68rpx;
				font-size:34rpx;
				color:#AAAAAB;
				line-height:68rpx;
				margin: 440rpx auto 0
			}
</style>
