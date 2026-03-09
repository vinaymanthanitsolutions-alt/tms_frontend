import { Rocket } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const itemsPerPage = 5;

const ProjectReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ✅ Fetch API (ONLY ONCE / PAGE CHANGE)
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
  }, [currentPage,debouncedSearch]);

  // ✅ Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);



  useEffect(() => {
  setCurrentPage(1);
}, [debouncedSearch]);

  // ✅ FRONTEND FILTER (debounced)
  const filteredProjects = projects.filter((project) => {
    return (
      project.projectName
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      project.adminId
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      project.manager
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  });

  /* ✅ Pagination Logic (UPDATED) */
 const totalPages = Math.max(
  1,
  Math.ceil(filteredProjects.length / itemsPerPage)
);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div className="p-5">
      <div>
        <h1 className="text-2xl font-semibold">Project Details</h1>
        <p className="text-sm text-gray-500 mb-6">
          Project's work under the admin
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 bg-white border border-gray-200 p-4 rounded-lg">
        <div className="relative w-full sm:w-1/3 lg:w-1/3">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Admin ID & manager.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // ✅ reset page
            }}
            className="border border-gray-200 pl-10 pr-3 py-2 rounded w-full focus:outline-none"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl  border border-gray-200 overflow-x-auto">
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
  {currentProjects.length > 0 ? (
    currentProjects.map((project, index) => (
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
            <div className="truncate w-40">{project.projectName}</div>
            <div className="text-[0.60rem] text-gray-500 mt-1">
              ID: {project.projectCode}
            </div>
          </div>
        </td>

        <td className="px-2 py-3 text-center">
          <span
            className={`px-3 py-1 text-xs rounded-xl ${
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
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center p-6 text-gray-500">
        No Project Found
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
  {/* LEFT TEXT */}
  <div className="text-sm text-gray-600">
   Showing {filteredProjects.length} project
    {filteredProjects.length !== 1 ? "s" : ""}
    {debouncedSearch && (
      <span className="ml-1 text-emerald-600">
        for "{debouncedSearch}"
      </span>
    )}
  </div>

  {/* RIGHT BUTTONS */}
  <div className="flex gap-2 items-center">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
      disabled={currentPage <= 1}
      className={`px-4 py-2 rounded-md border ${
        currentPage <= 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
      }`}
    >
      Prev
    </button>

    <div className="text-sm text-gray-700">
      Page {currentPage} of {totalPages}
    </div>

    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
      }
      disabled={currentPage >= totalPages}
      className={`px-4 py-2 rounded-md border ${
        currentPage >= totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
      }`}
    >
      Next
    </button>
  </div>
</div>
    </div>
  );
};

export default ProjectReport;