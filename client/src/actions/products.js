import axios from "axios";
import { GET_PRODUCTS, GET_NEW_PRODUCTS, GET_ONE_PRODUCT, GET_RELATED_PRODUCTS } from "./types";

export const getProducts = (sortBy = "sold") => (dispatch) => {
  axios
    .get(`/api/products?limit=6&sortBy=${sortBy}&order=desc`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSearchProducts = (input) => (dispatch) => {
  const data = JSON.stringify(input);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(`/api/products/search`, data, config)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSingleProduct = (productId) => (dispatch) => {
  axios
    .get(`/api/products/${productId}`)
    .then((res) => {
      dispatch({
        type: GET_ONE_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFilteredProducts = (skip, limit, filters = {}) => (dispatch) => {
  const data = JSON.stringify({
    limit,
    skip,
    filters,
  });
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(`/api/products/by/search`, data, config)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getNewProducts = () => (dispatch) => {
  axios
    .get(`/api/products?limit=6&sortBy=createdAt&order=desc`)
    .then((res) => {
      dispatch({
        type: GET_NEW_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const productsByCategory = (categoryId = "5f5e9d9f474d737d28072286") => (dispatch) => {
  axios
    .get(`/api/category/${categoryId}`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllProducts = () => (dispatch) => {
  axios
    .get(`/api/products`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  axios
    .get(`/api/category/all`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRelatedProducts = (productId) => (dispatch) => {
  axios
    .get(`/api/products/related/${productId}`)
    .then((res) => {
      dispatch({
        type: GET_RELATED_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
