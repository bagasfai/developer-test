export default function MarketingList({ data, onEdit, onDelete }) {
 return (
  <div className="mt-4">
   <table className="min-w-full border border-gray-300 dark:border-gray-600">
    <thead>
     <tr className="bg-gray-100 dark:bg-gray-800 text-left">
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       ID
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Name
      </th>
      <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
       Action
      </th>
     </tr>
    </thead>
    <tbody>
     {data.map((m) => (
      <tr key={m.id} className="bg-white dark:bg-gray-900">
       <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
        {m.id}
       </td>
       <td className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
        {m.name}
       </td>
       <td className="p-2 border border-gray-300 dark:border-gray-600 space-x-2">
        <button
         className="px-2 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded"
         onClick={() => onEdit(m)}
        >
         Edit
        </button>

        <button
         className="px-2 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded"
         onClick={() => onDelete(m.id)}
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
