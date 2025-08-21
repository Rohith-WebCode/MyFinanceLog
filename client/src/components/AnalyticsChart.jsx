import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AnalyticsChart = () => {
  const { yearTransactions } = useSelector((state) => state.Transaction);

  const currentYear = new Date().getFullYear();
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  const chartData = useMemo(() => {
    return months.map((month) => {
      const income = yearTransactions
        .filter(
          (t) =>
            t.type === "income" &&
            new Date(t.date).toLocaleString("en-US", { month: "short" }) ===
              month &&
            new Date(t.date).getFullYear() === currentYear
        )
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = yearTransactions
        .filter(
          (t) =>
            t.type === "expense" &&
            new Date(t.date).toLocaleString("en-US", { month: "short" }) ===
              month &&
            new Date(t.date).getFullYear() === currentYear
        )
        .reduce((sum, t) => sum + t.amount, 0);

      return { month, Income: Math.round(income) , Expense: Math.round(expense)};
    });
  }, [yearTransactions, currentYear]);

  return (
    <div className="w-full flex-1 h-100 p-4 bg-white rounded-lg shadow-md">
      <p className="text-base lg:text-lg font-semibold mb-4"> Analytics</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barSize={20}>
          {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend verticalAlign="bottom" height={100} />
          <Bar dataKey="Expense" fill="#4F46E5" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Income" fill="#C084FC" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
