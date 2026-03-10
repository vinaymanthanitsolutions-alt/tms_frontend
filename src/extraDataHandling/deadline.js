import { getAllProjects } from "../services/AdminServices";

const deadlineData = {
  nearDeadlinesCount: null,
  upcomingDeadlineProjects: [],
};

export function calculateDeadline(data) {
  console.log("calculateDeadline input data:", data);
  let allProjectsdata = data.projects || [];
  console.log("All projects data:", allProjectsdata);
  const today = new Date();

  const onemonthFromToday = new Date();
  onemonthFromToday.setMonth(onemonthFromToday.getMonth() + 1);

  const projectsWithUpcomingDeadlines = allProjectsdata.filter((project) => {
    if (!project.deadline) {
      console.log(
        `Project ${project.name || project.project_id} has no deadline`,
      );
      return false;
    }
    const deadline = new Date(project.deadline);
    console.log(
      `Project ${project.name}, Deadline: ${deadline}, Today: ${today}, One month: ${onemonthFromToday}`,
    );
    return deadline >= today && deadline <= onemonthFromToday;
  });

  console.log(
    "Projects with upcoming deadlines:",
    projectsWithUpcomingDeadlines,
  );

  const nearDeadlinesCount = projectsWithUpcomingDeadlines.length;

  // Sort by deadline (earliest first) and get top 5
  const sortedUpcomingProjects = projectsWithUpcomingDeadlines
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  console.log("Sorted upcoming projects (top 5):", sortedUpcomingProjects);

  deadlineData.nearDeadlinesCount = nearDeadlinesCount;
  deadlineData.upcomingDeadlineProjects = sortedUpcomingProjects;

  console.log("Returning deadlineData:", deadlineData);

  return deadlineData;
}
