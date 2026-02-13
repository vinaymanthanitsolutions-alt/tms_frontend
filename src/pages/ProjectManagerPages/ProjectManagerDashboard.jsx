import React, { useEffect, useState } from "react";
import Home from "../Home";
import { UsersRound, Proportions, CircleCheck } from "lucide-react";

const ProjectManagerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [stats, setStats] = useState({
    totalTL: 0,
    totalProjects: 0,
    activeProjects: 0,
    pendingProjects: 0,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/pm-dashboard");
  //       const data = await res.json();

  //       setProjects(data.projects || []);
  //       setUpcoming(data.upcomingDeadlines || []);
  //       setStats(data.stats || {});
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      {/* MAIN WRAPPER */}
<div className="overflow-hidden px-4 sm:px-6 lg:px-10 py-4 space-y-6 ">

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
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3"
            >
              <div className="flex items-center gap-3">
                <div className={`${card.bg} ${card.text} p-2 rounded-md`}>
                  {card.icon}
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    {card.label}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {card.value}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 MAIN SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT DIV - TOTAL PROJECTS */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-2 max-h-80 flex flex-col ">
            <h2
              className="text-sm tracking-wide text-gray-500 mb-3"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              TOTAL PROJECTS
            </h2>

            {/* TABLE WRAPPER */}
            <div className="overflow-y-auto">
              <table className="w-full text-sm text-gray-600 text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-200">
                    <th className="py-2 px-3 font-medium ">Title</th>
                    <th className="py-2 px-3 font-medium">Assigned TL</th>
                    <th className="py-2 px-3 font-medium">Status</th>
                    <th className="py-2 px-3 font-medium">Deadline</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    {
                      id: 1,
                      title: "CRM System",
                      tl: "Rahul",
                      status: "Active",
                      deadline: "15 Feb 2026",
                    },
                    {
                      id: 2,
                      title: "HR Portal",
                      tl: "Amit",
                      status: "Pending",
                      deadline: "20 Feb 2026",
                    },
                  ].map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-3">{project.title}</td>
                      <td className="py-2 px-3">{project.tl}</td>
                      <td className="py-2 px-3">{project.status}</td>
                      <td className="py-2 px-3">{project.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT DIV - UPCOMING DEADLINES */}
          <div className="bg-white rounded-lg shadow-sm p-4 max-h-180 flex flex-col">
            <h2
              className="text-sm tracking-wide text-gray-500 mb-3"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              UPCOMING DEADLINES
            </h2>

            <div className="overflow-y-auto">
              <table className="w-full text-sm text-gray-600 text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-200">
                    <th className="py-2 px-3 font-medium">Title</th>
                    <th className="py-2 px-3 font-medium">Deadline</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    { id: 1, title: "Payment Module", deadline: "12 Feb 2026" },
                    { id: 2, title: "UI Fixes", deadline: "14 Feb 2026" },
                  ].map((task) => (
                    <tr
                      key={task.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-3">{task.title}</td>
                      <td className="py-2 px-3">{task.deadline}</td>
                    </tr>
                  ))}
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