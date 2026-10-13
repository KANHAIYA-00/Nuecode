import PropTypes from "prop-types";
const Repo2 = ({ project }) => {
  return (
    <div className="flex gap-2 w-full items-center">
      <span className="h-4 w-4 rounded-full border-[1px] border-gray-500"></span>
      <div className="max-w-full text-lg font-semibold text-blue-400 overflow-hidden whitespace-nowrap text-ellipsis hover:underline">
        {project.name}
      </div>
    </div>
  );
};
Repo2.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default Repo2;
