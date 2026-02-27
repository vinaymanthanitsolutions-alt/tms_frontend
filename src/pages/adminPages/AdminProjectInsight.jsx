import React from "react";
import {
  Search,
  ChevronDown,
  CheckCircle2,
  Hourglass,
  Activity,
  RefreshCw,
  List,
  AlertCircle,
  CalendarCheck,
} from "lucide-react";
import {
  IconUserCircle,
  IconPoint,
  IconSearch,
  IconBolt,
  IconSettings,
  IconFlag,
} from "@tabler/icons-react";
import ProjectInsightDonut from "../../components/AdminComponents/ProjectInsightDonut";

const AdminProjectInsight = () => {
  return (
    <div
      className="bg-gray-100 min-h-[calc(100vh-4.4rem)]"
      style={{ minHeight: "calc(100vh - 4.4rem)" }}
    >
        <div className="bg-white px-4 pt-3 pb-4 mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl font-medium">Project Insight</h1>
              <p className="text-xs text-gray-500">
                Monitor lifecycle stages, task status, and resource allocation
              </p>
            </div>
            {/* <div>Calendar</div> */}
            <div className="relative w-full sm:w-80 mt-3 sm:mt-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Project Code or Title (e.g. PRJ-2024)"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none "
              />
            </div>
          </div>
        </div>
      <div className="px-4 py-2">
        {/* Top Header Bar */}
      

      {/* Main Project Overview Card */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-5 mb-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-0.5 bg-orange-100 text-orange-700 rounded-full text-[0.60rem] font-medium">
                PRJ-2024-082
              </span>
              <span className="px-3 py-0.5 bg-green-100 text-green-700 rounded-full text-[0.60rem] font-medium">
                ACTIVE
              </span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900 mb-2">
              Cloud Infrastructure Migration - Phase 2
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-1 gap-y-2 text-xs">
              <div className="text-gray-600">
                <span className="font-medium text-gray-500 uppercase tracking-wide">
                  Department:{" "}
                </span>
                IT Infrastructure
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span className="font-medium text-gray-500 uppercase tracking-wide">
                  Project Manager:{" "}
                </span>
                <div className="w-4 h-4 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden ml-1">
                  <IconUserCircle size={15} className="text-orange-600" />
                </div>
                <div>Sarah Jenkins</div>
              </div>
              <div className="text-gray-600">
                <span className="font-medium text-gray-500 uppercase tracking-wide">
                  Duration:{" "}
                </span>
                126 Days (4.2 Months)
              </div>
              <div className="text-gray-600">
                <span className="font-medium text-gray-500 uppercase tracking-wide">
                  Timeline:{" "}
                </span>
                Jan 15 - May 20, 2024
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            <ProjectInsightDonut
              centerLabel="Complete"
              centerValue="74%"
              data={[74, 26]}
              backgroundColor={["#F97316", "#E5E7EB"]}
              size={100}
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                <span className="text-sm font-medium text-gray-700">
                  Tasks Done: <span className="font-semibold">142 / 192</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Hourglass size={18} className="text-amber-500 shrink-0" />
                <span className="text-sm font-medium text-gray-700">
                  On-going: <span className="font-semibold">38</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lifecycle Tracking Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" />
            Lifecycle Tracking
          </h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Completed
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              Pending
            </span>
          </div>
        </div>
        <div className="relative flex flex-wrap justify-between gap-4">
          {/* Connecting line - simplified as background */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0 hidden sm:block" style={{ marginLeft: '5%', marginRight: '5%' }} />
          <div className="relative z-10 flex flex-col items-center text-center min-w-[80px] max-w-[120px]">
            <div className={`w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mb-2`}>
              <IconPoint size={20} />
            </div>
            <span className="text-xs font-medium text-gray-800">
              Project Created
            </span>
            <span className="text-xs text-gray-500 mt-0.5">Jan 15, 2024</span>
            <span className="text-xs font-medium mt-1 text-green-600">
              APPROVED
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center min-w-[80px] max-w-[120px]">
            <div className={`w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mb-2`}>
              <IconSearch size={20} />
            </div>
            <span className="text-xs font-medium text-gray-800">
              Analysis Stage
            </span>
            <span className="text-xs text-gray-500 mt-0.5">Jan 28, 2024</span>
            <span className="text-xs font-medium mt-1 text-green-600">
              APPROVED
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center min-w-[80px] max-w-[120px]">
            <div className={`w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mb-2`}>
              <IconBolt size={20} />
            </div>
            <span className="text-xs font-medium text-gray-800">
              Execution
            </span>
            <span className="text-xs text-gray-500 mt-0.5">In Progress</span>
            <span className="text-xs font-medium mt-1 text-amber-600">
              ONGOING
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center min-w-[80px] max-w-[120px]">
            <div className={`w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white mb-2`}>
              <IconSettings size={20} />
            </div>
            <span className="text-xs font-medium text-gray-800">
              Testing & QA
            </span>
            <span className="text-xs text-gray-500 mt-0.5">Est: Apr 15</span>
            <span className="text-xs font-medium mt-1 text-gray-500">
              PENDING
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center min-w-[80px] max-w-[120px]">
            <div className={`w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white mb-2`}>
              <IconFlag size={20} />
            </div>
            <span className="text-xs font-medium text-gray-800">
              Completion
            </span>
            <span className="text-xs text-gray-500 mt-0.5">Est: May 20</span>
            <span className="text-xs font-medium mt-1 text-gray-500">
              PENDING
            </span>
          </div>
      </div>
    </div>
      {/* Middle Row - Task Status Distribution & Subtask Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">
        {/* Task Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 pt-3 px-6">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-3">
            <RefreshCw size={20} className="text-blue-500" />
            Task Status Distribution
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ProjectInsightDonut
              centerLabel="Total Tasks"
              centerValue="192"
              data={[142, 38, 12]}
              backgroundColor={["#10B981", "#3B82F6", "#F59E0B"]}
              size={120}
            />
            {/* <div className="p-0.5 rounded-xl w-full bg-blue-500"></div> */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700 w-24">
                  Completed 
                </span>
                <span className="font-semibold">142</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-700 w-24">
                  In Progress 
                </span>
                <span className="font-semibold">38</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-gray-700 w-24">
                  Under Review 
                </span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtask Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <List size={20} className="text-blue-500" />
            Subtask Summary
          </h2>
          <button className=" w-fit px-2 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              VIEW ALL SUBTASKS (48)
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Infrastructure Setup</span>
                <span className="font-medium text-gray-900">92%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: "92%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Database Migration</span>
                <span className="font-medium text-gray-900">64%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: "64%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminProjectInsight;
