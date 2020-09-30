import { GET_PRODUCTS, GET_NEW_PRODUCTS, GET_ONE_PRODUCT } from "../actions/types";

const initialState = {
  products: [],
  newProducts: [],
  featuredProduct: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, ...payload, products: payload };
    case GET_NEW_PRODUCTS:
      return { ...state, ...payload, newProducts: payload };
    case GET_ONE_PRODUCT:
      return { ...state, ...payload, featuredProduct: payload };
    default:
      return state;
  }
}
