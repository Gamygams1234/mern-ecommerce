import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import store from "./store";
import { Provider } from "react-redux";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
            <Route path="/sign-in" component={SignIn}></Route>
            <Route path="/sign-up" component={SignUp}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
