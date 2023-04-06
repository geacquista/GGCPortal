import authHeader from "./auth-header";
import http from "../http-common";


const getPublicContent = () => {
  return http.get("/all");
};

const getUserBoard = () => {
  return http.get("/ggc", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return http.get("/farm", { headers: authHeader() });
};

const getAdminBoard = () => {
  return http.get("/admin", { headers: authHeader() });
};



const PermissionUserService = {
  getPublicLogin: getPublicContent,
  getGGCUserBoard: getUserBoard,
  getFarmUserBoard: getModeratorBoard,
  getAdminBoard,
};

export default PermissionUserService;