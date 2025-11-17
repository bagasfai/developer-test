import axios from "axios";

const API = axios.create({
 baseURL: "http://localhost:8000/api",
});

export const getMarketings = () => API.get("/marketings");
export const createMarketing = (data) => API.post("/marketings", data);
export const updateMarketing = (id, data) => API.put(`/marketings/${id}`, data);
export const deleteMarketing = (id) => API.delete(`/marketings/${id}`);
