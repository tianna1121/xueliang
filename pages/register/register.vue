<template>
	<view>
		
		<view class="item">
			<view class="item-title">头像</view>
			<view class="item-next" @tap="chooseImage">
				<text class="right-title">点击上传头像 </text> 				
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">姓名</view>
			<view class="item-next1">
				<input v-model="name" class="ipt" placeholder="请输入姓名"  type="text" placeholder-class="placeholder"/>
			</view>
			
		</view>
		<view class="item">
			<view class="item-title">性别</view>
			<view class="item-next">
				<!-- <text class="right-title">请选择 </text> -->
				
				<picker :range="array" @change="sizeTypeChange" :value="sexIndex" mode="selector">
					<view class="uni-input">{{array[sexIndex]}}</view>
				</picker>
				<uni-icons type="forward" color="#C7C7CC" size="22" />
			</view>
		</view>
		<view class="item">
			<view class="item-title">身份证号</view>
			<view class="item-next1">
				<input v-model="idCard" class="ipt" placeholder="请输入身份证号"  type="text" placeholder-class="placeholder"/>
			</view>
		</view>
		<view class="item">
			<view class="item-title">手机号码</view>
			<view class="item-next1">
			<input v-model="phone" class="ipt" placeholder="请输入手机号码"  type="text" placeholder-class="placeholder"/>	
			</view>
			</view>
			<view class="item">
				<view class="item-title">所在单位</view>
				<view class="item-next" @tap="chooseWork">
					<picker :range="workList" @change="workListChange" :value="workIndex" mode="selector">
						<view class="uni-input">{{workList[workIndex]}}</view>
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
				   workList:['请选择','政府','国家电网','财务','路政','纪委'],
				   workIndex:0,
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
				
			submitMsg(){
				uni.showLoading({
				    title: '数据请求中'
				});
				uni.redirectTo({
				    url: '../regres/regres',
					
				});
			},
			//上传头像
			chooseImage(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						 console.log(JSON.stringify(res.tempFilePaths));
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					
				})
			},
			//选择单位
			workListChange(e){
				this.workIndex = parseInt(e.detail.value)
			},
				
			sizeTypeChange(e){
				this.sexIndex = parseInt(e.detail.value)
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
