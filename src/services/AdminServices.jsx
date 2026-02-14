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

export const getEmployeeById = async (empId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/emp/${empId}`);
    return { success: true, data: response.data.employees || [] };
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
