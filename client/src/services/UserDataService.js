import http from "../http-common";

const getAll = () => {
  return http.get("/users");
};

const get = id => {
  return http.get(`/users/${id}`);
};

const create = data => {
  return http.post("/users", data);
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

// const getPublicLogin = () => {
//   return http.get("/board/all");
// };

// const getGGCUserBoard = () => {
//   return http.get("/board/ggc");
//   // return http.get("/board/ggc", { headers: authHeader() });
// };

// const getFarmUserBoard = () => {
//   return http.get("/board/farm");
// };

// const getAdminBoard = () => {
//   return http.get("/board/admin");
// };



const UserDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default UserDataService;