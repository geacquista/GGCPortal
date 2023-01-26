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

const getAllPaid = isPaid => {
  return http.get(`/invoices?paid=${isPaid}`);
};

const findByInvoice = invoiceNumber => {
  return http.get(`/invoices?invoiceNumber=${invoiceNumber}`);
};


const InvoiceDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getAllPaid,
  findByInvoice
};

export default InvoiceDataService;


// export const selectActiveInvoices = (state) => state.quickstats.activeInvoices;		// Active invoices
// export const selectMissingInvoices = (state) => state.quickstats.missingInvoices;	// Get missing invoices
// export const selectUnpaidInvoices = (state) => state.quickstats.unpaidInvoices;		// Get unpaid invoices