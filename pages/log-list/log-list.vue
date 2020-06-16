<template>
	<view class="bigBox">
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" left-icon="arrowleft"
		 left-text="返回" title="巡查日志" @clickLeft="back" />
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<!-- 内容部分 -->
			<swiper id="swiper" class="swiper-box" :duration="300" >
				<swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">
						<!-- 
							* 新闻列表 
							* 和nvue的区别只是需要把uni标签转为weex标签而已
							* class 和 style的绑定限制了一些语法，其他并没有不同
						-->
						<view v-for="(item, index) in tabItem.newsList" :key="index" class="news-item">
							
							<view class="items">
								<text class="item-title" space="emsp">
									填写时间:
									<text class="it1">{{ item.date }}</text>
								</text>
							</view>
							<view class="items it4">
								<text class="item-title item-title1" space="emsp">巡查日志:</text>
								<text class="it3">{{ item.inspection_log }}</text>
							</view>
						</view>

						<!-- 上滑加载更多组件 -->
						<mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
	<!-- 填写日志按钮 -->
	<button  type="primary"  class="btn-login"  @tap="confirmMsg">填写日志</button>
	
	<uni-popup ref="showtip" type="center" :mask-click="false">
		<view class="uni-tip">
			<text class="uni-tip-title">填写日志</text>
			<textarea class="popup_textarea" placeholder="输入内容..." v-model="content"></textarea>
			<view class="uni-tip-group-button">
				<text class="uni-tip-button uni-tip-button1 " @click="cancel('tip')">关闭</text>
				<text class="uni-tip-button" @click="submitMgs">提交</text>
			</view>
		</view>
	</uni-popup>
	</view>
</template>

<script>

import json from '@/json';
import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
import mixLoadMore from '@/components/mix-load-more/mix-load-more';
let windowWidth = 0,
	scrollTimer = false,
	tabBar;
export default {
	components: {
		mixPulldownRefresh,
		mixLoadMore,
		
	},
	data() {
		return {
			trues: true,
			tabCurrentIndex: 0, //当前选项卡索引
			scrollLeft: 0, //顶部选项卡左滑距离
			enableScroll: true,
			tabBars: [],
			pageNo:1,
			content:""
		};
	},

	async onLoad() {
	
	},
	onReady() {
		console.log('日志巡查');
		// 获取屏幕宽度
		windowWidth = uni.getSystemInfoSync().windowWidth;
		this.loadTabbars();
	},
	methods: {
		
		
		back(){
			uni.navigateBack({
				delta: 1
			});
		},
		//确认收到弹出框
		confirmMsg() {
			this.$nextTick(() => {
				this.$refs.showtip.open();
			});
		},
	cancel(type) {
		this.$refs.showtip.close();
	},
	submitMgs() {
		uni.showLoading({
			title: 'loading'
		});
		var obj = { content: this.content};
		//发起请求
		this.$refs.showtip.close();
		uni.showLoading({
			title: 'loading'
		});
		this.$http
			.post('/interface/rest/http/xlwb/xltzxt-xcx-txxcrz.htm', obj)
			.then(res => {
				uni.hideLoading();
				console.log(res.data);
				if (res.data.msgState == 1) {
					this.onPulldownReresh()
					this.content=''
					
				}
				uni.showToast({
					 title: res.data.msg,
					 duration: 2000, 
					 icon:'none'
				})
			})
			.catch(err => {
				console.log(err);
				uni.hideLoading();
			});
	},
		
		/**
		 * 数据处理方法在vue和nvue中通用，可以直接用mixin混合
		 * 这里直接写的
		 * mixin使用方法看index.nuve
		 */
		//获取分类
		loadTabbars() {
			let tabList = json.tabList;
			tabList.forEach(item => {
				item.newsList = [];
				item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
				item.refreshing = 0;
			});
			this.tabBars = tabList;
			this.loadNewsList('add');
		},
		//新闻列表
		loadNewsList(type) {
			let tabItem = this.tabBars[this.tabCurrentIndex];
			
			//type add 加载更多 refresh下拉刷新
			if (type === 'add') {
				if (tabItem.loadMoreStatus === 2) {
					return;
				}
				tabItem.loadMoreStatus = 1;
			}
			// #ifdef APP-PLUS
			else if (type === 'refresh') {
				tabItem.refreshing = true;
					this.pageNo=1
			}
			// #endif
			
			var obj={pageNo:this.pageNo}
			
			this.$http
				.get('/interface/rest/http/xlwb/xltzxt-xcx-xcrz.htm', {params:obj})
				.then(res => {
					console.log(res);
					if (res.data.msgState == 1) {
						var list = res.data.list;
						console.log('list');
						console.log(list);
						
						
						if (type === 'refresh') {
							tabItem.newsList = []; //刷新前清空数组
						}
						list.forEach(item => {
							
							tabItem.newsList.push(item);
						});
						this.pageNo+=1
					//下拉刷新 关闭刷新动画
					if (type === 'refresh') {
						this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
						// #ifdef APP-PLUS
						tabItem.refreshing = false;
						// #endif
						if(res.data.totalPages===0||res.data.curPage===res.data.totalPages){
						tabItem.loadMoreStatus =2	
						}else tabItem.loadMoreStatus = 0;
						
						
					}
						//上滑加载 处理状态
						if (type === 'add') {
							if(res.data.totalPages===0||res.data.curPage===res.data.totalPages){
							tabItem.loadMoreStatus =2	
							this.pageNo=1
							}
							}
					} else {
						uni.showLoading({
							title: '请求失败'
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		

		//下拉刷新
		onPulldownReresh() {
			this.pageNo=1;
			this.loadNewsList('refresh');
		},
		//上滑加载
		loadMore() {
			this.loadNewsList('add');
		},
		//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
		setEnableScroll(enable) {
			if (this.enableScroll !== enable) {
				this.enableScroll = enable;
			}
		},

		
		//获得元素的size
		getElSize(id) {
			return new Promise((res, rej) => {
				let el = uni
					.createSelectorQuery()
					.in(this)
					.select('#' + id);
				el.fields(
					{
						size: true,
						scrollOffset: true,
						rect: true
					},
					data => {
						res(data);
					}
				).exec();
			});
		}
	}
};
</script>

<style lang="scss">
  .bigBox{
	  margin-bottom: 10rpx;
  }
	page,
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: fixed;
		z-index: 10;
		width: 750rpx;
		height: 90rpx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
		background-color: #fff;
		.nav-item {
			display: inline-block;
			width: 25%;
			height: 90upx;
			text-align: center;
			line-height: 90rpx;
			font-size: 30rpx;
			color: #303133;
			position: relative;
			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: 0.3s;
			}
		}
		.current {
			color: #007aff;
			&:after {
				width: 50%;
			}
		}
	}

	.swiper-box {
		height: 100%;
	}

	.panel-scroll-box {
		height: 100%;

		.panel-item {
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}

	/**
	 * 新闻列表 直接拿的nvue样式修改，,
	 * 一共需要修改不到10行代码, 另外px需要直接修改为upx，只有单位不一样，计算都是一样的
	 * 吐槽：难道不能在编译的时候把nuve中的upx转为px? 这样就不用修改单位了
	 */
	.video-wrapper {
		width: 100%;
		height: 440upx;
		.video {
			width: 100%;
		}
	}

	.img {
		width: 100%;
		height: 100%;
	}
	.news-item {
		position: relative;
	}
	/* 修改结束 */

	/* 新闻列表  emmm 仅供参考 */
	.news-item {
		width: 710rpx;
		padding: 20rpx 20rpx 1rpx 20rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}
	.item-title {
		font-size: 28rpx;
		color: #000;
		
	}
	.item-title1 {
		margin-right: 0rpx;
	}

	.it1 {
		font-weight: 500;
		padding-left: 10rpx;
	}
	.it2 {
		padding-left: 10rpx;
		font-weight: 500;
		color: #2256d8;
	}
	
.statusd{
	color: #888888;
}
	
	.it3 {
		padding-left: 10rpx;
		font-size: 28rpx;
		color: #000;
		width: 540rpx;
		font-weight: 500;
		//overflow: hidden;
		//word-break: break-all; /* break-all(允许在单词内换行。) */
	//	text-overflow: ellipsis; /* 超出部分省略号 */
		//display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		//-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		//-webkit-line-clamp: 2; /** 显示的行数 **/
	}
	.it33{
		margin-left: 100rpx;
		width: 150rpx;
		
		display: inline-block;
		
	}
	.items {
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between; 
	}
	
	.it4 {
		justify-content: left; 
	}

	.video-tip {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.video-tip-icon {
		width: 60upx;
		height: 60upx;
	}
	.item-titless{
		position: absolute;
		top: 0px;
	}
	.item-title111 {
		font-size: 28rpx;
		color: #000;
		 width: 35%;	
	
		// margin-right: 45rpx;
	}
	.item-title20{
		// width: 38%;
		// flex: 1 ;
		position: relative;
		
	}
	.last-cild {
		margin-right: 0;
		text-align: right;
		width: 27%;
	}


.btn-login {
	margin: 140rpx auto 44rpx;
	color: #ffffff;
	font-size: 36rpx;
	width: 690rpx;
	height: 94rpx;
	background: #2256d8 !important;
	border-radius: 10rpx;
	position: fixed;
	bottom: 4rpx;
	left: 30rpx;
}
/* 提示窗口 */
.uni-tip {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */

	width: 540rpx;
	height: 424rpx;
	background-color: #fff;
	border-radius: 14rpx;
}

.uni-tip-title {
	margin-top: 27rpx;
	margin-bottom: 45rpx;
	text-align: center;
	font-size: 36rpx;
	color: #000;
}

.popup_textarea {
	width: 430rpx;
	height: 195rpx;
	font-size: 28rpx;
	margin-left: 55rpx;
	border: 1px #f1f1f1 solid;
	margin-bottom: -15rpx;
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
	margin-top: 40rpx;
	height: 100rpx;
	line-height: 100rpx;
	border-top: 1rpx solid #f1f1f1;
}

.uni-tip-button {
	flex: 1;
	text-align: center;
	font-size: 36rpx;
	color: #4399fc;
}

.uni-tip-button1 {
	color: #0a0a0a;
	border-right: 1rpx solid #f1f1f1;
}
</style>
