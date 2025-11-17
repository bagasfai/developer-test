import { create } from "zustand";
import { getCommissionDashboard } from "../api/commissionApi";

export const useCommissionStore = create((set) => ({
 data: [],
 loading: false,

 fetchDashboard: async (year) => {
  set({ loading: true });
  const res = await getCommissionDashboard(year);
  set({ data: res.data, loading: false });
 },
}));
