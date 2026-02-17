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
          <p className="text-sm text-emerald-600">Project</p>
        </div>
       
      </div>

      {/* TABLE */}
      <table className="w-full border border-gray-200 mt-5 rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="pl-8 py-3 text-left text-xs font-medium border-b">
              Admin Id
            </th>
            <th className="pl-8 py-3 text-left text-xs font-medium border-b">
              Project Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium border-b">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium border-b">
              Manager
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium border-b">
              Deadline
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium border-b">
              Progress
            </th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="border-b">
              {/* ✅ Admin ID FIXED */}
              <td className="pl-8 py-3 text-sm">
                {project.adminId}
              </td>

              <td className="px-4 py-3 text-sm flex items-center gap-3">
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

              <td className="px-4 py-3 text-sm">
                <span
                  className={`px-2 py-1 rounded-xl text-xs font-medium ${
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

              <td className="px-4 py-3 text-sm">
                {project.manager}
              </td>

              <td className="px-4 py-3 text-sm">
                {project.deadline}
              </td>

              <td className="px-4 py-3 text-sm">
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
  );
};

export default ProjectReport;
