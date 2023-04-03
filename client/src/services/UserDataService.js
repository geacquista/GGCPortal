import http from "../http-common";
import authHeader from "./auth-header";

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

const getPublicLogin = () => {
  return http.get("/allLogin");
};

const getGGCUserBoard = () => {
  return http.get("/GGCBoard", { headers: authHeader() });
};

const getFarmUserBoard = () => {
  return http.get("/FarmBoard", { headers: authHeader() });
};

const getAdminBoard = () => {
  return http.get("/AdminBoard", { headers: authHeader() });
};


const UserDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getPublicContent: getPublicLogin,
  getUserBoard: getGGCUserBoard,
  getModeratorBoard: getFarmUserBoard,
  getAdminBoard,
};

export default UserDataService;