import React, { useState, useEffect } from "react";

export default function MarketingForm({ onSubmit, editing }) {
 const [name, setName] = useState("");

 useEffect(() => {
  if (editing) setName(editing.name);
 }, [editing]);

 const submit = (e) => {
  e.preventDefault();
  onSubmit({ name });
  setName("");
 };

 return (
  <form onSubmit={submit} className="space-y-2 mt-4">
   <input
    className="border border-gray-300 dark:border-gray-600 p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
    placeholder="Marketing name"
    value={name}
    onChange={(e) => setName(e.target.value)}
   />

   <button className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded transition-colors">
    {editing ? "Update" : "Create"}
   </button>
  </form>
 );
}
