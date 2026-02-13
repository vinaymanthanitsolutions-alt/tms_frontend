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
      manager_id: "SA001",
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
