import { useEffect, useState } from "react";
import { useSalesStore } from "../stores/salesStore";

import SalesList from "../components/sales/SalesList";
import SalesForm from "../components/sales/SalesForm";

export default function SalesPage() {
 const { sales, fetchSales, addSale, updateSale, deleteSale } = useSalesStore();
 const [editing, setEditing] = useState(null);

 useEffect(() => {
  fetchSales();
 }, []);

 const handleSubmit = async (data) => {
  if (editing) {
   try {
    await updateSale(editing.id, data);
    setEditing(null);
   } catch (err) {
    alert(err.response?.data?.message || "Failed to update sale");
   }
  } else {
   try {
    await addSale(data);
   } catch (err) {
    alert(err.response?.data?.message || "Failed to create sale");
   }
  }
 };

 return (
  <div className="p-6">
   <h1 className="text-xl font-bold mb-4">Sales Management</h1>

   <SalesForm initialData={editing} onSubmit={handleSubmit} />

   <SalesList sales={sales} onEdit={setEditing} onDelete={deleteSale} />
  </div>
 );
}
