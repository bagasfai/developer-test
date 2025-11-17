import { useEffect, useState } from "react";
import { useCommissionStore } from "../stores/commissionStore";

import CommissionSummary from "../components/commissions/CommissionSummary";
import CommissionTable from "../components/commissions/CommissionTable";

export default function CommissionPage() {
 const { data, fetchDashboard, loading } = useCommissionStore();
 const [year, setYear] = useState(new Date().getFullYear());
 useEffect(() => {
  fetchDashboard(year);
 }, [year]);

 return (
  <div className="p-6">
   <h1 className="text-xl font-bold mb-4">Dashboard Komisi</h1>

   <select
    className="border p-2 rounded"
    value={year}
    onChange={(e) => setYear(e.target.value)}
   >
    <option value="2024">2024</option>
    <option value="2025">2025</option>
   </select>

   {loading ? (
    <p className="mt-4">Loading...</p>
   ) : (
    <>
     <CommissionSummary data={data} />
     <CommissionTable data={data} />
    </>
   )}
  </div>
 );
}
