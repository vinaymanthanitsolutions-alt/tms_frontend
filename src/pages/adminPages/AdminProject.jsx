import { Search, Edit, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import {
  IconBoltFilled,
  IconStarFilled,
  IconTriangleFilled,
  IconUserOff,
} from "@tabler/icons-react";

import { Rocket } from "lucide-react";

import { Plus } from "lucide-react";

const AdminProject = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const wrapperStyle =
    "flex gap-2 items-center px-3 py-1 text-gray-700 rounded border border-gray-300 text-sm font-medium cursor-pointer transition-all";
  const filterButtonStyle = " text-sm";

  const activeButtonStyle = {
    active:
      "flex gap-2 items-center px-3 py-1 rounded border border-green-400 text-sm font-medium bg-green-200 text-green-700 cursor-pointer transition-all",
    overdue:
      "flex gap-2 items-center px-3 py-1 rounded border border-red-400 text-sm font-medium bg-red-200 text-red-700 cursor-pointer transition-all",
    noManager:
      "flex gap-2 items-center px-3 py-1 rounded border border-orange-400 text-sm font-medium bg-orange-200 text-orange-700 cursor-pointer transition-all",
    highPriority:
      "flex gap-2 items-center px-3 py-1 rounded border border-purple-400 text-sm font-medium bg-purple-200 text-purple-700 cursor-pointer transition-all",
  };

  const handleFilterClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Project Mangement</h1>
          <p className="text-sm text-emerald-600">Project</p>
        </div>
        <div
          className="px-4 py-2 text-[0.900rem] bg-emerald-600 text-white font-light rounded hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Plus size={16} />
          <button className="tracking-wide">Add Project</button>
        </div>
      </div>

      <div>
        <div className="flex border-2 rounded-md border-gray-200 justify-between px-3 py-4 my-3">
          <div className="border-2 border-gray-200 rounded-md w-fit flex items-center gap-2 px-3 py-2">
            <Search size={20} className="text-gray-500 cursor-pointer" />
            <input
              type="text"
              placeholder="Search by Emp code..."
              className="outline-none text-sm flex-1"
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-gray-600 uppercase font-medium text-sm tracking-wide mr-2">
              smart filters :{" "}
            </div>
            <div
              className={
                activeFilter === "active"
                  ? activeButtonStyle.active
                  : wrapperStyle
              }
              onClick={() => handleFilterClick("active")}
            >
              <IconBoltFilled size={16} className="text-green-500" />
              <button className={filterButtonStyle}>Active</button>
            </div>
            <div
              className={
                activeFilter === "overdue"
                  ? activeButtonStyle.overdue
                  : wrapperStyle
              }
              onClick={() => handleFilterClick("overdue")}
            >
              <IconTriangleFilled size={16} className="text-red-500" />
              <button className={filterButtonStyle}>Overdue</button>
            </div>
            <div
              className={
                activeFilter === "noManager"
                  ? activeButtonStyle.noManager
                  : wrapperStyle
              }
              onClick={() => handleFilterClick("noManager")}
            >
              <IconUserOff size={16} className="text-orange-500" />
              <button className={filterButtonStyle}>No Manager</button>
            </div>
            <div
              className={
                activeFilter === "highPriority"
                  ? activeButtonStyle.highPriority
                  : wrapperStyle
              }
              onClick={() => handleFilterClick("highPriority")}
            >
              <IconStarFilled size={16} className="text-purple-500" />
              <button className={filterButtonStyle}>High Priority</button>
            </div>
          </div>
        </div>
      </div>

      <table className="w-full border-separate border-spacing-0 border border-gray-200 mt-5 rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="uppercase text-gray-500 pl-8 py-3 text-left text-xs font-medium border-b border-gray-200">
              Project Name
            </th>
            <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
              Status
            </th>
            <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
              Manager
            </th>
            <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
              Deadline
            </th>
            <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
              Progress
            </th>
            <th className="uppercase text-gray-500 px-4 py-3 text-center text-xs font-medium border-b border-gray-200">
              Reassign PM
            </th>
            <th className="uppercase text-gray-500 px-4 py-3 text-center text-xs font-medium border-b border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 flex items-center gap-3">
              <Rocket
                size={30}
                className="px-2 py-2 rounded bg-blue-200 text-blue-500"
              />
              <div>
                <div>Website Redesign</div>
                <div className="text-[0.60rem] text-gray-500 mt-1">
                  ID: PRJ-001
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <span className="bg-green-200 text-green-700 px-2 py-1 rounded-xl text-xs font-medium">
                Active
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
              John Doe
            </td>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
              2024-02-15
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="text-[0.60rem] text-gray-500 mt-1">65%</div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="flex justify-center">
                <button className=" text-orange-500 tracking-wide text-xs cursor-pointer">
                  Reassign
                </button>
              </div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="flex gap-2 justify-center">
                <button className="text-black border border-gray-300 p-2 rounded hover:text-gray-500 transition">
                  <Edit size={16} />
                </button>
                <button className="bg-red-300 text-red-700 border border-red-700 p-2 rounded transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 flex items-center gap-3">
              <Rocket
                size={30}
                className="px-2 py-2 rounded bg-blue-200 text-blue-500"
              />
              <div>
                <div>Mobile App Development</div>
                <div className="text-[0.60rem] text-gray-500 mt-1">
                  ID: PRJ-002
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <span className="bg-red-200 text-red-700 px-2 py-1 rounded-xl text-xs font-medium">
                Overdue
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
              Jane Smith
            </td>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
              2024-01-30
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
              <div className="text-[0.60rem] text-gray-500 mt-1">45%</div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="flex justify-center">
                <button className=" text-orange-500 text-xs cursor-pointer tracking-wide">
                  Reassign
                </button>
              </div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="flex gap-2 justify-center">
                <button className="text-black border border-gray-300 p-2 rounded hover:text-gray-500 transition">
                  <Edit size={16} />
                </button>
                <button className="bg-red-300 text-red-700 border border-red-700 p-2 rounded transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 flex items-center gap-3">
              <Rocket
                size={30}
                className="px-2 py-2 rounded bg-blue-200 text-blue-500"
              />
              <div>
                <div>Database Migration</div>
                <div className="text-[0.60rem] text-gray-500 mt-1">
                  ID: PRJ-003
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <span className="bg-orange-200 text-orange-700 px-2 py-1 rounded-xl text-xs font-medium">
                No Manager
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
              -
            </td>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
              2024-03-10
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="text-[0.60rem] text-gray-500 mt-1">80%</div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="flex justify-center">
                <button className=" text-orange-500 text-xs cursor-pointer tracking-wide">
                  Reassign
                </button>
              </div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="flex gap-2 justify-center">
                <button className="text-black border border-gray-300 p-2 rounded hover:text-gray-500 transition">
                  <Edit size={16} />
                </button>
                <button className="bg-red-300 text-red-700 border border-red-700 p-2 rounded transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 flex items-center gap-3">
              <Rocket
                size={30}
                className="px-2 py-2 rounded bg-blue-200 text-blue-500"
              />
              <div>
                <div>API Integration</div>
                <div className="text-[0.60rem] text-gray-500 mt-1">
                  ID: PRJ-004
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded-xl text-xs font-medium">
                High Priority
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
              Mike Johnson
            </td>
            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
              2024-02-28
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
              <div className="text-[0.60rem] text-gray-500 mt-1">30%</div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="flex justify-center">
                <button className=" text-orange-500 text-xs cursor-pointer tracking-wide">
                  Reassign
                </button>
              </div>
            </td>
            <td className="px-4 py-3 text-sm border-b border-gray-200">
              <div className="flex gap-2 justify-center">
                <button className="text-black border border-gray-300 p-2 rounded hover:text-gray-500 transition">
                  <Edit size={16} />
                </button>
                <button className="bg-red-300 text-red-700 border border-red-700 p-2 rounded transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Right Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white z-60 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center pl-6 pr-4 py-4 border-b border-gray-200">
          <div className="text-black">
            <h2 className="text-xl font-semibold">Create Project</h2>
            <p className="text-xs text-gray-500">
              Create a new project for your team.
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-black hover:text-gray-300 transition"
          >
            <X size={35} className="text-gray-500 px-2 py-2" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form action="" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                placeholder="Enter project title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Code
              </label>
              <input
                type="text"
                placeholder="Enter project code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter project description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-emerald-600"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-emerald-600 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Project Manager
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-emerald-600 text-gray-500">
                <option value="">Select a project manager</option>
                <option value="john-doe">John Doe</option>
                <option value="jane-smith">Jane Smith</option>
                <option value="mike-johnson">Mike Johnson</option>
              </select>
            </div>
          </form>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 rounded-md font-medium hover:bg-emerald-700 transition"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminProject;
