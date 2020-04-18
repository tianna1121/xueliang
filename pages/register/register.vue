<template>
	<view>
		
		<view class="item">
			<view class="item-title">头像</view>
			<view class="item-next" @tap="chooseImage">
				<image v-if="userInfo.avatar.length>0" class="avatar" :src="userInfo.avatar" mode=""></image>
				<text v-else class="right-title">点击上传头像 </text> 
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">姓名</view>
			<view class="item-next1">
				<input v-model="userInfo.username" class="ipt" placeholder="请输入姓名"  type="text" placeholder-class="placeholder"/>
			</view>
			
		</view>
		<view class="item">
			<view class="item-title">性别</view>
			<view class="item-next">
				<!-- <text class="right-title">请选择 </text> -->
				
				<picker :range="array" @change="sizeTypeChange" :value="userInfo.sex" mode="selector">
					<view class="uni-input">{{array[userInfo.sex]}}</view>
				</picker>
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">身份证号</view>
			<view class="item-next1">
				<input v-model="userInfo.idcard" class="ipt" placeholder="请输入身份证号"  type="idcard" placeholder-class="placeholder"/>
			</view>
		</view>
		<view class="item">
			<view class="item-title">手机号码</view>
			<view class="item-next1">
			<input v-model="userInfo.phone" class="ipt" placeholder="请输入手机号码"  type="number" placeholder-class="placeholder"/>	
			</view>
			</view>
			<view class="item">
				<view class="item-title">所在单位</view>
				<view class="item-next" >
					<picker :range="workList" @change="workListChange" :value="userInfo.unit" mode="selector">
						<view class="uni-input">{{workList[userInfo.unit]}}</view>
					</picker>
					<uni-icons type="forward" color="#C7C7CC" size="22" />
				</view>
				</view>
		<button type="primary" class="btn-login" @tap="submitMsg" >提交</button>
		<view class="jump-reg" @tap="jumpRegster">登录账号</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import json from '@/json';
	export default {
		components: {
			uniIcons
			
		},
		data() {
			return {
				imageList:[],
				name:"",
				idCard:"",
				phone:"",
				 array: ['请选择', '男', '女'],
				   sexIndex: 0,
				   workList:[],
				   workIndex:0,
			userInfo:{
				avatar:"",
				username:"",
				idcard:"",
				sex:"0",
				phone:"",
				unit:"0"
			}
			};
		},
		onShow(){
		uni.hideHomeButton()
		},
	
	onLoad() {
			this.workList=	this.typeChange(json.subs1)
		},
		methods:{
			jumpRegster(){
				uni.redirectTo({
				    url: '../login/login',
					
				});
			},
				//处理函数
				typeChange(val){
					var arr=[]
					for (let item in val) {
						console.log(val[item].type)
						arr.push(val[item].type)
					}
				
				return arr;
				
				},
			submitMsg(){
				console.log(this.userInfo)
				
				if(this.userInfo.avatar.length<1){
					uni.showModal({
						
						content: "请上传头像!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				}
				if(this.userInfo.username.length<1){
					uni.showModal({
						
						content: "请输入姓名!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				}
				if(this.userInfo.sex=='0'){
					uni.showModal({
						
						content: "请选择性别!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				}
				if(this.userInfo.idcard.length<10){
					uni.showModal({
						
						content: "请输入身份证号!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				}
				
				if(this.userInfo.phone.length<5){
					uni.showModal({
						
						content: "请输入电话号码!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				}
				if(this.userInfo.unit=='0'){
					uni.showModal({
				
						content: "请选择所在单位!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				}
				//整理数据
					
				var obj={
					avatar:this.userInfo.avatar,
					username:this.userInfo.username,
					idcard:this.userInfo.idcard,
					sex:this.userInfo.sex.toString(),
					phone:this.userInfo.phone,
					unit:this.userInfo.unit.toString()
				}
				console.log(obj)
				uni.showLoading({
					title: 'loading'
				});
				//发起请求
				this.$http.post('/interface/rest/http/xlwb/xlgc-wb-jdh-yhzc.htm',obj).then(res => {
					console.log(res);
					uni.hideLoading();
					if(res.code==200){
						
						
						uni.redirectTo({
						    url: '../regres/regres',
							
						});
					}
				}).catch(err => {
					console.log(err);
				})
				// uni.redirectTo({
				//     url: '../regres/regres',
					
				// });
			},
		
			
			//上传头像
			chooseImage(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						 //console.log(JSON.stringify(res.tempFilePaths));
						uni.showLoading({
							title: '上传中...',
							mask: true
						})
						uni.uploadFile({
							url: 'http://www.app8848.com/interface/rest/file/upload/util/uploadFile.htm', //仅为示例，非真实的接口地址
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
									this.userInfo.avatar =datas.result;
									
								}else{
									uni.showToast({
									    title: '上传失败，请重新上传',
									    duration: 2000
									});
								}
								
							}
						});
						uni.hideLoading()
					},
					
				})
			},
			//选择单位
			workListChange(e){
				this.userInfo.unit = parseInt(e.detail.value)
				
			},
				
			sizeTypeChange(e){
				this.userInfo.sex = parseInt(e.detail.value)
				
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
	line-height: 90rpx;
	display:flex;
	flex-direction: row;
	justify-items: center;
	justify-content: space-between;
	padding: 0 30rpx;
	
	background-color: #FFFFFF;
	//border-top: 1rpx #DDDDDD solid;
	border-bottom: 1rpx #DDDDDD solid;
	
		
	.item-title{
		font-size: 34rpx;
	}
		
	.avatar{
		width: 60rpx;
		height: 60rpx;
		margin-top:16rpx ;
	}
	.item-next{
		color: #888888;
		font-size: 32rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
		
	.item-next1{
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #888888;
		font-size: 32rpx;
	}
		
	.right-title{
		margin-right: 10rpx;
	}
		
	.ipt{
		text-align: right;
		width: 400rpx;
		height: 32rpx;
		margin-right: 50rpx;
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
