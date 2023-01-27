import http from "../http-common";

const getAll = () => {
  return http.get("/shippingAddresses");
};

const get = id => {
  return http.get(`/shippingAddresses/${id}`);
};

const create = data => {
  return http.post("/shippingAddresses", data);
};

const update = (id, data) => {
  return http.put(`/shippingAddresses/${id}`, data);
};

const remove = id => {
  return http.delete(`/shippingAddresses/${id}`);
};

const removeAll = () => {
  return http.delete(`/shippingAddresses`);
};


const ShippingAddresseDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default ShippingAddresseDataService;