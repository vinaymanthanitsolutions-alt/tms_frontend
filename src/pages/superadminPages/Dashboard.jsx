import React, { useEffect, useState } from "react";
import { UsersRound } from "lucide-react";
import axios from "axios";
import DashboardChart from "./DashboardChart";

const Dashboard = () => {

  const [counts, setCounts] = useState({
    total_employees: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/empCounts");

      console.log("Dashboard API:", res.data);

      if (res.data?.success) {
        setCounts(res.data.data);
      }

    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    }
  };

  return (
    <div>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 py-4 gap-4 bg-gray-50">

        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-green-500 bg-green-200 p-2 rounded"
              size={35}
            />
            <div>Total Admin</div>
          </div>
          <div className="mt-2 text-xl font-medium">
            {counts.total_employees}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-blue-500 bg-blue-200 p-2 rounded"
              size={35}
            />
            <div>Active Admin</div>
          </div>
          <div className="mt-2 text-xl font-medium">
            {counts.active}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-red-500 bg-red-200 p-2 rounded"
              size={35}
            />
            <div>Inactive Admin</div>
          </div>
          <div className="mt-2 text-xl font-medium">
            {counts.inactive}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-yellow-500 bg-yellow-200 p-2 rounded"
              size={35}
            />
            <div>Suspended</div>
          </div>
          <div className="mt-2 text-xl font-medium">
            {counts.suspended}
          </div>
        </div>

      </div>

      <DashboardChart />
    </div>
  );
};

export default Dashboard;
