import axios from "axios";

const API_URL = "http://localhost:8000/api/sales";

export const getSales = () => axios.get(API_URL);
export const createSale = (data) => axios.post(API_URL, data);
export const updateSale = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteSale = (id) => axios.delete(`${API_URL}/${id}`);
