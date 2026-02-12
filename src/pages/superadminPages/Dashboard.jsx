import React from "react";
import { UsersRound } from "lucide-react";
import DashboardChart from "./DashboardChart";

const Dashboard = () => {
  return (
       <div>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 py-4 gap-4">

          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <UsersRound
                className="text-green-500 bg-green-200 p-2 rounded"
                size={35}
              />
              <div>Total Admin</div>
            </div>
            <div className="mt-2 text-xl font-medium">40</div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <UsersRound
                className="text-blue-500 bg-blue-200 p-2 rounded"
                size={35}
              />
              <div>Active Admin</div>
            </div>
            <div className="mt-2 text-xl font-medium">33</div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <UsersRound
                className="text-red-500 bg-red-200 p-2 rounded"
                size={35}
              />
              <div>Deactive Admin</div>
            </div>
            <div className="mt-2 text-xl font-medium">5</div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <UsersRound
                className="text-yellow-500 bg-yellow-200 p-2 rounded"
                size={35}
              />
              <div>Suspended</div>
            </div>
            <div className="mt-2 text-xl font-medium">2</div>
          </div>

          {/* Recent Projects */}
        </div>
        <DashboardChart/>
      </div>
     
  );
};

export default Dashboard;
