(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/video-details/video-details"],{"08b9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){n.e("components/uni-popup/uni-popup").then(function(){return resolve(n("47a9"))}.bind(null,n)).catch(n.oe)},i={components:{uniPopup:o},data:function(){return{src:"rtmp://58.200.131.2:1935/livetv/hunantv",list:[],currentRate:1,rateShow:!1,detailData:{},isMenu:!1,isshow:!1,isMenu1:!0,isIos:!0,feedbackContent:"",isPoster:!0,videoUrl:""}},onLoad:function(t){console.log(JSON.parse(decodeURIComponent(t.data)));var e=JSON.parse(decodeURIComponent(t.data));this.detailData=e,console.log("this.detailData"),console.log(this.detailData),this.geturl(),this.loadNewsList()},mounted:function(){t.showLoading({title:"loading"})},onReady:function(){this.videoContext=t.createLivePlayerContext("myVideo",this),this.videoContext.play()},methods:{geturl:function(){var e=this,n={id:this.detailData.id,playrealUrl:""};this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-yjqz-ssjksp-x-hqsp.htm",{params:n}).then((function(n){console.log("视频url"),console.log(n),1==n.data.msgState?e.videoUrl=n.data.rtmpSrc:(e.videoContext.stop(),t.showToast({icon:"none",title:"视频已下线！",duration:2e3}),setTimeout((function(){e.backup()}),2e3))})).catch((function(e){console.log(e),t.showToast({icon:"none",title:"获取视频失败！",duration:2e3})}))},fullscreenchange:function(t){console.log(t.detail.fullScreen)},statechange:function(e){console.log("live-player code:",e.detail.code),2001==e.detail.code&&t.showLoading({title:"loading"}),2003==e.detail.code&&(this.isPoster=!1,t.hideLoading(),this.videoContext.requestFullScreen({direction:90})),2105==e.detail.code&&(this.isPoster=!1,t.hideLoading()),-2301==e.detail.code&&t.showToast({icon:"none",title:"网络断连，请重新退出连接！",duration:2e3})},backup:function(){t.navigateBack({delta:1})},clk:function(){var t=this;t.isMenu=!t.isMenu},loadNewsList:function(){var e=this;console.log(this.detailData);var n={pageNo:1,pageCount:1e3};this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-yjqz-ssjksp-x.htm",{params:n}).then((function(n){1==n.data.msgState?(e.list=n.data.list,console.log(e.list)):t.showToast({icon:"none",title:"监控列表获取失败！",duration:2e3})})).catch((function(e){console.log(e),t.showToast({icon:"none",title:"监控列表获取失败！",duration:2e3})}))},videoErrorCallback:function(e){t.showModal({content:e.detail.errMsg,showCancel:!1})},sosPopup:function(){var t=this;console.log("我要反馈"),this.videoContext.exitFullScreen(),this.$nextTick((function(){t.$refs.showtip1.open(),t.isshow=!0,t.isMenu1=!0}))},cancel:function(t){this.$refs.showtip1.close(),this.videoContext.requestFullScreen({direction:90}),this.isshow=!1},submitHelp:function(){var e=this;if(""!=this.feedbackContent){var n={note:this.feedbackContent,id:this.detailData.id};console.log("一键求助"),t.showLoading({title:"loading"}),this.$http.post("/interface/rest/http/xlwb/xlgc-wb-xcx-yjqz-x.htm",n).then((function(n){t.hideLoading(),console.log(n.data),1==n.data.msgState?t.showToast({title:n.data.msg,duration:2e3}):t.showToast({title:n.data.msg,duration:2e3,icon:"none"}),setTimeout((function(){e.cancel()}),1e3)})).catch((function(e){console.log(e),t.hideLoading()}))}else t.showToast({title:"请输入求助内容",duration:2e3,icon:"none"})},choosed:function(){this.isMenu1=!1,"android"==t.getSystemInfoSync().platform&&(this.isIos=!1,this.videoContext.exitFullScreen())},closeedMenu:function(){this.isMenu1=!0,"android"==t.getSystemInfoSync().platform&&this.videoContext.requestFullScreen({direction:90})},switchRate:function(e){var n=this;this.$nextTick((function(){n.detailData=e,n.isPoster=!0,n.geturl()})),t.showLoading({title:"loading"}),this.isMenu1=!0,"android"==t.getSystemInfoSync().platform&&this.videoContext.requestFullScreen({direction:90})}}};e.default=i}).call(this,n("543d")["default"])},"1c86":function(t,e,n){"use strict";n.r(e);var o=n("08b9"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},2820:function(t,e,n){},2845:function(t,e,n){"use strict";(function(t){n("4fdd"),n("921b");o(n("66fd"));var e=o(n("ee0f"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"6ab8":function(t,e,n){"use strict";var o={"uni-popup":function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"47a9"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}))},b68a:function(t,e,n){"use strict";var o=n("2820"),i=n.n(o);i.a},ee0f:function(t,e,n){"use strict";n.r(e);var o=n("6ab8"),i=n("1c86");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("b68a");var s,c=n("f0c5"),l=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=l.exports}},[["2845","common/runtime","common/vendor"]]]);