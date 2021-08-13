import React, { Component, Fragment } from "react";
import firebase from "firebase";
import GoogleMapReact from "google-map-react";
import { NotificationManager } from "../../../components/common/react-notifications";
import "rc-switch/assets/index.css";
import Http from "../../../helpers/Http";
import { auth, database } from "../../../helpers/Firebase";
import ApiRoutes from "../../../helpers/ApiRoutes";

const AnyReactComponent = ({ text }) => (
  <div>
    <i class="glyph-icon iconsminds-map-marker-2" style={{ "font-size": "32px", color: "red", "line-height": "42px" }}></i>
    {text}
  </div>
);
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();
  places.forEach((place) => {
    bounds.extend(new maps.LatLng(place.geometry.location.lat, place.geometry.location.lng));
  });
  return bounds;
};
class renderMap extends Component {
  static defaultProps = {
    center: {
      lat: 20.5937,
      lng: 78.9629,
    },
    zoom: 10,
  };
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");
    

    this.state = {
      displayOpts: {
        addNewBtn: true,
        keyword: true,
      },

      user_id: (this.props.location.state.data && this.props.location.state.data._id) || "",
      user_name: (this.props.location.state.data && this.props.location.state.data.username) || "",
      lat: this.props.location.state.data.geoLocation.coordinates[1] || 20.5937,
      lng: this.props.location.state.data.geoLocation.coordinates[0] || 78.9629,
      
      searchKeyword: "",
      filterStatus: "",

      selectedItems: [],
      lastChecked: null,
      isLoading: false,
      currentPage: this.props.history.location.state.pageIndex,
    };
  }
  
  // LifeCycle Methods
  componentDidMount() {
    // var rootRef = database.ref(`/athwas_drivers/${'5fe99a2d12d5874bdd5db02d'}`);
    // rootRef.on("value", snap => {
    //   this.setState({
    //     lat: snap.child("lat").val(),
    //     lng: snap.child("lng").val()
    //   })
    //  // renderMarkers(map, maps);
    // });
  }
  

  // Methods for Data Rendering
  dataListRender = async () => {
    this.state.isLoading = true;

    let path =
      ApiRoutes.GET_BRANDS +
      "?page_no=" +
      `${this.state.currentPage}` +
      "&limit=" +
      `${this.state.selectedPageSize}` +
      "&status=" +
      `${this.state.filterStatus}` +
      "&keyword=" +
      `${this.state.searchKeyword}`;

    const res = await Http("GET", path);

    if (res.status == "success") {
      this.setState({
        totalPage: res.data.totalPages,
        items: res.data.docs,
        totalItemCount: res.data.totalDocs,
      });
    } else {
      NotificationManager.error(res.message, "Error!", 3000);
    }

    this.setState({ isLoading: true });
  };

  renderMarkers(map, maps) {
    
   // console.log(new maps.Marker(null));
    const bounds = new maps.LatLngBounds();

    // Fit map to bounds

    var rootRef = database.ref(`/athwas_drivers/${this.state.user_id}`);
    debugger
    rootRef.on("value", (snap) => {
      if(snap.child("lat").val())
      {
        new maps.Marker(null);
        bounds.extend(new maps.LatLng(snap.child("lat").val(), snap.child("lng").val()));
        map.fitBounds(bounds);
      //     console.log(snap.child("lat").val());
        this.setState({
          lat: snap.child("lat").val(),
          lng: snap.child("lng").val(),
        });
      }else{
        new maps.Marker(null);
        bounds.extend(new maps.LatLng(this.state.lat, this.state.lng));
        map.fitBounds(bounds);
      //     console.log(snap.child("lat").val());
      }
    });
  }

  render() {
    
    return (
     
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
         {console.log("test",this.props,this.state)}
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCnHXmtGqz7eOZg2rW9U20KDit1tRF6rhU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        >
          <AnyReactComponent lat={this.state.lat} lng={this.state.lng} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}
export default renderMap;
