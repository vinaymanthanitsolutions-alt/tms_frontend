import { Rocket } from "lucide-react";
import React, { useState } from "react";

const itemsPerPage = 5;

const ProjectReport = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const projects = [
    {
      adminId: "A001",
      projectName: "Website Redesign",
      projectCode: "PRJ-001",
      status: "Active",
      manager: "John Doe",
      deadline: "20/2/2026",
      progress: 65,
    },
    {
      adminId: "A002",
      projectName: "Mobile App Development",
      projectCode: "PRJ-002",
      status: "Overdue",
      manager: "Jane Smith",
      deadline: "25/2/2026",
      progress: 45,
    },
    {
      adminId: "A003",
      projectName: "Database Migration",
      projectCode: "PRJ-003",
      status: "No Manager",
      manager: "-",
      deadline: "23/2/2026",
      progress: 80,
    },
    {
      adminId: "A004",
      projectName: "API Integration",
      projectCode: "PRJ-004",
      status: "High Priority",
      manager: "Mike Johnson",
      deadline: "30/2/2026",
      progress: 30,
    },
    {
      adminId: "A005",
      projectName: "CRM Upgrade",
      projectCode: "PRJ-005",
      status: "Active",
      manager: "Chris Evans",
      deadline: "12/3/2026",
      progress: 55,
    },
    {
      adminId: "A006",
      projectName: "Security Patch",
      projectCode: "PRJ-006",
      status: "Overdue",
      manager: "Robert Downey",
      deadline: "5/3/2026",
      progress: 20,
    },
  ];

  /* ✅ Pagination Logic */
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-5">
      <div>
        <h1 className="text-2xl font-semibold">Project Details</h1>
        <p className="text-sm text-gray-500 mb-6">
          Project's work under the admin
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 text-center">Admin Id</th>
              <th className="p-4 px-20">Project Name</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Manager</th>
              <th className="p-4 text-center">Deadline</th>
              <th className="p-4 text-center">Progress</th>
            </tr>
          </thead>

          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={index} className="border border-gray-200">
                <td className="pl-8 py-3 font-medium">
                  {project.adminId}
                </td>

                <td className="px-10 py-3 font-medium flex items-center gap-3">
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

                <td className="px-2 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-xl ${
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

                <td className="px-4 py-3 text-center">
                  {project.manager}
                </td>

                <td className="px-4 py-3 text-center">
                  {project.deadline}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        project.progress < 50
                          ? "bg-red-500"
                          : project.progress < 80
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
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

      {/* ✅ Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-emerald-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectReport;
