<template>
	<view class="bigBox">
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" left-icon="arrowleft"
		 left-text="返回" title="我的上报" @clickLeft="back" />
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
						<view v-for="(item, index) in tabItem.newsList" :key="index" class="news-item" @click="navToDetails(item)">
							<view class="items">
								<text class="item-title">
									上报人:
									<text class="it1" space="emsp" decode="true">{{ item.reporter }}</text>
								</text>
								<text class="item-title" space="emsp" :decode="trues" @tap.stop="callPhone(item.phone)">
									电话:
									<text class="it2"  >{{ item.phone }}</text>
								</text>
								<text class="item-title last-cild" space="emsp">
									状态:
									<text class="it2" :class="{'statusd': item.status == 3||item.status == 4}">{{ statusChange(item.status) }}</text>
								</text>
							</view>
							<view class="items">
								<text class="item-title" space="emsp">
									事发地点:
									<text class="it1">{{ item.address }}</text>
								</text>
							</view>
							<view class="items it4">
								<text class="item-title item-title1" space="emsp">上报内容:</text>
								<text class="it3">{{ item.content }}</text>
							</view>
							<view class="items">
								<text class="item-title" space="emsp">
									上报时间:
									<text class="it1">{{ item.time }}</text>
								</text>
							</view>
						</view>

						<!-- 上滑加载更多组件 -->
						<mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
	
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
			pageNo:1
		};
	},

	async onLoad() {
	
	},
	onReady() {
		console.log('我的饿饿上报');
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
		//打电话
		callPhone(phone){
			console.log(phone)
			uni.makePhoneCall({
			    phoneNumber: phone //仅为示例
			});
		},
		statusChange(index) {
			switch (index) {
				case 0:
					return '待处理';
					break;
				case 1:
					return '代办结';
					break;
				case 2:
					return '代办结';
					break;
			
				case 3:
					return '已办结';
					break;
					case 4:
						return '无效';
						break;
				default:
					return '待处理';
			}
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
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-grzx-wdsb.htm', {params:obj})
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
		//新闻详情
		navToDetails(item) {
			let data = {
				id: item.id,
				
			};
			

			uni.navigateTo({
				url: `/pages/my-report-detail/my-report-detail?data=${JSON.stringify(data)}`
			});
		},

		//下拉刷新
		onPulldownReresh() {
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
		width: 750rpx;
		padding: 20rpx 20rpx 1rpx 20rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}
	.item-title {
		font-size: 28rpx;
		color: #000;
		margin-right: 45rpx;
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
	.last-cild {
		margin-right: 0;
	}
	.it3 {
		padding-left: 10rpx;
		font-size: 28rpx;
		color: #000;
		width: 540rpx;
		font-weight: 500;
		overflow: hidden;
		word-break: break-all; /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis; /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2; /** 显示的行数 **/
	}
	.items {
		margin-bottom: 20rpx;
		padding-right: 20rpx;
	}
	.it4 {
		width: 100%;
		display: flex;
		flex-direction: row;
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

</style>
