(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/notificationDetail/notificationDetail"],{"362f":function(t,n,e){},"40e8":function(t,n,e){"use strict";e.r(n);var a=e("799d"),o=e("eea8");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("b4aa");var c,u=e("f0c5"),s=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=s.exports},"61e0":function(t,n,e){"use strict";(function(t){e("700f");a(e("66fd"));var n=a(e("40e8"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"799d":function(t,n,e){"use strict";var a={uniNavBar:function(){return e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"8265"))},uniPopup:function(){return e.e("components/uni-popup/uni-popup").then(e.bind(null,"212b"))}},o=function(){var t=this,n=t.$createElement,e=(t._self._c,t.statusChange(t.detailData.category));t.$mp.data=Object.assign({},{$root:{m0:e}})},i=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}))},a355:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){e.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(e("8265"))}.bind(null,e)).catch(e.oe)},o=function(){e.e("components/uni-popup/uni-popup").then(function(){return resolve(e("212b"))}.bind(null,e)).catch(e.oe)},i={components:{uniNavBar:a,uniPopup:o},data:function(){return{detailData:{},isFxid:!1,userFeedbackHidden:!0,feedbackContent:""}},onLoad:function(n){var e=this;this.detailData=JSON.parse(n.data),this.loadNewsList();var a=t.getSystemInfoSync().windowHeight;console.log("windowHeight"),console.log(a);var o=0,i=t.createSelectorQuery().in(this);i.select("#bigboxs").boundingClientRect((function(t){o=t.height,console.log(o),console.log(a),o<a&&(console.log(666),e.isFxid=!0)})).exec()},methods:{back:function(){t.navigateBack({delta:1})},statusChange:function(t){switch(t){case 1:return"通知";case 2:return"公告";case 3:return"工作安排";default:return"通知"}},loadNewsList:function(){console.log("获取内容"),console.log(this.detailData)},confirmMsg:function(){var n=this;1!=this.detailData.status&&(t.showLoading({title:"loading"}),this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-tzgg-receive.htm",{params:{id:this.detailData.id}}).then((function(e){t.hideLoading(),console.log(e.data),1==e.data.msgState&&n.back(),t.showToast({title:e.data.msg,duration:2e3,icon:"none"})})).catch((function(n){console.log(n),t.hideLoading()})))},fanKui:function(){var t=this;this.detailData.feedback_content.length>0||(console.log("反馈"),this.$nextTick((function(){t.$refs.showtip.open()})))},cancel:function(t){this.$refs.showtip.close()},submitMgs:function(){var n=this;t.showLoading({title:"loading"});var e={feedback_content:this.feedbackContent,id:this.detailData.id};this.$refs.showtip.close(),t.showLoading({title:"loading"}),this.$http.post("/interface/rest/http/xlwb/xlgc-wb-xcx-tzgg-feedback.htm",e).then((function(e){t.hideLoading(),console.log(e.data),1==e.data.msgState&&(n.detailData.feedback_content=n.feedbackContent,n.detailData.feedback_time=n.getNowFormatDate(),n.back()),t.showToast({title:e.data.msg,duration:2e3,icon:"none"})})).catch((function(n){console.log(n),t.hideLoading()}))},getNowFormatDate:function(){var t=new Date,n="-",e=":",a=t.getMonth()+1,o=t.getDate();a>=1&&a<=9&&(a="0"+a),o>=0&&o<=9&&(o="0"+o);var i=t.getFullYear()+n+a+n+o+" "+t.getHours()+e+t.getMinutes()+e+t.getSeconds();return i}}};n.default=i}).call(this,e("543d")["default"])},b4aa:function(t,n,e){"use strict";var a=e("362f"),o=e.n(a);o.a},eea8:function(t,n,e){"use strict";e.r(n);var a=e("a355"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=o.a}},[["61e0","common/runtime","common/vendor"]]]);