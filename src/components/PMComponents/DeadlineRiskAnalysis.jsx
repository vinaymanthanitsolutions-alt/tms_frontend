import React from "react";
import { AlertTriangle } from "lucide-react";

export default function DeadlineRiskAnalysis() {

  // ✅ Dummy Data
  const riskData = [
    {
      label: "Overdue Projects",
      value: 14,
      color: "bg-red-500",
      textColor: "text-red-500",
      note: "6 High Priority",
    },
    {
      label: "Due This Week",
      value: 32,
      color: "bg-amber-400",
      textColor: "text-amber-500",
      note: "12 Pending",
    },
    {
      label: "Safe Projects",
      value: 54,
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      note: "28 On Track",
    },
  ];

  return (
    <div className="bg-white rounded-xl  p-6 h-[258px] flex flex-col">

      {/* Heading */}
      <div className="flex items-center gap-2 mb-6">

  <div className="bg-orange-100 p-3 rounded-xl">
    <AlertTriangle size={20} className="text-orange-500" />
  </div>

  <h2 className="font-semibold text-gray-800">
    Deadline Risk Analysis
  </h2>

</div>

      {/* Risk Bars */}
      <div className="space-y-5 flex-1">

        {riskData.map((item) => (
          <div key={item.label}>

            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-gray-600">
                {item.label}
              </span>

              <span className={`${item.textColor} font-semibold`}>
                {item.note}
              </span>
            </div>

            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-700`}
                style={{ width: `${item.value}%` }}
              />
            </div>

          </div>
        ))}

      </div>

      {/* Insight Footer */}
      {/* <div className="mt-5 pt-4  text-[11px] text-gray-400 italic">
        Risk calculated based on remaining deadlines and project velocity.
      </div> */}

    </div>
  );
}