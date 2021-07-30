import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import "./helpers/Firebase";
import AppLocale from "./lang";
import ColorSwitcher from "./components/common/ColorSwitcher";
import NotificationContainer from "./components/common/react-notifications/NotificationContainer";
import { isMultiColorActive, isDemo } from "./constants/defaultValues";
import { getDirection } from "./helpers/Utils";
import 'sweetalert2/dist/sweetalert2.css'
import { NotificationManager } from "./components/common/react-notifications";
import { pubnub_publishKey,pubnub_subscribeKey  } from "./constants/defaultValues";

import PubNub from 'pubnub';

import {
  updateNotificationCounter
} from "./redux/actions";

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views")
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/app")
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/user")
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/error")
);

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/user/login",
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
};

const NonAuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authUser ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/app/dashboard",
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
};


var counter = 0;
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      channels:['awesome-channel'],
      counter:this.props.notification_count
    }
    counter = this.props.notification_count;
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
    
    //-------------------pubnub------subcribe-----------------//
    
    const pubnub = new PubNub({
      publishKey: pubnub_publishKey,
      subscribeKey: pubnub_subscribeKey,
    });
    pubnub.addListener({
      message: m =>{
        NotificationManager.success(m.message.description, m.message.title, 3000);
       
        counter= counter+1
         this.props.updateNotificationCounter(counter)
      }

    });
    pubnub.subscribe( {channels:this.state.channels });
  }
  
  

  render() {
    const { locale, loginUser,notification_count } = this.props;
    const currentAppLocale = AppLocale[locale];

    //-------------------pubnub------subcribe-----------------//

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            {/* {isMultiColorActive && <ColorSwitcher />} */}
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <AuthRoute
                    path="/app"
                    authUser={loginUser}
                    component={ViewApp}
                  />
                  <NonAuthRoute
                    path="/user"
                    authUser={loginUser}
                    component={ViewUser}
                  />
                  {/* <Route
                    path="/user"
                    render={(props) => <ViewUser {...props} />}
                  /> */}
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/"
                    exact
                    render={(props) => <ViewMain {...props} />}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings,globalstate }) => {
  const { user: loginUser } = authUser;
  const { locale } = settings;
  const { notification_count } = globalstate;
  return { loginUser, locale,notification_count };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, {updateNotificationCounter})(App);
