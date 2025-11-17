import { BrowserRouter, Routes, Route } from "react-router";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import MarketingPage from "./pages/MarketingPage";
import SalesPage from "./pages/SalesPage";
import PaymentPage from "./pages/PaymentPage";
import CommissionPage from "./pages/CommissionPage";

export default function App() {
 return (
  <BrowserRouter>
   <div className="flex">
    <Sidebar />

    <main className="flex-1">
     {/* <Navbar /> */}

     <div className="p-6">
      <Routes>
       <Route path="/commission" element={<CommissionPage />} />
       <Route path="/marketing" element={<MarketingPage />} />
       <Route path="/sales" element={<SalesPage />} />
       <Route path="/payments" element={<PaymentPage />} />
      </Routes>
     </div>
    </main>
   </div>
  </BrowserRouter>
 );
}
