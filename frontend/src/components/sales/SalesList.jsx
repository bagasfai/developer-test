import { useState } from "react";
import PaymentModal from "../payments/PaymentModal";

export default function SalesList({ sales, onEdit, onDelete }) {
 const [selectedSaleId, setSelectedSaleId] = useState(null);
 const [openPaymentModal, setOpenPaymentModal] = useState(false);

 return (
  <>
   <table className="w-full mt-4 border border-gray-300 dark:border-gray-600">
    <thead>
     <tr className="bg-gray-100 dark:bg-gray-800">
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       ID
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Transaction Number
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Marketing
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Date
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Cargo Fee
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Total Balance
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Grand Total
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Status
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Actions
      </th>
     </tr>
    </thead>
    <tbody>
     {sales.length > 0 &&
      sales.map((sale) => (
       <tr
        key={sale.id}
        className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
       >
        <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
         {sale.id}
        </td>
        <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
         {sale.transaction_number}
        </td>
        <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
         {sale.marketing?.name}
        </td>
        <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
         {sale.date}
        </td>
        <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
         Rp. {Number(sale.cargo_fee).toLocaleString("id-ID")}
        </td>
        <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
         Rp. {Number(sale.total_balance).toLocaleString("id-ID")}
        </td>
        <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
         Rp. {Number(sale.grand_total).toLocaleString("id-ID")}
        </td>
        <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
         {sale.status}
        </td>
        <td className="p-2 border border-gray-300 dark:border-gray-600 flex gap-2">
         <button
          onClick={() => {
           setSelectedSaleId(sale.id);
           setOpenPaymentModal(true);
          }}
          className="px-2 py-1 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded"
         >
          Payments
         </button>
         <button
          onClick={() => onEdit(sale)}
          className="px-2 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded"
         >
          Edit
         </button>
         <button
          onClick={() => onDelete(sale.id)}
          className="px-2 py-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded"
         >
          Delete
         </button>
        </td>
       </tr>
      ))}
    </tbody>
   </table>

   {openPaymentModal && (
    <PaymentModal
     saleId={selectedSaleId}
     isOpen={openPaymentModal}
     onClose={() => setOpenPaymentModal(false)}
    />
   )}
  </>
 );
}
