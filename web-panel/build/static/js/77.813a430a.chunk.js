(window["webpackJsonpgogo-react"]=window["webpackJsonpgogo-react"]||[]).push([[77],{1080:function(e,a,t){"use strict";t.r(a);var n=t(5),r=t.n(n),c=t(27),s=t(256),l=t(257),i=t(259),m=t(258),o=t(263),u=t(260),d=t(1),b=t.n(d),p=t(264),g=t(284),f=t(285),h=t(276),E=t(1047),v=t(1048),N=t(353),O=t(268),j=t(267),x=t(254),y=t(265),T=t(261),S=t(255),M=t(39),k=t(40),w=j.object().shape({name:j.string().required("Please enter type name").min(2,"Too Short! Atleast 2 letters.").max(20,"Too Long! Atmost 20 letters.")}),C=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(i.a)(this,Object(m.a)(a).call(this,e))).handleSubmit=function(){var e=Object(c.a)(r.a.mark(function e(a){var n,c,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("name",a.name),c=k.a.CREATE_CUSTOMIZATION_TYPE,e.next=5,Object(M.a)("POST",c,n);case 5:200==(s=e.sent).status?(y.a.success(s.message,"Success!",3e3),t.props.history.push("/app/customization-types")):y.a.error(s.message,"Error!",3e3);case 7:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),t.state={name:""},t.handleSubmit=t.handleSubmit.bind(Object(o.a)(t)),t}return Object(u.a)(a,e),Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){this.props.intl.messages;return b.a.createElement(d.Fragment,null,b.a.createElement(g.a,null,b.a.createElement(x.a,{xxs:"12"},b.a.createElement(T.a,{heading:"heading.add-customization-type",match:this.props.match}),b.a.createElement(x.b,{className:"mb-5"}))),b.a.createElement(g.a,null,b.a.createElement(x.a,{xxs:"12",sm:"12"},b.a.createElement(f.a,null,b.a.createElement(h.a,null,b.a.createElement(O.c,{initialValues:{name:this.state.name},validationSchema:w,onSubmit:this.handleSubmit},function(e){e.handleSubmit,e.setFieldValue,e.setFieldTouched,e.handleChange,e.values;var a=e.errors,t=e.touched;e.isSubmitting;return b.a.createElement(O.b,{className:"av-tooltip tooltip-label-bottom"},b.a.createElement(g.a,null,b.a.createElement(x.a,{xxs:"12",sm:"6"},b.a.createElement(E.a,{className:"form-group has-float-label"},b.a.createElement(v.a,null,"Type Name"),b.a.createElement(O.a,{className:"form-control",name:"name",type:"text"}),a.name&&t.name?b.a.createElement("div",{className:"invalid-feedback d-block"},a.name):null))),b.a.createElement(N.a,{color:"primary",type:"submit"},b.a.createElement(S.a,{id:"button.save"})))}))))))}}]),a}(d.Component);a.default=Object(p.d)(C)},254:function(e,a,t){"use strict";t.d(a,"a",function(){return s}),t.d(a,"b",function(){return l});var n=t(1),r=t.n(n),c=t(283),s=function(e){return r.a.createElement(c.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},l=function(e){return r.a.createElement("div",{className:"separator ".concat(e.className)})}},261:function(e,a,t){"use strict";var n=t(1),r=t.n(n),c=t(274),s=t(275),l=t(262),i=t(255),m=function(e){return r.a.createElement(i.a,{id:"menu.".concat(e)})},o=function(e,a,t){return 0===t?"":e.split(a)[0]+a},u=function(e){var a=e.match.path.substr(1),t=a.split("/");return t[t.length-1].indexOf(":")>-1&&(t=t.filter(function(e){return-1===e.indexOf(":")})),r.a.createElement(n.Fragment,null,r.a.createElement(c.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},t.map(function(e,n){return r.a.createElement(s.a,{key:n,active:t.length===n+1},t.length!==n+1?r.a.createElement(l.c,{to:"/"+o(a,e,n)},m(e)):m(e))})))};a.a=function(e){var a=e.heading,t=e.match;return r.a.createElement(n.Fragment,null,a&&r.a.createElement("h1",null,r.a.createElement(i.a,{id:a})),r.a.createElement(u,{match:t}))}},274:function(e,a,t){"use strict";var n=t(12),r=t(20),c=t(1),s=t.n(c),l=t(25),i=t.n(l),m=t(251),o=t.n(m),u=t(252),d={tag:u.p,listTag:u.p,className:i.a.string,listClassName:i.a.string,cssModule:i.a.object,children:i.a.node,"aria-label":i.a.string},b=function(e){var a=e.className,t=e.listClassName,c=e.cssModule,l=e.children,i=e.tag,m=e.listTag,d=e["aria-label"],b=Object(r.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),p=Object(u.l)(o()(a),c),g=Object(u.l)(o()("breadcrumb",t),c);return s.a.createElement(i,Object(n.a)({},b,{className:p,"aria-label":d}),s.a.createElement(m,{className:g},l))};b.propTypes=d,b.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=b},275:function(e,a,t){"use strict";var n=t(12),r=t(20),c=t(1),s=t.n(c),l=t(25),i=t.n(l),m=t(251),o=t.n(m),u=t(252),d={tag:u.p,active:i.a.bool,className:i.a.string,cssModule:i.a.object},b=function(e){var a=e.className,t=e.cssModule,c=e.active,l=e.tag,i=Object(r.a)(e,["className","cssModule","active","tag"]),m=Object(u.l)(o()(a,!!c&&"active","breadcrumb-item"),t);return s.a.createElement(l,Object(n.a)({},i,{className:m,"aria-current":c?"page":void 0}))};b.propTypes=d,b.defaultProps={tag:"li"},a.a=b},276:function(e,a,t){"use strict";var n=t(12),r=t(20),c=t(1),s=t.n(c),l=t(25),i=t.n(l),m=t(251),o=t.n(m),u=t(252),d={tag:u.p,className:i.a.string,cssModule:i.a.object,innerRef:i.a.oneOfType([i.a.object,i.a.string,i.a.func])},b=function(e){var a=e.className,t=e.cssModule,c=e.innerRef,l=e.tag,i=Object(r.a)(e,["className","cssModule","innerRef","tag"]),m=Object(u.l)(o()(a,"card-body"),t);return s.a.createElement(l,Object(n.a)({},i,{className:m,ref:c}))};b.propTypes=d,b.defaultProps={tag:"div"},a.a=b}}]);
//# sourceMappingURL=77.813a430a.chunk.js.map