<!--
 * @Description: 图片
 * @Author: hjh
 * @Date: 2019-08-19 14:49:33
 * @LastEditors: hjh
 * @LastEditTime: 2019-08-20 12:20:36
 * @Sign: 扬眉剑出鞘
 -->
<template>
	<view>
		<view class="photo">
			<view class="boxs" v-for="(item,index) in imgArr" @click="preImage(item,imgArr)" :key="index">
				<image  :src="item" mode="scaleToFill">
					<view  class="del" @tap.stop="delImage(index)"></view>
				</image>
			</view>
			
			<video id="myVideo" v-for="(item,index) in videoArr" @play="fulls"  @fullscreenchange="screenchange" :key="index" :src="item" controls>
				<cover-view class="del" @tap.stop="delVideo(index)"></cover-view>
			</video>
			<image v-if="imgArr.length<imgLimit" @tap="chooseImage" src="https://mmcfile.hiroop.com/miniprogram/takePhoto.png" />
			<image v-if="videoArr.length<videoLimit" @tap="chooseVedio" src="https://mmcfile.hiroop.com/miniprogram/takeCamera.png" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgLimit: {
				type: Number,
				default: 3
			},
			videoLimit: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				imgArr: [],//图片数组
				videoArr: [],//视频数组
			};
		},
		methods: {
			chooseImage() {
				//console.log("图片")
				let that = this;
				uni.chooseImage({
					count: that.imgLimit, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						uni.showLoading({
							title: 'Loading...',
							mask: true
						})
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							

							uni.uploadFile({
								url: 'https://app8848.com/interface/rest/file/upload/util/uploadFile.htm', //仅为示例，非真实的接口地址
								 header:{token:"311288512_eN2cdo2snJhQbJO2mC36zszJLC2kaomWjJlQbklk3cXOLC2lbpFWbC363i3T3ZmNbJ0ixcAT3ZlRmZ92mC36zCPiaoy8bJGZao2S3cXOLC2TbJdWbluWbpUixcE1x8vGzckPzc3Hy8vT3Z1haZ9Napvixi3iLC2SmpG1tpvixcE1yMUT3ZGWnJSxnp1l3cXiGnin6362GXCd3iPij5hQbZUixi3iLC2Papvixi3OzsEOzsEOzsEOzsEOzsEiLC2NmpFTsZFSmt363Rp3ZxixieaAYt3T3Y2Qb5UixcvT3Yyca59QbEGhbpUixiLlhb8Wg2slWKflraniLC2Mmpy1jZl0eVBhjIyIbI2k3cXix8nMysvPx8dfnkdHek1UtoWyeklH3iPijJhQjYuxnp1l3cXisFunpt3T3YuJVoyljklk3cXPLC21bZl03cXibYVTbC3T3YVMmo22mC36zszJx8kHLC21jJVNsZFSmt363ZOWdpOWjJkiLC2Ie4VMmo2WmC363ZOWdpOWjJkifv"},
								filePath: res.tempFilePaths[0],
								name: 'file',
								
								success: (uploadFileRes) => {
									// console.log("图片上传+++++++")
									// console.log(JSON.parse(uploadFileRes.data));
									
									var datas=JSON.parse(uploadFileRes.data)
									if(datas.msgState==1){
										
										//将返回的数据存入img,并通知外界
										// 默认返回的有路径，字段名 url
										that.imgArr.push(datas.result);
										that.sendData()
										
									}else{
										uni.showToast({
										    title: '上传失败，请重新上传',
										    duration: 2000
										});
									}
									
								}
							});
						}
						
						uni.hideLoading()
					}
				})
			},
			preImage(url, urls) {
				let _urls = urls.map(ele => {
					return ele;
				})
				console.log(url, urls);
				uni.previewImage({
					current: url,
					urls: _urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			chooseVedio() {
				let that = this;
				uni.chooseVideo({
					count: this.VideoLimit, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						uni.showLoading({
							title: 'Loading...',
							mask: true
						})
						// 上传视频
						uni.uploadFile({
							url: 'https://app8848.com/interface/rest/file/upload/util/uploadFile.htm', //仅为示例，非真实的接口地址
							 header:{token:"311288512_eN2cdo2snJhQbJO2mC36zszJLC2kaomWjJlQbklk3cXOLC2lbpFWbC363i3T3ZmNbJ0ixcAT3ZlRmZ92mC36zCPiaoy8bJGZao2S3cXOLC2TbJdWbluWbpUixcE1x8vGzckPzc3Hy8vT3Z1haZ9Napvixi3iLC2SmpG1tpvixcE1yMUT3ZGWnJSxnp1l3cXiGnin6362GXCd3iPij5hQbZUixi3iLC2Papvixi3OzsEOzsEOzsEOzsEOzsEiLC2NmpFTsZFSmt363Rp3ZxixieaAYt3T3Y2Qb5UixcvT3Yyca59QbEGhbpUixiLlhb8Wg2slWKflraniLC2Mmpy1jZl0eVBhjIyIbI2k3cXix8nMysvPx8dfnkdHek1UtoWyeklH3iPijJhQjYuxnp1l3cXisFunpt3T3YuJVoyljklk3cXPLC21bZl03cXibYVTbC3T3YVMmo22mC36zszJx8kHLC21jJVNsZFSmt363ZOWdpOWjJkiLC2Ie4VMmo2WmC363ZOWdpOWjJkifv"},				
							filePath: res.tempFilePath,
							name: 'file',
							success: (uploadFileRes) => {
								var datas=JSON.parse(uploadFileRes.data)
								console.log("datas+++++")
								console.log(datas)
								if(datas.msgState==1){
									
									//将返回的数据存入img,并通知外界
									// 默认返回的有路径，字段名 url
									that.videoArr.push(datas.result);
									that.sendData()
									
								}else{
									uni.showToast({
									    title: '上传失败，请重新上传',
									    duration: 2000
									});
								}
								
							uni.hideLoading()
							}
						});
						
						
					}
				})
			},
			delImage(ind) {
				this.imgArr.splice(ind, 1)
				this.sendData()
			},
			delVideo(ind) {
				this.videoArr.splice(ind, 1)
				this.sendData()
			},
			cleanAll(){
				this.imgArr=[];
				this.videoArr=[];
			},
			sendData() {
				let _data = [];
				// 将数据整合到一个数组中发出去，可以按自己项目要求进行修改
				_data.push(...this.imgArr);
				_data.push(...this.videoArr);
				this.$emit('upload', _data)
			},
			screenchange(e){
				// 监听视频的全屏和退出全屏
				this.$emit('schange', e.detail.fullScreen)
			},
			fulls(){
				console.log("播放～！！！")
				// #ifndef MP-ALIPAY
				this.videoContext = uni.createVideoContext('myVideo');
				// #endif
				this.videoContext.requestFullScreen();
				
			}
		}
	}
</script>

<style lang="scss">
	.photo {

		image,
		.boxs,
		video {
			width: 158rpx;
			height: 158rpx;
			margin: 0 2% 20upx 0;
			position: relative;
			display: inline-block;
		}

		.del {
			position: absolute;
			top: 0;
			right: 0;
			width: 42upx;
			height: 42upx;
			z-index: 99999;
			background-color: rgba(0, 0, 0, 0.7);
			background-image: url(https://mmcfile.hiroop.com/miniprogram/delete.png);
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 26upx 27upx;
		}
	}
	
</style>
