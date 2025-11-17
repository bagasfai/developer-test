import { useEffect } from "react";
import { usePaymentStore } from "../../stores/paymentStore";
import PaymentForm from "./PaymentForm";

export default function PaymentModal({ saleId, isOpen, onClose }) {
 const { history, fetchPaymentHistory } = usePaymentStore();

 useEffect(() => {
  if (saleId && isOpen) fetchPaymentHistory(saleId);
 }, [saleId, isOpen]);

 if (!isOpen) return null;

 const sale = history?.sale;
 const payments = history?.payments ?? [];
 const totalPaid = history?.total_paid ?? 0;
 const remaining = history?.remaining ?? 0;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-white dark:bg-gray-800 w-[500px] rounded shadow-lg p-6 relative">
    <button
     className="absolute top-2 right-2 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
     onClick={onClose}
    >
     ✕
    </button>

    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
     Payment Details ({sale ? sale.transaction_number : "..."})
    </h2>

    {sale ? (
     <div className="mb-4 text-gray-700 dark:text-gray-300">
      <p>
       {" "}
       Grand Total: Rp. {Number(sale.grand_total).toLocaleString("id-ID")}
      </p>
      <p>Paid: Rp. {Number(totalPaid).toLocaleString("id-ID")}</p>
      <p>Remaining: Rp. {Number(remaining).toLocaleString("id-ID")}</p>
      <p className="font-semibold text-blue-600 mt-1">Status: {sale.status}</p>
     </div>
    ) : (
     <p className="text-gray-500">Loading...</p>
    )}

    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">
     Payments:
    </h3>

    <div className="max-h-40 overflow-y-auto border rounded p-2 bg-gray-50 dark:bg-gray-700">
     {payments.length === 0 ? (
      <p className="text-gray-500">No payments yet.</p>
     ) : (
      payments.map((p) => (
       <div
        key={p.id}
        className="border-b border-gray-300 dark:border-gray-600 py-1 text-gray-800 dark:text-gray-200"
       >
        <p>
         <strong>Rp. {Number(p.amount).toLocaleString("id-ID")}</strong> —{" "}
         {p.payment_date}
        </p>
        {p.note && (
         <p className="text-xs text-gray-600 dark:text-gray-400">
          Notes: {p.note}
         </p>
        )}
       </div>
      ))
     )}
    </div>

    <h3 className="font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
     Add Payment
    </h3>

    <PaymentForm
     initialSaleId={saleId}
     compact
     onSuccess={() => fetchPaymentHistory(saleId)}
    />
   </div>
  </div>
 );
}
