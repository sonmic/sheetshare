import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import AppBar from "./components/AppBar";
import Header from "./routes/Header";
import SearchBar from "./components/SearchBar";
import AllPosts from "./components/AllPosts";
// import LoadingComponent from './components/LoadingComponent';
// import AuthenticatedComponent from './components/AuthenticatedComponent';
//redux
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "./index.css";

const store = createStore(rootReducer, applyMiddleware(thunk));

//provide this store to react

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <LoadingComponent> */}
      <div>
        <AppBar />
        <Header />
        <div>
          <Switch>
            <Route exact path="/all" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={SearchBar} />
            {/* <AuthenticatedComponent> */}
            <Route exact path="/" component={AllPosts} />
            {/* </AuthenticatedComponent> */}
          </Switch>
        </div>
      </div>
      {/* </LoadingComponent> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
