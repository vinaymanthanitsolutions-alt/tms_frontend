import React from "react";
import { UsersRound } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div>
      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  px-4 py-4 gap-4">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-orange-500 bg-orange-200 p-2 rounded"
              size={35}
            />
            <div>Total Employee</div>
          </div>
          <div className="mt-2 text-xl font-medium">215</div>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-blue-500 bg-blue-200 p-2 rounded"
              size={35}
            />
            <div>Total Projects</div>
          </div>
          <div className="mt-2 text-xl font-medium">215</div>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-green-500 bg-green-200 p-2 rounded"
              size={35}
            />
            <div>Active Tasks</div>
          </div>
          <div className="mt-2 text-xl font-medium">215</div>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-yellow-500 bg-yellow-200 p-2 rounded"
              size={35}
            />
            <div>Pending Approvals</div>
          </div>
          <div className="mt-2 text-xl font-medium">215</div>
        </div>

        {/* Recent Projects */}
      </div>
    </div>
  );
};

export default AdminDashboard;
