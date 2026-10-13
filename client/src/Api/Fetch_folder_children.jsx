import axios from "axios";

const fetchFolderChildren = async (currentNode) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}api/get_folder_children`,
      { id: currentNode._id },
      { withCredentials: true }
    );
    if (response) return response.data;
  } catch (error) {
    console.error("Error fetching current node children:", error);
  }
};
export default fetchFolderChildren;
