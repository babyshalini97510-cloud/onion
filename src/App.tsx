import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp, UserRole } from './context/AppContext';
import Login from './pages/Login';

// Inventory Portal
import InventoryLayout from './pages/inventory/Layout';
import InventoryHome from './pages/inventory/Home';
import InventoryDashboard from './pages/inventory/Dashboard';
import FarmerInput from './pages/inventory/FarmerInput';
import Processing from './pages/inventory/Processing';
import InventoryStock from './pages/inventory/Inventory';

// Marketing Website
import MarketingLayout from './pages/marketing/Layout';
import MarketingHome from './pages/marketing/Home';
import Products from './pages/marketing/Products';
import Process from './pages/marketing/Process';
import Impact from './pages/marketing/Impact';
import About from './pages/marketing/About';
import Contact from './pages/marketing/Contact';
import Buy from './pages/marketing/Buy';
import SalesDashboard from './pages/marketing/SalesDashboard';

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole: UserRole }) => {
  const { role } = useApp();
  if (role !== allowedRole) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  const { role } = useApp();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Inventory Portal */}
      <Route path="/inventory/*" element={
        <ProtectedRoute allowedRole={UserRole.INVENTORY_MANAGER}>
          <InventoryLayout />
        </ProtectedRoute>
      }>
        <Route index element={<InventoryHome />} />
        <Route path="dashboard" element={<InventoryDashboard />} />
        <Route path="farmer-input" element={<FarmerInput />} />
        <Route path="processing" element={<Processing />} />
        <Route path="stock" element={<InventoryStock />} />
      </Route>

      {/* Marketing Website */}
      <Route path="/marketing/*" element={
        <ProtectedRoute allowedRole={UserRole.MARKETING_SALES}>
          <MarketingLayout />
        </ProtectedRoute>
      }>
        <Route index element={<MarketingHome />} />
        <Route path="products" element={<Products />} />
        <Route path="process" element={<Process />} />
        <Route path="impact" element={<Impact />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="buy" element={<Buy />} />
        <Route path="sales" element={<SalesDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}
