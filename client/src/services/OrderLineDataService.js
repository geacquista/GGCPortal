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

const remove = (id) => {
  console.log('reemove id: ', id)
  return http.delete(`/orderline/${id.lineOrderID}/${id.lineProductID}`);
};

const removeAll = () => {
  return http.delete(`/orderline`);
};



const OrderLineDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default OrderLineDataService;