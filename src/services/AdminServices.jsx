import axios from "axios";

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

export const getEmployeeById = async (
  empId,
  status = "ACTIVE",
  page = 1,
  limit = 5,
  search = "",
) => {
  try {
    console.log("Calling API with params:", {
      emp_id: empId,
      status,
      page,
      limit,
      search,
    });

    const response = await axios.get(`${API_BASE_URL}/emp`, {
      params: {
        emp_id: empId,
        status: status,
        page: page,
        limit: limit,
        search: search,
      },
    });

    console.log("Raw API Response:", response.data);

    return {
      success: true,
      data: response.data.data || [],
      totalPages: response.data.pagination?.total_pages || 1,
      currentPage: response.data.pagination?.page || page,
      totalEmployees: response.data.pagination?.total || 0,
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
        role: role,
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
