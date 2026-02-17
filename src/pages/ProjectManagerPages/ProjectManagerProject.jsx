import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import CreateTeam from './CreateTeam'
import { useEffect } from "react";
import { getProjectDetails } from "../../services/projectDetailsService";

const ProjectManagerProject = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  
const [projects, setProjects] = useState([]);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
    setCurrentPage(1); // reset to page 1 when searching
  }, 1000); // 500ms delay

  return () => clearTimeout(timer);
}, [searchTerm]);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const data = await getProjectDetails(
        currentPage,
        itemsPerPage,
        debouncedSearch
      );

      setTotalPages(data.total_pages);

      const groupedProjects = {};
      data.results.forEach((item) => {
        const key = item.project_id + "-" + item.team_id;

        if (!groupedProjects[key]) {
          groupedProjects[key] = {
            projectId: item.project_id,
            title: item.project_name,
            teamId: item.team_id,
            teamHead: {
              name: item.team_leader,
              email: item.team_leader_email
            },
            employees: []
          };
        }

        if (item.employee_name) {
          groupedProjects[key].employees.push({
            name: item.employee_name,
            email: item.employee_email,
            role: item.role,
            department: item.department
          });
        }
      });

      setProjects(Object.values(groupedProjects));

    } catch (error) {
      console.log("Failed to load project details");
    }
  };

  fetchProjects();
}, [currentPage, debouncedSearch]);


  return (
    <div className="bg-gray-200 h-[calc(100vh-4.35rem)] p-4 sm:p-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">

        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 w-full sm:w-72 border border-gray-200">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by Project ID or Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none flex-1 ml-2 text-sm"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition w-full sm:w-auto"
        >
          <Plus size={20} />
          New Team
        </button>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow ">
        <div className="overflow-x-auto ">

          <table className="min-w-225 w-full text-sm text-gray-600">

            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Project ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Project Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Team ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Team Leader</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Department</th>
              </tr>
            </thead>

           <tbody>
  {projects.map((project) => {

    // If team has NO employees
    if (project.employees.length === 0) {
      return (
        <tr key={project.projectId + project.teamId}>
          <td className="px-4 py-2 font-medium">{project.projectId}</td>
          <td className="px-4 py-2 font-medium">{project.title}</td>
          <td className="px-4 py-2 font-medium">{project.teamId}</td>
          <td className="px-4 py-2 font-medium">
            <div>{project.teamHead.name}</div>
            <div className="text-xs text-gray-500">
              {project.teamHead.email}
            </div>
          </td>

          <td className="px-4 py-2 text-gray-400 italic">
            No employees found
          </td>

          <td></td>
          <td></td>
        </tr>
      );
    }

    // If team HAS employees
    return project.employees.map((employee, index) => (
      <tr
        key={`${project.projectId}-${project.teamId}-${index}`}
        className="border-b border-gray-200 hover:bg-gray-50 transition"
      >
        <td className="px-4 py-2 font-medium">
          {index === 0 ? project.projectId : ""}
        </td>

        <td className="px-4 py-2 font-medium">
          {index === 0 ? project.title : ""}
        </td>

        <td className="px-4 py-2 font-medium">
          {index === 0 ? project.teamId : ""}
        </td>

        <td className="px-4 py-2 font-medium">
          {index === 0 && (
            <>
              <div>{project.teamHead.name}</div>
              <div className="text-xs text-gray-500">
                {project.teamHead.email}
              </div>
            </>
          )}
        </td>

        <td className="px-4 py-2">
          <div>{employee.name}</div>
          <div className="text-xs text-gray-500">
            {employee.email}
          </div>
        </td>

        <td className="px-4 py-2">{employee.role}</td>
        <td className="px-4 py-2">{employee.department}</td>
      </tr>
    ));
  })}
</tbody>

          </table>

        </div>

        <div className="flex justify-center items-center gap-2 p-4">
          <button
           onClick={() => setCurrentPage(prev => prev - 1)}
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
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl px-4">
            <CreateTeam onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

    </div>
  )
}

export default ProjectManagerProject