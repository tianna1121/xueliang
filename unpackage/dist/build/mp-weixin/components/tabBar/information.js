(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tabBar/information"],{"227a":function(t,n,e){"use strict";var r={"uni-nav-bar":function(){return e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"8265"))},"mix-pulldown-refresh":function(){return e.e("components/mix-pulldown-refresh/mix-pulldown-refresh").then(e.bind(null,"4144"))},"mix-load-more":function(){return e.e("components/mix-load-more/mix-load-more").then(e.bind(null,"46fd"))}},o=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.tabBars,(function(n,e){var r=t.__map(n.newsList,(function(n,e){var r=t.statusChange(n.category);return{$orig:t.__get_orig(n),m0:r}}));return{$orig:t.__get_orig(n),l0:r}})));t.$mp.data=Object.assign({},{$root:{l1:e}})},a=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}))},"7f71":function(t,n,e){},"853a":function(t,n,e){"use strict";e.r(n);var r=e("c578"),o=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=o.a},aa5b:function(t,n,e){"use strict";var r=e("7f71"),o=e.n(r);o.a},c578:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(e("4795")),o=a(e("2f89"));function a(t){return t&&t.__esModule?t:{default:t}}function i(t,n,e,r,o,a,i){try{var u=t[a](i),s=u.value}catch(c){return void e(c)}u.done?n(s):Promise.resolve(s).then(r,o)}function u(t){return function(){var n=this,e=arguments;return new Promise((function(r,o){var a=t.apply(n,e);function u(t){i(a,r,o,u,s,"next",t)}function s(t){i(a,r,o,u,s,"throw",t)}u(void 0)}))}}var s,c=function(){e.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(e("8265"))}.bind(null,e)).catch(e.oe)},l=function(){e.e("components/mix-pulldown-refresh/mix-pulldown-refresh").then(function(){return resolve(e("4144"))}.bind(null,e)).catch(e.oe)},f=function(){e.e("components/mix-load-more/mix-load-more").then(function(){return resolve(e("46fd"))}.bind(null,e)).catch(e.oe)},d=0,h=!1,b={components:{mixPulldownRefresh:l,mixLoadMore:f,uniNavBar:c},data:function(){return{trues:!0,tabCurrentIndex:0,scrollLeft:0,enableScroll:!0,tabBars:[]}},onLoad:function(){var n=this;return u(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:d=t.getSystemInfoSync().windowWidth,n.loadTabbars();case 2:case"end":return e.stop()}}),e)})))()},onReady:function(){},methods:{statusChange:function(t){switch(t){case 1:return"通知";case 2:return"公告";case 3:return"工作";default:return"通知"}},ontrueGetList:function(){console.log("加载了通知/公告，可以把网络请求放这里"),d=t.getSystemInfoSync().windowWidth,this.loadTabbars()},loadTabbars:function(){var t=o.default.tabList1;t.forEach((function(t){t.newsList=[],t.loadMoreStatus=0,t.refreshing=0})),this.tabBars=t,this.loadNewsList("add")},loadNewsList:function(n){var e=this,r=this.tabBars[this.tabCurrentIndex];if("add"===n){if(2===r.loadMoreStatus)return;r.loadMoreStatus=1}this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-tzgg-lb.htm",{params:{type:this.tabCurrentIndex+1}}).then((function(n){if(console.log(n),200==n.statusCode){var e=n.data.list;console.log("list"),console.log(e)}else t.showLoading({title:"请求失败"})})).catch((function(t){console.log(t)})),setTimeout((function(){var t=o.default.evaList1;t.sort((function(t,n){return Math.random()>.5?-1:1})),"refresh"===n&&(r.newsList=[]),t.forEach((function(t){t.id=parseInt(1e4*Math.random()),r.newsList.push(t)})),"refresh"===n&&(e.$refs.mixPulldownRefresh&&e.$refs.mixPulldownRefresh.endPulldownRefresh(),r.loadMoreStatus=0),"add"===n&&(r.loadMoreStatus=r.newsList.length>40?2:0)}),600)},navToDetails:function(n){console.log(n);var e=n,r="notificationDetail";t.navigateTo({url:"/pages/notificationDetail/".concat(r,"?data=").concat(JSON.stringify(e))})},onPulldownReresh:function(){this.loadNewsList("refresh")},loadMore:function(){this.loadNewsList("add")},setEnableScroll:function(t){this.enableScroll!==t&&(this.enableScroll=t)},changeTab:function(t){var n=this;return u(r.default.mark((function e(){var o,a,i,u,c;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(h&&(clearTimeout(h),h=!1),o=t,"object"===typeof t&&(o=t.detail.current),"object"===typeof s){e.next=7;break}return e.next=6,n.getElSize("nav-bar");case 6:s=e.sent;case 7:s.scrollLeft,a=0,i=0,u=0;case 11:if(!(u<=o)){e.next=20;break}return e.next=14,n.getElSize("tab"+u);case 14:c=e.sent,a+=c.width,u===o&&(i=c.width);case 17:u++,e.next=11;break;case 20:"number"===typeof t&&(n.tabCurrentIndex=o),h=setTimeout((function(){n.scrollLeft=a-i/2>d/2?a-i/2-d/2:0,"object"===typeof t&&(n.tabCurrentIndex=o),n.tabCurrentIndex=o;n.tabBars[n.tabCurrentIndex];n.loadNewsList("add")}),300);case 22:case"end":return e.stop()}}),e)})))()},getElSize:function(n){var e=this;return new Promise((function(r,o){var a=t.createSelectorQuery().in(e).select("#"+n);a.fields({size:!0,scrollOffset:!0,rect:!0},(function(t){r(t)})).exec()}))}}};n.default=b}).call(this,e("543d")["default"])},d27a:function(t,n,e){"use strict";e.r(n);var r=e("227a"),o=e("853a");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("aa5b");var i,u=e("f0c5"),s=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);n["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tabBar/information-create-component',
    {
        'components/tabBar/information-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d27a"))
        })
    },
    [['components/tabBar/information-create-component']]
]);