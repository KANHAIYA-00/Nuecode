import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Signout from "../Functions/Signout.jsx";
import {
  AI,
  CodeIcon,
  Home,
  Logo,
  Logout,
  Profile,
  Projects,
  Tools,
} from "../assets/Svgs";

const Sidebar = ({ username }) => {
  const [select, setSelect] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === `/${username}/Home`) {
      setSelect("Home");
    } else if (location.pathname === `/${username}/Projects`) {
      setSelect("Projects");
    } else if (location.pathname === `/${username}/Profile`) {
      setSelect("Profile");
    } else if (location.pathname === `/${username}/AI`) {
      setSelect("AI");
    } else if (location.pathname === `/${username}/Tools`) {
      setSelect("Tools");
    }
  }, [location.pathname, username]);

  return (
    <div className="h-full w-[18vw] bg-[#101010] rounded-lg">
      <section className="h-[9vh] w-full text-white font-semibold flex pl-5 items-center">
        <div className="flex justify-center items-center text-2xl gap-2">
          <Logo />
          Neucode
        </div>
      </section>
      <section className="h-[90vh] w-full text-xl text-white pl-4 pt-5">
        <div className="flex flex-col gap-3">
          {[
            {
              text: "Home",
              icon: <Home />,
            },
            {
              text: "Projects",
              icon: <Projects />,
            },
            {
              text: "Profile",
              icon: <Profile />,
            },
            {
              text: "AI",
              icon: <AI />,
            },
            {
              text: "Tools",
              icon: <Tools />,
            },
          ].map(({ text, icon }, index) => (
            <div
              key={index}
              onClick={(e) => handleClick(e, `/${username}/${text}`)}
              className="relative h-10 w-60 flex items-center gap-2 p-1 rounded-md hover:bg-[#3f3f3f65] transition-all duration-200 cursor-pointer overflow-hidden"
              style={{
                backgroundColor: select === text && "#3f3f3f65",
              }}
            >
              {icon}
              {text}
            </div>
          ))}
        </div>
        <div
          onClick={() => window.open(`/CodeEditor`, "_blank")}
          className="h-10 w-60 flex items-center gap-2 p-1 rounded-md hover:bg-[#3f3f3f65] transition-all duration-100 cursor-pointer mt-[14em]"
        >
          <CodeIcon />
          Code Editor
        </div>
        <div
          onClick={() => Signout()}
          className="h-10 w-60 flex items-center gap-2 p-1 rounded-md hover:bg-[#3f3f3f65] transition-all duration-100 cursor-pointer mt-[1rem]"
        >
          <Logout />
          Logout
        </div>
      </section>
    </div>
  );
};
Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
};
export default Sidebar;
