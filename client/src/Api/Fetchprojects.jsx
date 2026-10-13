import axios from "axios";

export const fetchAllProjects = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}api/get_projects`,
      {
        validateStatus: () => true,
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Unexpected Error:", error);
    throw new Error("Something Went Wrong. Please try again.");
  }
};

export const fetchPublicProjects = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}api/get_public_projects`,
      {
        validateStatus: () => true,
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Unexpected Error:", error);
    throw new Error("Something Went Wrong. Please try again.");
  }
};
