import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import SignupAndLogin from "./pages/SignupAndLogin";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./store/authSlice";
import { get30daysExpense, get30daysIncome, getExpense, getFullTransactions, getIncome, getLastMonthTransactions, getYearlyAnalytics } from "./store/TransactionSlice";
import Income from "./pages/Income";
import Expense from "./pages/Expense";

function AppContent() {

  const dispatch = useDispatch();
  const location = useLocation();

  const hideNavPaths = ["/register", "/login"];
  const hideNav = hideNavPaths.includes(location.pathname);

  useEffect(() => {
    dispatch(getExpense(1));
    dispatch(getYearlyAnalytics())
    dispatch(getIncome(1)); 
    dispatch(getLastMonthTransactions());
    dispatch(getMe()); 
    dispatch(get30daysExpense())
    dispatch(getFullTransactions()) 
    dispatch(get30daysIncome())
  }, [dispatch]);
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
          <div className="top-0 z-50 h-28 sm:h-16 bg-[#eef0fc] flex items-center">
            <Topbar />
          </div>
        )}

        {/* Page content */}
        <div className={`flex-1 overflow-y-auto ${!hideNav ? "p-6 bg-[#eef0fc]" : ""}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<SignupAndLogin />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
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
