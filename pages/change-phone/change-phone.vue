<template>
	<view>
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" left-icon="arrowleft"
		 left-text="返回" title="修改手机号" @clickLeft="back" />
		<!-- 内容 -->
		<view class="item">
			<view class="item-title">手机号码：</view>
			<input type="text" v-model="phone" class="ipt" focus="true" placeholder="请输入手机" />
		</view>
		<button type="primary" class="btn-login" @tap="submitJunmp">保存</button>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	export default {
		components: {
			uniNavBar,
			
		},
		data() {
			return {
				phone:"",
				detailData:{}
			}
		},
		onLoad(options) {
			this.detailData = JSON.parse(options.data);
			console.log(this.detailData)
			this.phone=this.detailData.phone
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			//保存
			submitJunmp(){
				console.log("保存成功")
				uni.showLoading({
					title: 'loading'
				});
				setTimeout(() => {
					uni.hideLoading();
					uni.navigateBack({
						delta: 1
					});
				}, 1000)
			}
		}
	}
</script>

<style>
page {
		background-color: #f8f8f8;
	}
		
	.item{
		width: 690rpx;
		height: 90rpx;
		display: flex;
		flex-direction: row;
		flex: 1;
		justify-content: left;
		align-items:center;
		padding: 0 30rpx;
		background-color: #ffffff;
		border-bottom: 1rpx #dddddd solid;
		line-height: 90rpx;
	}
	.item-title {
		font-size: 34rpx;
		color: #000000;
	}
	.ipt{
		font-size: 34rpx;
		color: #000000;
	}
	.btn-login {
		margin: 100rpx auto;
		color: #ffffff;
		font-size: 36rpx;
		width: 690rpx;
		height: 94rpx;
		background: #2256d8 !important;
		border-radius: 10rpx;
	}
</style>
