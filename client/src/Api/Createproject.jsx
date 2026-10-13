import axios from "axios";

const createProject = async (project) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}api/create_project`,
      project,
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
export default createProject;
