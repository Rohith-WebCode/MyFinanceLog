import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import SignupAndLogin from "./pages/SignupAndLogin";
import { useDispatch } from "react-redux";
import {
  get30daysExpense,
  get30daysIncome,
  getExpense,
  getFullTransactions,
  getIncome,
  getLastMonthTransactions,
  getYearlyAnalytics,
} from "./store/TransactionSlice";
import { getMe } from "./store/authSlice";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Page404 from "./pages/Page404";

function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <ToastContainer />
      {/* Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 h-full md:w-60 md:bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-60">
        <div className="top-0 z-50 h-28 sm:h-16 bg-[#eef0fc] flex items-center">
          <Topbar />
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-[#eef0fc]">{children}</div>
      </div>
    </div>
  );
}

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpense(1));
    dispatch(getYearlyAnalytics());
    dispatch(getIncome(1));
    dispatch(getLastMonthTransactions());
    dispatch(getMe());
    dispatch(get30daysExpense());
    dispatch(getFullTransactions());
    dispatch(get30daysIncome());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/register" element={<SignupAndLogin />} />

      {/* Protected routes inside layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/income"
        element={
          <Layout>
            <Income />
          </Layout>
        }
      />
      <Route
        path="/expense"
        element={
          <Layout>
            <Expense />
          </Layout>
        }
      />

      {/* 404 Page (outside layout) */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
