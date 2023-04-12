import http from "../http-common";

const login = (email, password) => {
  return http
    .post("/signin", {
      email,
      password,
    })
    .then((response) => {
      console.log(response)
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }

      return response.data;
    });
};

const logout = () => {
  console.log("logging out")
  // localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
