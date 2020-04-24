<template>
	<view class="big-box">
		<image class="img-res" src="../../static/img/news/reged.png"></image>
		<view class="msg">
			注册信息提交成功!
		</view>
		<view class="msg msg1">
			 请您等待审核
		</view>
		<view class="jump-reg" @tap="jumpRegster">登录账号</view>
	</view>
</template>

<script>
	import {
	  setTokenStorage,
	  getTokenStorage,
	  configHandle
	} from '@/test/tool.js'
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
	margin: 70rpx auto 0;
}
.msg1{
	
	margin: 30rpx auto 0;
}
.jump-reg{
				width:136rpx;
				height:68rpx;
				font-size:34rpx;
				color:#AAAAAB;
				line-height:68rpx;
				margin: 600rpx auto 0
			}
</style>
