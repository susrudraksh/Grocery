(window["webpackJsonpgogo-react"]=window["webpackJsonpgogo-react"]||[]).push([[57],{1096:function(e,t,a){"use strict";a.r(t);var r=a(5),n=a.n(r),s=a(269),c=a(27),i=a(256),o=a(257),l=a(259),u=a(258),d=a(263),m=a(260),g=a(1),p=a.n(g),b=a(264),_=a(284),f=a(285),y=a(276),v=a(1047),E=a(1048),h=a(353),N=a(268),x=a(267),O=a(254),S=a(265),j=a(261),C=a(255),k=a(39),T=a(40),w=["image/jpg","image/jpeg","image/gif","image/png"],P=x.object().shape({business_category:x.string().required("Please select a business category"),product_category:x.string().required("Please select a product category"),product_subcategory:x.string().required("Please select a sub category"),product_inv_id:x.string().required("Please select a product inventory"),title:x.string().required("Please enter banner title").min(2,"Too Short! Atleast 2 letters.").max(50,"Too Long! Atmost 50 letters."),description:x.string().required("Please enter banner description").min(2,"Too Short! Atleast 2 letters.").max(200,"Too Long! Atmost 200 letters."),image:x.mixed().test("fileType","Invalid File Format",function(e){return!e||""==e||e&&w.includes(e.type)})}),L=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).getBusinessCategories=Object(c.a)(n.a.mark(function e(){var t,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.state.isLoading=!0,t=T.a.GET_BUSSINESS_CATEGORIES+"?page_no=1&limit=100",e.next=4,Object(k.a)("GET",t);case 4:200==(r=e.sent).status?a.setState({businessCatList:[].concat(Object(s.a)(a.state.businessCatList),Object(s.a)(r.data.docs))}):S.a.error(r.message,"Error!",3e3);case 6:case"end":return e.stop()}},e)})),a.getPerentCategories=function(){var e=Object(c.a)(n.a.mark(function e(t){var r,c,i,o;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new FormData).append("business_category_id",t),c=T.a.GET_CATEGORIES_BY_BUSINESS,e.next=5,Object(k.a)("POST",c,r);case 5:200==(i=e.sent).status?(o=[{_id:"",name:"Select"}],a.setState({parentCatList:[].concat(o,Object(s.a)(i.data.docs))})):S.a.error(i.message,"Error!",3e3);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.getSubCategories=function(){var e=Object(c.a)(n.a.mark(function e(t,r){var c,i,o,l;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.state.isLoading=!0,c=[{_id:"",name:"Select"}],!r){e.next=13;break}return(i=new FormData).append("business_category_id",t),i.append("category_id",r),o=T.a.GET_SUBCATEGORIES,e.next=9,Object(k.a)("POST",o,i);case 9:200==(l=e.sent).status?a.setState({subCatList:[].concat(c,Object(s.a)(l.data.docs))}):S.a.error(l.message,"Error!",3e3),e.next=14;break;case 13:a.setState({subCatList:c});case 14:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.getProducts=function(){var e=Object(c.a)(n.a.mark(function e(t,r,c){var i,o,l,u;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.state.isLoading=!0,i=[{id:"",name:"Select"}],!c){e.next=14;break}return(o=new FormData).append("business_category_id",t),o.append("category_id",r),o.append("sub_category_id",c),l=T.a.GET_BANNER_PRODUCTS,e.next=10,Object(k.a)("POST",l,o);case 10:200==(u=e.sent).status?a.setState({productList:[].concat(i,Object(s.a)(u.data))}):S.a.error(u.message,"Error!",3e3),e.next=15;break;case 14:a.setState({productList:i});case 15:case"end":return e.stop()}},e)}));return function(t,a,r){return e.apply(this,arguments)}}(),a.dataRender=Object(c.a)(n.a.mark(function e(){var t,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=T.a.GET_BANNER+"/"+a.state.itemId,e.next=3,Object(k.a)("GET",t);case 3:200==(r=e.sent).status?(a.setState({title:r.data.title,description:r.data.description,business_category:r.data.business_category._id,product_category:r.data.category._id,product_subcategory:r.data.subcategory._id,product_inv_id:r.data.product._id,image_preview:r.data.banner_image_thumb_url,isLoading:!0}),a.getBusinessCategories(),a.getPerentCategories(r.data.business_category._id),a.getSubCategories(r.data.business_category._id,r.data.category._id),a.getProducts(r.data.business_category._id,r.data.category._id,r.data.subcategory._id)):S.a.error(r.message,"Error!",3e3);case 5:case"end":return e.stop()}},e)})),a.handleSubmit=function(){var e=Object(c.a)(n.a.mark(function e(t){var r,s,c;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new FormData).append("business_category_id",t.business_category),r.append("category_id",t.product_category),r.append("sub_category_id",t.product_subcategory),r.append("product_id",t.product_inv_id),r.append("title",t.title),r.append("description",t.description),r.append("banner_image",t.image),s=T.a.UPDATE_BANNER+"/"+a.state.itemId,e.next=11,Object(k.a)("PUT",s,r);case 11:200==(c=e.sent).status?(S.a.success(c.message,"Success!",3e3),a.props.history.push({pathname:"/app/banners",state:{pageIndex:a.state.currentPage}})):S.a.error(c.message,"Error!",3e3);case 13:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.state={itemId:e.match.params.itemId,business_category:"",product_category:"",product_subcategory:"",title:"",description:"",image:void 0,currentPage:a.props.history.location.state.pageIndex,businessCatList:[{_id:"",name:"Select"}],parentCatList:[{_id:"",name:"Select"}],subCatList:[{_id:"",name:"Select"}],productList:[{id:"",name:"Select"}]},a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.dataRender()}},{key:"render",value:function(){var e=this;this.props.intl.messages;return p.a.createElement(g.Fragment,null,p.a.createElement(_.a,null,p.a.createElement(O.a,{xxs:"12"},p.a.createElement(j.a,{heading:"heading.edit-banner",match:this.props.match}),p.a.createElement(O.b,{className:"mb-5"}))),p.a.createElement(_.a,null,p.a.createElement(O.a,{xxs:"12",sm:"12"},p.a.createElement(f.a,null,p.a.createElement(y.a,null,p.a.createElement(N.c,{enableReinitialize:!0,initialValues:{business_category:this.state.business_category,product_category:this.state.product_category,product_subcategory:this.state.product_subcategory,product_inv_id:this.state.product_inv_id,title:this.state.title,description:this.state.description,image:this.state.image},validationSchema:P,onSubmit:this.handleSubmit},function(t){t.handleSubmit;var a=t.setFieldValue,r=(t.setFieldTouched,t.handleChange,t.values),n=t.errors,s=t.touched;t.isSubmitting;return p.a.createElement(N.b,{className:"av-tooltip tooltip-label-bottom"},p.a.createElement(_.a,null,p.a.createElement(O.a,{xxs:"12",sm:"6"},p.a.createElement(v.a,{className:"form-group has-float-label"},p.a.createElement(E.a,null,"Business Category"),p.a.createElement("select",{name:"business_category",className:"form-control",value:r.business_category,onChange:function(t){a("business_category",t.target.value),a("product_category",""),a("product_subcategory",""),a("product_inv_id",""),e.getPerentCategories(t.target.value)}},e.state.businessCatList.map(function(e,t){return p.a.createElement("option",{key:t,value:e._id},e.name)})),n.business_category&&s.business_category?p.a.createElement("div",{className:"invalid-feedback d-block"},n.business_category):null)),p.a.createElement(O.a,{xxs:"12",sm:"6"},p.a.createElement(v.a,{className:"form-group has-float-label"},p.a.createElement(E.a,null,"Product Category"),p.a.createElement("select",{name:"product_category",className:"form-control",value:r.product_category,onChange:function(t){a("product_category",t.target.value),a("product_subcategory",""),a("product_inv_id",""),e.getSubCategories(r.business_category,t.target.value)}},e.state.parentCatList.map(function(e,t){return p.a.createElement("option",{key:t,value:e._id},e.name)})),n.product_category&&s.product_category?p.a.createElement("div",{className:"invalid-feedback d-block"},n.product_category):null)),p.a.createElement(O.a,{xxs:"12",sm:"6"},p.a.createElement(v.a,{className:"form-group has-float-label"},p.a.createElement(E.a,null,"Product Sub Category"),p.a.createElement("select",{name:"product_subcategory",className:"form-control",value:r.product_subcategory,onChange:function(t){a("product_subcategory",t.target.value),a("product_inv_id",""),e.getProducts(r.business_category,r.product_category,t.target.value)}},e.state.subCatList.map(function(e,t){return p.a.createElement("option",{key:t,value:e._id},e.name)})),n.product_subcategory&&s.product_subcategory?p.a.createElement("div",{className:"invalid-feedback d-block"},n.product_subcategory):null)),p.a.createElement(O.a,{xxs:"12",sm:"6"},p.a.createElement(v.a,{className:"form-group has-float-label"},p.a.createElement(E.a,null,"Product Inventory"),p.a.createElement("select",{name:"product_inv_id",className:"form-control",value:r.product_inv_id,onChange:function(e){a("product_inv_id",e.target.value)}},e.state.productList.map(function(e,t){return p.a.createElement("option",{key:t,value:e.id},e.name,e.inventory_name?" ("+e.inventory_name+")":"")})),n.product_inv_id&&s.product_inv_id?p.a.createElement("div",{className:"invalid-feedback d-block"},n.product_inv_id):null)),p.a.createElement(O.a,{xxs:"12",sm:"6"},p.a.createElement(v.a,{className:"form-group has-float-label"},p.a.createElement(E.a,null,"Banner Title"),p.a.createElement(N.a,{className:"form-control",name:"title",type:"text"}),n.title&&s.title?p.a.createElement("div",{className:"invalid-feedback d-block"},n.title):null)),p.a.createElement(O.a,{xxs:"12",sm:"6"},p.a.createElement(v.a,{className:"form-group has-float-label"},p.a.createElement(E.a,null,"Banner Description"),p.a.createElement(N.a,{className:"form-control",name:"description",component:"textarea"}),n.description&&s.description?p.a.createElement("div",{className:"invalid-feedback d-block"},n.description):null)),p.a.createElement(O.a,{xxs:"12",sm:"6"},p.a.createElement(v.a,{className:"form-group has-float-label"},p.a.createElement(E.a,null,"Banner Image"),p.a.createElement(N.a,{className:"form-control",name:"image",type:"file",value:e.state.image,onChange:function(e){a("image",e.currentTarget.files[0])}}),n.image&&s.image?p.a.createElement("div",{className:"invalid-feedback d-block"},n.image):null),p.a.createElement("img",{alt:e.state.name,src:e.state.image_preview,className:"img-thumbnail border-0 list-thumbnail align-self-center image-preview"}))),p.a.createElement(h.a,{color:"primary",type:"submit"},p.a.createElement(C.a,{id:"button.save"})))}))))))}}]),t}(g.Component);t.default=Object(b.d)(L)},254:function(e,t,a){"use strict";a.d(t,"a",function(){return c}),a.d(t,"b",function(){return i});var r=a(1),n=a.n(r),s=a(283),c=function(e){return n.a.createElement(s.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},i=function(e){return n.a.createElement("div",{className:"separator ".concat(e.className)})}},261:function(e,t,a){"use strict";var r=a(1),n=a.n(r),s=a(274),c=a(275),i=a(262),o=a(255),l=function(e){return n.a.createElement(o.a,{id:"menu.".concat(e)})},u=function(e,t,a){return 0===a?"":e.split(t)[0]+t},d=function(e){var t=e.match.path.substr(1),a=t.split("/");return a[a.length-1].indexOf(":")>-1&&(a=a.filter(function(e){return-1===e.indexOf(":")})),n.a.createElement(r.Fragment,null,n.a.createElement(s.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},a.map(function(e,r){return n.a.createElement(c.a,{key:r,active:a.length===r+1},a.length!==r+1?n.a.createElement(i.c,{to:"/"+u(t,e,r)},l(e)):l(e))})))};t.a=function(e){var t=e.heading,a=e.match;return n.a.createElement(r.Fragment,null,t&&n.a.createElement("h1",null,n.a.createElement(o.a,{id:t})),n.a.createElement(d,{match:a}))}},269:function(e,t,a){"use strict";function r(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a.d(t,"a",function(){return r})},274:function(e,t,a){"use strict";var r=a(12),n=a(20),s=a(1),c=a.n(s),i=a(25),o=a.n(i),l=a(251),u=a.n(l),d=a(252),m={tag:d.p,listTag:d.p,className:o.a.string,listClassName:o.a.string,cssModule:o.a.object,children:o.a.node,"aria-label":o.a.string},g=function(e){var t=e.className,a=e.listClassName,s=e.cssModule,i=e.children,o=e.tag,l=e.listTag,m=e["aria-label"],g=Object(n.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),p=Object(d.l)(u()(t),s),b=Object(d.l)(u()("breadcrumb",a),s);return c.a.createElement(o,Object(r.a)({},g,{className:p,"aria-label":m}),c.a.createElement(l,{className:b},i))};g.propTypes=m,g.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},t.a=g},275:function(e,t,a){"use strict";var r=a(12),n=a(20),s=a(1),c=a.n(s),i=a(25),o=a.n(i),l=a(251),u=a.n(l),d=a(252),m={tag:d.p,active:o.a.bool,className:o.a.string,cssModule:o.a.object},g=function(e){var t=e.className,a=e.cssModule,s=e.active,i=e.tag,o=Object(n.a)(e,["className","cssModule","active","tag"]),l=Object(d.l)(u()(t,!!s&&"active","breadcrumb-item"),a);return c.a.createElement(i,Object(r.a)({},o,{className:l,"aria-current":s?"page":void 0}))};g.propTypes=m,g.defaultProps={tag:"li"},t.a=g},276:function(e,t,a){"use strict";var r=a(12),n=a(20),s=a(1),c=a.n(s),i=a(25),o=a.n(i),l=a(251),u=a.n(l),d=a(252),m={tag:d.p,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},g=function(e){var t=e.className,a=e.cssModule,s=e.innerRef,i=e.tag,o=Object(n.a)(e,["className","cssModule","innerRef","tag"]),l=Object(d.l)(u()(t,"card-body"),a);return c.a.createElement(i,Object(r.a)({},o,{className:l,ref:s}))};g.propTypes=m,g.defaultProps={tag:"div"},t.a=g}}]);
//# sourceMappingURL=57.ae6f0bd9.chunk.js.map