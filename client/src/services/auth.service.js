import http from "../http-common";

const register = (username, email, password) => {
  return http.post("/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return http
    .post("/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
