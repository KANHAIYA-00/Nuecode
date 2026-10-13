import PropTypes from "prop-types";
import formatDate from "../Functions/Formatdate.jsx";
import "../Style/scrollbar.css";
const Repo = ({ project }) => {
  const date = formatDate(project.updatedAt);
  return (
    <div className="max-h-40 w-full flex cursor-pointer rounded-xl bg-[#151515]">
      <section className="h-full w-4/5 p-2">
        <div className="h-10 w-fit max-w-full text-2xl font-semibold text-blue-400 overflow-hidden whitespace-nowrap text-ellipsis hover:underline">
          {project.name}
        </div>
        <p className="min-h-10 max-h-20 w-full text-[#808080] overflow-y-scroll custom-scrollbar text-wrap leading-none mb-2 text-ellipsis">
          {project.description}
        </p>

        <div className="w-full text-sm text-[#808080]">Updated on {date}</div>
      </section>
      <section className="h-full w-1/5 flex flex-col items-center pt-3">
        <span className="w-16 text-center font-bold rounded-2xl text-[#808080] border-[1px] border-[#808080]">
          {project.status}
        </span>
      </section>
    </div>
  );
};
Repo.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
export default Repo;
