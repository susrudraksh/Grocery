import React, { Suspense,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import { pubnub_publishKey,pubnub_subscribeKey  } from "./constants/defaultValues";

const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App' ));

const pubnub = new PubNub({
    publishKey: pubnub_publishKey,
    subscribeKey: pubnub_subscribeKey,
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <Suspense fallback={<div className="loading" />}>
      <PubNubProvider client={pubnub}>
      <App />
      </PubNubProvider>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);



/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
