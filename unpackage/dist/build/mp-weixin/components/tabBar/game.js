(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tabBar/game"],{"29cc":function(n,t,e){"use strict";var o=e("63a8"),i=e.n(o);i.a},"3c3a":function(n,t,e){"use strict";var o={"uni-nav-bar":function(){return e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"f9cd"))},"uni-icons":function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"48a4"))},"mix-pulldown-refresh":function(){return e.e("components/mix-pulldown-refresh/mix-pulldown-refresh").then(e.bind(null,"5058"))},"mix-load-more":function(){return e.e("components/mix-load-more/mix-load-more").then(e.bind(null,"58f8"))},"w-picker":function(){return e.e("components/w-picker/w-picker").then(e.bind(null,"fef1"))}},i=function(){var n=this,t=n.$createElement;n._self._c},s=[];e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return o}))},"4a4e":function(n,t,e){"use strict";e.r(t);var o=e("bfc4"),i=e.n(o);for(var s in o)"default"!==s&&function(n){e.d(t,n,(function(){return o[n]}))}(s);t["default"]=i.a},"63a8":function(n,t,e){},bfc4:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=s(e("4795")),i=s(e("76bc"));function s(n){return n&&n.__esModule?n:{default:n}}function a(n,t,e,o,i,s,a){try{var r=n[s](a),l=r.value}catch(c){return void e(c)}r.done?t(l):Promise.resolve(l).then(o,i)}function r(n){return function(){var t=this,e=arguments;return new Promise((function(o,i){var s=n.apply(t,e);function r(n){a(s,o,i,r,l,"next",n)}function l(n){a(s,o,i,r,l,"throw",n)}r(void 0)}))}}var l=function(){e.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(e("f9cd"))}.bind(null,e)).catch(e.oe)},c=function(){e.e("components/uni-grid/uni-grid").then(function(){return resolve(e("2935"))}.bind(null,e)).catch(e.oe)},u=function(){e.e("components/uni-grid-item/uni-grid-item").then(function(){return resolve(e("6dbb"))}.bind(null,e)).catch(e.oe)},d=function(){e.e("components/mix-pulldown-refresh/mix-pulldown-refresh").then(function(){return resolve(e("5058"))}.bind(null,e)).catch(e.oe)},f=function(){e.e("components/mix-load-more/mix-load-more").then(function(){return resolve(e("58f8"))}.bind(null,e)).catch(e.oe)},h={components:{uniNavBar:l,uniGrid:c,uniGridItem:u,mixPulldownRefresh:d,mixLoadMore:f},data:function(){return{value:["请选择县","请选择镇","请选择村"],name:"",idCard:"",phone:"",sexIndex:0,options:[],workIndex:0,dynamicList:[],list:[],defaultProps1:{label:"name",value:"id",children:"child"},srcId:"",trues:!0,tabCurrentIndex:0,scrollLeft:0,enableScroll:!0,tabBars:[],pageNo:1,isFirst:!0,isFirst1:!0}},onLoad:function(){var t=this;return r(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:windowWidth=n.getSystemInfoSync().windowWidth,t.init();case 2:case"end":return e.stop()}}),e)})))()},methods:{loadTabbars:function(){var n=i.default.tabList;n.forEach((function(n){n.newsList=[],n.loadMoreStatus=0,n.refreshing=0})),this.tabBars=n,this.loadNewsList("add")},loadNewsList:function(t){var e=this;console.log("实时监控数据");var o=this.tabBars[this.tabCurrentIndex];if("add"===t){if(2===o.loadMoreStatus)return;o.loadMoreStatus=1}var i={id:this.srcId,pageNo:this.pageNo};0==this.srcId.length&&delete i.id,this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-yjqz-ssjksp-x.htm",{params:i}).then((function(i){if(console.log(i),1==i.data.msgState){var s=i.data.list;console.log("list"),console.log(s),"refresh"===t&&(o.newsList=[]),s.forEach((function(n){o.newsList.push(n)})),e.pageNo+=1,"refresh"===t&&(e.$refs.mixPulldownRefresh&&e.$refs.mixPulldownRefresh.endPulldownRefresh(),0===i.data.totalPages||i.data.curPage===i.data.totalPages?o.loadMoreStatus=2:o.loadMoreStatus=0),"add"===t&&(0!==i.data.totalPages&&i.data.curPage!==i.data.totalPages||(o.loadMoreStatus=2,e.pageNo=1))}else n.showToast({title:i.data.msg,duration:2e3,icon:"none"})})).catch((function(t){console.log(t),console.log(t),n.showToast({icon:"none",title:"监控列表获取失败！",duration:2e3})}))},ontrueGetList:function(){console.log("实时监控"),console.log(this.isFirst),this.isFirst&&this.isFirst1?this.isFirst=!1:(this.init(),this.getType(),this.loadTabbars())},init:function(){this.value=["请选择县","请选择镇","请选择村"],this.srcId="",this.pageNo=1},getType:function(){var t=this;this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-sssj-xzcjl.htm",{params:{}}).then((function(e){1==e.data.msgState?(t.options=e.data.result,console.log(t.options)):n.showToast({icon:"none",title:"联动数据获取失败！",duration:2e3})})).catch((function(n){console.log(n)}))},getList:function(){var t=this,e={id:this.srcId,pageNo:this.pageNo};0==this.srcId.length&&delete e.id,this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-yjqz-ssjksp-x.htm",{params:e}).then((function(e){1==e.data.msgState?(t.list=e.data.list,console.log(t.list)):n.showToast({title:e.data.msg,duration:2e3,icon:"none"})})).catch((function(t){console.log(t),n.showToast({icon:"none",title:"监控列表获取失败！",duration:2e3})}))},lower:function(){n.showToast({title:"scroll-view的加载更多"}),console.log("分页数据可以放这里~~~~~~嘿嘿")},sizeTypeChange:function(n){this.sexIndex=parseInt(n.detail.value)},videoDetail:function(t){console.log(t);var e={id:t.id,address:t.address,name:t.name,logoUrl:t.logoUrl};if(0!=t.id.length){var o="video-details";console.log("视频参数"),console.log(e),n.navigateTo({url:"/pages/video-details/".concat(o,"?data=").concat(encodeURIComponent(JSON.stringify(e)))})}else n.showToast({icon:"none",title:"该点位已下线！",duration:2e3})},showPicker:function(){this.$refs.linkage.show()},onConfirm:function(n,t){console.log(n),console.log(t);var e=[];e.push(n.obj.col1.name),e.push(n.obj.col2.name),e.push(n.obj.col3.name),this.value=e,console.log(this.value),this.srcId=n.value[2],this.onPulldownReresh()},onCancel:function(){console.log("你取消了")},onPulldownReresh:function(){this.pageNo=1,this.loadNewsList("refresh")},loadMore:function(){this.loadNewsList("add")},setEnableScroll:function(n){this.enableScroll!==n&&(this.enableScroll=n)}}};t.default=h}).call(this,e("543d")["default"])},f59b:function(n,t,e){"use strict";e.r(t);var o=e("3c3a"),i=e("4a4e");for(var s in i)"default"!==s&&function(n){e.d(t,n,(function(){return i[n]}))}(s);e("29cc");var a,r=e("f0c5"),l=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=l.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tabBar/game-create-component',
    {
        'components/tabBar/game-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f59b"))
        })
    },
    [['components/tabBar/game-create-component']]
]);
