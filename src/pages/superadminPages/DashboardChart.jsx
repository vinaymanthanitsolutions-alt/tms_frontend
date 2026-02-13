import {
 PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,  //Shows popup on hover
  Legend, 
  ResponsiveContainer,
} from "recharts";

/*  DUMMY DATA */
const pieData = [
  { name: "TOTAL ADMIN", value: 40 },
  { name: "ACTIVE ADMIN", value: 33 },
  { name: "INACTIVE ADMIN", value: 5 },
  {name: "SUSPENDED" , value:2}
];

const barData = [
  { month: "Jan", ACTIVE : 4, INACTIVE: 2 },
  { month: "Feb",ACTIVE: 6, INACTIVE: 3 },
  { month: "Mar", ACTIVE: 8,INACTIVE: 4 },
  { month: "Apr", ACTIVE: 10, INACTIVE: 5 },
];

const COLORS = ["#10B981", "#3B82F6", "#EF4444","#FFEB3B"]; // green, blue, red, yellow

export default function DashboardChart() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6  bg-gray-50 h-106">

      {/*   PIE CHART */}
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

      {/*  BAR CHART */}
      <div className="bg-white p-6 rounded-xl border mt-6 border-gray-200">
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
              <Bar dataKey="ACTIVE" fill="#10B981" />
              <Bar dataKey="INACTIVE" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
