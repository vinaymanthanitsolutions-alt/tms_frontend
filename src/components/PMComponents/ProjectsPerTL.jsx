import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Users } from "lucide-react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
);

export default function ProjectsPerTL() {

  // ✅ Dummy Data
  const data = {
    labels: [
      "Divya",
      "Anjali",
      "Rahul",
      "Neha",
      "Aman",
    ],
    datasets: [
      {
        label: "Projects",

        data: [12, 18, 9, 21, 15],

        // ✅ Gradient Color Matching Your UI
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return "#F97316";

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );

          gradient.addColorStop(0, "rgba(249,115,22,0.15)");
          gradient.addColorStop(1, "#F97316");

          return gradient;
        },

        hoverBackgroundColor: "#EA580C",

        borderRadius: 8,
        borderSkipped: false,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 900,
      easing: "easeOutQuart",
    },

    plugins: {
      legend: { display: false },

      tooltip: {
        backgroundColor: "#111827",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) =>
            `${context.raw} Projects`,
        },
      },
    },

    scales: {
  x: {
    grid: {
      display: false,     // no vertical grid lines
      drawBorder: false,
    },
    ticks: {
      color: "#94A3B8",
      font: { size: 11 },
    },
  },

  y: {
    beginAtZero: true,
    grid: {
      display: false,     // ✅ removes horizontal lines ONLY
      drawBorder: false,
    },
    ticks: {
      stepSize: 6,
      color: "#94A3B8",
      font: { size: 11 },
    },
  },
},
  };

  return (
    <div className="bg-white rounded-xl  p-6 h-[320px] w-full">

      {/* ✅ Heading */}
  <div className="flex items-center gap-2 mb-4">

  <div className="bg-orange-100 p-3 rounded-xl">
  <Users size={20} className="text-orange-500" />
</div>

  <h2 className="font-semibold text-gray-800">
    Projects per Team Leader
  </h2>

</div>

      {/* ✅ Chart */}
      <div className="h-[240px]">
        <Bar data={data} options={options} />
      </div>

    </div>
  );
}