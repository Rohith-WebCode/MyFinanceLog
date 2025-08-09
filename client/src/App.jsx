import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
// import Dashboard from "./pages/Dashboard";
// import MyAccounts from "./pages/MyAccounts";
// import Analytics from "./pages/Analytics";
// import BudgetPlanner from "./pages/BudgetPlanner";
// import Saving from "./pages/Saving";
// import Settings from "./pages/Settings";
// import Members from "./pages/Members";
// import HelpSupport from "./pages/HelpSupport";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:block fixed top-0 left-0 h-full  md:w-60 md:bg-white border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-1 md:ml-60">
          {/* Topbar */}
          <div className="sticky top-0 z-50 h-28 sm:h-16 bg-[#eef0fc] flex items-center">
            <Topbar />
          </div>

          {/* Page content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#eef0fc]">
            {/* <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/my-accounts" element={<MyAccounts />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/budget-planner" element={<BudgetPlanner />} />
              <Route path="/saving" element={<Saving />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/members" element={<Members />} />
              <Route path="/help-support" element={<HelpSupport />} />
            </Routes> */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
