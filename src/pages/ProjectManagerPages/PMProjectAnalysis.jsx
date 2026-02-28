import React from "react";
import {  Calendar } from "lucide-react";

import ProjectStatusDonut from "../../components/PMComponents/ProjectStatusDonut";
import ProjectCompletionTrend from "../../components/PMComponents/ProjectCompletionTrend";
import ProjectsPerTL from "../../components/PMComponents/ProjectsPerTL";
import DeadlineRiskAnalysis from "../../components/PMComponents/DeadlineRiskAnalysis";

const PMProjectAnalysis = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ✅ Page Heading */}
      <div className="flex justify-between items-center  pb-2 rounded-lg  ">
        
        <div className="flex items-start gap-4 mb-6">

          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Project Analysis Overview
            </h1>
            <p className="text-sm text-gray-500">
              Monitor project status, health scores and deadline adherence.
            </p>
          </div>
        </div>

        {/* Calendar Section */}
        {/* <div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
          <Calendar size={18} />
          <button className="text-sm">Calendar</button>
        </div> */}

      </div>

      {/* ✅ Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <ProjectStatusDonut />
          <ProjectsPerTL />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <ProjectCompletionTrend />
          <DeadlineRiskAnalysis />
        </div>

      </div>

    </div>
  );
};

export default PMProjectAnalysis;