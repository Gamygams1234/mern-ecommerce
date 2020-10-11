import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

    paymentError: "",
    loading: false,
    success: false,
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const onChange = (e) => setDeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: message ? "" : "none" }}>
      {message}
    </div>
  );
  const showPaymentSuccess = (success) => (
    <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
      Thanks! Your payment was successful!
    </div>
  );
  const showError = (error) => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const createOrder = (userId, token, createOrderData) => {
    createOrderData = JSON.stringify(createOrderData);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`/api/order/create/${userId}`, createOrderData, config)
      .then((response) => {})
      .catch((err) => console.log(err.message));
  };

  const buy = () => {
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: subtotal.toFixed(2),
        };

        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .post(`/api/braintree/payment/${userID}`, paymentData, config)
          .then((response) => {
            const createOrderData = {
              user: userID,
              products: cartProducts,
              transaction_id: response.data.transaction.id,
              amount: response.data.transaction.amount,
              address: deliveryAddress,
            };

            setData({ loading: false, success: true });
            emptyCart();

            return createOrderData;
          })
          .then((res) => {
            createOrder(userID, token, res);
          })
          .catch((err) => {
            console.log(err.message);
            setData({ ...data, paymentError: err.message });
          });
      })
      .catch((error) => {
        setData({ ...data, paymentError: error.message });
      });
  };
  const showDropIn = () => {
    return cartProducts.length > 0 ? (
      <div onBlur={() => setData({ ...data, paymentError: "" })}>
        <div className="form-group">
          <label>Address</label>
          <input value={deliveryAddress.address1} name="address1" onChange={(e) => onChange(e)} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="form-group">
          <label>Address 2</label>
          <input value={deliveryAddress.address2} name="address2" onChange={(e) => onChange(e)} type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label>City</label>
            <input value={deliveryAddress.city} name="city" onChange={(e) => onChange(e)} type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label>State</label>
            <input value={deliveryAddress.state} name="state" onChange={(e) => onChange(e)} type="text" className="form-control" id="inputState" />
          </div>
          <div className="form-group col-md-3">
            <label>Zip</label>
            <input value={deliveryAddress.zip} name="zip" type="text" onChange={(e) => onChange(e)} className="form-control" id="inputZip" />
          </div>
        </div>
        <DropIn options={{ authorization: braintreeToken }} onInstance={(instance) => (data.instance = instance)} />
        <button
          onClick={() => {
            buy();
          }}
          className="btn btn-success btn-block"
        >
          Checkout
        </button>
      </div>
    ) : null;
  };

  const showCheckout = () => {
    return isAuthenticated ? (
      braintreeToken ? (
        <div>{showDropIn()}</div>
      ) : null
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
      let jwtToken = localStorage.getItem("jwtToken");
      getBraintreeClientToken(user._id, jwtToken);
    }

    resetMessages();
  }, []);

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
          <div className="col-md col-xl-5">
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
            {showError(data.paymentError)}
            {showPaymentSuccess(data.success)}
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
