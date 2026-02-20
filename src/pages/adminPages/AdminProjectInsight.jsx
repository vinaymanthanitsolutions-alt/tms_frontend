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
        <div className="flex justify-between bg-white px-4 pt-3 pb-4 mb-1">
        <div>
          <h1 className="text-xl font-medium">Project Insight</h1>
          <p className="text-xs text-gray-500">
          Monitor lifecycle stages, task status, and resource allocation
          </p>
        </div>
        {/* <div>Calendar</div> */}
      </div>
      <div className="px-4 py-2">
        {/* Top Header Bar */}
      <div className="flex flex-col gap-4 ">
        <div className="relative flex-1 max-w-md mb-2">
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

      {/* Main Project Overview Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                PRJ-2024-082
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                ACTIVE
              </span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">
              Cloud Infrastructure Migration - Phase 2
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="text-gray-600">
                <span className="font-medium text-gray-500 uppercase tracking-wide">
                  Department:{" "}
                </span>
                IT Infrastructure
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-medium text-gray-500 uppercase tracking-wide">
                  Project Manager:{" "}
                </span>
                <div className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden">
                  <IconUserCircle size={18} className="text-orange-600" />
                </div>
                Sarah Jenkins
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
              backgroundColor={["#3B82F6", "#E5E7EB"]}
              size={140}
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
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
          {[
            {
              icon: IconPoint,
              label: "Project Created",
              date: "Jan 15, 2024",
              status: "APPROVED",
              statusColor: "text-green-600",
              dotColor: "bg-blue-500",
            },
            {
              icon: IconSearch,
              label: "Analysis Stage",
              date: "Jan 28, 2024",
              status: "APPROVED",
              statusColor: "text-green-600",
              dotColor: "bg-blue-500",
            },
            {
              icon: IconBolt,
              label: "Execution",
              date: "In Progress",
              status: "ONGOING",
              statusColor: "text-amber-600",
              dotColor: "bg-blue-500",
            },
            {
              icon: IconSettings,
              label: "Testing & QA",
              date: "Est: Apr 15",
              status: "PENDING",
              statusColor: "text-gray-500",
              dotColor: "bg-gray-300",
            },
            {
              icon: IconFlag,
              label: "Completion",
              date: "Est: May 20",
              status: "PENDING",
              statusColor: "text-gray-500",
              dotColor: "bg-gray-300",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center text-center min-w-[80px] max-w-[120px]"
            >
              <div
                className={`w-10 h-10 rounded-full ${step.dotColor} flex items-center justify-center text-white mb-2`}
              >
                <step.icon size={20} />
              </div>
              <span className="text-xs font-medium text-gray-800">
                {step.label}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">{step.date}</span>
              <span
                className={`text-xs font-medium mt-1 ${step.statusColor}`}
              >
                {step.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Row - Task Status Distribution & Subtask Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Task Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <RefreshCw size={20} className="text-blue-500" />
            Task Status Distribution
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ProjectInsightDonut
              centerLabel="Total Tasks"
              centerValue="192"
              data={[142, 38, 12]}
              backgroundColor={["#10B981", "#3B82F6", "#F59E0B"]}
              size={160}
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700">
                  Completed - <span className="font-semibold">142</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-700">
                  In Progress - <span className="font-semibold">38</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-gray-700">
                  Under Review - <span className="font-semibold">12</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtask Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <List size={20} className="text-blue-500" />
            Subtask Summary
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { label: "Infrastructure Setup", pct: 92, color: "bg-blue-500" },
              { label: "Database Migration", pct: 64, color: "bg-amber-500" },
              {
                label: "Security Audit & Compliance",
                pct: 15,
                color: "bg-gray-300",
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <button className="mt-2 w-full py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              VIEW ALL SUBTASKS (48)
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row - Four metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Hourglass,
            value: "4.2 Days",
            subtitle: "12% vs last month",
            subtitleColor: "text-green-600",
            label: "Avg Completion Time",
          },
          {
            icon: AlertCircle,
            value: "18 Days",
            subtitle: "▲ Database Module",
            subtitleColor: "text-red-600",
            label: "Longest Pending",
          },
          {
            icon: RefreshCw,
            value: "08",
            subtitle: "4.1% rejection rate",
            subtitleColor: "text-red-600",
            label: "Reassigned Tasks",
          },
          {
            icon: CalendarCheck,
            value: "42",
            subtitle: "On track for May target",
            subtitleColor: "text-green-600",
            label: "Monthly Completions",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            <div className="flex items-start justify-between">
              <card.icon
                size={24}
                className="text-gray-400 shrink-0"
                aria-hidden
              />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
            <p className={`text-sm mt-1 ${card.subtitleColor}`}>{card.subtitle}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default AdminProjectInsight;
