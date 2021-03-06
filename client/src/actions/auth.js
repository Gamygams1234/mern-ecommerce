import axios from "axios";
import { authenticate } from "../../src/utils/setAuthToken";
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, ADD_TO_CART, REMOVE_FROM_CART, USER_LOADED, CART_LOADED, EMPTY_CART, RESET_MESSAGES, INVALID_CREDENTIALS, GET_BRAINTREE_CLIENT_TOKEN, SEND_ERROR, GET_ALL_ORDERS } from "./types";

export const loadUser = () => (dispatch) => {
  if (localStorage.getItem("jwtUser")) {
    let user = localStorage.getItem("jwtUser");
    user = JSON.parse(user);
    dispatch({
      type: USER_LOADED,
      payload: { user: user },
    });
  }
};
export const signup = ({ name, email, password }) => (dispatch) => {
  var postData = JSON.stringify({ name, email, password });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post("/api/signup", postData, config)
    .then((res) => {
      authenticate(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((error) => {
      dispatch({
        type: INVALID_CREDENTIALS,
        payload: "This email already exists",
      });
    });
};

export const login = ({ email, password }) => (dispatch) => {
  var postData = JSON.stringify({ email, password });

  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  axios
    .post("/api/signin", postData, config)
    .then((res) => {
      authenticate(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((error) => {
      window.scrollTo(0, 0);
      dispatch({
        type: INVALID_CREDENTIALS,
        payload: "Invalid Credentials. Try Again.",
      });
    });
};

export const logout = () => (dispatch) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtUser");
    localStorage.removeItem("cart");
  }

  axios
    .get("/api/signout")
    .then((res) => {
      dispatch({
        type: LOGOUT,
      });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

export const addToCart = (product, quantity = 1) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: { product: product, quantity: quantity },
  });
};

export const loadCart = () => (dispatch) => {
  if (localStorage.getItem("cart")) {
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);

    dispatch({
      type: CART_LOADED,
      payload: { cart: cart },
    });
  }
};

export const removeFromCart = (product) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: product,
  });
};

export const emptyCart = () => (dispatch) => {
  localStorage.removeItem("cart");
  dispatch({
    type: EMPTY_CART,
  });
};

export const resetMessages = () => (dispatch) => {
  dispatch({
    type: RESET_MESSAGES,
  });
};

export const getBraintreeClientToken = (userID, token) => (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .get(`/api/braintree/getToken/${userID}`, config)
    .then((res) => {
      dispatch({
        type: GET_BRAINTREE_CLIENT_TOKEN,
        payload: res.data.clientToken,
      });
    })
    .catch((err) => {
      dispatch({
        type: SEND_ERROR,
        payload: "There is an error processing the request.",
      });
    });
};

export const getAllOrders = (userId, token) => (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .get(`/api/order/list/${userId}`, config)
    .then((res) => {
      dispatch({
        type: GET_ALL_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {});
};
