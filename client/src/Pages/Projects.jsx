import { useState, useEffect } from "react";
import Repo from "../Components/Repo.jsx";
import CreateProject from "../Components/CreateProject.jsx";
import { fetchAllProjects } from "../Api/Fetchprojects.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../Style/scrollbar.css";

const Projects = ({ username }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [created, setCreated] = useState("");

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
  }, [created]);

  const handleProjectClick = (projectName) => {
    navigate(`/${username}/Projects/${projectName}`);
  };
  return (
    <>
      <div className="h-full w-full flex gap-2">
        <section className="h-full w-4/6 rounded-xl p-4 bg-[#101010]">
          <div className="text-white h-20 w-full flex justify-end items-center gap-3">
            <input
              type="text"
              placeholder="Find a project..."
              className="p-1 border-[1px] border-[#d3d3d3] h-10 w-1/3 rounded-lg outline-none focus:border-[#008afceb] focus:border-2"
            />
          </div>
          <hr className="border-[#404040]" />
          <div className="w-full h-[75vh] pt-2 pb-5 flex flex-col gap-4 overflow-hidden overflow-y-scroll custom-scrollbar">
            {loading ? (
              <p className="text-center mt-60 text-[#404040] font-bold text-xl">
                Loading projects...
              </p>
            ) : error ? (
              <p className="text-center mt-60 text-red-500 text-xl">{error}</p>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => handleProjectClick(project.name)}
                  className="cursor-pointer"
                >
                  <Repo project={project} />
                </div>
              ))
            ) : (
              <p className="text-center mt-60 text-[#404040] font-bold text-xl">
                No projects found.
              </p>
            )}
          </div>
        </section>
        <section className="h-full w-2/6">
          <CreateProject setCreated={setCreated} />
        </section>
      </div>
    </>
  );
};

Projects.propTypes = {
  username: PropTypes.string.isRequired,
};
export default Projects;
