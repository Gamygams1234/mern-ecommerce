import axios from "axios";
import { authenticate } from "../../src/utils/setAuthToken";
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL } from "./types";

export const signup = ({ name, email, password }) => (dispatch) => {
  var postData = JSON.stringify({ name, email, password });
  console.log(postData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post("http://localhost:8000/api/signup", postData, config)
    .then((res) => {
      authenticate(res.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
      });
    })

    .catch((error) => {
      dispatch({
        type: REGISTER_FAIL,
        payload: "This email already exists",
      });
    });
};

export const login = ({ email, password }) => (dispatch) => {
  var postData = JSON.stringify({ email, password });
  console.log(postData);
  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  axios
    .post("http://localhost:8000/api/signin", postData, config)
    .then((res) => {
      authenticate(res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
      });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
