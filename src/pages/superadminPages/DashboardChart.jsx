import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function DashboardChart() {
  const [pieData, setPieData] = useState({
  labels: [],
  datasets: [],
});

const [lineData, setLineData] = useState({
  labels: [],
  datasets: [],
});


  useEffect(() => {
    // Dummy data for Pie Chart (Project Stats)
    setPieData({
      labels: ["Total Projects", "Completed", "Pending", "New (1 Month)"],
      datasets: [
        {
          label: "Projects",
          data: [12, 5, 6, 3],
          backgroundColor: ["#10B981", "#3B82F6", "#FBBF24", "#A78BFA"],
          borderWidth: 1,
        },
      ],
    });

    // Dummy data for Line Chart (Weekly Employee Status)
    setLineData({
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Active",
          data: [12, 15, 10, 18],
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          tension: 0.3,
        },
        {
          label: "Inactive",
          data: [3, 2, 5, 1],
          borderColor: "#EF4444",
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          tension: 0.3,
        },
      ],
    });
  }, []);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-50 h-106">

      {/* PIE CHART */}
      <div className="bg-white p-6 rounded-xl ml-5 mt-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Project Status Overview</h2>
        <div className="w-full h-72">
          <Pie data={pieData} />
        </div>
      </div>

      {/* LINE CHART */}
      <div className="bg-white p-6 rounded-xl border mt-6 border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Weekly Admin Status</h2>
        <div className="w-full h-72">
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                tooltip: { mode: "index", intersect: false },
              },
              interaction: {
                mode: "nearest",
                axis: "x",
                intersect: false,
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
