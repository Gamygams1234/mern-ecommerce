import { REGISTER_SUCCESS } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, isAuthenticated: true, loading: false };
    default:
      return state;
  }
}
