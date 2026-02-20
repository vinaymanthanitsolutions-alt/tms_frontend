import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import CreateTeam from './CreateTeam'
import { useEffect } from "react";
import { getProjectDetails } from "../../services/ManagerServices/projectDetailsService";
const ProjectManagerProject = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [totalProjects, setTotalProjects] = useState(0);
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);

const fetchProjects = async () => {
  try {
    const data = await getProjectDetails(
      currentPage,
      itemsPerPage,
      debouncedSearch
    );

    // 🔥 BIG Dummy Data For Testing Cards Layout
    const dummyData = [];

    const projectNames = [
      "Website Redesign",
      "Inventory System",
      "Mobile Application",
      "CRM Dashboard",
      "E-Commerce Portal"
    ];

    const leaderList = [
      { name: "Aman Sharma", email: "aman@mail.com" },
      { name: "David Verma", email: "david@mail.com" },
      { name: "Neha Kapoor", email: "neha@mail.com" }
    ];

    const employeeNames = [
      "Riya Kapoor",
      "Karan Mehta",
      "Sneha Jain",
      "Arjun Singh",
      "Vikas Rao",
      "Pooja Verma",
      "Ankit Sharma",
      "Simran Kaur",
      "Rahul Malhotra",
      "Tanvi Gupta",
      "Yash Patel",
      "Nikita Shah"
    ];

    const roles = ["Developer", "Tester"];
    const departments = ["IT", "Sales", "Head"];

    // Create 5 projects
    for (let i = 0; i < 5; i++) {
      const projectId = `PRJ-${(i + 10).toString().padStart(3, "0")}`;
      const teamId = `TM${200 + i}`;
      const leader = leaderList[i % leaderList.length];

      // 🔥 Each project gets 10 employees (THIS IS IMPORTANT)
      for (let j = 0; j < 10; j++) {
        dummyData.push({
          project_id: projectId,
          project_name: projectNames[i % projectNames.length],
          team_id: teamId,
          team_leader: leader.name,
          team_leader_email: leader.email,
          employee_name: employeeNames[j % employeeNames.length],
          employee_email: `user${j}@mail.com`,
          role: roles[j % roles.length],
          department: departments[j % departments.length],
        });
      }
    }

  const backendResults = data?.results || [];

const combinedResults =
  debouncedSearch.trim() === ""
    ? [...backendResults, ...dummyData]   // show dummy only when no search
    : backendResults;                    // during search show only backend

    // Grouping logic (same as before)
    const groupedProjects = {};

    combinedResults.forEach((item) => {
      const key = item.project_id + "-" + item.team_id;

      if (!groupedProjects[key]) {
        groupedProjects[key] = {
          projectId: item.project_id,
          title: item.project_name,
          teamId: item.team_id,
          teamHead: {
            name: item.team_leader,
            email: item.team_leader_email,
          },
          employees: [],
        };
      }

      if (item.employee_name) {
        groupedProjects[key].employees.push({
          name: item.employee_name,
          email: item.employee_email,
          role: item.role,
          department: item.department,
        });
      }
    });

    setProjects(Object.values(groupedProjects));

  } catch (error) {
    console.log("Failed to load project details");
  }
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchProjects();
  }, [currentPage, debouncedSearch]);


  const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return (
    words[0][0].toUpperCase() +
    words[words.length - 1][0].toUpperCase()
  );
};

const getRoleStyle = (role) => {
  if (
    role?.toLowerCase() === "developer" ||
    role?.toLowerCase() === "tester"
  ) {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-gray-100 text-gray-700";
};


const getDepartmentStyle = (department) => {
  switch (department?.toLowerCase()) {
    case "head":
      return "bg-rose-100 text-rose-700";

    case "it":
      return "bg-indigo-100 text-indigo-700";

    case "sales":
      return "bg-amber-100 text-amber-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

// main flow starts here
  return (
    <div className="bg-gray-50 h-[calc(100vh-4.35rem)] p-4 sm:p-6">

     {/* Header Section */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

  {/* Left Title Section */}
  <div>
    <h1 className="text-2xl font-semibold text-gray-800">
      Project Management
    </h1>
    <p className="text-sm text-gray-500">
      Manage and track project teams efficiently
    </p>
  </div>

  {/* Right Controls */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">

    {/* Search Bar */}
    <div className="flex items-center px-4 py-2.5 bg-white rounded-xl 
   border border-gray-100
  focus-within:ring-2 focus-within:ring-emerald-500/20 
  transition-all duration-200 
  w-full sm:w-72 lg:w-80 max-w-full"
>
  <Search size={18} className="text-gray-400 mr-3" />

  <input
    type="text"
    placeholder="Search projects..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="outline-none flex-1 text-sm bg-transparent placeholder-gray-400"
  />
</div>

    {/* New Team Button */}
    <button
      onClick={() => setShowModal(true)}
      className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-lg hover:bg-emerald-600 transition shadow-sm w-full sm:w-auto"
    >
      <Plus size={18} />
      New Team
    </button>

  </div>

      </div>

      <div className="mt-6 bg-white rounded-lg shadow ">
       <div className="overflow-x-auto overflow-y-auto max-h-[500px]">

          <table className="min-w-225 w-full text-sm text-gray-600">

          
           <thead className="bg-gray-100 sticky top-0 z-10 ">
  <tr className="border-b border-gray-200">
    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-gray-600">
      Project ID
    </th>
    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-gray-600">
      Project Title
    </th>
    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-gray-600">
      Team ID
    </th>
    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-gray-600">
      Team Leader
    </th>
    <th className="px-4 text-center  py-3  text-sm font-medium uppercase tracking-wide text-gray-600">
      Details
    </th>
  </tr>
</thead>

           <tbody>
  {projects.map((project) => {
    if (project.employees.length === 0) return null;

    const isExpanded = expandedProject === project.projectId;

    return (
      <React.Fragment key={project.projectId}>

        {/* Main Project Row */}
        <tr
          className="border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer"
          onClick={() =>
            setExpandedProject(
              isExpanded ? null : project.projectId
            )
          }
        >
          <td className="px-4 py-3 font-medium text-slate-500">
            #{project.projectId}
          </td>

          <td className="px-4 py-3 font-medium">
            {project.title}
          </td>

          <td className="px-4 py-3 font-medium">
            {project.teamId}
          </td>

          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center 
                rounded-full bg-emerald-50 text-emerald-600 
                text-sm font-semibold border border-emerald-100">
                {getInitials(project.teamHead.name)}
              </div>
              <div>
                <div className="font-medium text-gray-800">
                  {project.teamHead.name}
                </div>
                <div className="text-xs text-gray-500">
                  {project.teamHead.email}
                </div>
              </div>
            </div>
          </td>

          <td colSpan="3" className="text-center pr-6 text-emerald-600 text-sm font-medium">
            {isExpanded ? "Hide Details" : "View Details"}
          </td>
        </tr>

        {/* Expanded Details Section */}
        {isExpanded && (
          <tr>
            <td colSpan="7" className="py-4 bg-gray-50">
  <div className="max-w-4xl mx-4">
             <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4">

                {project.employees.map((employee, index) => (
                  <div
  key={index}
  className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg 
             border border-gray-100 shadow-sm 
             hover:shadow-md transition-all duration-200"
>
  {/* Initials */}
  <div className="w-8 h-8 flex items-center justify-center 
                  rounded-full bg-gray-100 text-gray-700 
                  text-xs font-semibold">
    {getInitials(employee.name)}
  </div>

  {/* Info */}
  <div className="flex-1 w-fit">
    <div className="text-sm font-medium text-gray-800 truncate">
      {employee.name}
    </div>

    <div className="flex items-center gap-2 mt-0.5 flex-wrap">

      <span
        className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${getRoleStyle(employee.role)}`}
      >
        {employee.role}
      </span>

      <span
        className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${getDepartmentStyle(employee.department)}`}
      >
        {employee.department}
      </span>

    </div>
  </div>
                  </div>
                ))}
</div>
              </div>
            </td>
          </tr>
        )}

      </React.Fragment>
    );
  })}
</tbody>

          </table>

        </div>

        {/* Pagination Controls */}
        {/* Pagination */}
{/* Pagination */}
<div className="flex justify-center pt-6 rounded-xl">

  <div className="flex items-center gap-6">

    {/* Previous */}
    <button
    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
    disabled={currentPage === 1}
    className={`px-5 py-2 mb-3 text-sm rounded-xl border transition-all duration-150 ${
      currentPage === 1
        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }`}
  >
    Previous
  </button>

    {/* Page Info */}
    <span className="text-sm text-gray-800 mb-2">
    Page <span className="font-medium">{currentPage}</span> of{" "}
    <span className="font-medium">{totalPages}</span>
  </span>

    {/* Next */}
   <button
    onClick={() =>
      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
    }
    disabled={currentPage === totalPages}
    className={`px-5 py-2 text-sm mb-3 rounded-xl border transition-all duration-150 ${
      currentPage === totalPages
        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }`}
  >
    Next
  </button>
  </div>


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