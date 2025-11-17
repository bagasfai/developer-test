import { useState } from "react";
import { usePaymentStore } from "../../stores/paymentStore";

export default function PaymentForm({
 initialSaleId,
 compact = false,
 onSuccess,
}) {
 const addPayment = usePaymentStore((s) => s.addPayment);

 const [form, setForm] = useState({
  sale_id: initialSaleId ?? "",
  amount: "",
  payment_date: "",
  note: "",
 });

 const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   await addPayment(form);
   alert("Payment added!");

   setForm({
    sale_id: initialSaleId ?? "",
    amount: "",
    payment_date: "",
    note: "",
   });

   if (onSuccess) onSuccess();
  } catch (err) {
   alert(err.response?.data?.message || "Failed to add payment");
  }
 };

 return (
  <form onSubmit={handleSubmit}>
   {!compact && (
    <input
     type="number"
     name="sale_id"
     placeholder="Sale ID"
     value={form.sale_id}
     onChange={handleChange}
     className="w-full mb-2 p-2 border rounded bg-gray-50 dark:bg-gray-700"
     required
    />
   )}

   <input
    type="number"
    name="amount"
    placeholder="Amount"
    value={form.amount}
    onChange={handleChange}
    className="w-full mb-2 p-2 border rounded bg-gray-50 dark:bg-gray-700"
    required
   />

   <input
    type="date"
    name="payment_date"
    value={form.payment_date}
    onChange={handleChange}
    className="w-full mb-2 p-2 border rounded bg-gray-50 dark:bg-gray-700"
    required
   />

   <textarea
    name="note"
    placeholder="Note"
    value={form.note}
    onChange={handleChange}
    className="w-full mb-2 p-2 border rounded bg-gray-50 dark:bg-gray-700"
   />

   <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
    Save Payment
   </button>
  </form>
 );
}
