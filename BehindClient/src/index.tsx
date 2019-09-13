import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {reducer} from "./_reducers/reducer";
import {devToolsEnhancer} from "redux-devtools-extension";
import {createStore} from "redux";

// const persistedToken = loadToken();
const store = createStore(reducer,
    // persistedToken,
    devToolsEnhancer({}));
// store.subscribe(() => {
//     saveToken(store.getState())
// });


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
