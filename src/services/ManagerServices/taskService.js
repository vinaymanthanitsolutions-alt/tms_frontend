import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getTasksByProject = async (projectId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tasks/project/?project_id=${projectId}`
    );

    return response.data.data.data; // ✅ return actual tasks array

  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getTeamsByProject = async (projectId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/projects/${projectId}/teams`
    );

    // API returns { data: [], success: true }
    return response.data.data;

  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};


export const createTask = async (taskData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/tasks/`,
      taskData
    );

    return response.data;

  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/tasks/${taskId}`,
      taskData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Update task error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/tasks/${taskId}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Delete task error:",
      error.response?.data || error.message
    );
    throw error;
  }
};