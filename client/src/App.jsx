import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import SignupAndLogin from "./pages/SignupAndLogin";

function AppContent() {
  const location = useLocation();

  // Paths where we hide Sidebar & Topbar
  const hideNavPaths = ["/register", "/login"];
  const hideNav = hideNavPaths.includes(location.pathname);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <ToastContainer/>
      {!hideNav && (
        <div className="hidden md:block fixed top-0 left-0 h-full md:w-60 md:bg-white border-r border-gray-200">
          <Sidebar />
        </div>
      )}

      {/* Main content area */}
      <div className={`flex flex-col flex-1 ${!hideNav ? "md:ml-60" : ""}`}>
        {/* Topbar */}
        {!hideNav && (
          <div className="sticky top-0 z-50 h-28 sm:h-16 bg-[#eef0fc] flex items-center">
            <Topbar />
          </div>
        )}

        {/* Page content */}
        <div className={`flex-1 overflow-y-auto ${!hideNav ? "p-6 bg-[#eef0fc]" : ""}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<SignupAndLogin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
