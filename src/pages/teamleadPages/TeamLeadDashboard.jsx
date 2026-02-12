import React from "react";
import { UsersRound, ClipboardCheck, AlertCircle } from "lucide-react";

const TeamLeadDashboard = () => {
  return (
    <div>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-3 px-4 py-4 gap-4">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-blue-500 bg-blue-200 p-2 rounded"
              size={35}
            />
            <div>Team Members</div>
          </div>
          <div className="mt-2 text-xl font-medium">12</div>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <ClipboardCheck
              className="text-green-500 bg-green-200 p-2 rounded"
              size={35}
            />
            <div>Active Tasks</div>
          </div>
          <div className="mt-2 text-xl font-medium">28</div>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle
              className="text-red-500 bg-red-200 p-2 rounded"
              size={35}
            />
            <div>Pending Approvals</div>
          </div>
          <div className="mt-2 text-xl font-medium">5</div>
        </div>
      </div>

      {/* Team Lead Content */}
      <div className="px-4 py-4">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Team Lead Dashboard</h3>
          <p className="text-gray-600">
            Welcome to your Team Lead dashboard. Manage your team and track
            progress here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamLeadDashboard;
