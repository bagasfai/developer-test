import PaymentList from "../components/payments/PaymentList";

export default function PaymentPage() {
 return (
  <div className="p-6">
   <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
    Payments Management
   </h1>

   <PaymentList />
  </div>
 );
}
