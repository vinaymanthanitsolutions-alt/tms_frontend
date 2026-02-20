// DonutChart.jsx
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Doughnut } from "react-chartjs-2";
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default function DonutChart() {
    const data = {
      labels: ["Blue", "Orange", "Green", "Red"],
      datasets: [
        {
          data: [40, 25, 20, 15],
          backgroundColor: [
            "#3B82F6",
            "#F59E0B",
            "#10B981",
            "#EF4444",
          ],
          borderWidth: 0,
          cutout: "70%", // controls thickness
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false, // hide legend
        },
        tooltip: {
          enabled: true,
        },
      },
    };
  
    return (
      <div className="relative w-fit h-30">
        <Doughnut data={data} options={options} />
  
        {/* Center Content */}
        <div className="absolute top-[20%] left-[30%] flex flex-col items-center justify-center pointer-events-none">
          <p className="text-gray-500 text-sm">Total</p>
          <h2 className="text-3xl font-bold">151</h2>
        </div>
      </div>
    );
  }
  