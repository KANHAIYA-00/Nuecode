import User from "../Components/User";
import CreateProject from "../Components/CreateProject.jsx";
import Repo2 from "../Components/Repo2.jsx";
import "../Style/astro.css";
import { useState, useEffect } from "react";
import { fetchAllProjects } from "../Api/Fetchprojects.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Home = ({ username }) => {
  const navigate = useNavigate();
  const [, setCreated] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchAllProjects();
        if (response.status >= 200 && response.status < 300) {
          setProjects(response.data);
        } else {
          setError("Failed to fetch projects !");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projects]);
  const handleProjectClick = (projectName) => {
    navigate(`/${username}/Projects/${projectName}`);
  };
  return (
    <>
      <div className="h-full w-full flex gap-2">
        <section className="h-full w-4/6 flex flex-col gap-2">
          <div className="h-2/4 w-full rounded-xl bg-[#101010] flex relative">
            <div className="star star-5"></div>
            <div className="star star-6"></div>
            <div className="star star-7"></div>
            <svg className="moon" viewBox="0 0 20 20">
              <path d="M 10 9 z z M 7.007 6.552 c 0 -2.259 0.795 -4.33 2.117 -5.955 C 4.34 1.042 0.594 5.07 0.594 9.98 c 0 5.207 4.211 9.426 9.406 9.426 c 2.94 0 5.972 -1.354 7.696 -3.472 c -0.289 0.026 -0.987 0.044 -1.283 0.044 C 11.219 15.979 7.007 11.759 7.007 6.552 z"></path>
            </svg>
            <svg className="rocket" viewBox="48.0129 48.1783 416 415.6">
              <path d="M461.81,53.81a4.4,4.4,0,0,0-3.3-3.39c-54.38-13.3-180,34.09-248.13,102.17a294.9,294.9,0,0,0-33.09,39.08c-21-1.9-42-.3-59.88,7.5-50.49,22.2-65.18,80.18-69.28,105.07a9,9,0,0,0,9.8,10.4l81.07-8.9a180.29,180.29,0,0,0,1.1,18.3,18.15,18.15,0,0,0,5.3,11.09l31.39,31.39a18.15,18.15,0,0,0,11.1,5.3,179.91,179.91,0,0,0,18.19,1.1l-8.89,81a9,9,0,0,0,10.39,9.79c24.9-4,83-18.69,105.07-69.17,7.8-17.9,9.4-38.79,7.6-59.69a293.91,293.91,0,0,0,39.19-33.09C427.82,233.76,474.91,110.9,461.81,53.81ZM298.66,213.67a42.7,42.7,0,1,1,60.38,0A42.65,42.65,0,0,1,298.66,213.67Z"></path>
            </svg>

            <div className="w-3/5 h-full flex flex-col justify-center font-bold p-10">
              <span className="text-white text-6xl">Welcome to Neucode</span>
              <span className="text-3xl text-emerald-300">
                Your gateway to innovation!
              </span>
            </div>
            <div className="w-2/5 h-full">
              <img
                src="https://uiverse.io/astronaut.png"
                alt=""
                className="astronaut scale-x-[-1]"
              />
            </div>
          </div>
          <div className="h-2/4 w-full flex justify-center items-center gap-2">
            <div className="h-full w-2/4 rounded-xl bg-[#101010] p-3">
              <h1 className="text-2xl font-bold text-[#d3d3d3]">
                Recent Projects
              </h1>
              <div className="w-full h-[36vh] pt-2 pb-5 flex flex-col gap-2 overflow-hidden overflow-y-scroll custom-scrollbar">
                {loading ? (
                  <p className="text-center mt-24 text-[#404040] font-bold text-xl">
                    Loading projects...
                  </p>
                ) : error ? (
                  <p className="text-center mt-24 text-red-500 text-xl">
                    {error}
                  </p>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <div
                      key={project._id}
                      onClick={() => handleProjectClick(project.name)}
                      className="cursor-pointer"
                    >
                      <Repo2 project={project} />
                    </div>
                  ))
                ) : (
                  <p className="text-center mt-24 text-[#404040] font-bold text-xl">
                    No projects found.
                  </p>
                )}
              </div>
            </div>
            <div className="h-full w-2/4">
              <CreateProject setCreated={setCreated} />
            </div>
          </div>
        </section>
        <section className="h-full w-2/6">
          <User />
        </section>
      </div>
    </>
  );
};
Home.propTypes = {
  username: PropTypes.string.isRequired,
};
export default Home;
