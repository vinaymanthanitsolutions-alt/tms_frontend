import axios from "axios";

const BASE_URL = "http://localhost:8080";

// ✅ Create Team
export const createTeam = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/teams`,
    payload
  );

  return response.data;
};

// ✅ Add Team Member
export const addTeamMember = async (teamId, employeeId) => {
  const response = await axios.post(
    `${BASE_URL}/teams/${teamId}/members`,
    {
      team_id: teamId,
      employee_id: employeeId,
    }
  );

  return response.data;
};