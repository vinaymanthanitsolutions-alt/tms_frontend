import React, { useEffect, useState } from "react";
import DonutChart from "../../components/AdminComponents/DonutChart";
import PiChart from "../../components/AdminComponents/PiChart";
import BlueBarChart from "../../components/AdminComponents/BlueBarChart";
import { getRiskOverviewData } from "../../services/AdminServices";
import { projectStatusInPercentage } from "../../extraDataHandling/projectFiltering";

const AdminRiskOverview = () => {
  const [getCount, setGetCount] = React.useState({
    totalProjects: 0,
    totalActive: 0,
    pendingApprovals: 0,
    overdueProjects: 0,
    completedProjects: 0,
    NearDeadline: 0,
    activeQueries: 0,
    CompletionRate: 0,
    projectData: [],
  });

  const [statusCount, setStatusCount] = useState({
    healthy: 0,
    medium: 0,
    highRisk: 0,
  });

  const [topHighRiskProjects, setTopHighRiskProjects] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  // Calculate status percentages
  const statusPercentages = projectStatusInPercentage({
    total: getCount.totalProjects,
    active: getCount.totalActive,
    pending: getCount.pendingApprovals,
    overdue: getCount.overdueProjects,
    completed: getCount.completedProjects,
  });

  const fetchRiskOverviewCountData = async () => {
    try {
      const data = await getRiskOverviewData();
      console.log("Risk Overview Counts:", data);
      console.log(
        "Upcoming Deadline Projects from API:",
        data.upcomingDeadlineProjects,
      );
      setGetCount({
        totalProjects: data.totalProjects,
        totalActive: data.totalActive,
        pendingApprovals: data.pendingApprovals,
        overdueProjects: data.overdueProjects,
        completedProjects: data.completedProjects || 0,
        NearDeadline: data.NearDeadline,
        activeQueries: data.activeQueries,
        CompletionRate: data.CompletionRate,
        projectData: data.projectAllData,
      });
      setUpcomingDeadlines(data.upcomingDeadlineProjects || []);
      console.log("Set upcoming deadlines to:", data.upcomingDeadlineProjects);
    } catch (error) {
      console.error("Error fetching risk overview counts:", error);
    }
  };

  // Calculate status counts based on project progress
  useEffect(() => {
    console.log("Project Data received:", getCount.projectData);
    console.log("Project Data length:", getCount.projectData?.length);

    if (getCount.projectData && getCount.projectData.length > 0) {
      let healthy = 0;
      let medium = 0;
      let highRisk = 0;
      const highRiskProjectsList = [];

      getCount.projectData.forEach((project) => {
        const progress = project.progress || 0;
        console.log(`Project: ${project.name}, Progress: ${progress}`);

        if (progress < 50) {
          highRisk++;
          highRiskProjectsList.push(project);
        } else if (progress >= 50 && progress < 80) {
          medium++;
        } else {
          healthy++;
        }
      });

      console.log("Status Counts:", { healthy, medium, highRisk });
      console.log("High Risk Projects:", highRiskProjectsList);

      setStatusCount({
        healthy,
        medium,
        highRisk,
      });

      // Sort high-risk projects by progress (lowest first) and get top 4
      const sortedHighRiskProjects = highRiskProjectsList
        .sort((a, b) => (a.progress || 0) - (b.progress || 0))
        .slice(0, 4);

      setTopHighRiskProjects(sortedHighRiskProjects);
    } else {
      console.log("No project data available or empty array");
    }
  }, [getCount.projectData]);

  useEffect(() => {
    console.log("upcomingDeadlines state changed:", upcomingDeadlines);
  }, [upcomingDeadlines]);

  useEffect(() => {
    fetchRiskOverviewCountData();
  }, []);

  return (
    <div className="bg-gray-100" style={{ minHeight: "calc(100vh - 4.4rem)" }}>
      <div className="flex justify-between bg-white px-4 pt-3 pb-4">
        <div>
          <h1 className="text-xl font-medium">Project Risk Overview</h1>
          <p className="text-xs text-gray-500">
            Monitor project status, health scores and deadline adherence.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 xxs:grid-cols-3 xxxs:grid-cols-4 xmd:grid-cols-5 lg:grid-cols-4 lar:grid-cols-5 gap-2 xlar:grid-cols-6 my-4 mx-auto justify-items-center px-2">
        {/* <div className="flex flex-wrap gap-x-14 px-2 my-2 w-fit mx-auto "> */}
        <div className="bg-white px-4 py-4 rounded-xl w-40 border border-gray-200">
          <h2 className="capitalize text-gray-600 text-sm">Total Active</h2>
          <div>
            <div className="text-2xl font-medium">{getCount.totalActive}</div>
          </div>
        </div>
        <div className="bg-white px-4 py-4 rounded-xl w-40 border border-gray-200">
          <h2 className="capitalize text-gray-600 text-sm">
            Pending Approvals
          </h2>
          <div>
            <div className="text-2xl font-medium">
              {getCount.pendingApprovals}
            </div>
          </div>
        </div>
        <div className="bg-rose-100 border border-rose-200 px-4 py-4 rounded-xl w-40 ">
          <h2 className="capitalize text-rose-600 text-sm">Overdue Projects</h2>
          <div>
            <div className="text-2xl text-rose-700 font-medium">
              {getCount.overdueProjects}
            </div>
          </div>
        </div>
        <div className="bg-orange-100 px-4 py-4 rounded-xl w-40  border border-orange-200 ">
          <h2 className="capitalize text-orange-600 text-sm">Near Deadline</h2>
          <div>
            <div className="text-2xl text-orange-700 font-medium">
              {getCount.NearDeadline}
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-4 rounded-xl w-40 border border-gray-200">
          <h2 className="capitalize text-gray-600 text-sm">Active Queries</h2>
          <div>
            <div className="text-2xl font-medium">{getCount.activeQueries}</div>
          </div>
        </div>
        <div className="bg-white px-4 py-4 rounded-xl w-40 border border-gray-200">
          <h2 className="capitalize text-gray-600 text-sm">Completion Rate</h2>
          <div>
            <div className="text-2xl font-medium">
              {getCount.CompletionRate}%
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 halfxl:grid-cols-3 gap-6 px-3 sxs:px-8">
        <div className="w-full bg-white h-full rounded-lg font-medium px-4 py-3">
          <div>Status Distribution</div>
          <div>
            {/* <div className="flex items-center px-4 h-80 justify-between"> */}
            <div className="flex flex-col sxs:flex-row items-center justify-center px-4  h-80 gap-6">
              {/* <DonutChart /> */}
              <PiChart
                activePercentage={statusPercentages.active}
                pendingPercentage={statusPercentages.pending}
                completedPercentage={statusPercentages.completed}
                overduePercentage={statusPercentages.overdue}
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500 rounded-full"></div>
                  <div className="w-22 text-gray-600 font-normal">Active</div>
                  <div className="font-semibold">
                    {statusPercentages.active}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-22 text-gray-600 font-normal">Pending</div>
                  <div className="font-semibold">
                    {statusPercentages.pending}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-500 rounded-full"></div>
                  <div className="w-22 text-gray-600 font-normal">
                    Completed
                  </div>
                  <div className="font-semibold">
                    {statusPercentages.completed}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-500 rounded-full"></div>
                  <div className="w-22 text-gray-600 font-normal">Overdue</div>
                  <div className="font-semibold">
                    {statusPercentages.overdue}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full bg-white h-full rounded-lg font-medium px-4 py-3">
          <div className="pb-3">Health Score Analysis</div>
          <div className="flex gap-2 items-center justify-center py-3 md:py-0">
            <div className="w-23 xxs:w-28 py-4 bg-green-100 border border-green-200 flex flex-col justify-center items-center rounded-lg">
              <div className="text-2xl text-green-600 ">
                {statusCount.healthy}
              </div>
              <div className="text-lg font-light text-green-500">Healthy</div>
            </div>
            <div className="w-23 xxs:w-28 py-4 bg-orange-100 border border-orange-200 flex flex-col justify-center items-center rounded-lg">
              <div className="text-2xl text-orange-600">
                {statusCount.medium}
              </div>
              <div className="text-lg font-light text-orange-500">Medium</div>
            </div>
            <div className="w-23 xxs:w-28 py-4 bg-rose-100 border border-rose-200 flex flex-col justify-center items-center rounded-lg">
              <div className="text-2xl text-rose-600">
                {statusCount.highRisk}
              </div>
              <div className="text-lg font-light text-rose-500">High Risk</div>
            </div>
          </div>
          <div className="uppercase text-xs text-gray-500 my-3">
            top high risk projects
          </div>
          <div className="flex flex-col gap-5">
            {topHighRiskProjects.length > 0 ? (
              topHighRiskProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center justify-between"
                >
                  <div>
                    <h4 className="font-normal text-sm">
                      {project.name || "Unknown Project"}
                    </h4>
                    <h5 className="text-gray-400 text-[0.65rem]">
                      ID : #{project.project_id}
                    </h5>
                  </div>
                  <div>
                    <div className="text-red-500 text-sm">
                      {project.progress || 0}%
                    </div>
                    <div className="w-32 bg-gray-200 rounded-2xl">
                      <div
                        className="p-0.5 bg-red-500 rounded-2xl"
                        style={{ width: `${project.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm text-center py-4">
                No high-risk projects found
              </div>
            )}
          </div>
          {/* ////////////////////////////// */}
        </div>
        <div className="md:col-span-2 halfxl:col-span-1 bg-white h-full rounded-lg font-medium px-4 py-3">
          Upcoming Deadlines
          <div className="text-gray-600 flex flex-col xxxs:flex-row justify-center items-center gap-8 halfxl:block">
            <div className="flex flex-col w-80">
              <BlueBarChart projects={upcomingDeadlines} />
            </div>
            <div className="flex flex-col w-[90%] halfxl:ml-6">
              <h3 className="text-sm tracking-wide my-3">NEXT 5 DEADLINES</h3>
              <div className="flex flex-col gap-2 max-h-20 overflow-y-auto pr-2 w-full">
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.map((project, index) => {
                    const deadline = new Date(project.deadline);
                    const today = new Date();
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);

                    let dateDisplay;
                    let colorClass = "text-gray-500";

                    // Check if deadline is today
                    if (deadline.toDateString() === today.toDateString()) {
                      dateDisplay = "Today";
                      colorClass = "text-red-500";
                    }
                    // Check if deadline is tomorrow
                    else if (
                      deadline.toDateString() === tomorrow.toDateString()
                    ) {
                      dateDisplay = "Tomorrow";
                      colorClass = "text-orange-500";
                    }
                    // Otherwise show the date
                    else {
                      const month = deadline.toLocaleString("default", {
                        month: "short",
                      });
                      const day = deadline.getDate();
                      dateDisplay = `${month} ${day}`;
                    }

                    return (
                      <div key={index} className="flex justify-between text-sm">
                        <div className="truncate w-40 pr-2">
                          {project.name || "Unnamed Project"}
                        </div>
                        <div className={`capitalize ${colorClass}`}>
                          {dateDisplay}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-gray-400 text-sm">
                    No upcoming deadlines
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRiskOverview;
