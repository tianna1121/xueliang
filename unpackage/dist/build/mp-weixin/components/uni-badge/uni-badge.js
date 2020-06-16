(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-badge/uni-badge"],{"2ec9":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},data:function(){return{badgeStyle:""}},watch:{text:function(){this.setStyle()}},mounted:function(){this.setStyle()},methods:{setStyle:function(){this.badgeStyle="width: ".concat(8*String(this.text).length+12,"px")},onClick:function(){this.$emit("click")}}};e.default=u},7052:function(t,e,n){"use strict";var u=n("9c4c"),c=n.n(u);c.a},9346:function(t,e,n){"use strict";var u,c=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return u}))},"9c4c":function(t,e,n){},e937:function(t,e,n){"use strict";n.r(e);var u=n("9346"),c=n("f902");for(var i in c)"default"!==i&&function(t){n.d(e,t,(function(){return c[t]}))}(i);n("7052");var a,r=n("f0c5"),o=Object(r["a"])(c["default"],u["b"],u["c"],!1,null,"9c5e4430",null,!1,u["a"],a);e["default"]=o.exports},f902:function(t,e,n){"use strict";n.r(e);var u=n("2ec9"),c=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);e["default"]=c.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-badge/uni-badge-create-component',
    {
        'components/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e937"))
        })
    },
    [['components/uni-badge/uni-badge-create-component']]
]);
