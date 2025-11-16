import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CustomerDetails from "../pages/CustomerDetails";
import CreatePayments from "../pages/CreatePayments";

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-payments" element={<CreatePayments />} />
        <Route path="/customer-details/:email" element={<CustomerDetails />} />
        <Route path="*" element={<h2>404 | Page Not Found</h2>} />
    </Routes>
  );
}

export default AppRoutes;