import API from "../../services/axios";

// Function to handle user login
export const loginUser = (data) => {
  return API.post("/login", data);
};

// Function to retrieve the authenticated user's information
export const getMeAPI = () => {
  return API.get("/me");
};