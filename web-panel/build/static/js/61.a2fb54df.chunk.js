(window["webpackJsonpgogo-react"]=window["webpackJsonpgogo-react"]||[]).push([[61],{1076:function(e,a,t){"use strict";t.r(a);var n=t(5),r=t.n(n),s=t(269),c=t(27),i=t(256),l=t(257),o=t(259),m=t(258),u=t(263),g=t(260),d=t(1),b=t.n(d),p=t(264),f=t(284),h=t(285),E=t(276),v=t(1047),y=t(1048),j=t(353),O=t(268),N=t(267),_=t(254),x=t(265),T=t(261),w=t(255),C=t(39),S=t(40),k=["image/jpg","image/jpeg","image/gif","image/png"],A=N.object().shape({business_category:N.string().required("Please select a business category"),name:N.string().required("Please enter category name").min(2,"Too Short! Atleast 2 letters.").max(50,"Too Long! Atmost 50 letters."),image:N.mixed().test("fileType","Invalid File Format",function(e){return!e||""==e||e&&k.includes(e.type)})}),I=function(e){function a(e){var t;return Object(i.a)(this,a),(t=Object(o.a)(this,Object(m.a)(a).call(this,e))).getBusinessCategories=Object(c.a)(r.a.mark(function e(){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.state.isLoading=!0,a=S.a.GET_BUSSINESS_CATEGORIES+"?page_no=1&limit=100",e.next=4,Object(C.a)("GET",a);case 4:200==(n=e.sent).status?t.setState({businessCatList:[].concat(Object(s.a)(t.state.businessCatList),Object(s.a)(n.data.docs))}):x.a.error(n.message,"Error!",3e3);case 6:case"end":return e.stop()}},e)})),t.dataRender=Object(c.a)(r.a.mark(function e(){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=S.a.GET_PRODUCT_CATEGORY+"/"+t.state.itemId,e.next=3,Object(C.a)("GET",a);case 3:200==(n=e.sent).status?t.setState({name:n.data.name,business_category:n.data.business_category_id,image_preview:n.data.image_path_thumb_url,isLoading:!0}):x.a.error(n.message,"Error!",3e3);case 5:case"end":return e.stop()}},e)})),t.handleSubmit=function(){var e=Object(c.a)(r.a.mark(function e(a){var n,s,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("business_category_id",a.business_category),n.append("name",a.name),n.append("image_path",a.image),s=S.a.UPDATE_PRODUCT_CATEGORY+"/"+t.state.itemId,e.next=7,Object(C.a)("PUT",s,n);case 7:200==(c=e.sent).status?(x.a.success(c.message,"Success!",3e3),t.props.history.push({pathname:"/app/product-categories",state:{pageIndex:t.state.currentPage}})):x.a.error(c.message,"Error!",3e3);case 9:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),t.state={itemId:e.match.params.itemId,business_category:"",name:"",image:void 0,image_preview:"",currentPage:t.props.history.location.state.pageIndex,businessCatList:[{_id:"",name:"Select"}]},t.handleSubmit=t.handleSubmit.bind(Object(u.a)(t)),t}return Object(g.a)(a,e),Object(l.a)(a,[{key:"componentDidMount",value:function(){this.dataRender(),this.getBusinessCategories()}},{key:"render",value:function(){var e=this;return b.a.createElement(d.Fragment,null,b.a.createElement(f.a,null,b.a.createElement(_.a,{xxs:"12"},b.a.createElement(T.a,{heading:"heading.edit-product-category",match:this.props.match}),b.a.createElement(_.b,{className:"mb-5"}))),b.a.createElement(f.a,null,b.a.createElement(_.a,{xxs:"12",sm:"12"},b.a.createElement(h.a,null,b.a.createElement(E.a,null,b.a.createElement(O.c,{enableReinitialize:!0,initialValues:{business_category:this.state.business_category,name:this.state.name,image:this.state.image},validationSchema:A,onSubmit:this.handleSubmit},function(a){a.handleSubmit;var t=a.setFieldValue,n=(a.setFieldTouched,a.handleChange),r=a.values,s=a.errors,c=a.touched;a.isSubmitting;return b.a.createElement(O.b,{className:"av-tooltip tooltip-label-bottom"},b.a.createElement(f.a,null,b.a.createElement(_.a,{xxs:"12",sm:"6"},b.a.createElement(v.a,{className:"form-group has-float-label"},b.a.createElement(y.a,null,"Business Category"),b.a.createElement("select",{name:"business_category",className:"form-control",value:r.business_category,onChange:n},e.state.businessCatList.map(function(e,a){return b.a.createElement("option",{key:a,value:e._id},e.name)})),s.business_category&&c.business_category?b.a.createElement("div",{className:"invalid-feedback d-block"},s.business_category):null))),b.a.createElement(f.a,null,b.a.createElement(_.a,{xxs:"12",sm:"6"},b.a.createElement(v.a,{className:"form-group has-float-label"},b.a.createElement(y.a,null,"Category Name"),b.a.createElement(O.a,{className:"form-control",name:"name",type:"text"}),s.name&&c.name?b.a.createElement("div",{className:"invalid-feedback d-block"},s.name):null))),b.a.createElement(f.a,null,b.a.createElement(_.a,{xxs:"12",sm:"6"},b.a.createElement(v.a,{className:"form-group has-float-label"},b.a.createElement(y.a,null,"Category Image"),b.a.createElement(O.a,{className:"form-control",name:"image",type:"file",value:e.state.image,onChange:function(e){t("image",e.currentTarget.files[0])}}),s.image&&c.image?b.a.createElement("div",{className:"invalid-feedback d-block"},s.image):null),b.a.createElement("img",{alt:e.state.name,src:e.state.image_preview,className:"img-thumbnail border-0 list-thumbnail align-self-center image-preview"}))),b.a.createElement(j.a,{color:"primary",type:"submit"},b.a.createElement(w.a,{id:"button.save"})))}))))))}}]),a}(d.Component);a.default=Object(p.d)(I)},254:function(e,a,t){"use strict";t.d(a,"a",function(){return c}),t.d(a,"b",function(){return i});var n=t(1),r=t.n(n),s=t(283),c=function(e){return r.a.createElement(s.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},i=function(e){return r.a.createElement("div",{className:"separator ".concat(e.className)})}},261:function(e,a,t){"use strict";var n=t(1),r=t.n(n),s=t(274),c=t(275),i=t(262),l=t(255),o=function(e){return r.a.createElement(l.a,{id:"menu.".concat(e)})},m=function(e,a,t){return 0===t?"":e.split(a)[0]+a},u=function(e){var a=e.match.path.substr(1),t=a.split("/");return t[t.length-1].indexOf(":")>-1&&(t=t.filter(function(e){return-1===e.indexOf(":")})),r.a.createElement(n.Fragment,null,r.a.createElement(s.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},t.map(function(e,n){return r.a.createElement(c.a,{key:n,active:t.length===n+1},t.length!==n+1?r.a.createElement(i.c,{to:"/"+m(a,e,n)},o(e)):o(e))})))};a.a=function(e){var a=e.heading,t=e.match;return r.a.createElement(n.Fragment,null,a&&r.a.createElement("h1",null,r.a.createElement(l.a,{id:a})),r.a.createElement(u,{match:t}))}},269:function(e,a,t){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var a=0,t=new Array(e.length);a<e.length;a++)t[a]=e[a];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.d(a,"a",function(){return n})},274:function(e,a,t){"use strict";var n=t(12),r=t(20),s=t(1),c=t.n(s),i=t(25),l=t.n(i),o=t(251),m=t.n(o),u=t(252),g={tag:u.p,listTag:u.p,className:l.a.string,listClassName:l.a.string,cssModule:l.a.object,children:l.a.node,"aria-label":l.a.string},d=function(e){var a=e.className,t=e.listClassName,s=e.cssModule,i=e.children,l=e.tag,o=e.listTag,g=e["aria-label"],d=Object(r.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),b=Object(u.l)(m()(a),s),p=Object(u.l)(m()("breadcrumb",t),s);return c.a.createElement(l,Object(n.a)({},d,{className:b,"aria-label":g}),c.a.createElement(o,{className:p},i))};d.propTypes=g,d.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=d},275:function(e,a,t){"use strict";var n=t(12),r=t(20),s=t(1),c=t.n(s),i=t(25),l=t.n(i),o=t(251),m=t.n(o),u=t(252),g={tag:u.p,active:l.a.bool,className:l.a.string,cssModule:l.a.object},d=function(e){var a=e.className,t=e.cssModule,s=e.active,i=e.tag,l=Object(r.a)(e,["className","cssModule","active","tag"]),o=Object(u.l)(m()(a,!!s&&"active","breadcrumb-item"),t);return c.a.createElement(i,Object(n.a)({},l,{className:o,"aria-current":s?"page":void 0}))};d.propTypes=g,d.defaultProps={tag:"li"},a.a=d},276:function(e,a,t){"use strict";var n=t(12),r=t(20),s=t(1),c=t.n(s),i=t(25),l=t.n(i),o=t(251),m=t.n(o),u=t(252),g={tag:u.p,className:l.a.string,cssModule:l.a.object,innerRef:l.a.oneOfType([l.a.object,l.a.string,l.a.func])},d=function(e){var a=e.className,t=e.cssModule,s=e.innerRef,i=e.tag,l=Object(r.a)(e,["className","cssModule","innerRef","tag"]),o=Object(u.l)(m()(a,"card-body"),t);return c.a.createElement(i,Object(n.a)({},l,{className:o,ref:s}))};d.propTypes=g,d.defaultProps={tag:"div"},a.a=d}}]);
//# sourceMappingURL=61.a2fb54df.chunk.js.map