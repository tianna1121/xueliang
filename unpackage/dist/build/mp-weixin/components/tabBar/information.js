(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tabBar/information"],{"212d":function(t,e,n){"use strict";var a={"uni-nav-bar":function(){return n.e("components/uni-nav-bar/uni-nav-bar").then(n.bind(null,"8265"))},"mix-pulldown-refresh":function(){return n.e("components/mix-pulldown-refresh/mix-pulldown-refresh").then(n.bind(null,"4144"))},"mix-load-more":function(){return n.e("components/mix-load-more/mix-load-more").then(n.bind(null,"46fd"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.tabBars,(function(e,n){var a=t.__map(e.newsList,(function(e,n){var a=t.statusChange(e.category);return{$orig:t.__get_orig(e),m0:a}}));return{$orig:t.__get_orig(e),l0:a}})));t.$mp.data=Object.assign({},{$root:{l1:n}})},r=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},"853a":function(t,e,n){"use strict";n.r(e);var a=n("c578"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=o.a},aa5b:function(t,e,n){"use strict";var a=n("e1cc"),o=n.n(a);o.a},c578:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("4795")),o=r(n("2f89"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,a,o,r,i){try{var s=t[r](i),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(a,o)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var r=t.apply(e,n);function s(t){i(r,a,o,s,u,"next",t)}function u(t){i(r,a,o,s,u,"throw",t)}s(void 0)}))}}var u,c=function(){n.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(n("8265"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/mix-pulldown-refresh/mix-pulldown-refresh").then(function(){return resolve(n("4144"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/mix-load-more/mix-load-more").then(function(){return resolve(n("46fd"))}.bind(null,n)).catch(n.oe)},d=0,h=!1,b={components:{mixPulldownRefresh:l,mixLoadMore:f,uniNavBar:c},data:function(){return{trues:!0,tabCurrentIndex:0,scrollLeft:0,enableScroll:!0,tabBars:[],pageNo:1}},onLoad:function(){var e=this;return s(a.default.mark((function n(){return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:d=t.getSystemInfoSync().windowWidth,e.loadTabbars();case 2:case"end":return n.stop()}}),n)})))()},onReady:function(){},methods:{statusChange:function(t){switch(t){case 1:return"通知";case 2:return"公告";case 3:return"工作安排";default:return"通知"}},ontrueGetList:function(){console.log("加载了通知/公告，可以把网络请求放这里"),d=t.getSystemInfoSync().windowWidth,this.loadTabbars()},loadTabbars:function(){var t=o.default.tabList1;t.forEach((function(t){t.newsList=[],t.loadMoreStatus=0,t.refreshing=0})),this.tabBars=t,this.loadNewsList("add")},loadNewsList:function(e){var n=this,a=this.tabBars[this.tabCurrentIndex];if("add"===e){if(2===a.loadMoreStatus)return;a.loadMoreStatus=1}var o={type:this.tabCurrentIndex+1,pageNo:this.pageNo};this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-tzgg-lb.htm",{params:o}).then((function(o){if(console.log(o),1==o.data.msgState){var r=o.data.list;console.log("list"),console.log(r),"refresh"===e&&(a.newsList=[]),r.forEach((function(t){a.newsList.push(t)})),n.pageNo+=1,"refresh"===e&&(n.$refs.mixPulldownRefresh&&n.$refs.mixPulldownRefresh.endPulldownRefresh(),0===o.data.totalPages||o.data.curPage===o.data.totalPages?a.loadMoreStatus=2:a.loadMoreStatus=0),"add"===e&&(0!==o.data.totalPages&&o.data.curPage!==o.data.totalPages||(a.loadMoreStatus=2,n.pageNo=1))}else t.showToast({title:o.data.msg,duration:2e3,icon:"none"})})).catch((function(t){console.log(t)}))},navToDetails:function(e){console.log(e);var n=e,a="notificationDetail";t.navigateTo({url:"/pages/notificationDetail/".concat(a,"?data=").concat(JSON.stringify(n))})},onPulldownReresh:function(){this.pageNo=1,this.loadNewsList("refresh")},loadMore:function(){this.loadNewsList("add")},setEnableScroll:function(t){this.enableScroll!==t&&(this.enableScroll=t)},changeTab:function(t){var e=this;return s(a.default.mark((function n(){var o,r,i,s,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.pageNo=1,h&&(clearTimeout(h),h=!1),o=t,"object"===typeof t&&(o=t.detail.current),"object"===typeof u){n.next=8;break}return n.next=7,e.getElSize("nav-bar");case 7:u=n.sent;case 8:u.scrollLeft,r=0,i=0,s=0;case 12:if(!(s<=o)){n.next=21;break}return n.next=15,e.getElSize("tab"+s);case 15:c=n.sent,r+=c.width,s===o&&(i=c.width);case 18:s++,n.next=12;break;case 21:"number"===typeof t&&(e.tabCurrentIndex=o),h=setTimeout((function(){e.scrollLeft=r-i/2>d/2?r-i/2-d/2:0,"object"===typeof t&&(e.tabCurrentIndex=o),e.tabCurrentIndex=o;e.tabBars[e.tabCurrentIndex];e.loadNewsList("add")}),300);case 23:case"end":return n.stop()}}),n)})))()},getElSize:function(e){var n=this;return new Promise((function(a,o){var r=t.createSelectorQuery().in(n).select("#"+e);r.fields({size:!0,scrollOffset:!0,rect:!0},(function(t){a(t)})).exec()}))}}};e.default=b}).call(this,n("543d")["default"])},d27a:function(t,e,n){"use strict";n.r(e);var a=n("212d"),o=n("853a");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("aa5b");var i,s=n("f0c5"),u=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=u.exports},e1cc:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tabBar/information-create-component',
    {
        'components/tabBar/information-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d27a"))
        })
    },
    [['components/tabBar/information-create-component']]
]);
