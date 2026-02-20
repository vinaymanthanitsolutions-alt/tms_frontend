import axios from "axios";

const API_URL = "http://localhost:8080/project/details";

export const getProjectDetails = async (page = 1, limit = 10, search = "") => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        limit,
        search
      }
    });

    return response.data.data; // return full data object
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};