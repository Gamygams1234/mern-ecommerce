import { GET_PRODUCTS, GET_NEW_PRODUCTS } from "../actions/types";

const initialState = {
  products: [],
  newProducts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, ...payload, products: payload };
    case GET_NEW_PRODUCTS:
      return { ...state, ...payload, newProducts: payload };
    default:
      return state;
  }
}
