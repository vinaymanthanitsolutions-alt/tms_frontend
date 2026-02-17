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

const ProjectReport = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  

  /* ✅ Dummy Project Data Added */
  const projects = [
    {
      adminId: "A001",
      projectName: "Website Redesign",
      projectCode: "PRJ-001",
      status: "Active",
      manager: "John Doe",
      deadline: "2024-02-15",
      progress: 65,
    },
    {
      adminId: "A002",
      projectName: "Mobile App Development",
      projectCode: "PRJ-002",
      status: "Overdue",
      manager: "Jane Smith",
      deadline: "2024-01-30",
      progress: 45,
    },
    {
      adminId: "A003",
      projectName: "Database Migration",
      projectCode: "PRJ-003",
      status: "No Manager",
      manager: "-",
      deadline: "2024-03-10",
      progress: 80,
    },
    {
      adminId: "A004",
      projectName: "API Integration",
      projectCode: "PRJ-004",
      status: "High Priority",
      manager: "Mike Johnson",
      deadline: "2024-02-28",
      progress: 30,
    },
  ];

  const wrapperStyle =
    "flex gap-2 items-center px-3 py-1 text-gray-700 rounded border border-gray-300 text-sm font-medium cursor-pointer transition-all";

  const handleFilterClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Project Details</h1>
          <p className="text-sm text-gray-500 mb-6">Project's work under the admin</p>
        </div>
       
      </div>

      {/* TABLE */}
     <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase ">
            <tr>
              <th className="p-4">Admin Id</th>
              <th className="p-4">Project Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Manager</th>
              <th className="p-4">Deadline</th>
              <th className="p-4">Progress</th>
              
            </tr>
          </thead>

        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="border border-gray-200 ">
              {/* ✅ Admin ID FIXED */}
              <td className="pl-8 py-3 font-medium">
                {project.adminId}
              </td>

              <td className="px-4 py-3 font-medium flex items-center gap-3">
                <Rocket
                  size={30}
                  className="px-2 py-2 rounded bg-blue-200 text-blue-500"
                />
                <div>
                  <div>{project.projectName}</div>
                  <div className="text-[0.60rem] text-gray-500 mt-1">
                    ID: {project.projectCode}
                  </div>
                </div>
              </td>

              <td className="px-4 py-3 font-medium">
                <span
                  className={`px-2 py-1 rounded-xl  font-medium ${
                    project.status === "Active"
                      ? "bg-green-200 text-green-700"
                      : project.status === "Overdue"
                      ? "bg-red-200 text-red-700"
                      : project.status === "No Manager"
                      ? "bg-orange-200 text-orange-700"
                      : "bg-purple-200 text-purple-700"
                  }`}
                >
                  {project.status}
                </span>
              </td>

              <td className="px-4 py-3 font-medium">
                {project.manager}
              </td>

              <td className="px-4 py-3 font-medium">
                {project.deadline}
              </td>

              <td className="px-4 py-3 font-medium">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="text-[0.60rem] text-gray-500 mt-1">
                  {project.progress}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
       
      
    </div>
  );
};

export default ProjectReport;
