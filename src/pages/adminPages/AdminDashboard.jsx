import React from "react";
import { UsersRound } from "lucide-react";
import { Calendar } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="h-[calc(100vh-4.35rem)] overflow-auto">
      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 px-4 py-4 gap-4">
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
      <div className="flex w-full justify-between px-5 gap-3">
          <div className="h-full border w-full">
            first side
          </div>

          {/* second sidebar */}

          <div className="w-96 border px-2">
            <h1>Upcoming Deadlines</h1>
             <div className="flex flex-col gap-3">
                <div>
                  <div className="flex justify-between">
                    <div>High Priority</div>
                    <div>2 Days left</div>
                  </div>
                  <div>
                    <h2>UI Kit Update</h2>
                    <div className="flex">
                        <Calendar />
                        <span>Date</span>
                    </div>
                    <div className="w-full py-1 rounded-2xl bg-blue-500"></div>
                  </div>
                </div>
              <div>

              </div>
             </div>
            {/* <div className=" bottom-0 w-68 bg-orange-500 text-white rounded-t-xl px-5 pt-6 pb-0.5">
          <h1 className="font-semibold">Need Help ?</h1>
          <p className="text-[0.85rem] font-light my-3">Check our documentation or contact support for assistance with your tasks.</p>
          <button className="bg-white text-orange-500 px-4 py-1 rounded font-medium w-full text-center text-sm">Contact Support</button>
        </div> */}
          </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
