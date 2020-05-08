<template>
	<view class="main">
		<!-- 自定义标题 -->
		<uni-nav-bar fixed="true" color="#007AFF" background-color="#F8F8F8" :status-bar="true" title="实时监控" />
		<view class="jian-kong-box" @tap="showPicker">
			<view class="pick-box">
				<view>{{value[0]}}</view>
				<uni-icons type="arrowdown" color="#000000" size="18" />
			</view>
			<view class="pick-box">
				<view>{{value[1]}}</view>
				<uni-icons type="arrowdown" color="#000000" size="18" />
			</view>
			<view class="pick-box">
				<view>{{value[2]}}</view>
				<uni-icons type="arrowdown" color="#000000" size="18" />
			</view>
		</view>
		<view class="tips">
			
		</view>
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<!-- 内容部分 -->
			<swiper id="swiper" class="swiper-box" :duration="300" >
				<swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">
			
			<!-- 正文 -->
			<view class=" big-mm" v-for="(item, index) in tabItem.newsList" :index="index" :key="index">
				<view class="grid-item-box" @tap="videoDetail(item)">
					<image class="image" src="http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg" mode=""></image>
					<text class="text">{{ item.location }}</text>
				</view>
			</view>
			
		<!-- 上滑加载更多组件 -->
						<mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		<w-picker
			mode="linkage"
			        :value="value"
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
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
import mixLoadMore from '@/components/mix-load-more/mix-load-more';
import json from '@/json';
export default {
	components: {
		uniNavBar,
		uniGrid,
		uniGridItem,
		mixPulldownRefresh,
		mixLoadMore,
	},
	data() {
		return {
			imageList: [],
			value:['请选择', '请选择', '请选择'],
			name: '',
			idCard: '',
			phone: '',
			
			sexIndex: 0,
            options:[],
			workIndex: 0,
			dynamicList: [],
			list: [],
			defaultProps1:{"label":"name","value":"id","children":"child"},
			srcId:'',
			trues: true,
			tabCurrentIndex: 0, //当前选项卡索引
			scrollLeft: 0, //顶部选项卡左滑距离
			enableScroll: true,
			tabBars: [],
			pageNo:1
		};
	},
	async onLoad() {
		// 获取屏幕宽度
		windowWidth = uni.getSystemInfoSync().windowWidth;
		
	},
	methods: {
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
		loadNewsList(type) {
			console.log("实时监控数据")
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
			var obj={id: this.srcId,pageNo:this.pageNo}
			if(this.srcId.length==0){
				delete obj.id 
			}
			
			this.$http
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-yjqz-ssjksp-x.htm', {params:obj})
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
					console.log(err);
					uni.showToast({
						icon:"none",
						title: '监控列表获取失败！',
						duration:2000
					});
				});
		},
		
		ontrueGetList() {
			console.log('实时监控');
			this.init()
			this.getType();
			this.loadTabbars();
			
			
			//console.log(json.subs);
			//this.list = json.subs;
			//this.getList()
		},
		init(){
			this.value=['请选择', '请选择', '请选择']
			this.srcId=''
			this.pageNo=1
		},
		getType() {
			this.$http
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-sssj-xzcjl.htm', { params: {} })
				.then(res => {
					//console.log('级联数据');
					//console.log(res);
					if (res.data.msgState == 1) {
						 this.options=res.data.result
						 console.log(this.options)
						// var obj1 = [{ id: '0', type: '点击选择' }];
						// var data = res.data.list;
						// var obj = [...obj1, ...data];
						// this.type1 = this.typeChange(obj);
						// this.type2 = this.typeChange(obj);
					} else {
						uni.showToast({
							icon:"none",
							title: '联动数据获取失败！',
							duration:2000
						});
						
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getList(){
			var obj={id: this.srcId,pageNo:this.pageNo}
			if(this.srcId.length==0){
				delete obj.id 
			}
		this.$http
			.get('/interface/rest/http/xlwb/xlgc-wb-xcx-yjqz-ssjksp-x.htm', { params: obj })
			.then(res => {
				//console.log('监控列表数据');
				//console.log(res);
				if (res.data.msgState == 1) {
					 this.list=res.data.list
					console.log(this.list)
					
				} else {
					uni.showToast({
						icon:"none",
						title: '监控列表获取失败！',
						duration:2000
					});
					
				}
			})
			.catch(err => {
				console.log(err);
				uni.showToast({
					icon:"none",
					title: '监控列表获取失败！',
					duration:2000
				});
			});	
		},
		lower() {
			uni.showToast({
				title: 'scroll-view的加载更多'
			});
			console.log('分页数据可以放这里~~~~~~嘿嘿');
		},
		sizeTypeChange(e) {
			this.sexIndex = parseInt(e.detail.value);
		},
		change(e) {
			let { index } = e.detail;
			this.list[index].badge && this.list[index].badge++;

			uni.showToast({
				title: `点击第${index + 1}个宫格`,
				icon: 'none'
			});
		},
		videoDetail(item ) {
			let data = {
				item:item
			};
			let url = 'video-details';

			uni.navigateTo({
				url: `/pages/video-details/${url}?data=${JSON.stringify(data)}`
			});
		},
		showPicker() {
			this.$refs.linkage.show();
		},
		onConfirm($event,val){
			console.log($event);
				console.log(val)
			var arr=[];
			arr.push($event.obj.col1.name)
			arr.push($event.obj.col2.name)
			arr.push($event.obj.col3.name)
			this.value=arr;
			console.log(this.value);
		this.srcId=$event.value[2]
		
			//TODO在这里发起请求
			this.onPulldownReresh()
		},
		onCancel(){
			console.log('你取消了')
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
		
		
	}
};
</script>

<style lang="scss">
.main {
	background-color: #ffffff;
	//padding-bottom:120rpx;box-sizing: border-box;
}
//padding-bottom:120rpx;box-sizing: border-box;重要*************************保证页面底部内容不被隐藏也不会出现多余的滚动条
.main_box {
	width: 100vw;
	 height: 100vh;
	padding-bottom: 130rpx;
	box-sizing: border-box;
	margin-top: 84rpx;
}
.swiper-box {
		height: 100%;
		margin-top: 90rpx;
	}
.main_centent {
	width: 100%;
	height: 100vh;
	color: #fff;
	letter-spacing: 4rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.jian-kong-box {
	background-color: #FFFFFF;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 750rpx;
	height: 84rpx;
	position: fixed;
	z-index: 9999;
}
.pick-box {
	font-size: 30rpx;
	width: 33.3%;
	height: 84rpx;
	text-align: center;
	line-height: 84rpx;
	display: flex;
	flex-direction: row;
	justify-content: center;
}



.big-mm {
	display: inline-block;
	width: 355rpx;
	height: 306rpx;
	margin: 0 10rpx 30rpx 10rpx;
}

.grid-item-box {
	display: flex;
	flex-direction: column;

	justify-content: left;
}
.image {
	width: 360rpx;
	height: 256rpx;
	margin-bottom: 10rpx;
}

.text {
	font-size: 28rpx;
	font-weight: 500;
	margin-top: 10rpx;
}


.panel-scroll-box {
		height: 100%;

		.panel-item {
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
</style>
