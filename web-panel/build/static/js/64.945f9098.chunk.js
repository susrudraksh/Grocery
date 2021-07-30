(window["webpackJsonpgogo-react"]=window["webpackJsonpgogo-react"]||[]).push([[64],{1097:function(e,t,a){"use strict";a.r(t);var n=a(5),r=a.n(n),c=a(269),s=a(27),o=a(256),i=a(257),l=a(259),u=a(258),d=a(263),m=a(260),p=a(1),g=a.n(p),b=a(264),h=a(284),f=a(285),_=a(276),v=a(1047),y=a(1048),E=a(353),C=a(268),O=a(267),x=a(254),S=a(265),j=a(261),k=a(255),N=a(39),w=a(40),T=a(293),L=["image/jpg","image/jpeg","image/gif","image/png"],B=O.object().shape({business_category:O.string().required("Please select a business category"),product_category:O.string().required("Please select a product category"),product_subcategory:O.string().required("Please select a sub category"),product_inv_id:O.string().required("Please select a product inventory"),title:O.string().required("Please enter deal of the day title").min(2,"Too Short! Atleast 2 letters.").max(50,"Too Long! Atmost 50 letters."),description:O.string().required("Please enter deal of the day description").min(2,"Too Short! Atleast 2 letters.").max(200,"Too Long! Atmost 200 letters."),image:O.mixed().required("Please choose a deal of the day image").test("fileType","Invalid File Format",function(e){return!e||""==e||e&&L.includes(e.type)})}),P=[],A=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).getBusinessCategories=Object(s.a)(r.a.mark(function e(){var t,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.state.isLoading=!0,t=w.a.GET_BUSSINESS_CATEGORIES+"?page_no=1&limit=100",e.next=4,Object(N.a)("GET",t);case 4:200==(n=e.sent).status?a.setState({businessCatList:[].concat(Object(c.a)(a.state.businessCatList),Object(c.a)(n.data.docs))}):S.a.error(n.message,"Error!",3e3);case 6:case"end":return e.stop()}},e)})),a.getPerentCategories=function(){var e=Object(s.a)(r.a.mark(function e(t){var n,s,o,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("business_category_id",t),s=w.a.GET_CATEGORIES_BY_BUSINESS,e.next=5,Object(N.a)("POST",s,n);case 5:200==(o=e.sent).status?(i=[{_id:"",name:"Select"}],a.setState({parentCatList:[].concat(i,Object(c.a)(o.data.docs))})):S.a.error(o.message,"Error!",3e3);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.getSubCategories=function(){var e=Object(s.a)(r.a.mark(function e(t,n){var s,o,i,l;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.state.isLoading=!0,s=[{_id:"",name:"Select"}],!n){e.next=13;break}return(o=new FormData).append("business_category_id",t),o.append("category_id",n),i=w.a.GET_SUBCATEGORIES,e.next=9,Object(N.a)("POST",i,o);case 9:200==(l=e.sent).status?a.setState({subCatList:[].concat(s,Object(c.a)(l.data.docs))}):S.a.error(l.message,"Error!",3e3),e.next=14;break;case 13:a.setState({subCatList:s});case 14:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.getProducts=function(){var e=Object(s.a)(r.a.mark(function e(t,n,s,o){var i,l,u,d;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.state.isLoading=!0,i=[{id:"",name:"Select"}],!s){e.next=14;break}return(l=new FormData).append("business_category_id",t),l.append("category_id",n),l.append("sub_category_id",s),u=w.a.GET_DEALOFDAY_PRODUCTS,e.next=10,Object(N.a)("POST",u,l);case 10:200==(d=e.sent).status?(a.setState({productList:[].concat(i,Object(c.a)(d.data))}),P=[],d.data.map(function(e,t){P.push({value:e.id,label:e.inventory_name})}),a.setState({options:P}),o("options",P)):S.a.error(d.message,"Error!",3e3),e.next=15;break;case 14:a.setState({productList:i});case 15:case"end":return e.stop()}},e)}));return function(t,a,n,r){return e.apply(this,arguments)}}(),a.handleSubmit=function(){var e=Object(s.a)(r.a.mark(function e(t){var n,c,s,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Array,t.product_inv_id.map(function(e,t){n.push(e.value)}),(c=new FormData).append("business_category_id",t.business_category),c.append("category_id",t.product_category),c.append("sub_category_id",t.product_subcategory),c.append("product_id",""!=t.product_inv_id?JSON.stringify(n):""),c.append("title",t.title),c.append("description",t.description),c.append("image",t.image),s=w.a.CREATE_DEALOFDAY,e.next=13,Object(N.a)("POST",s,c);case 13:200==(o=e.sent).status?(S.a.success(o.message,"Success!",3e3),a.props.history.push("/app/dealofday")):S.a.error(o.message,"Error!",3e3);case 15:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.state={business_category:"",product_category:"",product_subcategory:"",title:"",description:"",image:void 0,businessCatList:[{_id:"",name:"Select"}],parentCatList:[{_id:"",name:"Select"}],subCatList:[{_id:"",name:"Select"}],productList:[{id:"",name:"Select"}],options:[]},a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getBusinessCategories()}},{key:"render",value:function(){var e=this;this.props.intl.messages;return g.a.createElement(p.Fragment,null,g.a.createElement(h.a,null,g.a.createElement(x.a,{xxs:"12"},g.a.createElement(j.a,{heading:"heading.add-dealofday",match:this.props.match}),g.a.createElement(x.b,{className:"mb-5"}))),g.a.createElement(h.a,null,g.a.createElement(x.a,{xxs:"12",sm:"12"},g.a.createElement(f.a,null,g.a.createElement(_.a,null,g.a.createElement(C.c,{initialValues:{business_category:this.state.business_category,product_category:this.state.product_category,product_subcategory:this.state.product_subcategory,product_inv_id:this.state.product_inv_id,title:this.state.title,description:this.state.description,image:this.state.image,options:this.state.options},validationSchema:B,onSubmit:this.handleSubmit},function(t){t.handleSubmit;var a=t.setFieldValue,n=t.setFieldTouched,r=(t.handleChange,t.values),c=t.errors,s=t.touched;t.isSubmitting;return g.a.createElement(C.b,{className:"av-tooltip tooltip-label-bottom"},g.a.createElement(h.a,null,g.a.createElement(x.a,{xxs:"12",sm:"6"},g.a.createElement(v.a,{className:"form-group has-float-label"},g.a.createElement(y.a,null,"Business Category"),g.a.createElement("select",{name:"business_category",className:"form-control",value:r.business_category,onChange:function(t){a("business_category",t.target.value),a("product_category",""),a("product_subcategory",""),a("product_inv_id",""),e.getPerentCategories(t.target.value)}},e.state.businessCatList.map(function(e,t){return g.a.createElement("option",{key:t,value:e._id},e.name)})),c.business_category&&s.business_category?g.a.createElement("div",{className:"invalid-feedback d-block"},c.business_category):null)),g.a.createElement(x.a,{xxs:"12",sm:"6"},g.a.createElement(v.a,{className:"form-group has-float-label"},g.a.createElement(y.a,null,"Product Category"),g.a.createElement("select",{name:"product_category",className:"form-control",value:r.product_category,onChange:function(t){a("product_category",t.target.value),a("product_subcategory",""),a("product_inv_id",""),e.getSubCategories(r.business_category,t.target.value)}},e.state.parentCatList.map(function(e,t){return g.a.createElement("option",{key:t,value:e._id},e.name)})),c.product_category&&s.product_category?g.a.createElement("div",{className:"invalid-feedback d-block"},c.product_category):null)),g.a.createElement(x.a,{xxs:"12",sm:"6"},g.a.createElement(v.a,{className:"form-group has-float-label"},g.a.createElement(y.a,null,"Product Sub Category"),g.a.createElement("select",{name:"product_subcategory",className:"form-control",value:r.product_subcategory,onChange:function(t){a("product_subcategory",t.target.value),a("product_inv_id",""),e.getProducts(r.business_category,r.product_category,t.target.value,a)}},e.state.subCatList.map(function(e,t){return g.a.createElement("option",{key:t,value:e._id},e.name)})),c.product_subcategory&&s.product_subcategory?g.a.createElement("div",{className:"invalid-feedback d-block"},c.product_subcategory):null)),g.a.createElement(x.a,{xxs:"12",sm:"6"},g.a.createElement(v.a,{className:"form-group has-float-label"},g.a.createElement(y.a,null,"Product Inventory"),console.log(r.product_inv_id),g.a.createElement(T.c,{name:"product_inv_id",id:"product_inv_id",value:r.product_inv_id,isMulti:!0,options:r.options,onChange:a,onBlur:n}),c.product_inv_id&&s.product_inv_id?g.a.createElement("div",{className:"invalid-feedback d-block"},c.product_inv_id):null)),g.a.createElement(x.a,{xxs:"12",sm:"6"},g.a.createElement(v.a,{className:"form-group has-float-label"},g.a.createElement(y.a,null,"Deal of the  Title"),g.a.createElement(C.a,{className:"form-control",name:"title",type:"text"}),c.title&&s.title?g.a.createElement("div",{className:"invalid-feedback d-block"},c.title):null)),g.a.createElement(x.a,{xxs:"12",sm:"6"},g.a.createElement(v.a,{className:"form-group has-float-label"},g.a.createElement(y.a,null,"Deal of the  Description"),g.a.createElement(C.a,{className:"form-control",name:"description",component:"textarea"}),c.description&&s.description?g.a.createElement("div",{className:"invalid-feedback d-block"},c.description):null)),g.a.createElement(x.a,{xxs:"12",sm:"6"},g.a.createElement(v.a,{className:"form-group has-float-label"},g.a.createElement(y.a,null,"Deal of the  Image"),g.a.createElement(C.a,{className:"form-control",name:"image",type:"file",value:e.state.image,onChange:function(e){a("image",e.currentTarget.files[0])}}),c.image&&s.image?g.a.createElement("div",{className:"invalid-feedback d-block"},c.image):null))),g.a.createElement(E.a,{color:"primary",type:"submit"},g.a.createElement(k.a,{id:"button.save"})))}))))))}}]),t}(p.Component);t.default=Object(b.d)(A)},254:function(e,t,a){"use strict";a.d(t,"a",function(){return s}),a.d(t,"b",function(){return o});var n=a(1),r=a.n(n),c=a(283),s=function(e){return r.a.createElement(c.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},o=function(e){return r.a.createElement("div",{className:"separator ".concat(e.className)})}},261:function(e,t,a){"use strict";var n=a(1),r=a.n(n),c=a(274),s=a(275),o=a(262),i=a(255),l=function(e){return r.a.createElement(i.a,{id:"menu.".concat(e)})},u=function(e,t,a){return 0===a?"":e.split(t)[0]+t},d=function(e){var t=e.match.path.substr(1),a=t.split("/");return a[a.length-1].indexOf(":")>-1&&(a=a.filter(function(e){return-1===e.indexOf(":")})),r.a.createElement(n.Fragment,null,r.a.createElement(c.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},a.map(function(e,n){return r.a.createElement(s.a,{key:n,active:a.length===n+1},a.length!==n+1?r.a.createElement(o.c,{to:"/"+u(t,e,n)},l(e)):l(e))})))};t.a=function(e){var t=e.heading,a=e.match;return r.a.createElement(n.Fragment,null,t&&r.a.createElement("h1",null,r.a.createElement(i.a,{id:t})),r.a.createElement(d,{match:a}))}},278:function(e,t,a){},293:function(e,t,a){"use strict";a.d(t,"c",function(){return _}),a.d(t,"a",function(){return v}),a.d(t,"b",function(){return y});var n=a(269),r=a(256),c=a(257),s=a(259),o=a(258),i=a(260),l=a(1),u=a.n(l),d=a(306),m=a(1049),p=a(303),g=a.n(p),b=(a(304),a(270)),h=a.n(b),f=(a(278),a(299)),_=(a(298),function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(c)))).handleChange=function(e){a.props.onChange(a.props.name,e)},a.handleBlur=function(){a.props.onBlur(a.props.name,!0)},a}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return u.a.createElement(d.b,{className:"react-select ".concat(this.props.className),classNamePrefix:"react-select",options:this.props.options,isMulti:this.props.isMulti,onChange:this.handleChange,onBlur:this.handleBlur,value:this.props.value})}}]),t}(u.a.Component)),v=(u.a.Component,u.a.Component,u.a.Component,function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(c)))).handleChange=function(e){a.props.onChange(a.props.name,e)},a.handleBlur=function(){a.props.onBlur(a.props.name,!0)},a}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.name,n=t.value,r=t.options,c=t.inline,s=void 0!==c&&c;return u.a.createElement(u.a.Fragment,null,r.map(function(t,r){return u.a.createElement(m.a,{key:"".concat(a,"_").concat(t.value,"_").concat(r),type:"radio",id:"".concat(a,"_").concat(t.value,"_").concat(r),name:t.name,label:t.label,onChange:function(){return e.handleChange(t.value)},onBlur:e.handleBlur,checked:n===t.value,disabled:t.disabled,inline:s})}))}}]),t}(u.a.Component)),y=(u.a.Component,u.a.Component,function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(c)))).handleChange=function(e){a.props.onChange(a.props.name,e)},a.handleBlur=function(e){a.props.onBlur(a.props.name,!0)},a}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.name,a=e.value,n=e.className;return u.a.createElement(f.a,{id:t,name:t,className:n,selected:a,onChange:this.handleChange,onBlur:this.handleBlur})}}]),t}(u.a.Component))}}]);
//# sourceMappingURL=64.945f9098.chunk.js.map