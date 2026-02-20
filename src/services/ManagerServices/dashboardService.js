import axios from "axios";

const BASE_URL = "http://localhost:8080";

// 1️⃣ Team Count API
export const getTeamCounts = async (pmId) => {
  const res = await axios.get(`${BASE_URL}/teamCounts`, {
    params: { pm_id: pmId },
  });

  return res.data.data;
};

// 2️⃣ Project Count API
export const getProjectCounts = async (pmId) => {
  const res = await axios.get(`${BASE_URL}/projectCounts`, {
    params: { pm_id: pmId },
  });

  return res.data.data;
};


// 3️⃣ PM Project Report API
export const getPMProjectReport = async (empId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/project/reportAsPM?emp_id=${empId}`
    );

    if (response.data.success) {
      return response.data.data; // return only project array
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching PM project report:", error);
    throw error;
  }
};