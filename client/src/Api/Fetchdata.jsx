import axios from "axios";

let cachedData = null;
let lastFetchTime = null;

const CACHE_EXPIRY = 5 * 60 * 1000;
const getUserData = async () => {
  const now = Date.now();
  try {
    if (cachedData && lastFetchTime && now - lastFetchTime < CACHE_EXPIRY) {
      return cachedData;
    }
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}api/userdata`,
      {
        validateStatus: () => true,
        withCredentials: true,
      }
    );
    cachedData = response.data;
    lastFetchTime = now;
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
export default getUserData;
