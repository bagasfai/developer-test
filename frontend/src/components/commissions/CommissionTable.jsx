export default function CommissionTable({ data }) {
 if (!data || data.length === 0) {
  return (
   <div className="p-6 text-center border rounded bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
    <p className="text-gray-700 dark:text-gray-300">Tidak ada data komisi.</p>
   </div>
  );
 }
 return (
  <div className="overflow-x-auto mt-6">
   <table className="min-w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <thead>
     <tr className="bg-gray-100 dark:bg-gray-700 text-left">
      <th className="p-2 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Marketing
      </th>
      {data[0]?.monthly?.map((m) => (
       <th
        key={m.month}
        className="p-2 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
       >
        {m.month}
       </th>
      ))}
     </tr>
    </thead>

    <tbody>
     {data.map((mkt) => (
      <tr
       key={mkt.marketing_id}
       className="hover:bg-gray-50 dark:hover:bg-gray-700"
      >
       <td className="p-2 border border-gray-200 dark:border-gray-600 font-semibold text-gray-900 dark:text-gray-100">
        {mkt.marketing_name}
       </td>

       {mkt.monthly.map((m) => (
        <td
         key={m.month}
         className="p-2 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200"
        >
         <div>Omset: Rp. {Number(m.omset).toLocaleString("id-ID")}</div>
         <div>
          Komisi: Rp. {Number(m.commission_amount).toLocaleString("id-ID")}
         </div>
        </td>
       ))}
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
}
