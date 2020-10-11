import { GET_PRODUCTS, GET_NEW_PRODUCTS, GET_ONE_PRODUCT, GET_RELATED_PRODUCTS, DELETE_PRODUCT } from "../actions/types";

const initialState = {
  products: [],
  newProducts: [],
  featuredProduct: {},
  relatedProducts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, products: payload };
    case GET_NEW_PRODUCTS:
      return { ...state, newProducts: payload };
    case GET_ONE_PRODUCT:
      return { ...state, featuredProduct: payload };
    case GET_RELATED_PRODUCTS:
      return { ...state, relatedProducts: payload };
    case DELETE_PRODUCT:
      return { ...state, products: state.products.filter((product) => product._id !== payload), featuredProduct: {} };
    default:
      return state;
  }
}
