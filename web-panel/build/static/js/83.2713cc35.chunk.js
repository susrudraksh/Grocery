(window["webpackJsonpgogo-react"]=window["webpackJsonpgogo-react"]||[]).push([[83],{1134:function(e,t,a){"use strict";a.r(t);var n=a(5),s=a.n(n),l=a(27),r=a(256),c=a(257),o=a(259),u=a(258),i=a(263),m=a(260),d=a(1),p=a.n(d),b=a(264),f=a(306),v=a(284),g=a(285),E=a(276),_=a(1047),h=a(1048),y=a(353),x=a(268),N=a(267),S=a(254),O=function(e){var t=Object.assign({},e);return delete t.autoCorrect,delete t.autoCapitalize,p.a.createElement(f.a.Input,t)},C=a(265),j=a(261),k=a(328),T=a.n(k),U=a(255),F=a(39),w=a(40),A=N.object().shape({notification_text:N.string().required("Please enter notfication text").min(2,"Too Short! Atleast 2 letters.").max(100,"Too Long! Atmost 100 letters."),sent_to:N.string().required("Please select an option"),user_type:N.mixed().required("Please select an option"),sent_to_users:N.string()}),D=function(e){function t(e){var a;Object(r.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).onChangeSendTo=function(e){"all_users"==e?a.setState({showUsersField:!1,selectedUsers:[]}):(a.getUsersList(),a.setState({showUsersField:!0}))},a.onChangeDays=function(e){a.setState({daysCount:e})},a.onChangeAmount=function(e){a.setState({orderAmount:e})},a.onChangeStatus=function(e){a.setState({usersStatus:e})},a.onChangeUserType=function(e){a.setState({user_type:e})},a.getUsersList=Object(l.a)(s.a.mark(function e(){var t,n,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=w.a.GET_CUSTOMER_LIST+"?status="+"".concat(a.state.usersStatus)+"&days_limit="+"".concat(a.state.daysCount)+"&amount_limit="+"".concat(a.state.orderAmount)+"&user_type="+"".concat(a.state.user_type),e.next=3,Object(F.a)("GET",t);case 3:200==(n=e.sent).status?(l=n.data.map(function(e,t){return{label:e.username,value:e._id,key:t}}),a.setState({usersList:l})):C.a.error(n.message,"Error!",3e3);case 5:case"end":return e.stop()}},e)})),a.handleSubmit=function(){var e=Object(l.a)(s.a.mark(function e(t,n){var l,r,c,o,u;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(l=a.state.selectedUsers.map(function(e){return e.value}),r=l.length>0?l.join(","):"","selected_users"!=t.sent_to||""!=r){e.next=6;break}n.setFieldError("sent_to_users","Please select an user"),e.next=20;break;case 6:return(c=new FormData).append("notification_text",t.notification_text),c.append("sent_to",t.sent_to),c.append("sent_to_users",JSON.stringify(l)),c.append("sender_id",a.state.login_id),c.append("user_type",a.state.user_type),c.append("status",a.state.usersStatus),c.append("days_limit",a.state.daysCount),c.append("amount_limit",a.state.orderAmount),o=w.a.ADD_NOTIFICATION,e.next=18,Object(F.a)("POST",o,c);case 18:200==(u=e.sent).status?(C.a.success(u.message,"Success!",3e3),window.location.reload()):C.a.error(u.message,"Error!",3e3);case 20:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.MultiValue=function(e){return p.a.createElement(f.a.MultiValue,e,p.a.createElement("span",null,e.data.label))},a.Option=T()({render:function(){return p.a.createElement("div",null,p.a.createElement(f.a.Option,this.props,p.a.createElement("input",{type:"checkbox",checked:this.props.isSelected,onChange:function(e){return null}})," ",p.a.createElement("label",null,this.props.label," ")))}});var n=JSON.parse(localStorage.getItem("userData"))||{},c=localStorage.getItem("user_id")||{};return a.state={userData:n,login_id:c,notification_text:"",sent_to:"all_users",sent_to_users:[],sendToOpts:[{value:"all_users",label:"All Users"},{value:"selected_users",label:"Selected Users"}],daysFilter:[{value:"",label:"Select"},{value:"1",label:"Last 30 Days"},{value:"2",label:"Last 60 Days"},{value:"3",label:"Last 90 Days"}],orderFilter:[{value:"",label:"Select"},{value:"20",label:"20 K"},{value:"40",label:"40 K"}],activeInactive:[{value:"",label:"Select"},{value:"1",label:"Active"},{value:"0",label:"Inactive"}],userType:[{value:"",label:"Select"},{value:"3",label:"Customer"},{value:"4",label:"Driver"}],usersList:[],selectedUsers:[],showUsersField:!1,usersStatus:1,user_type:"",daysCount:1,orderAmount:20},a.handleSubmit=a.handleSubmit.bind(Object(i.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return p.a.createElement(d.Fragment,null,p.a.createElement(v.a,null,p.a.createElement(S.a,{xxs:"12"},p.a.createElement(j.a,{heading:"heading.notifications",match:this.props.match}),p.a.createElement(S.b,{className:"mb-5"}))),p.a.createElement(v.a,null,p.a.createElement(S.a,{xxs:"12",sm:"12"},p.a.createElement(g.a,null,p.a.createElement(E.a,null,p.a.createElement(x.c,{enableReinitialize:!0,initialValues:{notification_text:this.state.notification_text,sent_to:this.state.sent_to,sent_to_users:this.state.sent_to_users},validationSchema:A,onSubmit:this.handleSubmit},function(t){t.handleSubmit;var a=t.setFieldValue,n=(t.setFieldTouched,t.handleChange,t.values),s=t.errors,l=t.touched;t.isSubmitting;return p.a.createElement(x.b,{className:"av-tooltip tooltip-label-bottom"},p.a.createElement(v.a,null,p.a.createElement(S.a,{xxs:"12",sm:"6"},p.a.createElement(_.a,{className:"form-group has-float-label"},p.a.createElement(h.a,null,"Select User Type"),p.a.createElement("select",{name:"user_type",className:"form-control",value:n.user_type,onChange:function(t){a("user_type",t.target.value),e.setState({user_type:t.target.value},function(){return e.getUsersList()})}},p.a.createElement("option",{value:""},"Select"),",",p.a.createElement("option",{value:"3"},"Customer"),",",p.a.createElement("option",{value:"4"},"Driver")),s.user_type&&l.user_type?p.a.createElement("div",{className:"invalid-feedback d-block"},s.user_type):null))),3==e.state.user_type?p.a.createElement(p.a.Fragment,null,p.a.createElement(v.a,null,p.a.createElement(S.a,{xxs:"12",sm:"6"},p.a.createElement(_.a,{className:"form-group has-float-label"},p.a.createElement(h.a,null,"Select Days Filter"),p.a.createElement("select",{name:"daysCount",className:"form-control",value:n.daysCount,onChange:function(t){a("daysCount",t.target.value),e.onChangeDays(t.target.value),e.getUsersList()}},e.state.daysFilter.map(function(e,t){return p.a.createElement("option",{key:t,value:e.value},e.label)})),s.daysCount&&l.daysCount?p.a.createElement("div",{className:"invalid-feedback d-block"},s.daysCount):null))),p.a.createElement(v.a,null,p.a.createElement(S.a,{xxs:"12",sm:"6"},p.a.createElement(_.a,{className:"form-group has-float-label"},p.a.createElement(h.a,null,"Select Order Filter"),p.a.createElement("select",{name:"orderAmount",className:"form-control",value:n.orderAmount,onChange:function(t){a("orderAmount",t.target.value),e.onChangeAmount(t.target.value),e.getUsersList()}},e.state.orderFilter.map(function(e,t){return p.a.createElement("option",{key:t,value:e.value},e.label)})),s.orderAmount&&l.orderAmount?p.a.createElement("div",{className:"invalid-feedback d-block"},s.orderAmount):null)))," "):"",p.a.createElement(v.a,null,p.a.createElement(S.a,{xxs:"12",sm:"6"},p.a.createElement(_.a,{className:"form-group has-float-label"},p.a.createElement(h.a,null,"Notification Text"),p.a.createElement(x.a,{className:"form-control",name:"notification_text",component:"textarea"}),s.notification_text&&l.notification_text?p.a.createElement("div",{className:"invalid-feedback d-block"},s.notification_text):null))),p.a.createElement(v.a,null,p.a.createElement(S.a,{xxs:"12",sm:"6"},p.a.createElement(_.a,{className:"form-group has-float-label"},p.a.createElement(h.a,null,"Sent To"),p.a.createElement("select",{name:"sent_to",className:"form-control",value:n.sent_to,onChange:function(t){a("sent_to",t.target.value),e.onChangeSendTo(t.target.value)}},e.state.sendToOpts.map(function(e,t){return p.a.createElement("option",{key:t,value:e.value},e.label)})),s.sent_to&&l.sent_to?p.a.createElement("div",{className:"invalid-feedback d-block"},s.sent_to):null))),e.state.showUsersField&&p.a.createElement(v.a,null,p.a.createElement(S.a,{xxs:"12",sm:"6"},p.a.createElement(_.a,{className:"form-group has-float-label"},p.a.createElement(h.a,null,"Sent To Users"),p.a.createElement(f.b,{components:{Input:O},className:"react-select",classNamePrefix:"react-select",isMulti:!0,name:"sent_to_users",options:e.state.usersList,value:e.state.selectedUsers,onChange:function(t){e.setState({selectedUsers:t})}}),s.sent_to_users&&l.sent_to_users?p.a.createElement("div",{className:"invalid-feedback d-block"},s.sent_to_users):null))),p.a.createElement(y.a,{color:"primary",type:"submit"},p.a.createElement(U.a,{id:"button.save"})))}))))))}}]),t}(d.Component);t.default=Object(b.d)(D)},254:function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"b",function(){return c});var n=a(1),s=a.n(n),l=a(283),r=function(e){return s.a.createElement(l.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},c=function(e){return s.a.createElement("div",{className:"separator ".concat(e.className)})}},261:function(e,t,a){"use strict";var n=a(1),s=a.n(n),l=a(274),r=a(275),c=a(262),o=a(255),u=function(e){return s.a.createElement(o.a,{id:"menu.".concat(e)})},i=function(e,t,a){return 0===a?"":e.split(t)[0]+t},m=function(e){var t=e.match.path.substr(1),a=t.split("/");return a[a.length-1].indexOf(":")>-1&&(a=a.filter(function(e){return-1===e.indexOf(":")})),s.a.createElement(n.Fragment,null,s.a.createElement(l.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},a.map(function(e,n){return s.a.createElement(r.a,{key:n,active:a.length===n+1},a.length!==n+1?s.a.createElement(c.c,{to:"/"+i(t,e,n)},u(e)):u(e))})))};t.a=function(e){var t=e.heading,a=e.match;return s.a.createElement(n.Fragment,null,t&&s.a.createElement("h1",null,s.a.createElement(o.a,{id:t})),s.a.createElement(m,{match:a}))}},274:function(e,t,a){"use strict";var n=a(12),s=a(20),l=a(1),r=a.n(l),c=a(25),o=a.n(c),u=a(251),i=a.n(u),m=a(252),d={tag:m.p,listTag:m.p,className:o.a.string,listClassName:o.a.string,cssModule:o.a.object,children:o.a.node,"aria-label":o.a.string},p=function(e){var t=e.className,a=e.listClassName,l=e.cssModule,c=e.children,o=e.tag,u=e.listTag,d=e["aria-label"],p=Object(s.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),b=Object(m.l)(i()(t),l),f=Object(m.l)(i()("breadcrumb",a),l);return r.a.createElement(o,Object(n.a)({},p,{className:b,"aria-label":d}),r.a.createElement(u,{className:f},c))};p.propTypes=d,p.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},t.a=p},275:function(e,t,a){"use strict";var n=a(12),s=a(20),l=a(1),r=a.n(l),c=a(25),o=a.n(c),u=a(251),i=a.n(u),m=a(252),d={tag:m.p,active:o.a.bool,className:o.a.string,cssModule:o.a.object},p=function(e){var t=e.className,a=e.cssModule,l=e.active,c=e.tag,o=Object(s.a)(e,["className","cssModule","active","tag"]),u=Object(m.l)(i()(t,!!l&&"active","breadcrumb-item"),a);return r.a.createElement(c,Object(n.a)({},o,{className:u,"aria-current":l?"page":void 0}))};p.propTypes=d,p.defaultProps={tag:"li"},t.a=p},276:function(e,t,a){"use strict";var n=a(12),s=a(20),l=a(1),r=a.n(l),c=a(25),o=a.n(c),u=a(251),i=a.n(u),m=a(252),d={tag:m.p,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},p=function(e){var t=e.className,a=e.cssModule,l=e.innerRef,c=e.tag,o=Object(s.a)(e,["className","cssModule","innerRef","tag"]),u=Object(m.l)(i()(t,"card-body"),a);return r.a.createElement(c,Object(n.a)({},o,{className:u,ref:l}))};p.propTypes=d,p.defaultProps={tag:"div"},t.a=p}}]);
//# sourceMappingURL=83.2713cc35.chunk.js.map