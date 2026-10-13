import axios from "axios";
const deleteFileFolder = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}api/delete_file_folder`,
      data,
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
export default deleteFileFolder;
