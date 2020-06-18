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
				<view class="item-next"  @tap="showPicker">
						<view class="uni-input">{{userInfo.unit}}</view>
					<uni-icons type="forward" color="#C7C7CC" size="22" />
				</view>
				</view>
		<button type="primary" class="btn-login" @tap="submitMsg" >提交</button>
		<view class="jump-reg" @tap="jumpRegster">登录账号</view>
		<w-picker
			mode="linkage"
			        :value="userInfo.unit"
			        :options="options"
			        :level="3"
			        default-type="id"
			        :default-props="defaultProps1"
			        @confirm="onConfirm($event,'linkage')"
			        @cancel="onCancel"
			        ref="linkage" 
		></w-picker>
	</view>
</template>

<script>
	import {
	  setTokenStorage,
	  getTokenStorage,
	  configHandle,
	  getOpenIdStorage
	} from '@/test/tool.js'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	export default {
		components: {
			uniIcons
			
		},
		data() {
			return {
				imageList:[],
				value:['请选择', '请选择', '请选择'],
				defaultProps1:{"label":"name","value":"id","children":"child"},
				 options:[],
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
				unit:"请选择",
				x:'',
				z:"",
				c:""
			}
			};
		},
		onShow(){
		uni.hideHomeButton()
		},
	
	onLoad() {
	
			//获取上报类型
			this.getType();
		},
		methods:{
			onConfirm($event,val){
				console.log($event);
				this.userInfo.unit=$event.result;
				console.log(val)
				this.userInfo.x=$event.value[0]
				this.userInfo.z=$event.value[1]
				this.userInfo.c=$event.value[2]
				console.log(this.userInfo)
				
			},
			onCancel(){
				console.log('你取消了')
			},
				
			showPicker() {
				this.$refs.linkage.show();
			},
			jumpRegster(){
				uni.redirectTo({
				    url: '../login/login',
					
				});
			},
			getType() {
				this.$http
					.get('/interface/rest/http/xlwb/xlgc-wb-jdh-zcdwxz.htm', { params: {} })
					.then(res => {
					 	console.log('单位');
						console.log(res);
						if (res.data.msgState == 1) {
							this.options=res.data.result
							
						} else {
							uni.showToast({
								 title: res.data.msg,
								 duration: 2000,
								 icon:'none'
							})
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
				//处理函数
				typeChange(val){
					var arr=[]
					for (let item in val) {
						// console.log(val[item].unit)
						arr.push(val[item].unit)
					}
				
				return arr;
				
				},
				// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
				// 详情查看javascript的数值范围
				//身份证校验
				checkIDCard(idcode){
				    // 加权因子
				    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
				    // 校验码
				    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
				
				    var code = idcode + "";
				    var last = idcode[17];//最后一位
				
				    var seventeen = code.substring(0,17);
				
				    // ISO 7064:1983.MOD 11-2
				    // 判断最后一位校验码是否正确
				    var arr = seventeen.split("");
				    var len = arr.length;
				    var num = 0;
				    for(var i = 0; i < len; i++){
				        num = num + arr[i] * weight_factor[i];
				    }
				    
				    // 获取余数
				    var resisue = num%11;
				    var last_no = check_code[resisue];
				
				    // 格式的正则
				    // 正则思路
				    /*
				    第一位不可能是0
				    第二位到第六位可以是0-9
				    第七位到第十位是年份，所以七八位为19或者20
				    十一位和十二位是月份，这两位是01-12之间的数值
				    十三位和十四位是日期，是从01-31之间的数值
				    十五，十六，十七都是数字0-9
				    十八位可能是数字0-9，也可能是X
				    */
				    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				
				    // 判断格式是否正确
				    var format = idcard_patter.test(idcode);
				
				    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				    return last === last_no && format ? true : false;
				},

			submitMsg(){
				let openid=getOpenIdStorage();
				console.log('openid')
				console.log(openid)
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
				if(!this.checkIDCard(this.userInfo.idcard)){
					
					uni.showModal({
						
						content: "请输入正确的身份证号!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				}
				
				if(!(/^1[3456789]\d{9}$/.test(this.userInfo.phone))){
					uni.showModal({
						content: "请输入正确的手机号!",
						showCancel: false,
						confirmText: "确定"
					})
					return
				}
				if(this.userInfo.x==''){
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
					unit:this.userInfo.unit,
					countyId:this.userInfo.x.toString(),
					townId:this.userInfo.z.toString(),
					villageId:this.userInfo.c.toString(),
					openId:openid
				}
				
				console.log(obj)
				uni.showLoading({
					title: 'loading'
				});
				// setTokenStorage('register')
				//发起请求
				this.$http.post('/interface/rest/http/xlwb/xlgc-wb-xcx-yhzc.htm',obj).then(res => {
					console.log(res);
					uni.hideLoading();
					if(res.data.msgState==1){
						uni.redirectTo({
						    url: '../regres/regres',
						});
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
						});
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:'none'
						});
					}
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						 title: '请求失败！',
						 duration: 2000,
						 icon:'none'
					})
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
							url: 'https://www.app8848.com/xlgc/interface/rest/file/upload/util/uploadFile.htm', //仅为示例，非真实的接口地址
							 header:{token:"281179305_eN2cdo2snJhvbJO2ZC3FzMUNLC2kloZWjJavbkak3cXOLC2abp6WbC3F3i3T3mZNbJ0ixc_T3maRZm92ZC3FzCwiloy8bJ5mlo2S3cXOLC2TbJdWbauWbpUixcEKx8f5z8_Kzs_JzM3T3mKhlm9NlpQixi3w3iwibpqRdUak3cX0zs_0zskOzMET3m5WnJSxnpKa3cXidGqMd8zKzcQO3iwijGhvbmUixi3iLC2wlpQixi3iLC2NZp6Tsm6SZt3F3YuajIQMys30zt3T3Y2vbGUixcQT3YyclG9vbE5hbpUixiLWmFrkRV7aSFoYV3TiLC2MZpyKjma0eqBhjIyIbI2k3cXizsQNzcQNx8_Oya9rt4ZHemyFsoWcyN3T3YyXbI20sm6SZt3F3YhTZJziLC20daqMZo22ZC3FzCwidp5WdC3F3m5KbGwiLC2KjJqNtpQixczKzcQT3YqMZo2xnpKa3cXidGqMd8zKzcQO3iwidIhKjJqNlpQixi20Zoy0zMUNy8EigQ"},
							 //header:{token:"test"},
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
									    duration: 2000,
										icon:"none"
									});
								}
								
							}
						});
						uni.hideLoading()
					},
					
				})
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
