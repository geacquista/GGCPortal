import http from "../http-common";

const getAll = () => {
  return http.get("/orderline");
};

const get = id => {
  return http.get(`/orderline/${id}`);
};

const create = data => {
  return http.post("/orderline", data);
};

const update = (id, data) => {
  return http.put(`/orderline/${id}`, data);
};

const remove = id => {
  return http.delete(`/orderline/${id}`);
};

const removeAll = () => {
  return http.delete(`/orderline`);
};

const findByOrder = orderID => {
  return http.get(`/orderline?orderID=${orderID}`)
};


const OrderLineDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByOrder
};

export default OrderLineDataService;