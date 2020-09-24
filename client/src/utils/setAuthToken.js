export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", data.token);
  }
};
