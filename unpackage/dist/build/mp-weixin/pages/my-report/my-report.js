(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my-report/my-report"],{"0423":function(t,e,n){"use strict";(function(t){n("700f"),n("921b");o(n("66fd"));var e=o(n("23c2"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"0a9e":function(t,e,n){"use strict";var o={"uni-nav-bar":function(){return n.e("components/uni-nav-bar/uni-nav-bar").then(n.bind(null,"8265"))},"mix-pulldown-refresh":function(){return n.e("components/mix-pulldown-refresh/mix-pulldown-refresh").then(n.bind(null,"4144"))},"mix-load-more":function(){return n.e("components/mix-load-more/mix-load-more").then(n.bind(null,"46fd"))}},a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.tabBars,(function(e,n){var o=t.__map(e.newsList,(function(e,n){var o=t.statusChange(e.status);return{$orig:t.__get_orig(e),m0:o}}));return{$orig:t.__get_orig(e),l0:o}})));t.$mp.data=Object.assign({},{$root:{l1:n}})},r=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}))},"23c2":function(t,e,n){"use strict";n.r(e);var o=n("0a9e"),a=n("5d21");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("63d8");var i,u=n("f0c5"),s=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=s.exports},"5d21":function(t,e,n){"use strict";n.r(e);var o=n("74a7"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},"63d8":function(t,e,n){"use strict";var o=n("c4db"),a=n.n(o);a.a},"74a7":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("4795")),a=r(n("2f89"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,o,a,r,i){try{var u=t[r](i),s=u.value}catch(l){return void n(l)}u.done?e(s):Promise.resolve(s).then(o,a)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var r=t.apply(e,n);function u(t){i(r,o,a,u,s,"next",t)}function s(t){i(r,o,a,u,s,"throw",t)}u(void 0)}))}}var s=function(){n.e("components/mix-pulldown-refresh/mix-pulldown-refresh").then(function(){return resolve(n("4144"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/mix-load-more/mix-load-more").then(function(){return resolve(n("46fd"))}.bind(null,n)).catch(n.oe)},c={components:{mixPulldownRefresh:s,mixLoadMore:l},data:function(){return{trues:!0,tabCurrentIndex:0,scrollLeft:0,enableScroll:!0,tabBars:[],pageNo:1}},onLoad:function(){return u(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},onReady:function(){console.log("我的饿饿上报"),t.getSystemInfoSync().windowWidth,this.loadTabbars()},methods:{back:function(){t.navigateBack({delta:1})},callPhone:function(e){console.log(e),t.makePhoneCall({phoneNumber:e})},statusChange:function(t){switch(t){case 0:return"待处理";case 1:return"代办结";case 2:return"代办结";case 3:return"已办结";case 4:return"无效";default:return"待处理"}},loadTabbars:function(){var t=a.default.tabList;t.forEach((function(t){t.newsList=[],t.loadMoreStatus=0,t.refreshing=0})),this.tabBars=t,this.loadNewsList("add")},loadNewsList:function(e){var n=this,o=this.tabBars[this.tabCurrentIndex];if("add"===e){if(2===o.loadMoreStatus)return;o.loadMoreStatus=1}var a={pageNo:this.pageNo};this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-grzx-wdsb.htm",{params:a}).then((function(a){if(console.log(a),1==a.data.msgState){var r=a.data.list;console.log("list"),console.log(r),"refresh"===e&&(o.newsList=[]),r.forEach((function(t){o.newsList.push(t)})),"refresh"===e&&(n.$refs.mixPulldownRefresh&&n.$refs.mixPulldownRefresh.endPulldownRefresh(),0===a.data.totalPages||a.data.curPage===a.data.totalPages?o.loadMoreStatus=2:o.loadMoreStatus=0),"add"===e&&(0!==a.data.totalPages&&a.data.curPage!==a.data.totalPages||(o.loadMoreStatus=2))}else t.showLoading({title:"请求失败"})})).catch((function(t){console.log(t)}))},navToDetails:function(e){var n={id:e.id};t.navigateTo({url:"/pages/my-report-detail/my-report-detail?data=".concat(JSON.stringify(n))})},onPulldownReresh:function(){this.loadNewsList("refresh")},loadMore:function(){this.loadNewsList("add")},setEnableScroll:function(t){this.enableScroll!==t&&(this.enableScroll=t)},getElSize:function(e){var n=this;return new Promise((function(o,a){var r=t.createSelectorQuery().in(n).select("#"+e);r.fields({size:!0,scrollOffset:!0,rect:!0},(function(t){o(t)})).exec()}))}}};e.default=c}).call(this,n("543d")["default"])},c4db:function(t,e,n){}},[["0423","common/runtime","common/vendor"]]]);