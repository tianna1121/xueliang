<template>
	<view>
		<view class="item">
			<view class="item-title">头像</view>
			<view class="item-next">
				点击上传头像 >
			</view>
		</view>
		<view class="item">
			<view class="item-title">姓名</view>
			<view class="item-next">
				请输入姓名
			</view>
		</view>
		<view class="item">
			<view class="item-title">性别</view>
			<view class="item-next">
				请选择 >
			</view>
		</view>
		<view class="item">
			<view class="item-title">身份证号</view>
			<view class="item-next">
				请输入身份证号
			</view>
		</view>
		<view class="item">
			<view class="item-title">手机号码</view>
			<view class="item-next">
				请输入手机号码
			</view>
			</view>
			<view class="item">
				<view class="item-title">所在单位</view>
				<view class="item-next">
					请选择 >
				</view>
				</view>
		<button type="primary" class="btn-login" >提交</button>
		<view class="jump-reg" @tap="jumpRegster">登录账号</view>
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
				    url: '../register/register',
					
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
	background-color: #F5F5F9;
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
	}
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
			
				color:#AAAAAB;
				line-height:68rpx;
				margin: 400rpx auto 0
			}
</style>
