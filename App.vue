<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');   
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15rpx;
		width: 540rpx;
		height: 270rpx;
		background-color: #fff;
		border-radius: 14rpx;
	}

	.uni-tip-title {
		margin-top: 27rpx;
		margin-bottom: 10px;
		text-align: center;
		font-size: 36rpx;
		color: #000;
	}

	.uni-tip-content {
		/* padding: 15px;
 */
		font-size: 30rpx;
		color: #888888;
		text-align: center;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		text-align: center;
		margin-top: 20px;
		height: 100rpx;
		line-height: 100rpx;
		border-top: 1rpx solid #f1f1f1;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 36rpx;
		color: #0a0a0a;
	}

	.uni-tip-button1 {
		border-right: 1rpx solid #f1f1f1;
	}
</style>
