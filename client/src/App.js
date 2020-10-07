import React, { useEffect, Fragment } from "react";
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
import Product from "./components/shop/Product";
import Shop from "./components/shop/Shop";
import Cart from "./components/shop/Cart";
import { loadUser, loadCart } from "./actions/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadCart());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <div className="App">
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/product/:product_id" component={Product}></Route>
              <Route path="/shop" component={Shop}></Route>
              <Route path="/cart" component={Cart}></Route>
              <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
              <AdminRoute path="/create/category" component={AddCategory}></AdminRoute>
              <AdminRoute path="/create/product" component={AddProduct}></AdminRoute>
              <Route path="/sign-in" component={SignIn}></Route>
              <Route path="/sign-up" component={SignUp}></Route>
              <Route path="/not-admin" component={NotAdmin}></Route>
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;