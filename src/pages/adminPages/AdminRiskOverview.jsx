import React, { useEffect } from "react";
import DonutChart from "../../components/AdminComponents/DonutChart";
import PiChart from "../../components/AdminComponents/PiChart";
import BlueBarChart from "../../components/AdminComponents/BlueBarChart";
import { getRiskOverviewCounts } from "../../services/AdminServices";

const AdminRiskOverview = () => {
  const [getCount, setGetCount] = React.useState({
      totalActive: 0,
      pendingApprovals: 0,
      overdueProjects: 0,
      NearDeadline: 0,
      activeQueries: 0,
      CompletionRate: 0,
  });

  const fetchRiskOverviewCountData = async() => {
    try{
      const data = await getRiskOverviewCounts();
      console.log("Risk Overview Counts:", data);
      setGetCount({
        totalActive: data.totalActive,
        pendingApprovals: data.pendingApprovals,
        overdueProjects: data.overdueProjects,
        NearDeadline: data.NearDeadline,
        activeQueries: data.activeQueries,
        CompletionRate: data.CompletionRate,
      });
    } catch (error) {
      console.error("Error fetching risk overview counts:", error);
    }
  }

  useEffect(() => {
    fetchRiskOverviewCountData();
  }, []);

  return (
    <div className="bg-gray-100" style={{ minHeight: "calc(100vh - 4.4rem)" }}>
      <div className="flex justify-between bg-white px-4 pt-3 pb-4">
        <div>
          <h1 className="text-xl font-medium">Project Risk Overview</h1>
          <p className="text-xs text-gray-500">
            Monitor project status, health scores and deadline adherence.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 xxs:grid-cols-3 xxxs:grid-cols-4 xmd:grid-cols-5 lg:grid-cols-4 lar:grid-cols-5 gap-2 xlar:grid-cols-6 my-4 mx-auto justify-items-center px-2">
      {/* <div className="flex flex-wrap gap-x-14 px-2 my-2 w-fit mx-auto "> */}
        <div className="bg-white px-4 py-4 rounded-xl w-40 border border-gray-200">
          <h2 className="capitalize text-gray-600 text-sm">Total Active</h2>
          <div>
            <div className="text-2xl font-medium">{getCount.totalActive}</div>
          </div>
        </div>
        <div className="bg-white px-4 py-4 rounded-xl w-40 border border-gray-200">
          <h2 className="capitalize text-gray-600 text-sm">
            Pending Approvals
          </h2>
          <div>
            <div className="text-2xl font-medium">{getCount.pendingApprovals}</div>
          </div>
        </div>
        <div className="bg-rose-100 border border-rose-200 px-4 py-4 rounded-xl w-40 ">
          <h2 className="capitalize text-rose-600 text-sm">Overdue Projects</h2>
          <div>
            <div className="text-2xl text-rose-700 font-medium">{getCount.overdueProjects}</div>
          </div>
        </div>
        <div className="bg-orange-100 px-4 py-4 rounded-xl w-40  border border-orange-200 ">
          <h2 className="capitalize text-orange-600 text-sm">Near Deadline</h2>
          <div>
            <div className="text-2xl text-orange-700 font-medium">{getCount.NearDeadline}</div>
          </div>
        </div>
        <div className="bg-white px-4 py-4 rounded-xl w-40 border border-gray-200">
          <h2 className="capitalize text-gray-600 text-sm">
            Active Queries
          </h2>
          <div>
            <div className="text-2xl font-medium">{getCount.activeQueries}</div>
          </div>
        </div>
        <div className="bg-white px-4 py-4 rounded-xl w-40 border border-gray-200">
          <h2 className="capitalize text-gray-600 text-sm">Completion Rate</h2>
          <div>
            <div className="text-2xl font-medium">{getCount.CompletionRate}%</div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 halfxl:grid-cols-3 gap-6 px-3 sxs:px-8">
        <div className="w-full bg-white h-full rounded-lg font-medium px-4 py-3">
          <div>Status Distribution</div>
          <div>
            {/* <div className="flex items-center px-4 h-80 justify-between"> */}
            <div className="flex flex-col sxs:flex-row items-center justify-center px-4  h-80 gap-6">
              {/* <DonutChart /> */}
              <PiChart/>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500 rounded-full"></div>
                  <div className="w-22 text-gray-600 font-normal">Active</div>
                  <div className="font-semibold">45%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-22 text-gray-600 font-normal">Pending</div>
                  <div className="font-semibold">45%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-500 rounded-full"></div>
                  <div className="w-22 text-gray-600 font-normal">
                    Completed
                  </div>
                  <div className="font-semibold">45%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-500 rounded-full"></div>
                  <div className="w-22 text-gray-600 font-normal">Overdue</div>
                  <div className="font-semibold">45%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full bg-white h-full rounded-lg font-medium px-4 py-3">
          <div className="pb-3">Health Score Analysis</div>
          <div className="flex gap-2 items-center justify-center py-3 md:py-0">
            <div className="w-23 xxs:w-28 py-4 bg-green-100 border border-green-200 flex flex-col justify-center items-center rounded-lg">
              <div className="text-2xl text-green-600 ">85</div>
              <div className="text-lg font-light text-green-500">Healthy</div>
            </div>
            <div className="w-23 xxs:w-28 py-4 bg-orange-100 border border-orange-200 flex flex-col justify-center items-center rounded-lg">
              <div className="text-2xl text-orange-600">85</div>
              <div className="text-lg font-light text-orange-500">Medium</div>
            </div>
            <div className="w-23 xxs:w-28 py-4 bg-rose-100 border border-rose-200 flex flex-col justify-center items-center rounded-lg">
              <div className="text-2xl text-rose-600">85</div>
              <div className="text-lg font-light text-rose-500">High Risk</div>
            </div>
          </div>
          <div className="uppercase text-xs text-gray-500 my-3">
            top high risk projects
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-center justify-between">
              <div>
                <h4 className="font-normal text-sm">Mobile App Redesign</h4>
                <h5 className="text-gray-400 text-[0.65rem]">ID : #P-4145</h5>
              </div>
              <div>
                <div className="text-red-500 text-sm">32%</div>
               <div className="w-32 bg-gray-200 rounded-2xl">
               <div className="p-0.5 bg-red-500 rounded-2xl w-[32%]"></div></div> 
              </div>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <div>
                <h4 className="font-normal text-sm">Mobile App Redesign</h4>
                <h5 className="text-gray-400 text-[0.65rem]">ID : #P-4145</h5>
              </div>
              <div>
                <div className="text-red-500 text-sm">32%</div>
               <div className="w-32 bg-gray-200 rounded-2xl">
               <div className="p-0.5 bg-red-500 rounded-2xl w-[32%]"></div></div> 
              </div>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <div>
                <h4 className="font-normal text-sm">Mobile App Redesign</h4>
                <h5 className="text-gray-400 text-[0.65rem]">ID : #P-4145</h5>
              </div>
              <div>
                <div className="text-red-500 text-sm">32%</div>
               <div className="w-32 bg-gray-200 rounded-2xl">
               <div className="p-0.5 bg-red-500 rounded-2xl w-[32%]"></div></div> 
              </div>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <div>
                <h4 className="font-normal text-sm">Mobile App Redesign</h4>
                <h5 className="text-gray-400 text-[0.65rem]">ID : #P-4145</h5>
              </div>
              <div>
                <div className="text-red-500 text-sm">32%</div>
               <div className="w-32 bg-gray-200 rounded-2xl">
               <div className="p-0.5 bg-red-500 rounded-2xl w-[32%]"></div></div> 
              </div>
            </div>
          </div>
          {/* ////////////////////////////// */}
        </div>
        <div className="md:col-span-2 halfxl:col-span-1 bg-white h-full rounded-lg font-medium px-4 py-3">
          Overdue Trends

          <div className="text-gray-600 flex flex-col xxxs:flex-row justify-center items-center gap-8 halfxl:block">
            <div className="flex flex-col w-80">
              <BlueBarChart/>
            </div>
            <div className="flex flex-col w-60 ">
              <h3 className="text-sm tracking-wide my-3">NEXT 3 DEADLINES</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <div className="">Website Launch</div>
                <div className="text-orange-500 capitalize">Tomorrow</div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="">Website Launch</div>
                <div className="text-gray-500 capitalize">Mar 24</div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="">Website Launch</div>
                <div className="text-gray-500 capitalize">mar 28</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRiskOverview;
