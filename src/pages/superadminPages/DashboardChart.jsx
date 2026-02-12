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

/*  DUMMY DATA */
const pieData = [
  { name: "Total Admin", value: 40 },
  { name: "Active Admin", value: 33 },
  { name: "Deactive Admin", value: 5 },
  {name: "Suspended" , value:2}
];

const barData = [
  { month: "Jan", Active : 4, Deactive: 2 },
  { month: "Feb", Active: 6, Deactive: 3 },
  { month: "Mar", Active: 8, Deactive: 4 },
  { month: "Apr", Active: 10, Deactive: 5 },
];

const COLORS = ["#10B981", "#3B82F6", "#EF4444","#FFEB3B"]; // green, blue, red

export default function DashboardChart() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* 🔵 LEFT : PIE CHART */}
      <div className="bg-white p-6 rounded-xl ml-5  border border-gray-200">
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
                paddingAngle={5}
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

      {/* 🟢 RIGHT : BAR CHART */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">
          Monthly Admin Status
        </h2>

        <div className="w-full h-72">
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Active" fill="#10B981" />
              <Bar dataKey="Deactive" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
