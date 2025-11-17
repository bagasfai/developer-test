import { useEffect } from "react";
import { usePaymentStore } from "../../stores/paymentStore";

export default function PaymentHistory({ saleId }) {
 const { history, fetchPaymentHistory } = usePaymentStore();

 useEffect(() => {
  if (saleId) fetchPaymentHistory(saleId);
 }, [saleId]);

 if (!history) return <p className="text-gray-500">Select a sale...</p>;

 const { sale, total_paid, remaining, status, payments } = history;

 return (
  <div className="mt-6 p-4 bg-white dark:bg-gray-800 shadow rounded">
   <h2 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
    Payment History — Sale #{sale.id}
   </h2>

   <p className="text-gray-700 dark:text-gray-300">
    Grand Total: {sale.grand_total.toLocaleString()}
   </p>
   <p className="text-gray-700 dark:text-gray-300">
    Paid: {total_paid.toLocaleString()}
   </p>
   <p className="text-gray-700 dark:text-gray-300">
    Remaining: {remaining.toLocaleString()}
   </p>
   <p className="font-bold text-blue-600 dark:text-blue-300 mt-2">
    Status: {status}
   </p>

   <h3 className="font-semibold mt-4 text-gray-900 dark:text-white">
    Payments:
   </h3>

   {payments.length === 0 ? (
    <p className="text-gray-500">No payments yet.</p>
   ) : (
    <ul className="mt-2">
     {payments.map((p) => (
      <li key={p.id} className="border-b py-1 text-gray-700 dark:text-gray-300">
       {p.payment_date} — {p.amount.toLocaleString()} ({p.note ?? "no note"})
      </li>
     ))}
    </ul>
   )}
  </div>
 );
}
