import http from "../http-common";

const getAll = () => {
  return http.get("/products");
};

const get = id => {
  return http.get(`/products/${id}`);
};

const create = data => {
  return http.post("/products", data);
};

const update = (id, data) => {
  return http.put(`/products/${id}`, data);
};

const remove = id => {
  return http.delete(`/products/${id}`);
};

const removeAll = () => {
  return http.delete(`/products`);
};

const findByName = name => {
  return http.get(`/products?name=${name}`);
};

const findBySKU = sku => {
  return http.get(`/orders?sku=${sku}`);
};

const ProductDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  findBySKU
};

export default ProductDataService;