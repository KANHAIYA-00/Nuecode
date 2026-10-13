import axios from "axios";

const decodeBase64 = (base64String) => {
  try {
    return atob(base64String);
  } catch (error) {
    console.error("Error decoding Base64:", error);
    return null;
  }
};

const fetchFileContent = async (currentNode) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}api/get_file_content`,
      { id: currentNode._id },
      { withCredentials: true }
    );
    if (response) {
      const decodedData = decodeBase64(response.data);
      return decodedData;
    }
  } catch (error) {
    console.error("Error fetching file content:", error);
  }
};
export default fetchFileContent;
