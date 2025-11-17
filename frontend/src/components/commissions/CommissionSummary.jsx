export default function CommissionSummary({ data }) {
 if (!data || data.length === 0) {
  return (
   <div className="p-6 text-center border rounded bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 shadow-sm">
    <p className="text-gray-600 dark:text-gray-400">Tidak ada data komisi.</p>
   </div>
  );
 }

 return (
  <div className="grid grid-cols-3 gap-4 mt-4">
   {data.map((mkt) => (
    <div
     key={mkt.marketing_id}
     className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow duration-200"
    >
     <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
      {mkt.marketing_name}
     </h2>
     <p className="text-gray-600 dark:text-gray-300 mb-1">
      Total Omset: Rp. {Number(mkt.summary.total_omset).toLocaleString("id-ID")}
     </p>
     <p className="text-gray-600 dark:text-gray-300">
      Total Komisi: Rp.{" "}
      {Number(mkt.summary.total_commission).toLocaleString("id-ID")}
     </p>
    </div>
   ))}
  </div>
 );
}
