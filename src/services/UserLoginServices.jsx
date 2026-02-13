import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const loginUser = async ({ empId, password }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      {
        empID: empId,   
        password: password,
      }
    );

    return response.data;


  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Server error. Please try again." };
    }
  }
};