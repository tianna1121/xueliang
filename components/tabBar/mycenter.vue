<template>
	<view class="main">
		<!-- 背景图 -->
		<image class="center-img" src="../../static/img/news/bg.png" mode=""></image>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				
			}
		},
		methods: {
			ontrueGetList(){
				uni.showToast({
					title:'个人中心'
				})
				console.log("加载了第五个页面，可以把网络请求放这里")
				uni.setNavigationBarTitle({
					title: ''
				});
			},
			
		}
	}
</script>

<style lang="scss">
	.main{background-image: linear-gradient(45deg, #9000ff, #5e00ff);}
	// padding-bottom:120rpx;box-sizing: border-box;重要*************************保证页面底部内容不被隐藏也不会出现多余的滚动条
	.main_box{width:100vw;height: 100vh;padding-bottom:120rpx;box-sizing: border-box;}
	.main_centent{width: 100%;height: 100vh;color: #fff;letter-spacing: 4rpx;display: flex;align-items: center;justify-content: center;}
	image{width:750rpx;height: 750rpx;}
	.center-img{
		width: 750rpx;
		height: 460rpx;
		
	}
</style>