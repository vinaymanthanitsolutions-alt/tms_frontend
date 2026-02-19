import { Rocket } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {  Search } from "lucide-react";

const itemsPerPage = 5;

const ProjectReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]); // ✅ API data
    const [search, setSearch] = useState("");


  // ✅ Fetch API
 useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
      `http://localhost:8080/project/?search=${search}&page=${currentPage}&limit=15`
      );

      const formattedProjects =
        response.data.data.projects.map((item) => ({
          adminId: item.created_by,
          projectName: item.name,
          projectCode: item.project_id,
          status: item.status,
          manager: item.pm_id,
          deadline: item.deadline || "-",
          progress: item.progress,
        }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  fetchProjects();
}, [ search, currentPage]);

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

        {/*  SEARCH + FILTER + ADD BUTTON */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 bg-white border border-gray-200 p-4 rounded-lg">

  {/* SEARCH */}
  <div className="relative w-full sm:w-1/3 lg:w-1/3">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      placeholder="Search Admin ID & manager.."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-200 pl-10 pr-3 py-2 rounded w-full focus:outline-none"
    />
  </div>
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
                      project.status === "COMPLETED"
                        ? "bg-green-200 text-green-700"
                        : project.status === "ACTIVE"
                        ? "bg-yellow-200 text-yellow-700"
                        
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

      {/* Pagination remains SAME */}
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
