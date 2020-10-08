import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, ADD_TO_CART, REMOVE_FROM_CART, USER_LOADED, CART_LOADED, EMPTY_CART, RESET_MESSAGES, INVALID_CREDENTIALS, GET_BRAINTREE_CLIENT_TOKEN, SEND_ERROR } from "../actions/types";

const initialState = {
  token: "",
  isAuthenticated: false,
  user: {},
  cartProducts: [],
  message: "",
  error: "",
  braintreeToken: "",
  address: "",
  instance: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, user: payload, token: localStorage.getItem("jwtToken"), isAuthenticated: true, loading: false };
    case GET_BRAINTREE_CLIENT_TOKEN:
      return { ...state, braintreeToken: payload };
    case LOGOUT:
      return { ...state, isAuthenticated: false, braintreeToken: "", cartProducts: [], user: {}, token: "", loading: false };
    case USER_LOADED:
      return { ...state, user: payload.user, token: localStorage.getItem("jwtToken"), isAuthenticated: true, loading: false };
    case CART_LOADED:
      return { ...state, cartProducts: payload.cart };
    case EMPTY_CART:
      return { ...state, cartProducts: [], message: "Your cart has been emptied." };
    case RESET_MESSAGES:
      return { ...state, message: "", error: "" };
    case INVALID_CREDENTIALS:
      return { ...state, error: payload };
    case SEND_ERROR:
      return { ...state, error: payload };
    case ADD_TO_CART:
      var exists = false;
      const quantity = action.payload.quantity;
      const newCP = action.payload.product;
      var cartProducts = [];
      state.cartProducts.map((cartProduct) => {
        if (cartProduct.product._id == newCP._id) {
          exists = true;
          cartProduct.quantity = quantity;
        }
        cartProducts.push(cartProduct);
      });
      if (exists == false) {
        cartProducts.push({
          _id: state.cartProducts.length + 1,
          product: newCP,
          quantity: quantity,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      return {
        ...state,
        cartProducts: cartProducts,
        message: `${newCP.name} has been added to your cart.`,
      };
    case REMOVE_FROM_CART:
      var cartProducts = localStorage.getItem("cart");
      cartProducts = JSON.parse(cartProducts);
      cartProducts = cartProducts.filter((product) => product._id !== payload._id);
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      return {
        ...state,
        cartProducts: cartProducts,
        message: `${payload.product.name} has been removed from the cart.`,
      };
    default:
      return state;
  }
}
