import { create } from "zustand";
import * as salesApi from "../api/salesApi";

export const useSalesStore = create((set) => ({
 sales: [],
 loading: false,

 fetchSales: async () => {
  set({ loading: true });
  const res = await salesApi.getSales();
  set({ sales: res.data, loading: false });
 },

 addSale: async (data) => {
  await salesApi.createSale(data);
  set((state) => state.fetchSales());
 },

 updateSale: async (id, data) => {
  await salesApi.updateSale(id, data);
  set((state) => state.fetchSales());
 },

 deleteSale: async (id) => {
  await salesApi.deleteSale(id);
  set((state) => state.fetchSales());
 },
}));
