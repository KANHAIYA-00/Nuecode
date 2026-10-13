import Navbar from "../Components/Navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import PageRoutes from "../Routes/page.routes.jsx";
import Authenticate from "../Functions/Authenticate.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Main = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const checkAuth = async () => {
      const response = await Authenticate(navigate);
      if (response !== "unauthenticated") {
        setIsAuthenticated(true);
        setUsername(response);
      }
    };
    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
      <div className="h-screen w-screen bg-[#000] flex justify-center items-center p-1 gap-1">
        <Sidebar username={username} />
        <div className="h-full w-[82vw] rounded-lg bg-[#1C1C1C]">
          <Navbar />
          <PageRoutes username={username} />
        </div>
      </div>
    </>
  );
};

export default Main;
