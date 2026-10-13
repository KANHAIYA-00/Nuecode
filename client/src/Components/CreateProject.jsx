import { useEffect, useState } from "react";
import createProject from "../Api/Createproject.jsx";
import { ValidateProject } from "../Functions/Validator.jsx";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "../Style/scrollbar.css";
import "../Style/radio.css";
const CreateProject = ({ setCreated }) => {
  const { username } = useParams();
  const location = useLocation();
  const [err, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "",
  });
  useEffect(() => {
    if (success) setCreated("success");
  });
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  function validation() {
    const nameError = ValidateProject(project);
    if (nameError) {
      setError(nameError);
      setVisibility(true);
      return false;
    }
    return true;
  }
  async function sendDataToBackend(e) {
    e.preventDefault();
    setLoading(true);
    if (validation()) {
      try {
        const response = await createProject(project);
        if (response.status >= 200 && response.status < 300) {
          setSuccess(response.data);
          setVisibility(true);
        } else {
          setError(response.data);
          setVisibility(true);
        }
      } catch (error) {
        setError("Something Went Wrong. Please try again.");
        setVisibility(true);
        console.error("Unexpected Error:", error);
      } finally {
        setLoading(false);
      }
    } else setLoading(false);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(false);
      setError("");
      setSuccess("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [err, success]);

  return (
    <form
      onSubmit={sendDataToBackend}
      className="h-full w-full p-3 rounded-xl bg-[#101010] flex flex-col gap-1"
    >
      <h1 className="text-xl font-bold text-[#d3d3d3]">Start a new project</h1>
      <p className="text-[#656565]">
        A project contains all your code files and other information related to
        project. By default project is set to private.
      </p>
      <div>
        <h1 className="text-lg font-bold text-[#d3d3d3]">Project name</h1>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={project.name}
          placeholder="name your new project..."
          className="text-white p-1 border-[1px] border-[#d3d3d3] h-8 w-full rounded-md outline-none focus:border-[#008afceb] focus:border-2"
        />
        <div
          className={`absolute flex justify-center items-center gap-1 h-fit w-72 ml-24 mt-1 text-sm ${
            visibility
              ? success
                ? "text-emerald-500"
                : "text-red-500"
              : "hidden"
          }`}
        >
          {success || err}
        </div>
      </div>
      <div
        className={
          location.pathname === `/${username}/Projects` ? "visible?" : "hidden"
        }
      >
        <h1 className="text-xl font-bold text-[#d3d3d3]">Description</h1>
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          value={project.description}
          className="text-white p-1 border-[1px] border-[#d3d3d3] max-h-24 w-full rounded-md outline-none focus:border-[#008afceb] focus:border-2 custom-scrollbar"
        />
      </div>
      <div className="flex flex-col text-[#d3d3d3]">
        <div>
          <label className="radio-button flex items-center gap-2">
            <input
              name="status"
              type="radio"
              value="Public"
              onChange={handleChange}
            />
            <span className="radio-checkmark inline-block relative w-4 h-4 border-2 border-[#333] rounded-full"></span>
            <span className="font-bold">Public</span>
          </label>
          <p className="ml-6 text-[#656565]">
            Anyone on the internet can see this project
          </p>
        </div>
        <div>
          <label className="radio-button flex items-center gap-2">
            <input
              name="status"
              type="radio"
              value="Private"
              onChange={handleChange}
            />
            <span className="radio-checkmark inline-block relative w-4 h-4 border-2 border-[#333] rounded-full"></span>
            <span className="font-bold">Private</span>
          </label>
          <p className="ml-6 text-[#656565]">You choose who can see project.</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="text-white h-8 w-40 rounded-md flex justify-center items-center gap-1 cursor-pointer font-bold bg-[#28903a] hover:bg-[#2e9a45] active:bg-[#28903a]"
      >
        Create a new project
      </button>
    </form>
  );
};
CreateProject.propTypes = {
  setCreated: PropTypes.func.isRequired,
};
export default CreateProject;
