(window["webpackJsonpgogo-react"]=window["webpackJsonpgogo-react"]||[]).push([[103],{1070:function(t,e,a){"use strict";a.r(e);var n=a(5),o=a.n(n),s=a(27),r=a(256),c=a(257),l=a(259),i=a(258),d=a(260),u=a(1),p=a.n(u),g=(a(758),a(1042)),h=a(265),m=(a(278),a(39)),f=a(54),v=a(40),w=function(t){var e=t.text;return p.a.createElement("div",null,p.a.createElement("i",{class:"glyph-icon iconsminds-map-marker-2",style:{"font-size":"32px",color:"red","line-height":"42px"}}),e)},y=function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(l.a)(this,Object(i.a)(e).call(this,t))).dataListRender=Object(s.a)(o.a.mark(function t(){var e,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.state.isLoading=!0,e=v.a.GET_BRANDS+"?page_no="+"".concat(n.state.currentPage)+"&limit="+"".concat(n.state.selectedPageSize)+"&status="+"".concat(n.state.filterStatus)+"&keyword="+"".concat(n.state.searchKeyword),t.next=4,Object(m.a)("GET",e);case 4:"success"==(a=t.sent).status?n.setState({totalPage:a.data.totalPages,items:a.data.docs,totalItemCount:a.data.totalDocs}):h.a.error(a.message,"Error!",3e3),n.setState({isLoading:!0});case 7:case"end":return t.stop()}},t)})),n.mouseTrap=a(282),console.log(n.props.location),n.state={displayOpts:{addNewBtn:!0,keyword:!0},user_id:n.props.location.state.data&&n.props.location.state.data._id||"",user_name:n.props.location.state.data&&n.props.location.state.data.username||"",lat:t.data&&t.data.geoLocation.coordinates[1]||34.039328,lng:t.data&&t.data.geoLocation.coordinates[0]||74.7904645,searchKeyword:"",filterStatus:"",selectedItems:[],lastChecked:null,isLoading:!1,currentPage:n.props.history.location.state.pageIndex},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){}},{key:"renderMarkers",value:function(t,e){var a=this;console.log(new e.Marker(null));var n=new e.LatLngBounds;f.b.ref("/athwas_drivers/".concat(this.state.user_id)).on("value",function(o){new e.Marker(null),n.extend(new e.LatLng(o.child("lat").val(),o.child("lng").val())),t.fitBounds(n),a.setState({lat:o.child("lat").val(),lng:o.child("lng").val()})})}},{key:"render",value:function(){var t=this;return p.a.createElement("div",{style:{height:"100vh",width:"100%"}},p.a.createElement(g.a,{bootstrapURLKeys:{key:"AIzaSyCnHXmtGqz7eOZg2rW9U20KDit1tRF6rhU"},defaultCenter:this.props.center,defaultZoom:this.props.zoom,onGoogleApiLoaded:function(e){var a=e.map,n=e.maps;return t.renderMarkers(a,n)},yesIWantToUseGoogleMapApiInternals:!0},p.a.createElement(w,{lat:this.state.lat,lng:this.state.lng,text:"My Marker"})))}}]),e}(u.Component);y.defaultProps={center:{lat:24.5854,lng:73.7125},zoom:10},e.default=y}}]);
//# sourceMappingURL=103.4befa355.chunk.js.map