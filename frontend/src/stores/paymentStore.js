import { create } from "zustand";
import {
 getPayments,
 createPayment,
 deletePayment,
 getPaymentHistory,
} from "../api/paymentsApi";

export const usePaymentStore = create((set) => ({
 payments: [],
 history: null,

 fetchPayments: async () => {
  const res = await getPayments();
  set({ payments: res.data });
 },

 fetchPaymentHistory: async (saleId) => {
  const res = await getPaymentHistory(saleId);
  set({ history: res.data });
 },

 addPayment: async (data) => {
  await createPayment(data);
  const res = await getPayments();
  set({ payments: res.data });
 },

 removePayment: async (id) => {
  await deletePayment(id);
  const res = await getPayments();
  set({ payments: res.data });
 },
}));
