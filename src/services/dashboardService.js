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