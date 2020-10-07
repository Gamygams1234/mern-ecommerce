export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwtToken", data.token);
    localStorage.setItem("jwtUser", JSON.stringify(data.user));
  }
};
