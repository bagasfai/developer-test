import React, { useEffect, useState } from "react";
import { useMarketingStore } from "../stores/marketingStore";
import MarketingList from "../components/marketing/MarketingList";
import MarketingForm from "../components/marketing/MarketingForm";

export default function MarketingPage() {
 const {
  list,
  fetchMarketing,
  createMarketing,
  updateMarketing,
  removeMarketing,
  loading,
 } = useMarketingStore();
 const [editing, setEditing] = useState(null);

 useEffect(() => {
  fetchMarketing();
 }, []);

 const handleSubmit = async (data) => {
  if (editing) {
   try {
    await updateMarketing(editing.id, data);
    setEditing(null);
   } catch (err) {
    alert(err.response?.data?.message || "Failed to add marketing");
   }
  } else {
   try {
    await createMarketing(data);
   } catch (err) {
    alert(err.response?.data?.message || "Failed to create marketing");
   }
  }
 };

 return (
  <div className="p-6">
   <h1 className="text-2xl font-bold">Marketing</h1>

   <MarketingForm onSubmit={handleSubmit} editing={editing} />

   {loading ? (
    <p className="mt-4">Loading...</p>
   ) : (
    <MarketingList
     data={list}
     onEdit={(m) => setEditing(m)}
     onDelete={(id) => removeMarketing(id)}
    />
   )}
  </div>
 );
}
