import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line as LineChart } from "react-chartjs-2";
import { LINECHARTDATA } from "../../data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const Line = () => {
  const options = {};

  return <div className="w-[60%] ">
    <LineChart options={options} border-width data={LINECHARTDATA} />
  </div>;
};
