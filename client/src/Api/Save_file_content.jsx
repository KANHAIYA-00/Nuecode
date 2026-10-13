import axios from "axios";

const convertToBase64 = (data) => {
  if (!data) {
    throw new Error("Data is empty or undefined");
  }
  return btoa(data);
};

const saveFileContent = async (fileContent, fileID) => {
  try {
    const base64Content = convertToBase64(fileContent);
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}api/save_content`,
      { id: fileID, content: base64Content },
      { withCredentials: true }
    );
    if (response) return response.data;
  } catch (error) {
    console.error("Error fetching file content:", error);
  }
};
export default saveFileContent;
