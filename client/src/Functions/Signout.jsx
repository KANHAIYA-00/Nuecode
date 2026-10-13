import axios from "axios";
const Signout = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}signout`,
      {},
      {
        validateStatus: () => true,
        withCredentials: true,
      }
    );
    if (response.status >= 200 && response.status < 300) {
      window.location.href = "/signin";
    } else {
      alert("Failed to log out. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred. Please check your connection.");
  }
};

export default Signout;
