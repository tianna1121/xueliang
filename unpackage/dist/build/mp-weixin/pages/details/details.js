(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/details/details"],{"44c1":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=o(e("4795"));o(e("2f89"));function o(t){return t&&t.__esModule?t:{default:t}}function s(t,n,e,i,o,s,u){try{var a=t[s](u),c=a.value}catch(r){return void e(r)}a.done?n(c):Promise.resolve(c).then(i,o)}function u(t){return function(){var n=this,e=arguments;return new Promise((function(i,o){var u=t.apply(n,e);function a(t){s(u,i,o,a,c,"next",t)}function c(t){s(u,i,o,a,c,"throw",t)}a(void 0)}))}}var a=function(){e.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(e("8265"))}.bind(null,e)).catch(e.oe)},c=function(){e.e("components/uni-steps/uni-steps").then(function(){return resolve(e("539e"))}.bind(null,e)).catch(e.oe)},r=function(){e.e("components/uni-list/uni-list").then(function(){return resolve(e("ce03"))}.bind(null,e)).catch(e.oe)},l=function(){e.e("components/uni-list-item/uni-list-item").then(function(){return resolve(e("0af5"))}.bind(null,e)).catch(e.oe)},f=function(){e.e("components/uni-popup/uni-popup").then(function(){return resolve(e("212b"))}.bind(null,e)).catch(e.oe)},d={components:{uniNavBar:a,uniSteps:c,uniList:r,uniListItem:l,uniPopup:f},data:function(){return{id:"",showtip1:"center",detailData:{},imgList:[],active:1,userFeedbackHidden:!0,feedbackContent:"",latitude:30.663429,longitude:104.072422,covers:[{latitude:30.663429,longitude:104.072422,iconPath:"../../static/location.png",width:50,height:50}]}},onLoad:function(t){var n=JSON.parse(t.data);this.id=n.id,console.log(this.id),this.loadNewsList()},methods:{loadNewsList:function(){var n=this;return u(i.default.mark((function e(){return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.showLoading({title:"加载中..."}),n.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-sjzx-sjxq.htm",{params:{id:n.id}}).then((function(e){if(t.hideLoading(),console.log(e),1==e.data.msgState){var i=e.data.list;console.log("list"),console.log(i),n.detailData=i[0]}else t.showToast({title:"请求失败"})})).catch((function(n){console.log(n),t.hideLoading()}));case 2:case"end":return e.stop()}}),e)})))()},statusChange:function(t){switch(t){case 1:return"待处理";case 2:return"处理中";case 3:return"已处理";default:return"待处理"}},back:function(){t.navigateBack({delta:1})},scroll:function(t){console.log(t.detail.scrollTop)},previewImage:function(n){var e=n.target.dataset.src;console.log("current"),console.log(e),t.previewImage({current:e,urls:this.detailData.imgList})},submitMsg:function(){var t=this;console.log("確認完成"),this.$nextTick((function(){t.$refs.showtip.open()}))},alertMsg:function(){var t=this;console.log("我要反馈"),this.$nextTick((function(){t.$refs.showtip1.open()}))},submitFeedbackContent:function(){var n=this,e={feedback_content:this.feedbackContent};this.$refs.showtip1.close(),t.showLoading({title:"loading"}),this.$http.post("/interface/rest/http/xlwb/xlgc-wb-xcx-sjzx-wyfk.htm",e).then((function(e){t.hideLoading(),console.log(e.data),1==e.data.msgState&&(n.detailData.feedback_content=n.feedbackContent),t.showToast({title:e.data.msg,duration:2e3})})).catch((function(n){console.log(n),t.hideLoading()}))},submitOver:function(){var n=this;this.$refs.showtip.close(),this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-sjzx-clwc.htm",{params:{}}).then((function(e){console.log(e),1==e.data.msgState?(t.showToast({title:e.data.msg,duration:2e3}),setTimeout((function(){n.back()}),1e3)):t.showLoading({title:"请求失败"})})).catch((function(t){console.log(t)}))},cancel:function(t){this.$refs.showtip.close(),this.$refs.showtip1.close()}}};n.default=d}).call(this,e("543d")["default"])},"5d66":function(t,n,e){},"6bb5":function(t,n,e){"use strict";e.r(n);var i=e("b216"),o=e("e483");for(var s in o)"default"!==s&&function(t){e.d(n,t,(function(){return o[t]}))}(s);e("8999");var u,a=e("f0c5"),c=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);n["default"]=c.exports},8999:function(t,n,e){"use strict";var i=e("5d66"),o=e.n(i);o.a},b216:function(t,n,e){"use strict";var i={"uni-nav-bar":function(){return e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"8265"))},"uni-steps":function(){return e.e("components/uni-steps/uni-steps").then(e.bind(null,"539e"))},"uni-list":function(){return e.e("components/uni-list/uni-list").then(e.bind(null,"ce03"))},"uni-list-item":function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"0af5"))},"uni-popup":function(){return e.e("components/uni-popup/uni-popup").then(e.bind(null,"212b"))}},o=function(){var t=this,n=t.$createElement,e=(t._self._c,t.statusChange(t.detailData.status));t.$mp.data=Object.assign({},{$root:{m0:e}})},s=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return i}))},b8bf:function(t,n,e){"use strict";(function(t){e("700f"),e("921b");i(e("66fd"));var n=i(e("6bb5"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},e483:function(t,n,e){"use strict";e.r(n);var i=e("44c1"),o=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(n,t,(function(){return i[t]}))}(s);n["default"]=o.a}},[["b8bf","common/runtime","common/vendor"]]]);