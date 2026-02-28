import React, { useEffect } from "react";
import { UsersRound } from "lucide-react";
import { Calendar } from "lucide-react";
import { Line } from "../../components/AdminComponents/Line";
import BarChart from "../../components/AdminComponents/BarChart";
import { Pencil } from "lucide-react";
import { getDashboardCounts } from "../../services/AdminServices";


const AdminDashboard = () => {

  const [getCount, setGetCount] = React.useState({
    employeeCount: 0,
    projectCount: 0,
    activeTaskCount: 0,
    pendingApprovalCount: 0,
  });

  const fetchDashboardCounts = async () => {
    try{
      const data = await getDashboardCounts();
      console.log("Dashboard Counts:", data);
      setGetCount({
        employeeCount: data.employeeCount,
        projectCount: data.projectCount,
        activeTaskCount: data.activeTaskCount,
        pendingApprovalCount: data.pendingApprovalCount,
      });
    }catch(error){
      console.error("Error fetching dashboard counts:", error);
    }
  };

  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  return (
    <div className="h-[calc(100vh-4.35rem)] overflow-auto bg-gray-100">
      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 px-4 py-4 gap-4">
        <div className="bg-white  rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-orange-500 bg-orange-200 p-2 rounded "
              size={35}
            />
            <div>Total Employee</div>
          </div>
          <div className="mt-2 text-xl font-medium">{getCount.employeeCount}</div>
        </div>
        <div className="bg-white  rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-blue-500 bg-blue-200 p-2 rounded"
              size={35}
            />
            <div>Total Projects</div>
          </div>
          <div className="mt-2 text-xl font-medium">{getCount.projectCount}</div>
        </div>
        <div className="bg-white  rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-green-500 bg-green-200 p-2 rounded"
              size={35}
            />
            <div>Active Tasks</div>
          </div>
          <div className="mt-2 text-xl font-medium">{getCount.activeTaskCount}</div>
        </div>
        <div className="bg-white  rounded-lg p-4">
          <div className="flex items-center gap-2">
            <UsersRound
              className="text-yellow-500 bg-yellow-200 p-2 rounded"
              size={35}
            />
            <div>Pending Approvals</div>
          </div>
          <div className="mt-2 text-xl font-medium">{getCount.pendingApprovalCount}</div>
        </div>
      </div>
      {/* Project Progress & Recent Projects */}
      <div className="md:flex w-full items-stretch px-5 gap-3">
        <div className="h-full w-full">
          <div className="bg-white pl-6 py-4 rounded-lg">
            <BarChart />
          </div>
          <div className="w-full max-w-full bg-white px-3 py-2 mt-4 rounded-lg">
            <div className="flex justify-between items-center mx-2 pt-1 pb-2">
              <h1 className="font-semibold">Recent Activites</h1>
              <button className=" w-fit text-orange-500 px-4 py-1 rounded font-medium text-center text-xs">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-4 p-2 ">
              {/* multiplel divs starts from here */}
              <div className="flex items-center gap-4">
                <Pencil size={30}  className="bg-blue-100 text-blue-500 rounded-full p-2"/>
                <div className="">
                  <div className="flex justify-between items-center gap-2">
                  <h3 className="font-medium text-sm">Project Designation 1<span className="font-normal ml-1">status updated to completed</span></h3>
                  <div className="text-green-500 font-medium text-[0.62rem] rounded-lg bg-green-100 px-2 py-[0.2px] ">Completed</div>
                  </div>
                  <div className="text-gray-500 text-[0.65rem]">Today 10:00 AM</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Pencil size={30}  className="bg-blue-100 text-blue-500 rounded-full p-2"/>
                <div className="">
                  <div className="flex justify-between items-center gap-2">
                  <h3 className="font-medium text-sm">Project Designation 1<span className="font-normal ml-1">status updated to completed</span></h3>
                  <div className="text-green-500 font-medium text-[0.62rem] rounded-lg bg-green-100 px-2 py-[0.2px] ">Completed</div>
                  </div>
                  <div className="text-gray-500 text-[0.65rem]">Today 10:00 AM</div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* second sidebar */}

        <div className="md:w-80 h-full flex flex-col justify-between gap-2 items-center">
          <div className="rounded-lg py-4 px-4 bg-gray-50 w-full">
            <div> 
              <h1 className="font-semibold mb-4">Upcoming Deadlines</h1>
              <div className="flex flex-col gap-3">
                <div className="bg-gray-100 px-3 rounded py-3">
                  <div className="flex justify-between items-center">
                    <div className="text-orange-500 font-semibold text-[0.65rem] rounded bg-orange-100 px-2 pb-1">
                      High Priority
                    </div>
                    <div className="text-[0.60rem] text-gray-500">
                      2 Days left
                    </div>
                  </div>
                  <div className=" p-1 rounded">
                    <h2 className="font-medium text-sm">UI Kit Update</h2>
                    <div className="flex items-center gap-1 text-gray-500 text-xs my-2">
                      <Calendar size={15} />
                      <span>Date</span>
                    </div>
                    <div className="w-full py-0.5 rounded-2xl bg-blue-500"></div>
                  </div>
                </div>
                <div className="bg-gray-100 px-3 rounded py-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-orange-500 font-semibold text-[0.65rem] rounded bg-orange-100 px-2 pb-1">
                      High Priority
                    </div>
                    <div className="text-[0.60rem] text-gray-500">
                      2 Days left
                    </div>
                  </div>
                  <div>
                    <h2 className="font-medium text-sm">UI Kit Update</h2>
                    <div className="flex items-center gap-1 text-gray-500 text-xs my-2">
                      <Calendar size={15} />
                      <span>Date</span>
                    </div>
                    <div className="w-full py-0.5 rounded-2xl bg-blue-500"></div>
                  </div>
                </div>
                <button className="bg-white text-gray-600 px-4 py-1 rounded border border-gray-300 w-full text-center text-sm">
                  View Calendar
                </button>
                <div></div>
              </div>
            </div>
          </div>
          {/* below item */}
          <div className="w-full md:w-68 bg-orange-500 text-white rounded-xl px-5 pt-6 pb-6 mb-2  ">
            <h1 className="font-semibold">Need Help ?</h1>
            <p className="text-[0.85rem] font-light my-3">
              Check our documentation or contact support for assistance with
              your tasks.
            </p>
            <button className="bg-white text-orange-500 px-4 py-1 rounded font-medium w-full text-center text-sm">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
