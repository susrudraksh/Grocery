(window["webpackJsonpgogo-react"]=window["webpackJsonpgogo-react"]||[]).push([[79],{1067:function(e,a,t){"use strict";t.r(a);var s=t(5),n=t.n(s),r=t(27),l=t(256),c=t(257),m=t(259),o=t(258),i=t(263),u=t(260),d=t(1),p=t.n(d),g=t(264),b=t(284),h=t(285),f=t(276),E=t(1047),v=t(1048),N=t(353),x=t(268),j=t(267),y=t(254),O=t(265),w=t(261),T=t(255),k=t(39),_=t(40),P=["image/jpg","image/jpeg","image/gif","image/png"],S=j.object().shape({username:j.string().required("Please enter user name").matches(/^\S+$/,"Please input alphabet characters only").min(2,"Too Short! Atleast 2 letters.").max(50,"Too Long! Atmost 50 letters."),email:j.string().required("Please enter email address").email("Invalid email format").max(50,"Too Long! Atmost 50 letters."),country_code:j.string().required("Please select country code"),phone:j.string().required("Please enter phone number").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Phone number is not valid").min(7,"Too Short! Atleast 7 letters.").max(15,"Too Long! Atmost 15 letters."),password:j.string().required("Please enter a password").min(6,"Too Short! Atleast 6 letters.").max(20,"Too Long! Atmost 20 letters."),address:j.string(),user_image:j.mixed().test("fileType","Invalid File Format",function(e){return!e||""==e||e&&P.includes(e.type)})}),A=function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(m.a)(this,Object(o.a)(a).call(this,e))).handleSubmit=function(){var e=Object(r.a)(n.a.mark(function e(a){var s,r,l;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(s=new FormData).append("username",a.username),s.append("email",a.email),s.append("country_code",a.country_code),s.append("phone",a.phone),s.append("password",a.password),s.append("address",a.address),s.append("user_image",a.user_image),r=_.a.CREATE_DRIVER,e.next=11,Object(k.a)("POST",r,s);case 11:200==(l=e.sent).status?(O.a.success(l.message,"Success!",3e3),t.props.history.push("/app/drivers")):O.a.error(l.message,"Error!",3e3);case 13:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),t.state={username:"",email:"",country_code:"91",phone:"",password:"",address:"",user_image:void 0},t.handleSubmit=t.handleSubmit.bind(Object(i.a)(t)),t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=this;this.props.intl.messages;return p.a.createElement(d.Fragment,null,p.a.createElement(b.a,null,p.a.createElement(y.a,{xxs:"12"},p.a.createElement(w.a,{heading:"heading.add-driver",match:this.props.match}),p.a.createElement(y.b,{className:"mb-5"}))),p.a.createElement(b.a,null,p.a.createElement(y.a,{xxs:"12",sm:"12"},p.a.createElement(h.a,null,p.a.createElement(f.a,null,p.a.createElement(x.c,{initialValues:{username:this.state.username,email:this.state.email,country_code:this.state.country_code,phone:this.state.phone,password:this.state.password,address:this.state.address,user_image:this.state.user_image},validationSchema:S,onSubmit:this.handleSubmit},function(a){a.handleSubmit;var t=a.setFieldValue,s=(a.setFieldTouched,a.handleChange,a.values,a.errors),n=a.touched;a.isSubmitting;return p.a.createElement(x.b,{className:"av-tooltip tooltip-label-bottom"},p.a.createElement(b.a,null,p.a.createElement(y.a,{xxs:"12",sm:"6"},p.a.createElement(E.a,{className:"form-group has-float-label"},p.a.createElement(v.a,null,"User Name"),p.a.createElement(x.a,{className:"form-control",name:"username",type:"text"}),s.username&&n.username?p.a.createElement("div",{className:"invalid-feedback d-block"},s.username):null)),p.a.createElement(y.a,{xxs:"12",sm:"6"},p.a.createElement(E.a,{className:"form-group has-float-label"},p.a.createElement(v.a,null,"Email"),p.a.createElement(x.a,{className:"form-control",name:"email",type:"email"}),s.email&&n.email?p.a.createElement("div",{className:"invalid-feedback d-block"},s.email):null)),p.a.createElement(y.a,{xxs:"12",sm:"6"},p.a.createElement(E.a,{className:"form-group has-float-label"},p.a.createElement(v.a,null,"Phone"),p.a.createElement(x.a,{className:"form-control",name:"phone",type:"text"}),s.phone&&n.phone?p.a.createElement("div",{className:"invalid-feedback d-block"},s.phone):null)),p.a.createElement(y.a,{xxs:"12",sm:"6"},p.a.createElement(E.a,{className:"form-group has-float-label"},p.a.createElement(v.a,null,"Password"),p.a.createElement(x.a,{className:"form-control",name:"password",type:"password"}),s.password&&n.password?p.a.createElement("div",{className:"invalid-feedback d-block"},s.password):null)),p.a.createElement(y.a,{xxs:"12",sm:"6"},p.a.createElement(E.a,{className:"form-group has-float-label"},p.a.createElement(v.a,null,"Address"),p.a.createElement(x.a,{className:"form-control",name:"address",component:"textarea"}),s.address&&n.address?p.a.createElement("div",{className:"invalid-feedback d-block"},s.address):null)),p.a.createElement(y.a,{xxs:"12",sm:"6"},p.a.createElement(E.a,{className:"form-group has-float-label"},p.a.createElement(v.a,null,"Profile Image"),p.a.createElement(x.a,{className:"form-control",name:"user_image",type:"file",value:e.state.user_image,onChange:function(e){t("user_image",e.currentTarget.files[0])}}),s.user_image&&n.user_image?p.a.createElement("div",{className:"invalid-feedback d-block"},s.user_image):null))),p.a.createElement(N.a,{color:"primary",type:"submit"},p.a.createElement(T.a,{id:"button.save"})))}))))))}}]),a}(d.Component);a.default=Object(g.d)(A)},254:function(e,a,t){"use strict";t.d(a,"a",function(){return l}),t.d(a,"b",function(){return c});var s=t(1),n=t.n(s),r=t(283),l=function(e){return n.a.createElement(r.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},c=function(e){return n.a.createElement("div",{className:"separator ".concat(e.className)})}},261:function(e,a,t){"use strict";var s=t(1),n=t.n(s),r=t(274),l=t(275),c=t(262),m=t(255),o=function(e){return n.a.createElement(m.a,{id:"menu.".concat(e)})},i=function(e,a,t){return 0===t?"":e.split(a)[0]+a},u=function(e){var a=e.match.path.substr(1),t=a.split("/");return t[t.length-1].indexOf(":")>-1&&(t=t.filter(function(e){return-1===e.indexOf(":")})),n.a.createElement(s.Fragment,null,n.a.createElement(r.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},t.map(function(e,s){return n.a.createElement(l.a,{key:s,active:t.length===s+1},t.length!==s+1?n.a.createElement(c.c,{to:"/"+i(a,e,s)},o(e)):o(e))})))};a.a=function(e){var a=e.heading,t=e.match;return n.a.createElement(s.Fragment,null,a&&n.a.createElement("h1",null,n.a.createElement(m.a,{id:a})),n.a.createElement(u,{match:t}))}},274:function(e,a,t){"use strict";var s=t(12),n=t(20),r=t(1),l=t.n(r),c=t(25),m=t.n(c),o=t(251),i=t.n(o),u=t(252),d={tag:u.p,listTag:u.p,className:m.a.string,listClassName:m.a.string,cssModule:m.a.object,children:m.a.node,"aria-label":m.a.string},p=function(e){var a=e.className,t=e.listClassName,r=e.cssModule,c=e.children,m=e.tag,o=e.listTag,d=e["aria-label"],p=Object(n.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),g=Object(u.l)(i()(a),r),b=Object(u.l)(i()("breadcrumb",t),r);return l.a.createElement(m,Object(s.a)({},p,{className:g,"aria-label":d}),l.a.createElement(o,{className:b},c))};p.propTypes=d,p.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=p},275:function(e,a,t){"use strict";var s=t(12),n=t(20),r=t(1),l=t.n(r),c=t(25),m=t.n(c),o=t(251),i=t.n(o),u=t(252),d={tag:u.p,active:m.a.bool,className:m.a.string,cssModule:m.a.object},p=function(e){var a=e.className,t=e.cssModule,r=e.active,c=e.tag,m=Object(n.a)(e,["className","cssModule","active","tag"]),o=Object(u.l)(i()(a,!!r&&"active","breadcrumb-item"),t);return l.a.createElement(c,Object(s.a)({},m,{className:o,"aria-current":r?"page":void 0}))};p.propTypes=d,p.defaultProps={tag:"li"},a.a=p},276:function(e,a,t){"use strict";var s=t(12),n=t(20),r=t(1),l=t.n(r),c=t(25),m=t.n(c),o=t(251),i=t.n(o),u=t(252),d={tag:u.p,className:m.a.string,cssModule:m.a.object,innerRef:m.a.oneOfType([m.a.object,m.a.string,m.a.func])},p=function(e){var a=e.className,t=e.cssModule,r=e.innerRef,c=e.tag,m=Object(n.a)(e,["className","cssModule","innerRef","tag"]),o=Object(u.l)(i()(a,"card-body"),t);return l.a.createElement(c,Object(s.a)({},m,{className:o,ref:r}))};p.propTypes=d,p.defaultProps={tag:"div"},a.a=p}}]);
//# sourceMappingURL=79.2a80fd42.chunk.js.map