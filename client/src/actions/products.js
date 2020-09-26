import queryString from "query-string";
import axios from "axios";
import { GET_PRODUCTS, GET_NEW_PRODUCTS } from "./types";

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

export const getNewProducts = () => (dispatch) => {
  axios
    .get(`/api/products?limit=6&sortBy=date&order=desc`)
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
