import http from "../http-common";

const getAll = () => {
  return http.get("/orders");
};

const get = id => {
  return http.get(`/orders/${id}`);
};

const create = data => {
  return http.post("/orders", data);
};

const update = (id, data) => {
  return http.put(`/orders/${id}`, data);
};

const remove = id => {
  return http.delete(`/orders/${id}`);
};

const removeAll = () => {
  return http.delete(`/orders`);
};

const findByLast = lastName => {
  return http.get(`/orders?lastName=${lastName}`);
};

const findByReference = referenceNumber => {
  return http.get(`/orders?referenceNumber=${referenceNumber}`);
};

const findByInvoice = invoiceNumber => {
  return http.get(`/orders?invoiceNumber=${invoiceNumber}`);
};

const OrderService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByLast,
  findByReference,
  findByInvoice
};

export default OrderService;

// export const selectActiveOrders = (state) => state.quickstats.activeOrders; 		// Get active orders
// export const selectOrdersPlaced = (state) => state.quickstats.ordersPlaced;			// Get orders placed
// export const selectOrdersProcessed = (state) => state.quickstats.ordersProcessed;	// Get orders processed
// export const selectOrdersShipped = (state) => state.quickstats.ordersShipped;		// Get orders shipped
