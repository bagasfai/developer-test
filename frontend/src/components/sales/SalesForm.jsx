import { useState, useEffect } from "react";
import { useMarketingStore } from "../../stores/marketingStore";

export default function SalesForm({ initialData, onSubmit }) {
 const [form, setForm] = useState({
  transaction_number: "",
  marketing_id: "",
  date: "",
  cargo_fee: "",
  total_balance: "",
 });

 const { list, fetchMarketing } = useMarketingStore();

 useEffect(() => {
  fetchMarketing();
 }, []);

 useEffect(() => {
  if (initialData) setForm(initialData);
 }, [initialData]);

 const handleChange = (e) => {
  setForm({
   ...form,
   [e.target.name]: e.target.value,
  });
 };

 const grandTotal =
  (Number(form.cargo_fee) || 0) + (Number(form.total_balance) || 0);

 return (
  <form
   onSubmit={(e) => {
    e.preventDefault();
    onSubmit({ ...form, grand_total: grandTotal });

    setForm({
     transaction_number: "",
     marketing_id: "",
     date: "",
     cargo_fee: "",
     total_balance: "",
    });
   }}
   className="border border-gray-300 dark:border-gray-700 p-4 rounded shadow bg-white dark:bg-gray-800"
  >
   <input
    type="text"
    name="transaction_number"
    placeholder="Transaction Number"
    value={form.transaction_number}
    onChange={handleChange}
    className="w-full mb-2 p-2 border rounded"
    required
   />

   <select
    name="marketing_id"
    value={form.marketing_id}
    onChange={handleChange}
    required
    className="w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700"
   >
    <option value="">-- Select Marketing --</option>
    {list.length > 0 &&
     list.map((m) => (
      <option key={m.id} value={m.id}>
       {m.name}
      </option>
     ))}
   </select>

   <input
    type="date"
    name="date"
    value={form.date}
    onChange={handleChange}
    className="w-full mb-2 p-2 border rounded"
    required
   />

   <input
    type="number"
    name="cargo_fee"
    placeholder="Cargo Fee"
    value={form.cargo_fee}
    onChange={handleChange}
    className="w-full mb-2 p-2 border rounded"
    required
   />

   <input
    type="number"
    name="total_balance"
    placeholder="Total Balance"
    value={form.total_balance}
    onChange={handleChange}
    className="w-full mb-2 p-2 border rounded"
    required
   />

   <input
    type="number"
    name="grand_total"
    placeholder="Grand Total"
    value={grandTotal}
    readOnly
    className="w-full mb-2 p-2 border rounded bg-gray-100 dark:bg-gray-700"
   />

   <button className="w-full bg-green-600 text-white py-2 rounded">
    {initialData ? "Update" : "Create"}
   </button>
  </form>
 );
}
