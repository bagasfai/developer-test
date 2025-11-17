import axios from "axios";

const API_URL = "http://localhost:8000/api/comissions-summary";

export const getCommissionDashboard = (year) =>
 axios.get(API_URL, { params: { year } });
