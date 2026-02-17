import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProjectTrendChart = () => {

  // 🔹 Dummy Backend Data
  const trendData = [
    { month: "Jan", total: 8, completed: 3 },
    { month: "Feb", total: 12, completed: 5 },
    { month: "Mar", total: 10, completed: 4 },
    { month: "Apr", total: 18, completed: 9 },
    { month: "May", total: 22, completed: 13 },
    { month: "Jun", total: 26, completed: 17 },
  ];

  const data = {
    labels: trendData.map((item) => item.month),
    datasets: [
      {
        label: "Total Projects",
        data: trendData.map((item) => item.total),
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: "Completed",
        data: trendData.map((item) => item.completed),
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ProjectTrendChart;