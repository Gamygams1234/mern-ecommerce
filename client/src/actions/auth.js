import axios from "axios";
import { REGISTER_SUCCESS } from "./types";

export const signup = ({ name, email, password }) => (dispatch) => {
  var postData = JSON.stringify({ name, email, password });
  console.log(postData);
  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  axios
    .post("http://localhost:8000/api/signup", postData, config)
    .then((response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};
