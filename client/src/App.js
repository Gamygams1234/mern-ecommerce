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
import NotAdmin from "./components/routing/NotAdmin";
import AddCategory from "./components/AdiminRoutes/AddCategory";
import AdminRoute from "./components/routing/AdminRoute";
import AddProduct from "./components/AdiminRoutes/AddProduct";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
            <AdminRoute path="/create/category" component={AddCategory}></AdminRoute>
            <AdminRoute path="/create/product" component={AddProduct}></AdminRoute>
            <Route path="/sign-in" component={SignIn}></Route>
            <Route path="/sign-up" component={SignUp}></Route>
            <Route path="/not-admin" component={NotAdmin}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
