import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";



import {
  Users,
  ClipboardList,
  CheckCircle,
  Hourglass,
  Lightbulb,
  UserCog,
  UserCheck,
  Briefcase,
  Code,
  Braces,
} from "lucide-react";
import OrangeButton from "../../components/OrangeButton";

const Dashboard = () => {

  //state for employee count
  const [employeeCounts, setEmployeeCounts] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
  });

  // state for project count
  const [projectCounts, setProjectCounts] = useState({
    total: 0,
    planning: 0,
    active: 0,
    completed: 0,
  });

  //state for role employee count
  const [roleCounts, setRoleCounts] = useState({
    total: 0,
    admin: 0,
    projectManager: 0,
    teamLeader: 0,
    developer: 0,
    tester: 0,
  });
  const cards = [
    {
      icon: <Users size={28} />,
      title: "Total Emp",
      value: employeeCounts.total,
      color: "from-blue-500 to-blue-400",
      // icon: <Users size={28} />,
    },
    {
      title: "Total Project",
      value: projectCounts.total,
      color: "from-orange-500 to-orange-400",
      icon: <ClipboardList size={28} />,
    },
    {
      title: "Completed ",
      value: projectCounts.completed,
      color: "from-green-500 to-green-400",
      icon: <CheckCircle size={28} />,
    },
    {
      title: "Pending ",
      value: projectCounts.planning + projectCounts.active,
      color: "from-teal-500 to-teal-400",
      icon: <Hourglass size={28} />,
    },
    {
      title: "New Projects",
      value: 4,
      color: "from-purple-500 to-purple-400",
      icon: <Lightbulb size={28} />,
    },
  ];

  const lineData = [
    { day: "Week1", Active: 80, Inactive: 50 },
    { day: "Week2", Active: 70, Inactive: 85 },
    { day: "Week3", Active: 80, Inactive: 70 },
    { day: "Week4", Active: 60, Inactive: 70 },
    { day: "Week5", Active: 90, Inactive: 80 },
    { day: "Week6", Active: 65, Inactive: 50 },
    // { day: "Week7", active: 92, inactive: 90 },
  ];

  const pieData = [
    {
      name: "Completed",
      value: projectCounts.completed,
    },
    {
      name: "Active",
      value: projectCounts.active,
    },
    {
      name: "Planning",
      value: projectCounts.planning,
    },
    {
      name: "Total Project",
      value: projectCounts.total,
    },
  ];

  const pieColors = ["#22c55e", "#3b82f6", "#f97316", "#8b5cf6"];

  const deadlines = [
    { pid: "PR001", aid: "A001", days: 3, progress: 75 },
    { pid: "PR002", aid: "A002", days: 5, progress: 55 },
    { pid: "PR003", aid: "A003", days: 7, progress: 30 },
    { pid: "PR005", aid: "A003", days: 7, progress: 80 },


  ];



  const roles = [
    { role: "Admins", value: roleCounts.admin, icon: <UserCog size={18} /> },
    { role: "Project Managers", value: roleCounts.projectManager, icon: <Briefcase size={18} /> },
    { role: "Team Leaders", value: roleCounts.teamLeader, icon: <UserCheck size={18} /> },
    { role: "Developers", value: roleCounts.developer, icon: <Code size={18} /> },
    { role: "Testers", value: roleCounts.tester, icon: <Braces size={18} /> },
  ];

  const latestAdmin = [
    { name: "Amit Sharma", createdAt: "2025-02-18", status: "Active" },
    { name: "Megha", createdAt: "2025-09-22", status: "InActive" },
    { name: "Rohit Verma ", createdAt: "2025-11-05", status: "Active" },
    // { name: "vashnavi ", createdAt: "2025-11-07", status: "InActive" },
  ];



  const getInitials = (name = "") => {
    if (!name) return "";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0][0]?.toUpperCase() || "";
    }

    return (
      (words[0][0] || "").toUpperCase() +
      (words[1][0] || "").toUpperCase()
    );
  };

  //employee count
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("http://localhost:8080/empCounts");
        const result = await res.json();

        if (result.success) {
          setEmployeeCounts({
            total: result.data.total_employees,
            active: result.data.active,
            inactive: result.data.inactive,
            suspended: result.data.suspended,
          });
        }
      } catch (error) {
        console.error("Error fetching employee counts:", error);
      }
    };

    fetchCounts();
  }, []);

  //project count
  useEffect(() => {
    const fetchProjectCounts = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/projectCounts"
        );

        const result = await res.json();

        if (result.success) {
          setProjectCounts({
            total: result.data.total_projects,
            planning: result.data.planning,
            active: result.data.active,
            completed: result.data.completed,
          });
        }
      } catch (error) {
        console.error("Project Count Error:", error);
      }
    };

    fetchProjectCounts();
  }, []);

  //role employee count
  useEffect(() => {
    const fetchRoleCounts = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/empRoleCount?role=SUPER_ADMIN"
        );

        const result = await res.json();

        if (result.success) {
          setRoleCounts({
            total: result.data.total_employees,
            admin: result.data.admin,
            projectManager: result.data.project_manager,
            teamLeader: result.data.team_leader,
            developer: result.data.developer,
            tester: result.data.tester,
          });
        }
      } catch (error) {
        console.error("Role Count Error:", error);
      }
    };

    fetchRoleCounts();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8">
        Dashboard</h1> */}

      {/* Cards */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${card.color} text-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg flex items-center gap-3 sm:gap-4 hover:shadow-xl min-w-0`}

          >

            <div className="opacity-90">{card.icon}</div>
            <div>
              <p className="text-sm opacity-90">{card.title}</p>
              <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
            </div>
            {/* <div className="opacity-90">{card.icon}</div> */}
          </div>

        ))}
      </div>

      {/* Main Layout */}
      <div className="gap-4 md:gap-6">
        {/* Left Section */}
        <div className=" space-y-6">
          {/* Line Chart */}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4 ">
            <div className="bg-white p-6 rounded-xl   ">
              <h2 className="text-lg font-semibold mb-4">
                Admin Status
              </h2>

              <ResponsiveContainer width="100%" height={200} className="sm:h-[250px] text-sm mt-12">
                <AreaChart data={lineData}>

                  <defs>
                    {/* Active Gradient */}
                    <linearGradient id="colorActive" >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                    </linearGradient>

                    {/* Inactive Gradient */}
                    <linearGradient id="colorInactive" >
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>


                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />

                   <Legend
                      wrapperStyle={{
                        fontSize: "16px",
                        paddingTop: "10px",
                      }}
                    />

                  <Area
                    type="monotone"
                    dataKey="Active"
                    stroke="#3b82f6"
                    fill="url(#colorActive)"
                    strokeWidth={2}
                  />

                  <Area
                    type="monotone"
                    dataKey="Inactive"
                    stroke="#f59e0b"
                    fill="url(#colorInactive)"
                    strokeWidth={2}
                  />

                </AreaChart>
              </ResponsiveContainer>



            </div>
       {/*  pie chart project Status  */}
            <div className="bg-white p-4 sm:p-6 rounded-xl  w-full">
              <h2 className="text-sm sm:text-lg font-semibold mb-4 text-center sm:text-left">
                Project Status
              </h2>

              <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      innerRadius={40}
                      outerRadius={90}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={pieColors[index]} />
                      ))}
                    </Pie>

                    <Tooltip />

                    <Legend
                      wrapperStyle={{
                        fontSize: "15px",
                        paddingTop: "10px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
         

          {/* Bottom Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Roles */}
            <div className="bg-white p-6 sm:p-5 rounded-xl  overflow-x-auto w-full">
              <h2 className="text-lg font-semibold mb-4">
                Employee Roles
              </h2>
              <div className="space-y-2">
                {roles.map((role, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gray-100 px-2 sm:px-3 py-4 rounded-lg text-xs sm:text-sm">

                    <div className="flex items-center gap-2">
                      {role.icon}
                      <span>{role.role}</span>
                    </div>
                    <span className="font-semibold">{role.value}</span>
                  </div>
                ))}
              </div>
            </div>
   

   {/* upcoming deadline */}

            <div className="bg-white p-4 sm:p-5 rounded-2xl  overflow-x-auto">
              <h2 className="text-sm sm:text-lg font-semibold mb-4">
                Upcoming Deadlines
              </h2>

              <table className="min-w-full">
                <thead>
                  <tr className="text-gray-500 text-[10px] sm:text-sm border-b border-gray-200">
                    <th className="py-1.5 px-2 text-left whitespace-nowrap">Project ID</th>
                    <th className="py-1.5 px-2 text-left whitespace-nowrap">Admin ID</th>
                    <th className="py-1.5 px-2 text-left whitespace-nowrap">Days</th>
                    <th className="py-1.5 px-2 text-left whitespace-nowrap">Progress</th>
                  </tr>
                </thead>

                <tbody>
                  {deadlines.map((item, i) => (
                    <tr
                      key={i}
                      className="last:border-none text-left text-[10px] sm:text-sm border-b border-gray-200"
                    >
                      <td className="py-2 px-2 whitespace-nowrap">{item.pid}</td>

                      <td className="py-2 px-2 whitespace-nowrap">{item.aid}</td>

                      <td className="py-2 px-2 whitespace-nowrap">{item.days}</td>

                      <td className="py-2 px-2 min-w-[120px]">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.progress < 50
                              ? "bg-red-500"
                              : item.progress < 80
                                ? "bg-yellow-400"
                                : "bg-green-500"
                              }`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>

                        <div className="text-[9px] sm:text-xs text-gray-500 mt-1">
                          {item.progress}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

       
 {/* Latest Admin */}
        <div className="lg:col-span-2 space-y-6 mt-4">
          <div className="bg-white p-6 sm:p-5 lg:p-6 rounded-2xl w-full max-w-full">
            <div className="flex justify-between items-center   ">
              <h2 className="text-lg  font-semibold  mb-4">
                Latest Admin
              </h2>
              {/* <h2 className="text-gray-400 hover:text-gray-600 text-sm sm:text-base">
                •••
              </h2> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {latestAdmin.map((admin, index) => (
                <div
                  key={index}
                  className="flex flex-col  bg-white p-4 rounded-xl shadow  transition w-full  "
                >
                  {/* Top Section */}
                  <div className="sm:items-center gap-3  w-full ">

                    <div className="flex gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                        {getInitials(admin.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {admin.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          @{admin.name.toLowerCase().replace(/\s/g, "")}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Name + Username */}

                  {/* Bottom Section */}
                  <div className="flex justify-between items-center mt-4">
                    {/* Date */}
                    <p className="text-xs text-gray-400">
                      {admin.createdAt}
                    </p>

                    {/* Status */}
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${admin.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {admin.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
