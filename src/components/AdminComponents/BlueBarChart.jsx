import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BlueBarChart = ({ projects = [] }) => {
  console.log("BlueBarChart received projects:", projects);

  // Prepare chart data from projects
  const labels = projects.map((project, index) => `P${index + 1}`);
  const progressData = projects.map((project) => project.progress || 0);

  console.log("Chart labels:", labels);
  console.log("Chart progress data:", progressData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Progress (%)",
        data: progressData,
        backgroundColor: "rgba(59, 130, 246, 0.8)", // Blue color
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (context) => {
            const index = context[0].dataIndex;
            return projects[index]?.name || "Project";
          },
          label: (context) => {
            return `Progress: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      y: {
        display: false,
        grid: { display: false },
        min: 0,
        max: 100,
      },
      x: {
        display: false,
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full max-w-full h-60 bg-white rounded-lg p-4">
      {projects.length > 0 ? (
        <Bar options={options} data={chartData} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No upcoming deadlines to display
        </div>
      )}
    </div>
  );
};

export default BlueBarChart;
