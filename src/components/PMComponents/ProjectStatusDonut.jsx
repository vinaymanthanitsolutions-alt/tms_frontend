import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PieChart } from "lucide-react";

ChartJS.register(ArcElement, Tooltip);

export default function ProjectStatusDonut() {

  // ✅ Dummy Data
  const projectStatus = [
    { label: "Completed", value: 8, color: "#10B981" },
    { label: "In Progress", value: 5, color: "#3B82F6" },
    { label: "Delayed", value: 2, color: "#EF4444" },
    { label: "On Hold", value: 3, color: "#F59E0B" },
  ];

  // ✅ Total Projects
  const totalProjects = projectStatus.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // ✅ Chart Data
  const chartData = {
    labels: projectStatus.map((p) => p.label),
    datasets: [
      {
        data: projectStatus.map((p) => p.value),
        backgroundColor: projectStatus.map((p) => p.color),
        borderWidth: 0,
        cutout: "72%",
        hoverOffset: 8,
      },
    ],
  };

  // ✅ Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} Projects`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl px-4 pt-3 pb-4  transition">

      {/* ✅ Header */}
      <div className="flex items-center justify-between mb-4">

        {/* Icon + Title */}
        <div className="flex items-center gap-2">
          <div className="bg-orange-100 p-2 rounded-lg">
            <PieChart size={18} className="text-orange-500" />
          </div>

          <h2 className="font-semibold text-gray-800">
            Project Status Overview
          </h2>
        </div>

        {/* Total Projects Badge */}
        {/* <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
            Total
          </p>
          <p className="text-lg font-semibold text-gray-800">
            {totalProjects}
          </p>
        </div> */}

      </div>

      {/* ✅ Chart + Legend */}
      <div className="flex items-center justify-center gap-12">

        {/* Donut Chart */}
        <div className="relative w-[220px] h-[220px]">
          <Doughnut data={chartData} options={options} />

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-800">
              {totalProjects}
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">
              Total 
            </span>
            
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {projectStatus.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-1 rounded-md hover:bg-gray-50 transition"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-sm text-gray-700">
                {item.label}
              </span>

              <span className="text-sm font-medium text-gray-600 ml-auto">
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}