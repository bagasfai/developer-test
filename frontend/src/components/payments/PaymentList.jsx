import { useEffect } from "react";
import { usePaymentStore } from "../../stores/paymentStore";

export default function PaymentList() {
 const { payments, fetchPayments, removePayment } = usePaymentStore();
 useEffect(() => {
  fetchPayments();
 }, []);

 return (
  <div className="mt-6 p-4 bg-white dark:bg-gray-800 shadow rounded">
   <h2 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
    Payments List
   </h2>

   <table className="w-full text-left">
    <thead>
     <tr className="text-gray-600 dark:text-gray-300 border-b">
      <th className="p-2">ID</th>
      <th className="p-2">Transaction Number</th>
      <th className="p-2">Amount</th>
      <th className="p-2">Date</th>
      <th className="p-2">Note</th>
      <th className="p-2">Action</th>
     </tr>
    </thead>

    <tbody>
     {payments.length === 0 && (
      <tr>
       <td colSpan="5" className="text-center py-3 text-gray-500">
        No payments yet.
       </td>
      </tr>
     )}

     {payments.length > 0 &&
      payments.map((p) => (
       <tr key={p.id} className="border-t text-gray-800 dark:text-gray-200">
        <td className="p-2">{p.id}</td>
        <td className="p-2">{p.sale.transaction_number}</td>
        <td className="p-2">Rp. {Number(p.amount).toLocaleString("id-ID")}</td>
        <td className="p-2">{p.payment_date}</td>
        <td className="p-2">{p.note}</td>
        <td className="p-2">
         <button
          onClick={() => removePayment(p.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
         >
          Delete
         </button>
        </td>
       </tr>
      ))}
    </tbody>
   </table>
  </div>
 );
}
