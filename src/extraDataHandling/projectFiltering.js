export const getProjectStatus = (project) => {
  if (!project.pm_id || project.pm_id === "") {
    return {
      label: "No Manager",
      className: "bg-orange-200 text-orange-700",
    };
  }

  // If deadline exists, check for overdue or high priority
  if (project.deadline) {
    const deadlineDate = new Date(project.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    if (deadlineDate < today) {
      return {
        label: "Overdue",
        className: "bg-red-200 text-red-700",
      };
    }

    // Check if high priority (within 1 month)
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    oneMonthFromNow.setHours(0, 0, 0, 0);

    if (deadlineDate <= oneMonthFromNow) {
      return {
        label: "High Priority",
        className: "bg-purple-200 text-purple-700",
      };
    }
  }

  return {
    label: "Active",
    className: "bg-green-200 text-green-700",
  };
};

/**
 * Calculate project status percentages
 * @param {Object} params - The project counts
 * @param {number} params.total - Total number of projects
 * @param {number} params.active - Number of active projects
 * @param {number} params.pending - Number of pending projects
 * @param {number} params.overdue - Number of overdue projects
 * @param {number} params.completed - Number of completed projects
 * @returns {Object} - Object containing percentage for each status
 */
export const projectStatusInPercentage = ({
  total = 0,
  active = 0,
  pending = 0,
  overdue = 0,
  completed = 0,
}) => {
  if (total === 0) {
    return {
      active: 0,
      pending: 0,
      overdue: 0,
      completed: 0,
    };
  }

  return {
    active: Math.round((active / total) * 100),
    pending: Math.round((pending / total) * 100),
    overdue: Math.round((overdue / total) * 100),
    completed: Math.round((completed / total) * 100),
  };
};
