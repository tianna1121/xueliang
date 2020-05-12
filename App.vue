<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		const that = this;
		//#ifdef MP-WEIXIN
		uni.getSetting({
			success(res) {
				console.log('地图位置');
				uni.hideLoading();
				if (!res.authSetting['scope.userLocation']) {
					uni.authorize({
						scope: 'scope.userLocation',
						success() {
							that.chooseLocation();
							return;
						},
		
						fail() {
							uni.showToast({
								title: '无法获取地图权限',
								duration: 2000,
								icon:"none"
							});
						}
					});
				} else {
					that.chooseLocation();
					return;
				}
			}
		});
		//#endif
	},
	onHide: function() {
		console.log('App Hide');   
	},
	methods:{
		chooseLocation(){
			const that = this;
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
			        // console.log(res);
			        // console.log('当前位置的经度：' + res.longitude);
			        // console.log('当前位置的纬度：' + res.latitude);
						
					var upData={
						lost_address:'只提供经纬度',
						lost_longitude:res.longitude,
						lost_latitude:res.latitude
					}
					that.$http
						.post('/interface/rest/http/xlwb/xlgc-wb-xcx-hqdydwxx.htm', upData, { params: {} })
						.then(res => {
							console.log("获取用户经纬度提交");
							console.log(res);
							if (res.data.msgState == 1) {
								// uni.showToast({
								// 	title: res.data.msg,
								// 	duration: 2000
								// });
								
							}else{
								uni.showToast({
									title: res.data.msg,
									duration: 2000,
									icon:"none"
								});
							}
							
						})
						.catch(err => {
							console.log(err);
							uni.showToast({
								title:"获取地理位置失败",
								duration: 2000,
								icon:"none"
							});
						});
			    }
			});
		}
	
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
