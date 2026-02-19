import React from 'react'
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
import { BARCHARTDATA } from "../../data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          display: true, // remove horizontal (y) grid lines
        },
      },
      x: {
        grid: {
          display: false, // Removes vertical (x) grid lines for consistency, can be set to true if you want vertical lines
        },
      },
    },
  };
  return (
    <div className="w-[90%] max-w-full h-[280px]">
      <Bar options={options} data={BARCHARTDATA} />
    </div>
  );
};

export default BarChart