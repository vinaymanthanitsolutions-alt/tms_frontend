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
import { BLUEBARCHARTDATA } from "../../data";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );
  

const BlueBarChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        display: false,
        grid: { display: false },
      },
      x: {
        display: false,
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full max-w-full h-60 bg-white rounded-lg p-4">
      <Bar options={options} data={BLUEBARCHARTDATA} />
    </div>
  );
};

export default BlueBarChart