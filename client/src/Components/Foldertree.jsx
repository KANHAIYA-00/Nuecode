import PropTypes from "prop-types";
import { useState } from "react";
import { Arrow, ClosedFolder, OpenFolder, File } from "../assets/Svgs.jsx";

const FolderTree = ({ node, setCurrent }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!node) return null;

  const handleToggle = () => {
    if (node.children) setIsOpen(!isOpen);
  };

  return (
    <div className={`border-[#303030] ${isOpen && "border-s-2"}`}>
      {node.children ? (
        <div
          onClick={() => {
            handleToggle();
            setCurrent(node);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className={`${isOpen && "rotate-90"}`}>
            <Arrow />
          </span>
          <span>{isOpen ? <OpenFolder /> : <ClosedFolder />}</span>
          <span className="text-blue-100 text-lg">{node.name}</span>
        </div>
      ) : (
        <div
          onClick={() => {
            setCurrent(node);
          }}
          className={`flex items-center gap-2 cursor-pointer ${
            node.name ? "visible" : "hidden"
          }`}
        >
          <span className="pl-8">
            <File />
          </span>
          <span className="text-blue-100 text-lg">{node.name}</span>
        </div>
      )}

      {isOpen && node.children ? (
        <div className="pl-6">
          {node.children.folders &&
            node.children.folders.map((childFolder) => (
              <FolderTree
                key={`folder-${childFolder._id}`}
                node={childFolder}
                setCurrent={setCurrent}
              />
            ))}

          {node.children.files &&
            node.children.files.map((childFile) => (
              <div
                key={`file-${childFile._id}`}
                onClick={() => setCurrent(childFile)}
                className={`flex items-center gap-2 cursor-pointer pl-8 ${
                  childFile.name ? "visible" : "hidden"
                }`}
              >
                <span>
                  <File />
                </span>
                <span className="text-blue-100 text-lg">{childFile.name}</span>
              </div>
            ))}
        </div>
      ) : (
        <p
          className={`text-gray-400 pl-16 ${
            !node.children ? "visible" : "hidden"
          }`}
        >
          Loading...
        </p>
      )}
    </div>
  );
};

FolderTree.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string.isRequired,
    children: PropTypes.shape({
      folders: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          children: PropTypes.object, // Folders can also have children
        })
      ),
      files: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ),
    }),
  }),
  setCurrent: PropTypes.func.isRequired,
};

export default FolderTree;
