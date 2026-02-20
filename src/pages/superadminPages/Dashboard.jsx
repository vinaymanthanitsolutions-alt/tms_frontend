import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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

const Dashboard = () => {
  const cards = [
    {
      icon: <Users size={28} />,
      title: "Total Emp",
      value: 150,
      color: "from-blue-500 to-blue-400",
      // icon: <Users size={28} />,
    },
    {
      title: "Total Project",
      value: 24,
      color: "from-orange-500 to-orange-400",
      icon: <ClipboardList size={28} />,
    },
    {
      title: "Completed ",
      value: 12,
      color: "from-green-500 to-green-400",
      icon: <CheckCircle size={28} />,
    },
    {
      title: "Pending ",
      value: 8,
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
    { day: "Mon", active: 80, inactive: 60 },
    { day: "Tue", active: 70, inactive: 75 },
    { day: "Wed", active: 78, inactive: 70 },
    { day: "Thu", active: 85, inactive: 65 },
    { day: "Fri", active: 72, inactive: 80 },
    { day: "Sat", active: 88, inactive: 85 },
    { day: "Sun", active: 92, inactive: 90 },
  ];

  const pieData = [
    { name: "Total Projects", value: 24 },
    { name: "Completed", value: 12 },
    { name: "Pending", value: 8 },
    { name: "New", value: 4 },
  ];

  const pieColors = ["#3b82f6", "#22c55e", "#f97316", "#8b5cf6"];

  const deadlines = [
    { pid: "PR001", aid: "A001", days: 3, progress: 75 },
    { pid: "PR002", aid: "A002", days: 5, progress: 55 },
    { pid: "PR003", aid: "A003", days: 7, progress: 30 },
    
  ];

  const roles = [
    { role: "Admins", count: 12, icon: <UserCog size={18} /> },
     { role: "Project Managers", count: 4, icon: <Briefcase size={18} /> },
    { role: "Team Leaders", count: 5, icon: <UserCheck size={18} /> },
    { role: "Developers", count: 38, icon: <Code size={18} /> },
     { role: "Testers", count: 18, icon: <Braces size={18} /> },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${card.color} text-white rounded-2xl p-6 shadow-lg flex items-center gap-4`}

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
     <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        {/* Left Section */}
         <div className="lg:col-span-3 space-y-6">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Active, Inactive Admins
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="inactive"
                  stroke="#f59e0b"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">Project Status</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={40}
                    outerRadius={90}
                     paddingAngle={2}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Roles */}
            <div className="bg-white p-4 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                Employee Roles
              </h2>
              <div className="space-y-4">
                {roles.map((role, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {role.icon}
                      <span>{role.role}</span>
                    </div>
                    <span className="font-bold">{role.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section  */}

         <div className="lg:col-span-2 space-y-4">
                 {/* table section */}
          <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Upcoming Deadlines
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 text-center">Project ID</th>
                <th className="py-2 text-center">Admin ID</th>
                <th className="py-2 text-center">Remaining Days</th>
                <th className="py-2 text-center">Progress</th>
              </tr>
            </thead>
            <tbody>
              {deadlines.map((item, i) => (
                <tr key={i} className="border-b last:border-none text-center">
                  <td className="py-3">{item.pid}</td>
                  <td>{item.aid}</td>
                  <td>{item.days}</td>
                  <td className="w-40">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-purple-500 h-2 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">
                      {item.progress}%
                    </span>
                  </td>
                </tr>
              ))}
              {/* ✅ 2 Blank Rows */}
             <tr className="border-b text-center">
                   <td className="py-3">&nbsp;</td>
                        <td></td>
                      <td></td>
                   <td></td>
                     </tr>

                   <tr className="text-center">
                     <td className="py-3">&nbsp;</td>
                      <td></td>
                   <td></td>
                         <td></td>
                  </tr>
            </tbody>
          </table>
          </div>

          {/*  */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex flex-row gap-55 ">
             <h2 className="text-lg font-semibold mb-4 flex flex-row gap-4">
           Latest Admin          
          </h2>
          <h2 className=" text-lg font-semibold">...</h2>
          </div>
             <div>
              
             </div>

            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
