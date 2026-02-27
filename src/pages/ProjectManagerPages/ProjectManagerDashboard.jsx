import React, { useEffect, useState } from "react";
import Home from "../Home";
import { UsersRound, Proportions, CircleCheck } from "lucide-react";

import { getTeamCounts, getProjectCounts,getPMProjectReport } from "../../services/ManagerServices/dashboardService";

const ProjectManagerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [stats, setStats] = useState({
    totalTL: 0,
    totalProjects: 0,
    activeProjects: 0,
    pendingProjects: 0,
  });

  const [projectReport, setProjectReport] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const pmId = "PM001";

      const [teamData, projectData, reportData] = await Promise.all([
        getTeamCounts(pmId),
        getProjectCounts(pmId),
        getPMProjectReport(pmId),
      ]);

      // 🔹 Set Top Cards Stats
      setStats({
        totalTL: teamData.total_teams,
        totalProjects: projectData.total_projects,
        activeProjects: projectData.active,
        pendingProjects: projectData.planning,
      });

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 🔹 Fixed Pattern: Yellow → Red → Green
      const patternDays = [3, 1, 6]; 
      // 3 = yellow (<=4)
      // 1 = red (<=2)
      // 6 = green (>4)

      const generateDummyProjects = () => {
        return Array.from({ length: 4 }, (_, i) => {
          const deadline = new Date(today);
          deadline.setDate(today.getDate() + patternDays[i % 3]);

          return {
            project_id: `DUM${i + 1}`,
            project_name: `Demo Project ${i + 1}`,
            status:
              i % 3 === 0
                ? "active"
                : i % 3 === 1
                ? "completed"
                : "planning",
            deadline: deadline.toISOString(),
            team_leaders: [
              {
                team_leader_id: `TL${i + 10}`,
                team_leader_name: `Team Leader ${i + 1}`,
              },
            ],
          };
        });
      };

      const finalProjects = [...reportData, ...generateDummyProjects()];

      setProjectReport(finalProjects);
      setCurrentPage(1);

      const next7Days = new Date(today);
      next7Days.setDate(today.getDate() + 7);
      next7Days.setHours(23, 59, 59, 999);

      const upcoming = finalProjects
        .filter((project) => {
          const deadline = new Date(project.deadline);
          return deadline >= today && deadline <= next7Days;
        })
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

      setUpcomingDeadlines(upcoming);

    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  fetchDashboardData();
}, []);

// 🔹 Flatten projects (because of team_leaders mapping)
const flattenedProjects = projectReport.flatMap((project) =>
  project.team_leaders.map((tl) => ({
    ...project,
    team_leader_id: tl.team_leader_id,
    team_leader_name: tl.team_leader_name,
  }))
);

const totalPages = Math.ceil(flattenedProjects.length / itemsPerPage);

const paginatedProjects = flattenedProjects.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);



  return (
    <>
      {/* MAIN WRAPPER */}
<div className="
  bg-gray-50
  px-3 sm:px-6 lg:px-10
  py-4
  space-y-6
" style={{ minHeight: "calc(100vh - 4.4rem)" }}>

        {/* 🔹 TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {[
            {
              label: "Total Team Leaders",
              value: stats.totalTL,
              icon: <UsersRound size={18} />,
              bg: "bg-orange-100",
              text: "text-orange-500",
            },
            {
              label: "Total Projects",
              value: stats.totalProjects,
              icon: <Proportions size={18} />,
              bg: "bg-blue-100",
              text: "text-blue-500",
            },
            {
              label: "Active Projects",
              value: stats.activeProjects,
              icon: <Proportions size={18} />,
              bg: "bg-green-100",
              text: "text-green-500",
            },
            {
              label: "Pending Projects",
              value: stats.pendingProjects,
              icon: <CircleCheck size={18} />,
              bg: "bg-yellow-100",
              text: "text-yellow-500",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 sm:p-4"
            >
              <div className=" flex  flex-col gap-2 pl-2">
                <div className="flex gap-3 items-center">
                  <div className={`${card.bg} ${card.text} p-2 rounded-md`}>
                  {card.icon}
                </div>

                <div>
                  <p className="text-sm ">
                    {card.label}
                  </p>
                  
                </div>
                </div>
                <h3 className="text-xl sm:text-2xl ml-1 font-semibold  text-gray-700">
                    {card.value + 80}
                  </h3>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 MAIN SECTIONS: flex so Total Projects takes remaining space, Upcoming Deadlines fixed width until wrap */}
        <div className="flex flex-wrap gap-4 min-[1200px]:flex-nowrap min-[1200px]:gap-6 w-full min-w-0 items-stretch">

  {/* LEFT DIV - TOTAL PROJECTS (flexes to fill; full width when upcoming is on next line) */}
 <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col w-full min-w-0 min-[1200px]:flex-1">
            <h2
              className="text-sm tracking-wide  mb-3 font-medium"

            >
              TOTAL PROJECTS
            </h2>

            {/* TABLE WRAPPER */}
           <div className="flex-1 overflow-x-auto rounded-md min-w-0">
              <table className="w-full min-w-[500px] text-sm text-left border border-gray-200">
  <thead className="sticky top-0 z-10 bg-gray-100">
    <tr className="border-b border-gray-200 bg-gray-100 text-gray-600 uppercase">
      <th className="py-3 px-3 font-medium uppercase">Project Name</th>
      <th className="py-3 px-3 font-medium uppercase">Assigned TL</th>
      <th className="py-3 px-3 font-medium uppercase">Status</th>
      <th className="py-3 px-3 font-medium uppercase">Deadline</th>
    </tr>
  </thead>

  <tbody >
    {paginatedProjects.map((project) => (
  <tr
    key={`${project.project_id}-${project.team_leader_id}`}
    className="border-b border-gray-200 hover:bg-gray-50 transition"
  >
    <td className="py-3 px-3">
      {project.project_name}
    </td>

    <td className="py-2 px-3 text-gray-600">
      {project.team_leader_name}
    </td>

    <td className="py-2 px-3">
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full 
        text-xs font-medium border ${
          project.status.toLowerCase() === "completed"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : project.status.toLowerCase() === "active"
            ? "bg-blue-50 text-blue-700 border-blue-200"
            : "bg-violet-50 text-violet-700 border-violet-200"
        }`}
      >
        {project.status.charAt(0).toUpperCase() +
          project.status.slice(1).toLowerCase()}
      </span>
    </td>

    <td className="py-2 px-3 text-gray-600">
      {new Date(project.deadline).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </td>
  </tr>
))}
  </tbody>
</table>
<div className="
flex
flex-col
sm:flex-row
justify-center
items-center
gap-3
mt-4
">

  {/* Previous */}
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-1.5 rounded-md border border-gray-300 
               bg-white text-gray-700 text-sm font-medium
               hover:bg-gray-100 hover:shadow-sm
               transition-all duration-200
               disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Previous
  </button>

  {/* Page Info */}
  <span className="text-sm font-medium text-gray-700">
    Page <span className="font-semibold">{currentPage}</span> of{" "}
    <span className="font-semibold">{totalPages}</span>
  </span>

  {/* Next */}
  <button
    onClick={() =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    disabled={currentPage === totalPages}
    className="px-4 py-1.5 rounded-md border border-gray-300 
               bg-white text-gray-700 text-sm font-medium
               hover:bg-gray-100 hover:shadow-sm
               transition-all duration-200
               disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Next
  </button>

</div>

            </div>
          </div>

          {/* RIGHT DIV - UPCOMING DEADLINES (fixed 320px when on same row; full width when wrapped below 1200px) */}
         <div className="bg-white rounded-lg shadow-sm p-4 
                flex flex-col h-fit w-full
                min-[1200px]:w-[320px] min-[1200px]:shrink-0 min-[1200px]:max-w-[320px]
                max-h-[420px] sm:max-h-[480px] min-[1200px]:max-h-[calc(100vh-260px)]">

            <h2 className="text-sm tracking-wide mb-3 font-medium shrink-0">
              UPCOMING DEADLINES
            </h2>

            <div className="overflow-y-auto overflow-x-auto flex-1 min-h-[200px] min-w-0 -mx-1 px-1">
             <table className="w-full min-w-[260px] text-sm text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-gray-100">
                  <tr className="border-b border-gray-200 bg-gray-100 text-gray-600">
                    <th className="py-3 px-3 font-medium uppercase whitespace-nowrap">Title</th>
                    <th className="py-3 px-3 font-medium uppercase whitespace-nowrap">Time Remaining</th>
                  </tr>
                </thead>

             <tbody>
  {upcomingDeadlines.length === 0 ? (
    <tr>
      <td colSpan={2} className="py-6 text-center text-gray-500 text-sm">
        No upcoming deadlines in next 7 days
      </td>
    </tr>
  ) : (
    upcomingDeadlines.map((project) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const deadlineDate = new Date(project.deadline);
      deadlineDate.setHours(0, 0, 0, 0);

      const diffTime = deadlineDate - today;
      const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return (
        <tr
          key={project.project_id}
          className="border-b border-gray-200  hover:bg-gray-50 transition"
        >
          <td className="py-3 px-3">{project.project_name}</td>

        <td className="py-2 px-3">
  <span
    className={`inline-flex items-center px-3 py-1.5 rounded-full 
    text-xs font-semibold border ${
      remainingDays <= 2
        ? "bg-red-50 text-red-600 border-red-200"
        : remainingDays <= 4
        ? "bg-yellow-50 text-yellow-600 border-yellow-200"
        : "bg-green-50 text-green-600 border-green-200"
    }`}
  >
    {remainingDays === 0
      ? "Due Today"
      : remainingDays === 1
      ? "1 day left"
      : `${remainingDays} days left`}
  </span>
</td>
        </tr>
      );
    })
  )}
</tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
  
    </>
  );
};

export default ProjectManagerDashboard;