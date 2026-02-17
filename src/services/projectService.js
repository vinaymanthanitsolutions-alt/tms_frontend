import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getProjectsByPM = async (pmId, page = 1, limit = 5) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/project/byPM`,
      {
        params: {
          pm_id: pmId,
          page: page,
          limit: limit,
        },
      }
    );

    return response.data.data;

  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getEmployeesByPM = async (pmId, status = "ALL") => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/emp`,
      {
        params: {
          emp_id: pmId,
          status: status,
        },
      }
    );

    return response.data.data; // returning employee array

  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};