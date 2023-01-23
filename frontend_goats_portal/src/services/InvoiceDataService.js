import http from "../http-common";

const getAll = () => {
  return http.get("/invoices");
};

const get = id => {
  return http.get(`/invoices/${id}`);
};

const create = data => {
  return http.post("/invoices", data);
};

const update = (id, data) => {
  return http.put(`/invoices/${id}`, data);
};

const remove = id => {
  return http.delete(`/invoices/${id}`);
};

const removeAll = () => {
  return http.delete(`/invoices`);
};


const InvoiceDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default InvoiceDataService;