import axios from "axios";
import { calculateDeadline } from "../extraDataHandling/deadline";
import { getQueryCount, taskCompletionRate } from "../extraDataHandling/queries";

const API_BASE_URL = "http://localhost:8080";

export const registerEmployee = async (employeeData) => {
  try {
    const dataForBackend = {
      emp_id: employeeData.empCode,
      emp_name: employeeData.empName,
      email: employeeData.email,
      phone: employeeData.phone,
      password: employeeData.password,
      department: employeeData.department.toUpperCase(),
      role: employeeData.role.toUpperCase(),
      manager_id: employeeData.managerId || "A001",
    };

    const response = await axios.post(`${API_BASE_URL}/signup`, dataForBackend);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error registering employee:", error);

    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error:
          "cannot connect to the server. Please check your network connection and try again.",
      };
    }

    // Handle API errors
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to register employee";

    return { success: false, error: errorMessage };
  }
};

// export const registerEmployee = async (employeeData) => {
//   try {
//     const dataForBackend = {
//       emp_id: employeeData.empCode,
//       emp_name: employeeData.empName,
//       email: employeeData.email,
//       phone: employeeData.phone,
//       password: employeeData.password,
//       department: employeeData.department?.toUpperCase(),
//       role: employeeData.role?.toUpperCase(),
//       manager_id: employeeData.managerId || "A001",
//     };

//     const response = await axios.post(
//       `${API_BASE_URL}/signup`,
//       dataForBackend
//     );

//     return { success: true, data: response.data };

//   } catch (error) {
//     console.error("Error registering employee:", error);

//     // ✅ Network Error (server down / wrong port / CORS / backend not running)
//     if (!error.response) {
//       return {
//         success: false,
//         error:
//           "Cannot connect to the server. Please check your network connection and try again.",
//       };
//     }

//     // ✅ Backend returned error (400, 409, 500 etc.)
//     const errorMessage =
//       error.response?.data?.error ||     // your Gin backend sends { "error": "message" }
//       error.response?.data?.message ||
//       error.message ||
//       "Failed to register employee";

//     return {
//       success: false,
//       error: errorMessage,
//     };
//   }
// };

export const getEmployeeById = async (
  empId,
  status = "ACTIVE",
  page = 1,
  limit = 5,
  search = "",
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/emp`, {
      params: {
        emp_id: empId,
        status,
        page,
        limit,
        search,
      },
    });

    // Backend shape:
    // {
    //   data: {
    //     data: [...employees],
    //     page,
    //     limit,
    //     total
    //   },
    //   success: true
    // }
    const payload = response.data?.data || {};
    const employees = payload.data || [];
    const respPage = payload.page || page;
    const respLimit = payload.limit || limit;
    const total = payload.total || 0;

    return {
      success: true,
      data: employees,
      totalPages: respLimit > 0 ? Math.max(1, Math.ceil(total / respLimit)) : 1,
      currentPage: respPage,
      totalEmployees: total,
    };
  } catch (error) {
    console.error("Error fetching employee:", error);

    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error:
          "Cannot connect to the server. Please check your network connection and try again.",
      };
    }

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch employee";

    return { success: false, error: errorMessage };
  }
};

export const deleteEmployee = async (empId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/emp/${empId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error deleting employee:", error);

    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error:
          "Cannot connect to the server. Please check your network connection and try again.",
      };
    }

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete employee";

    return { success: false, error: errorMessage };
  }
};

export const updateEmployee = async (empId, employeeData) => {
  try {
    const dataForBackend = {
      emp_name: employeeData.empName,
      email: employeeData.email,
      phone: employeeData.phone,
      department: employeeData.department.toUpperCase(),
      role: employeeData.role.toUpperCase(),
      manager_id: employeeData.managerId || "A001",
      status: employeeData.status || "ACTIVE",
    };

    // Only include password if it's provided
    if (employeeData.password && employeeData.password.trim()) {
      dataForBackend.password = employeeData.password;
    }

    console.log("Updating employee:", empId, dataForBackend);
    const response = await axios.put(
      `${API_BASE_URL}/emp/${empId}`,
      dataForBackend,
    );
    console.log("Update response:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error updating employee:", error);
    console.error("Error details:", error.response?.data);

    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error:
          "Cannot connect to the server. Please check your network connection and try again.",
      };
    }

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to update employee";

    return { success: false, error: errorMessage };
  }
};

export const getEmployeesByRole = async (adminId, role, status = "ACTIVE") => {
  try {
    const response = await axios.get(`${API_BASE_URL}/emp`, {
      params: {
        emp_id: adminId,
        filter_role: role,
        status: status,
      },
    });

    return {
      success: true,
      data: response.data.data || [],
    };
  } catch (error) {
    console.error("Error fetching employees by role:", error);

    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error:
          "Cannot connect to the server. Please check your network connection and try again.",
      };
    }

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch employees";

    return { success: false, error: errorMessage };
  }
};

export const createProject = async (projectData) => {
  try {
    // Convert date to RFC3339 format if provided
    let deadline = "";
    if (projectData.deadline) {
      const date = new Date(projectData.deadline);
      deadline = date.toISOString(); // Converts to RFC3339 format
    }

    const dataForBackend = {
      project_id: projectData.projectId,
      name: projectData.name,
      description: projectData.description,
      created_by: projectData.createdBy,
      pm_id: projectData.pmId || null,
      deadline: deadline,
    };

    console.log("Sending project data:", dataForBackend);

    const response = await axios.post(
      `${API_BASE_URL}/project/`,
      dataForBackend,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Project creation response:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating project:", error);
    console.error("Error response:", error.response);
    console.error("Error code:", error.code);

    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error:
          "Cannot connect to the server. Please check your network connection and try again.",
      };
    }

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create project";

    return { success: false, error: errorMessage };
  }
};

// export const createProject = async (projectData) => {
//   try {
//     // ✅ Convert deadline to RFC3339 (without milliseconds)
//     let deadline = "";
//     if (projectData.deadline) {
//       const date = new Date(projectData.deadline);
//       deadline = date.toISOString().split(".")[0] + "Z";
//     }

//     const dataForBackend = {
//       project_id: projectData.projectId,
//       name: projectData.name,
//       description: projectData.description,
//       created_by: projectData.createdBy,
//       pm_id: projectData.pmId || "", // send empty string, not null
//       deadline: deadline,
//     };

//     console.log("Sending project data:", dataForBackend);

//     const response = await axios.post(
//       `${API_BASE_URL}/project`, // removed trailing slash
//       dataForBackend
//     );

//     console.log("Project creation response:", response.data);

//     return { success: true, data: response.data };

//   } catch (error) {
//     console.error("Error creating project:", error);

//     // ✅ Network error
//     if (!error.response) {
//       return {
//         success: false,
//         error:
//           "Cannot connect to the server. Please check if backend is running.",
//       };
//     }

//     const errorMessage =
//       error.response?.data?.error ||
//       error.response?.data?.message ||
//       error.message ||
//       "Failed to create project";

//     return { success: false, error: errorMessage };
//   }
// };

export const getAllProjects = async (
  adminId,
  page = 1,
  limit = 5,
  search = "",
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/project/admin`, {
      params: {
        admin_id: adminId,
        page: page,
        limit: limit,
        search: search,
      },
    });

    console.log("Raw project response:", response.data);
    console.log("Projects array:", response.data.data.projects);

    const responseData = response.data.data;

    return {
      success: true,
      data: responseData.projects || [],
      page: responseData.page || page,
      limit: responseData.limit || limit,
      total: responseData.total || 0,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    console.error("Error response:", error.response?.data);

    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error:
          "Cannot connect to the server. Please check your network connection and try again.",
      };
    }

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch projects";

    return { success: false, error: errorMessage };
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/project/${projectId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error deleting project:", error);

    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error:
          "Cannot connect to the server. Please check your network connection and try again.",
      };
    }

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete project";

    return { success: false, error: errorMessage };
  }
};

export const reassignProjectManager = async (projectId, newManagerId) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/project/assign/${projectId}`,
      { pm_id: newManagerId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error reassigning project manager:", error);

    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error:
          "Cannot connect to the server. Please check your network connection and try again.",
      };
    }

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to reassign project manager";

    return { success: false, error: errorMessage };
  }
};


// Dashboard counts Service

export const getDashboardCounts = async () => {
  try {

    const [empresponse, projectresponse, taskresponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/empCounts`, {
        params: { manager_id: "A001" }
      }),
      axios.get(`${API_BASE_URL}/projectCounts`, {
        params: { admin_id: "A001" }
      }),
      axios.get(`${API_BASE_URL}/taskCounts`, {

        params: { 
          role: "ADMIN",
          employee_id: "A001" }
      })
    ]);

    const empData = empresponse.data.data;
    const projectData = projectresponse.data.data;
    const taskData = taskresponse.data.data;

    return {
      employeeCount: empData.total_employees,
      projectCount: projectData.total_projects,
      activeTaskCount: taskData.total_tasks,
      pendingApprovalCount: projectData.planning,
    };

  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    throw error;
  }
};


// Risk overview services

export const getRiskOverviewCounts = async () => {
  try {

    const [empresponse, projectresponse, allProjectData, queryData] = await Promise.all([
      axios.get(`${API_BASE_URL}/empCounts`, {
        params: { manager_id: "A001" }
      }),
      axios.get(`${API_BASE_URL}/projectCounts`, {
        params: { admin_id: "A001" }
      }),
      axios.get(`${API_BASE_URL}/project/admin`,{
        params:{
          admin_id: "A001",
        }
      }),
      axios.get(`${API_BASE_URL}/queryCount`, {
        params: {
          role:"ADMIN",
          employee_id: "A001",
        }
      })
    ]);

    //  const response = await axios.get(`${API_BASE_URL}/project/admin`, {
    //   params: {
    //     admin_id: adminId,
    //     page: page,
    //     limit: limit,
    //     search: search,
    //   },
    // });

    const empData = empresponse.data.data;
    const projectData = projectresponse.data.data;
    const allProjects = allProjectData.data.data || [];
    const queryCountData = queryData.data.data || {};
    const deadlineData = calculateDeadline(allProjects);

    const finalQueriesRemaingCount = getQueryCount(queryCountData);

    const completionRate = taskCompletionRate(projectData);


    console.log(deadlineData.nearDeadlinesCount);
    console.log("Active Queries:", queryCountData);

    return {
      totalActive: projectData.active ?? 0,
      pendingApprovals: projectData.planning ?? 0,
      overdueProjects: projectData.active ?? 0,
      NearDeadline: deadlineData.nearDeadlinesCount ?? 0,
      activeQueries: finalQueriesRemaingCount ?? 0,
      CompletionRate: completionRate ?? 0,
    };

  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    throw error;
  }
};