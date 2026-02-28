import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TrendingUp } from "lucide-react";
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

export default function ProjectCompletionTrend() {

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
   datasets: [
  {
    label: "Projects Completed",
    data: [2, 4, 3, 6, 5, 8],

    borderColor: "#F97316",
    backgroundColor: "rgba(249,115,22,0.15)",
    tension: 0.4,
    fill: true,

    pointRadius: 4,
    pointHoverRadius: 7,
    pointBackgroundColor: "#ffffff",
    pointBorderColor: "#F97316",
    pointBorderWidth: 2,
  },
],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: { display: false },

      tooltip: {
        enabled: true,
        backgroundColor: "#111827",
        padding: 10,
        displayColors: false,
        callbacks: {
          title: (items) => `Month: ${items[0].label}`,
          label: (context) =>
            `${context.raw} Projects Completed`,
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
      stepSize: 2,
      color: "#94A3B8",
      font: { size: 11 },
    },
  },
},
  };

  return (
    <div className="bg-white rounded-xl  px-4 pt-4 h-[320px] w-full">

      {/* Heading */}
      <div className="flex items-center justify-between mb-4">

  <div className="flex items-center gap-2">
    <div className="bg-orange-100 p-2 rounded-lg">
      <TrendingUp size={18} className="text-orange-500" />
    </div>

    <h2 className="font-semibold text-gray-800">
      Project Completion Trend
    </h2>
  </div>

  <span className="text-emerald-600 text-sm font-medium">
    ↑ 12%
  </span>

</div>

      <div className="h-[240px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}