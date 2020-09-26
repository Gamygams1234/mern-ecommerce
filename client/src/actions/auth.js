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
    .post("/api/signin", postData, config)
    .then((res) => {
      authenticate(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

export const logout = () => (dispatch) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
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
