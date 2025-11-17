import { Link, useLocation } from "react-router";

export default function Sidebar() {
 const { pathname } = useLocation();

 const nav = [
  { to: "/marketing", label: "Marketing" },
  { to: "/sales", label: "Sales" },
  { to: "/commission", label: "Commission" },
  { to: "/payments", label: "Payments" },
 ];

 return (
  <aside className="w-64 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 min-h-screen p-4 border-r border-gray-700 dark:border-gray-600">
   <h2 className="text-xl font-bold mb-6 text-white dark:text-gray-100">
    Developer Test
   </h2>

   {nav.map((n) => (
    <Link
     key={n.to}
     to={n.to}
     className={`block px-3 py-2 rounded mb-1 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors ${
      pathname === n.to
       ? "bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-100"
       : "text-gray-300 dark:text-gray-200"
     }`}
    >
     {n.label}
    </Link>
   ))}
  </aside>
 );
}
