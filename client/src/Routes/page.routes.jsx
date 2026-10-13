import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import AI from "../Pages/AI.jsx";
import Projects from "../Pages/Projects.jsx";
import Project from "../Pages/Project.jsx";
import Profile from "../Pages/Profile.jsx";
import Tools from "../Pages/Tools.jsx";
const pageRoutes = ({ username }) => {
  return (
    <>
      <div className="relative overflow-hidden h-[90vh] w-full p-2">
        <Routes>
          <Route
            path={"/:username/Home"}
            element={<Home username={username} />}
          />
          <Route
            path={"/:username/Projects"}
            element={<Projects username={username} />}
          />
          <Route
            path={"/:username/Profile"}
            element={<Profile username={username} />}
          />
          <Route path={"/:username/AI"} element={<AI />} />
          <Route path={"/:username/Tools"} element={<Tools />} />

          <Route
            path={"/:username/Projects/:ProjectName"}
            element={<Project />}
          />
        </Routes>
      </div>
    </>
  );
};

export default pageRoutes;
