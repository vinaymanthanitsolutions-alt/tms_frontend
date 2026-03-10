import React, { useEffect, useState } from "react";
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
import { getMonthlyProjectStats } from "../../services/AdminServices";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      const response = await getMonthlyProjectStats();

      if (response.success && response.data.length > 0) {

        const recentData = response.data.slice(-7);

        const labels = recentData.map((item) => {
          const date = new Date(item.month + "-01");
          return date.toLocaleString("default", { month: "short" });
        });

        const totalCapacity = recentData.map(
          (item) => item.total_projects * 100,
        );

        const totalProgress = recentData.map((item) => item.total_progress);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Project",
              data: totalCapacity,
              backgroundColor: "rgba(249, 115, 22, 0.8)", // Orange
              borderColor: "rgba(249, 115, 22, 1)",
              borderWidth: 1,
              borderRadius: 4,
            },
            {
              label: "Completed",
              data: totalProgress,
              backgroundColor: "rgba(156, 163, 175, 0.8)", // Gray
              borderColor: "rgba(156, 163, 175, 1)",
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        });
      }
    };

    fetchMonthlyStats();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Project Progress",
        align: "start",
        font: {
          size: 16,
          weight: "normal",
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-[90%] max-w-full h-70">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
