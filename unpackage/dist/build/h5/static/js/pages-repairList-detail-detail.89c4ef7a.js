(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-repairList-detail-detail"],{"0f3d":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,".user-container[data-v-2a96a849]{padding:%?25?% %?10?%;background-color:#f0f0f0\r\n\t/*border: 1px solid black;*/}.notice[data-v-2a96a849]{margin:%?10?% %?7?%;padding:%?25?%;background-color:#fff;border-radius:%?7?%\r\n    /* display: flex;\r\n    justify-content: space-between;\r\n    align-items: flex-end; */}.title[data-v-2a96a849]{border-bottom:%?1?% solid #dedede;font-weight:700;font-size:%?34?%;color:#5f5e5e;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.text[data-v-2a96a849]{padding:%?8?% 0;font-size:%?30?%}.button[data-v-2a96a849]{\r\n  /* width: 160rpx; */\r\n  /* font-size: 30rpx; */}",""]),t.exports=e},"554a":function(t,e,a){"use strict";var n,i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"user-container"},[a("v-uni-view",{staticClass:"notice"},[a("v-uni-view",[a("v-uni-view",{staticClass:"text"},[t._v("姓"),a("v-uni-text",{attrs:{decode:"true"}},[t._v("")]),t._v("名: "+t._s(t.obj.repairName))],1),a("v-uni-view",{staticClass:"text"},[t._v("联系方式: "+t._s(t.obj.tel))]),a("v-uni-view",{staticClass:"text"},[t._v("报修类型: "+t._s(t.obj.repairTypeName))]),a("v-uni-view",{staticClass:"text"},[t._v("状"),a("v-uni-text",{attrs:{decode:"true"}},[t._v("")]),t._v("态: "+t._s(t.obj.stateName))],1),a("v-uni-view",{staticClass:"text"},[t._v("预约时间: "+t._s(t.obj.appointmentTime))])],1)],1)],1)},s=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}))},"5ca3":function(t,e,a){var n=a("0f3d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("ce1ba37e",n,!0,{sourceMap:!1,shadowMode:!1})},"5f60":function(t,e,a){"use strict";var n=a("5ca3"),i=a.n(n);i.a},8448:function(t,e,a){"use strict";a.r(e);var n=a("a44e"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},a44e:function(t,e,a){"use strict";a("4160"),a("b64b"),a("ac1f"),a("1276"),a("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;a("567f"),getApp().globalData;var n={data:function(){return{obj:{}}},components:{},props:{},onLoad:function(t){console.log(JSON.parse(t.item),99999),this.setData({obj:JSON.parse(t.item)})},onShow:function(){},methods:{setData:function(t,e){var a,n,i=this,s=[],o=/[d+]/;Object.keys(t).forEach((function(e){s=e.split("."),a=t[e],n=i.$data,s.forEach((function(t,e){if(e+1==s.length)if(o.test(t)){var r=/(.*?)[(d+)]/.exec(t),c=r[1],u=r[2];n=n[c],n[u]&&i.$set(n,u,a)}else n[t]&&i.$set(n,t,a);else if(o.test(t)){var f=/(.*?)[(d+)]/.exec(t),d=f[1],l=f[2];n=n[d][l]}else n[t]&&(i.$set(n,t,{}),n=n[t])}))})),e&&e()}}};e.default=n},ef08:function(t,e,a){"use strict";a.r(e);var n=a("554a"),i=a("8448");for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);a("5f60");var o,r=a("f0c5"),c=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"2a96a849",null,!1,n["a"],o);e["default"]=c.exports}}]);