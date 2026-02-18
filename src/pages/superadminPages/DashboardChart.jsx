import { 
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const COLORS = ["#10B981", "#3B82F6", "#EF4444", "#FFEB3B"];

export default function DashboardChart() {

  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/empCounts?manager_id=SA001");

      console.log("API RESPONSE:", res.data);

      const counts = res.data.data; 

      setPieData([
        { name: "TOTAL ADMIN", value: counts.total_employees || 0 },
        { name: "ACTIVE ADMIN", value: counts.active || 0 },
        { name: "INACTIVE ADMIN", value: counts.inactive || 0 },
        { name: "SUSPENDED", value: counts.suspended || 0 },
      ]);

      // ✅ FIXED HERE
      setBarData([
        { week: "week1", ACTIVE: 12, INACTIVE: 5 },
        { week: "week2", ACTIVE: 18, INACTIVE: 4 },
        { week: "week3", ACTIVE: 10, INACTIVE: 8 },
        { week: "week4", ACTIVE: 22, INACTIVE: 3 },
       
      ]);

    } catch (error) {
      console.error("Error fetching employee counts:", error);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-50 h-106">

      {/* PIE CHART */}
      <div className="bg-white p-6 rounded-xl ml-5 mt-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">
          Admin Overview
        </h2>

        <div className="w-full h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="bg-white p-6 rounded-xl border mt-6 border-gray-200">
        <h2 className="text-lg font-semibold mb-4">
          Weekly Admin Status
        </h2>

        <div className="w-full h-72">
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ACTIVE" fill="#10B981" />
              <Bar dataKey="INACTIVE" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
