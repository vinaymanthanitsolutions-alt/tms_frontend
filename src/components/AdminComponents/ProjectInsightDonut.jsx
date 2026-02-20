import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectInsightDonut({
  centerLabel,
  centerValue,
  data = [74, 26],
  backgroundColor = ["#F59E0B", "#E5E7EB"],
  size = 140,
}) {
  const chartData = {
    labels: ["Done", "Remaining"],
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Doughnut data={chartData} options={options} />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ fontSize: size < 120 ? "0.65rem" : "0.75rem" }}
      >
        <span className="text-gray-500 font-medium uppercase tracking-wide">
          {centerLabel}
        </span>
        <span className="text-xl font-bold text-gray-800">{centerValue}</span>
      </div>
    </div>
  );
}
