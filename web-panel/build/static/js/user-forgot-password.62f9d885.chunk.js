(window["webpackJsonpgogo-react"]=window["webpackJsonpgogo-react"]||[]).push([[11],{1123:function(e,a,t){"use strict";t.r(a);var n=t(5),r=t.n(n),s=t(27),l=t(256),c=t(257),o=t(259),i=t(258),u=t(263),m=t(260),d=t(1),b=t.n(d),p=t(284),f=t(285),h=t(355),g=t(1047),v=t(1048),E=t(353),N=t(262),j=t(268),O=t(267),k=t(254),w=t(255),y=t(3),x=t(265),C=t(71),S=t(39),M=t(40),_=O.object().shape({email:O.string().required("Please enter your email address").email("Invalid email format").max(50,"Too Long! Atmost 50 letters.")}),P=function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(o.a)(this,Object(i.a)(a).call(this,e))).handleSubmit=function(){var e=Object(s.a)(r.a.mark(function e(a){var n,s,l;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("email",a.email),n.append("otp_for","forgot_password"),s=M.a.ADMIN_RESEND_OTP,e.next=6,Object(S.a)("POST",s,n);case 6:200==(l=e.sent).status?(x.a.success(l.message,"Success!",3e3),t.props.history.push({pathname:"/user/reset-password",state:{user_id:l.data._id,email:l.data.email,otp_number:l.data.otp_number}})):x.a.error(l.message,"Error!",3e3);case 8:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),t.state={email:""},t.handleSubmit=t.handleSubmit.bind(Object(u.a)(t)),t}return Object(m.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=this;return b.a.createElement(p.a,{className:"h-100 justify-content-center"},b.a.createElement(k.a,{xxs:"12",md:"5",className:"mx-auto my-auto"},b.a.createElement(f.a,{className:"auth-card"},b.a.createElement("div",{className:"w-100 form-side p-5"},b.a.createElement("div",{className:"text-center"},b.a.createElement(N.c,{to:"/",className:"white"},b.a.createElement("span",{className:"logo-single"}))),b.a.createElement(h.a,{className:"mb-4"},b.a.createElement(w.a,{id:"user.forgot-password"})),b.a.createElement(j.c,{enableReinitialize:!0,initialValues:{email:this.state.email},validationSchema:_,onSubmit:this.handleSubmit},function(a){a.handleSubmit,a.setFieldValue,a.setFieldTouched,a.values;var t=a.errors,n=a.touched;a.isSubmitting;return b.a.createElement(j.b,{className:"av-tooltip tooltip-label-bottom"},b.a.createElement(g.a,{className:"form-group has-float-label"},b.a.createElement(v.a,null,b.a.createElement(w.a,{id:"user.email"})),b.a.createElement(j.a,{className:"form-control",name:"email",type:"text"}),t.email&&n.email&&b.a.createElement("div",{className:"invalid-feedback d-block"},t.email)),b.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},b.a.createElement(N.c,{to:"/user/login"},b.a.createElement(w.a,{id:"user.back-to-login"})),b.a.createElement(E.a,{color:"primary",type:"submit",className:"btn-shadow btn-multiple-state ".concat(e.props.loading?"show-spinner":""),size:"lg"},b.a.createElement("span",{className:"spinner d-inline-block"},b.a.createElement("span",{className:"bounce1"}),b.a.createElement("span",{className:"bounce2"}),b.a.createElement("span",{className:"bounce3"})),b.a.createElement("span",{className:"label"},b.a.createElement(w.a,{id:"button.submit"})))))})))))}}]),a}(d.Component);a.default=Object(C.b)(function(e){var a=e.authUser;return{forgotUserMail:a.forgotUserMail,loading:a.loading,error:a.error}},{forgotPassword:y.z})(P)},254:function(e,a,t){"use strict";t.d(a,"a",function(){return l}),t.d(a,"b",function(){return c});var n=t(1),r=t.n(n),s=t(283),l=function(e){return r.a.createElement(s.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},c=function(e){return r.a.createElement("div",{className:"separator ".concat(e.className)})}},255:function(e,a,t){"use strict";var n=t(1),r=t.n(n),s=t(264);a.a=Object(s.d)(function(e){return r.a.createElement(s.a,e)},{withRef:!1})},309:function(e,a){function t(){return e.exports=t=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},t.apply(this,arguments)}e.exports=t},352:function(e,a){e.exports=function(e,a){if(null==e)return{};var t,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}},353:function(e,a,t){"use strict";var n=t(12),r=t(20),s=t(263),l=t(266),c=t(1),o=t.n(c),i=t(25),u=t.n(i),m=t(251),d=t.n(m),b=t(252),p={active:u.a.bool,"aria-label":u.a.string,block:u.a.bool,color:u.a.string,disabled:u.a.bool,outline:u.a.bool,tag:b.p,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),onClick:u.a.func,size:u.a.string,children:u.a.node,className:u.a.string,cssModule:u.a.object,close:u.a.bool},f=function(e){function a(a){var t;return(t=e.call(this,a)||this).onClick=t.onClick.bind(Object(s.a)(t)),t}Object(l.a)(a,e);var t=a.prototype;return t.onClick=function(e){this.props.disabled?e.preventDefault():this.props.onClick&&this.props.onClick(e)},t.render=function(){var e=this.props,a=e.active,t=e["aria-label"],s=e.block,l=e.className,c=e.close,i=e.cssModule,u=e.color,m=e.outline,p=e.size,f=e.tag,h=e.innerRef,g=Object(r.a)(e,["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"]);c&&"undefined"===typeof g.children&&(g.children=o.a.createElement("span",{"aria-hidden":!0},"\xd7"));var v="btn"+(m?"-outline":"")+"-"+u,E=Object(b.l)(d()(l,{close:c},c||"btn",c||v,!!p&&"btn-"+p,!!s&&"btn-block",{active:a,disabled:this.props.disabled}),i);g.href&&"button"===f&&(f="a");var N=c?"Close":null;return o.a.createElement(f,Object(n.a)({type:"button"===f&&g.onClick?"button":void 0},g,{className:E,ref:h,onClick:this.onClick,"aria-label":t||N}))},a}(o.a.Component);f.propTypes=p,f.defaultProps={color:"secondary",tag:"button"},a.a=f},355:function(e,a,t){"use strict";var n=t(12),r=t(20),s=t(1),l=t.n(s),c=t(25),o=t.n(c),i=t(251),u=t.n(i),m=t(252),d={tag:m.p,className:o.a.string,cssModule:o.a.object},b=function(e){var a=e.className,t=e.cssModule,s=e.tag,c=Object(r.a)(e,["className","cssModule","tag"]),o=Object(m.l)(u()(a,"card-title"),t);return l.a.createElement(s,Object(n.a)({},c,{className:o}))};b.propTypes=d,b.defaultProps={tag:"div"},a.a=b}}]);
//# sourceMappingURL=user-forgot-password.62f9d885.chunk.js.map