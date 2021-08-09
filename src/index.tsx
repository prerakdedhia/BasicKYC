import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter, Switch, Router} from 'react-router-dom'
import Details from './Details/Details';
import createHistory from "history/createBrowserHistory";
export const historyInstance= createHistory();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
    <Router history={historyInstance}>
    <Provider store={store}>
    <Switch >
                <Route exact path="/" component={App} />
                <Route exact path="/details" component={Details} />
            </Switch>
    </Provider>
    </Router>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
