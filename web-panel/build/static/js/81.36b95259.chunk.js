(window["webpackJsonpgogo-react"]=window["webpackJsonpgogo-react"]||[]).push([[81],{1110:function(e,a,t){"use strict";t.r(a);var n=t(5),s=t.n(n),r=t(27),l=t(256),c=t(257),i=t(259),o=t(258),u=t(263),m=t(260),d=t(1),b=t.n(d),p=t(264),f=t(284),g=t(285),h=t(276),E=t(1047),v=t(1048),N=t(353),j=t(268),O=t(267),w=t(254),x=t(265),q=t(261),T=t(255),y=t(39),S=t(40),k=O.object().shape({question:O.string().required("Please enter a question").min(2,"Too Short! Atleast 2 letters.").max(80,"Too Long! Atmost 80 letters."),answer:O.string().required("Please enter an answer").min(2,"Too Short! Atleast 2 letters.").max(500,"Too Long! Atmost 500 letters.")}),M=function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(i.a)(this,Object(o.a)(a).call(this,e))).handleSubmit=function(){var e=Object(r.a)(s.a.mark(function e(a){var n,r,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("question",a.question),n.append("answer",a.answer),r=S.a.CREATE_FAQ,e.next=6,Object(y.a)("POST",r,n);case 6:200==(l=e.sent).status?(x.a.success(l.message,"Success!",3e3),t.props.history.push("/app/faqs")):x.a.error(l.message,"Error!",3e3);case 8:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),t.state={question:"",answer:""},t.handleSubmit=t.handleSubmit.bind(Object(u.a)(t)),t}return Object(m.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){this.props.intl.messages;return b.a.createElement(d.Fragment,null,b.a.createElement(f.a,null,b.a.createElement(w.a,{xxs:"12"},b.a.createElement(q.a,{heading:"heading.add-faq",match:this.props.match}),b.a.createElement(w.b,{className:"mb-5"}))),b.a.createElement(f.a,null,b.a.createElement(w.a,{xxs:"12",sm:"12"},b.a.createElement(g.a,null,b.a.createElement(h.a,null,b.a.createElement(j.c,{initialValues:{question:this.state.question,answer:this.state.answer},validationSchema:k,onSubmit:this.handleSubmit},function(e){e.handleSubmit,e.setFieldValue,e.setFieldTouched,e.handleChange,e.values;var a=e.errors,t=e.touched;e.isSubmitting;return b.a.createElement(j.b,{className:"av-tooltip tooltip-label-bottom"},b.a.createElement(f.a,null,b.a.createElement(w.a,{xxs:"12",sm:"6"},b.a.createElement(E.a,{className:"form-group has-float-label"},b.a.createElement(v.a,null,"Question"),b.a.createElement(j.a,{className:"form-control",name:"question",type:"text"}),a.question&&t.question?b.a.createElement("div",{className:"invalid-feedback d-block"},a.question):null))),b.a.createElement(f.a,null,b.a.createElement(w.a,{xxs:"12",sm:"6"},b.a.createElement(E.a,{className:"form-group has-float-label"},b.a.createElement(v.a,null,"Answer"),b.a.createElement(j.a,{className:"form-control",name:"answer",component:"textarea"}),a.answer&&t.answer?b.a.createElement("div",{className:"invalid-feedback d-block"},a.answer):null))),b.a.createElement(N.a,{color:"primary",type:"submit"},b.a.createElement(T.a,{id:"button.save"})))}))))))}}]),a}(d.Component);a.default=Object(p.d)(M)},254:function(e,a,t){"use strict";t.d(a,"a",function(){return l}),t.d(a,"b",function(){return c});var n=t(1),s=t.n(n),r=t(283),l=function(e){return s.a.createElement(r.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},c=function(e){return s.a.createElement("div",{className:"separator ".concat(e.className)})}},261:function(e,a,t){"use strict";var n=t(1),s=t.n(n),r=t(274),l=t(275),c=t(262),i=t(255),o=function(e){return s.a.createElement(i.a,{id:"menu.".concat(e)})},u=function(e,a,t){return 0===t?"":e.split(a)[0]+a},m=function(e){var a=e.match.path.substr(1),t=a.split("/");return t[t.length-1].indexOf(":")>-1&&(t=t.filter(function(e){return-1===e.indexOf(":")})),s.a.createElement(n.Fragment,null,s.a.createElement(r.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},t.map(function(e,n){return s.a.createElement(l.a,{key:n,active:t.length===n+1},t.length!==n+1?s.a.createElement(c.c,{to:"/"+u(a,e,n)},o(e)):o(e))})))};a.a=function(e){var a=e.heading,t=e.match;return s.a.createElement(n.Fragment,null,a&&s.a.createElement("h1",null,s.a.createElement(i.a,{id:a})),s.a.createElement(m,{match:t}))}},274:function(e,a,t){"use strict";var n=t(12),s=t(20),r=t(1),l=t.n(r),c=t(25),i=t.n(c),o=t(251),u=t.n(o),m=t(252),d={tag:m.p,listTag:m.p,className:i.a.string,listClassName:i.a.string,cssModule:i.a.object,children:i.a.node,"aria-label":i.a.string},b=function(e){var a=e.className,t=e.listClassName,r=e.cssModule,c=e.children,i=e.tag,o=e.listTag,d=e["aria-label"],b=Object(s.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),p=Object(m.l)(u()(a),r),f=Object(m.l)(u()("breadcrumb",t),r);return l.a.createElement(i,Object(n.a)({},b,{className:p,"aria-label":d}),l.a.createElement(o,{className:f},c))};b.propTypes=d,b.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=b},275:function(e,a,t){"use strict";var n=t(12),s=t(20),r=t(1),l=t.n(r),c=t(25),i=t.n(c),o=t(251),u=t.n(o),m=t(252),d={tag:m.p,active:i.a.bool,className:i.a.string,cssModule:i.a.object},b=function(e){var a=e.className,t=e.cssModule,r=e.active,c=e.tag,i=Object(s.a)(e,["className","cssModule","active","tag"]),o=Object(m.l)(u()(a,!!r&&"active","breadcrumb-item"),t);return l.a.createElement(c,Object(n.a)({},i,{className:o,"aria-current":r?"page":void 0}))};b.propTypes=d,b.defaultProps={tag:"li"},a.a=b},276:function(e,a,t){"use strict";var n=t(12),s=t(20),r=t(1),l=t.n(r),c=t(25),i=t.n(c),o=t(251),u=t.n(o),m=t(252),d={tag:m.p,className:i.a.string,cssModule:i.a.object,innerRef:i.a.oneOfType([i.a.object,i.a.string,i.a.func])},b=function(e){var a=e.className,t=e.cssModule,r=e.innerRef,c=e.tag,i=Object(s.a)(e,["className","cssModule","innerRef","tag"]),o=Object(m.l)(u()(a,"card-body"),t);return l.a.createElement(c,Object(n.a)({},i,{className:o,ref:r}))};b.propTypes=d,b.defaultProps={tag:"div"},a.a=b}}]);
//# sourceMappingURL=81.36b95259.chunk.js.map