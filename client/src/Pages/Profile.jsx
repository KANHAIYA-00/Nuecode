import User from "../Components/User.jsx";
import { useState, useEffect } from "react";
import Repo from "../Components/Repo.jsx";
import { fetchPublicProjects } from "../Api/Fetchprojects.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../Style/scrollbar.css";
const Profile = ({ username }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchPublicProjects();
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
  });

  const handleProjectClick = (projectName) => {
    navigate(`/${username}/Projects/${projectName}`);
  };
  return (
    <div className="h-full w-full flex rounded-xl p-4 bg-[#101010]">
      <section className="h-full w-2/6">
        <User />
      </section>
      <section className="h-full w-4/6">
        <div className="text-white text-2xl pl-12 pb-2 h-20 w-full flex items-end">
          Projects
        </div>
        <div className="w-full h-[75vh] pl-10 pr-10 pt-2 pb-5 flex flex-col gap-4 overflow-hidden overflow-y-scroll custom-scrollbar">
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
    </div>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired,
};
export default Profile;
