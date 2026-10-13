import axios from "axios";
const Authenticate = async (Navigate) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}check`,
      {},
      {
        validateStatus: () => true,
        withCredentials: true,
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      Navigate("/signin");
      return "unauthenticated";
    }
  } catch (error) {
    console.error(error);
    Navigate("/signin");
    return "unauthenticated";
  }
};

export default Authenticate;
