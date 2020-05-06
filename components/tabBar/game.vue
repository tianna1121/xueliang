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
		<scroll-view class="main_box" scroll-y="true" @scrolltolower="lower">
			<!-- 正文 -->
			<view class=" big-mm" v-for="(item, index) in list" :index="index" :key="index">
				<view class="grid-item-box" @tap="videoDetail(item.id)">
					<image class="image" :src="item.logoUrl" mode=""></image>
					<text class="text">{{ item.address }}</text>
				</view>
			</view>
		</scroll-view>
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
import json from '@/json';
export default {
	components: {
		uniNavBar,
		uniGrid,
		uniGridItem
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
			defaultProps1:{"label":"name","value":"name","children":"child"},
			pageNo:1,
			srcId:''
		};
	},
	methods: {
		ontrueGetList() {
			console.log('实时监控');
			this.getType();
			console.log(json.subs);
			this.list = json.subs;
			this.getList()
		},
		getType() {
			this.$http
				.get('/interface/rest/http/xlwb/xlgc-wb-xcx-sssj-xzcjl.htm', { params: {} })
				.then(res => {
					console.log('级联数据');
					console.log(res);
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
			var obj={srcId: this.srcId,pageNo:this.pageNo}
			if(this.srcId.length==0){
				delete obj.srcId 
			}
		this.$http
			.get('/interface/rest/http/xlwb/xlgc-wb-xcx-yjqz-ssjksp-x.htm', { params: obj })
			.then(res => {
				console.log('监控列表数据');
				console.log(res);
				if (res.data.msgState == 1) {
					// this.options=res.data.result
					// console.log(this.options)
					
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
		videoDetail(id) {
			let data = {
				id: id
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
			this.value=$event.value;
			console.log(val)
			//TODO在这里发起请求
			
		},
		onCancel(){
			console.log('你取消了')
		}
	}
};
</script>

<style lang="scss">
.main {
	background-color: #ffffff;
}
// padding-bottom:120rpx;box-sizing: border-box;重要*************************保证页面底部内容不被隐藏也不会出现多余的滚动条
.main_box {
	width: 100vw;
	// height: 100vh;
	padding-bottom: 120rpx;
	box-sizing: border-box;
	margin-top: 84rpx;
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
</style>
