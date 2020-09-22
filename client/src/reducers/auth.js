import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL } from "../actions/types";

const initialState = {
  token: localStorage.getItem("jwt"),
  isAuthenticated: false,
  user: null,
  serverError: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      //localStorage.setItem("token", payload.token);
      return { ...state, ...payload, user: payload, isAuthenticated: true, loading: false };
    case LOGOUT:
      return { ...state, isAuthenticated: false, loading: false };
    case REGISTER_FAIL:
      return { ...state, ...payload, user: payload, isAuthenticated: false, serverError: payload };
    default:
      return state;
  }
}
