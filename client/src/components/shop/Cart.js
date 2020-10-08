import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { getProducts, getFilteredProducts, getSearchProducts } from "../../actions/products";
import { removeFromCart, emptyCart, resetMessages, getBraintreeClientToken, loadUser } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import AmountForm from "./AmountForm";
import DropIn from "braintree-web-drop-in-react";

const Cart = ({ removeFromCart, isAuthenticated, cartProducts, message, emptyCart, resetMessages, braintreeToken, userID, token, getBraintreeClientToken, loadUser }) => {
  let subtotal = 0;
  cartProducts.map((cartProduct) => {
    subtotal += cartProduct.quantity * cartProduct.product.price;
  });

  const [data, setData] = useState({
    instance: {},
    address: "",
  });

  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: message ? "" : "none" }}>
      {message}
    </div>
  );

  const showDropIn = () => (
    <div>
      <DropIn options={{ authorization: braintreeToken }} onInstance={(instance) => (instance = instance)} />
    </div>
  );

  const showCheckout = () => {
    return braintreeToken && isAuthenticated ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/sign-in">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  const removeAll = () => {
    emptyCart();
  };

  useEffect(() => {
    if (localStorage.getItem("jwtUser")) {
      let user = localStorage.getItem("jwtUser");
      user = JSON.parse(user);
      let token = localStorage.getItem("jwtToken");
      getBraintreeClientToken(user._id, token);
    }

    resetMessages();
  }, [getBraintreeClientToken, resetMessages]);

  return (
    <div>
      <div className="jumbotron shop-product jumbotron-fluid bg-dark text-white ">
        <div className="container text-md-left pt-5">
          <h1 className="display-4">Cart</h1>
          <p className="lead">Manage your cart items. Update your items or checkout.</p>
          <hr className="my-4"></hr>
          <p>To continue shoping, click here.</p>
          <Link className="btn btn-info btn-lg" to="/shop" role="button">
            Shop
          </Link>
        </div>
      </div>
      <div className="container pt-4 mb-5">
        {showSuccess()}

        <div className="row ">
          <div class="col-md col-xl-5">
            <h2>There are {cartProducts.length} products in your cart.</h2>

            <div className="row row-cols-1  container">
              {cartProducts.length > 1 ? (
                <a
                  className="btn btn-outline-danger mt-2 mb-2 card-btn-1"
                  onClick={() => {
                    removeAll();
                    window.scrollTo(0, 0);
                  }}
                >
                  Empty Cart
                </a>
              ) : (
                <div></div>
              )}
              {cartProducts.map((product, i) => (
                <div className="col mb-4" key={i}>
                  <div className="card h-100">
                    <div className="row">
                      <div className="col-5">
                        <img src={`/api/products/photo/${product.product._id}`} className="card-img-top" alt="..." />
                      </div>
                      <div className="col-6 ml-auto">
                        <div className="card-body">
                          <h5 className="card-title">{product.product.name}</h5>
                          <p className="card-text">$ {product.product.price}</p>
                          <p className="card-text">Quantity: {product.quantity}</p>
                          <AmountForm title="Edit Amount" product={product.product}></AmountForm>
                          <a
                            className="btn btn-outline-danger mt-2 mb-2 card-btn-1"
                            onClick={() => {
                              removeFromCart(product);
                            }}
                          >
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md col-xl-5 ml-auto">
            <h2>Checkout </h2>
            <h5>Your total price is ${subtotal.toFixed(2)}</h5>
            {showCheckout()}
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propType = {
  getProducts: PropTypes.func.isRequired,
  getFilteredProducts: PropTypes.func.isRequired,
  getSearchProducts: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
  getBraintreeClientToken: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  cartProducts: state.auth.cartProducts,
  message: state.auth.message,
  token: state.auth.token,
  userID: state.auth.user._id,
  braintreeToken: state.auth.braintreeToken,
});

export default connect(mapStateToProps, { getProducts, getFilteredProducts, getSearchProducts, removeFromCart, emptyCart, resetMessages, getBraintreeClientToken, loadUser })(Cart);
