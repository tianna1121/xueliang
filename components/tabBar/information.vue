<template>
	<view class="bigBox">
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" 
		 title="通知/公告"  />
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item, index) in tabBars" :key="item.id" class="nav-item" :class="{ current: index === tabCurrentIndex }" :id="'tab' + index" @click="changeTab(index)">
				{{ item.name }}
			</view>
		</scroll-view>

		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<!-- 内容部分 -->
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">
						<!-- 
							* 新闻列表 
							* 和nvue的区别只是需要把uni标签转为weex标签而已
							* class 和 style的绑定限制了一些语法，其他并没有不同
						-->
						<view v-for="(item, index) in tabItem.newsList" :key="index" class="news-item" @click="navToDetails(item)">
							<view class="notify-title">
							<text class="titles1">	{{statusChange(item.category) }}</text>
							<view class="">
								<template>
									<image class="read-img" v-if="item.status==1" src="../../static/img/news/unread.png" mode=""></image>
									<image class="read-img" v-else src="../../static/img/news/read.png" mode=""></image>
								</template>
								
								<text class="status-text">	{{ item.status==1?"已读":"未读"}}</text>
							</view>	
							</view>
							<view class="it3">
								{{ item.content}}
							</view>
							<view class="time1">
								{{ item.time}}
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
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
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
		uniNavBar
	},
	data() {
		return {
			trues:true,
			tabCurrentIndex: 0, //当前选项卡索引
			scrollLeft: 0, //顶部选项卡左滑距离
			enableScroll: true,
			tabBars: []
		};
	},

	async onLoad() {
		// 获取屏幕宽度
		windowWidth = uni.getSystemInfoSync().windowWidth;
		
		this.loadTabbars();
	},
	onReady() {},
	methods: {
		statusChange(index) {
			switch (index) {
				case 1:
					return '通知';
					break;
				case 2:
					return '公告';
					break;
		
				case 3:
					return '工作';
					break;
				default:
					return '通知';
			}
		},
		ontrueGetList() {
			console.log('加载了通知/公告，可以把网络请求放这里');
			// 获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
			this.loadTabbars();
		},
		
		/**
		 * 数据处理方法在vue和nvue中通用，可以直接用mixin混合
		 * 这里直接写的
		 * mixin使用方法看index.nuve
		 */
		//获取分类
		loadTabbars() {
			let tabList = json.tabList1;
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
			}
			// #endif

			//setTimeout模拟异步请求数据
			setTimeout(() => {
				let list = json.evaList1;
				list.sort((a, b) => {
					return Math.random() > 0.5 ? -1 : 1; //静态数据打乱顺序
				});
				if (type === 'refresh') {
					tabItem.newsList = []; //刷新前清空数组
				}
				list.forEach(item => {
					item.id = parseInt(Math.random() * 10000);
					tabItem.newsList.push(item);
				});
				//下拉刷新 关闭刷新动画
				if (type === 'refresh') {
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
					// #ifdef APP-PLUS
					tabItem.refreshing = false;
					// #endif
					tabItem.loadMoreStatus = 0;
				}
				//上滑加载 处理状态
				if (type === 'add') {
					tabItem.loadMoreStatus = tabItem.newsList.length > 40 ? 2 : 0;
				}
			}, 600);
		},
		//新闻详情
		navToDetails(item) {
			console.log(item)
			let data = item;
			let url =  'notificationDetail';

			uni.navigateTo({
				url: `/pages/notificationDetail/${url}?data=${JSON.stringify(data)}`
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

		//tab切换
		async changeTab(e) {
			if (scrollTimer) {
				//多次切换只执行最后一次
				clearTimeout(scrollTimer);
				scrollTimer = false;
			}
			let index = e;
			//e=number为点击切换，e=object为swiper滑动切换
			if (typeof e === 'object') {
				index = e.detail.current;
			}
			if (typeof tabBar !== 'object') {
				tabBar = await this.getElSize('nav-bar');
			}
			//计算宽度相关
			let tabBarScrollLeft = tabBar.scrollLeft;
			let width = 0;
			let nowWidth = 0;
			//获取可滑动总宽度
			for (let i = 0; i <= index; i++) {
				let result = await this.getElSize('tab' + i);
				width += result.width;
				if (i === index) {
					nowWidth = result.width;
				}
			}
			if (typeof e === 'number') {
				//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
				this.tabCurrentIndex = index;
			}
			//延迟300ms,等待swiper动画结束再修改tabbar
			scrollTimer = setTimeout(() => {
				if (width - nowWidth / 2 > windowWidth / 2) {
					//如果当前项越过中心点，将其放在屏幕中心
					this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
				} else {
					this.scrollLeft = 0;
				}
				if (typeof e === 'object') {
					this.tabCurrentIndex = index;
				}
				this.tabCurrentIndex = index;

				//第一次切换tab，动画结束后需要加载数据
				let tabItem = this.tabBars[this.tabCurrentIndex];
				if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
					this.loadNewsList('add');
					tabItem.loaded = true;
				}
			}, 300);
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
.bigBox {
	page,
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		width: 750rpx;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
		background-color: #fff;
		.nav-item {
			display: inline-block;
			width: 50%;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
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
	

	.news-item {
		position: relative;
	}
	/* 修改结束 */

	/* 新闻列表  emmm 仅供参考 */
	.news-item {
		width: 750rpx;
		padding: 1rpx 1rpx 1rpx 33rpx;
		background-color: #fff;
		margin-bottom: 10rpx;
	}
	
.notify-title{
	width: 687rpx;
	height: 61rpx;
	padding: 21rpx 29rpx 20rpx 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
		align-items: center;
		flex: 1;
	border-bottom: 1px solid #F1F1F1;
}
.titles1{
 font-size:34rpx;
 color: #888888;
}
	
.read-img{
	width: 20rpx;
	height: 20rpx;
	margin-right: 6rpx;
}
	
.status-text{
	font-size: 30rpx;
	color: #888888;
}
	
	.it3 {
	    margin-top: 18rpx;
		font-size: 32rpx;
		color: #000000;
		width: 697rpx;
		height: 96rpx;
		line-height:48rpx;
		overflow: hidden;
		word-break: break-all; /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis; /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2; /** 显示的行数 **/
	}
	.time1 {
		margin-top: 31rpx;
		margin-bottom: 16rpx;
		  
		color: #888888;
		font-size: 28rpx;
		
	}
	.it4{
		width: 100%;
		display: flex;
		flex-direction: row;
	}

}

</style>
