import { create } from "zustand";
import {
 getMarketings,
 createMarketing,
 updateMarketing,
 deleteMarketing,
} from "../api/marketingApi";

export const useMarketingStore = create((set, get) => ({
 list: [],
 loading: false,

 fetchMarketing: async () => {
  set({ loading: true });
  const res = await getMarketings();
  set({ list: res.data, loading: false });
 },

 createMarketing: async (data) => {
  await createMarketing(data);
  get().fetchMarketing();
 },

 updateMarketing: async (id, data) => {
  await updateMarketing(id, data);
  get().fetchMarketing();
 },

 removeMarketing: async (id) => {
  await deleteMarketing(id);
  get().fetchMarketing();
 },
}));
