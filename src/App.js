import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import configureStore from "./store/configureStore";
import HomeContainer from "./containers/home/HomeContainer";

const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={HomeContainer} />
    </Router>
  </Provider>
);

export default App;
