import { useEffect, useRef, useState } from "react";
import "../Style/scrollbar.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import FolderTree from "../Components/Foldertree.jsx";
import createFileFolder from "../Api/Create_file_folder.jsx";
import getFolderChildren from "../Api/Fetch_folder_children.jsx";
import getFileContent from "../Api/Fetch_file_content.jsx";
import deleteFileFolder from "../Api/Delete_file_folder.jsx";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import saveFile from "../Api/Save_file_content.jsx";
import {
  AddFile,
  AddFolder,
  Delete,
  Edit,
  File,
  ClosedFolder,
} from "../assets/Svgs.jsx";

const Project = () => {
  const { ProjectName } = useParams();
  const inputRef = useRef(null);
  const [tree, setTree] = useState(null);
  const [current, setCurrent] = useState(null);
  const [children, setChildren] = useState(null);
  const [newName, setNewname] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [update, setUpdate] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewname(value);
    setError("");
    if (value === "." || value.endsWith(".") || value.length >= 100) {
      setError("This Name is not valid as a file or folder name.");
    }
  };

  const handleClick = (e) => {
    if (current) setType(e);
  };

  const deleete = async () => {
    if (current) {
      const type =
        current.children && current.children.folders !== undefined
          ? "folder"
          : "file";
      try {
        const response = await deleteFileFolder({
          ID: current._id,
          type: type,
        });
        setUpdate(response.data);
        window.location.reload();
      } catch (error) {
        setError("Something Went Wrong. Please try again.");
        console.error("Unexpected Error:", error);
      } finally {
        setType("");
      }
    }
  };

  // Creating the new files and folders.
  const create = async () => {
    if (newName && current && type) {
      try {
        const response = await createFileFolder({
          name: newName,
          parentID: current._id,
          type: type,
        });
        setUpdate(response.data);
      } catch (error) {
        setError("Something Went Wrong. Please try again.");
        console.error("Unexpected Error:", error);
      } finally {
        setType("");
        setNewname("");
      }
    }
  };

  // Fetching the children of current selected folder.
  useEffect(() => {
    async function run() {
      if (current) {
        if (current.children) {
          const isFilesPopulated = current.children?.files?.every(
            (file) => typeof file === "object" && file.name
          );
          const isFoldersPopulated = current.children?.folders?.every(
            (folder) => typeof folder === "object" && folder.name
          );
          if (update || !isFilesPopulated || !isFoldersPopulated) {
            const result = await getFolderChildren(current);
            setChildren(result);
            setUpdate(null);
          }
        } else {
          const result = await getFileContent(current);
          setFileContent(result || "");
        }
      }
    }
    run();
  }, [current, isEditing, update]);

  // Updating the tree with the fetched children.
  useEffect(() => {
    if (current && children) {
      function updateTree(tree) {
        if (tree._id === current._id) {
          return { ...tree, children };
        }
        if (tree.children?.folders) {
          const updatedFolders = tree.children.folders.map((folder) =>
            updateTree(folder)
          );
          return {
            ...tree,
            children: { ...tree.children, folders: updatedFolders },
          };
        }
        return tree;
      }
      const updatedTree = updateTree(tree);
      setTree(updatedTree);
      setChildren(null);
    }
  }, [children, current, tree]);

  // getting the root folder.
  useEffect(() => {
    async function sendDataToBackend() {
      if (!ProjectName) return;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/get_rootfolder`,
          { projectName: ProjectName },
          {
            validateStatus: () => true,
            withCredentials: true,
          }
        );
        setTree(response.data);
        setCurrent(response.data);
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    }
    sendDataToBackend();
  }, [ProjectName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the input field
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setType("");
        setNewname("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function getFileExtension(filename) {
    return filename.split(".").pop();
  }

  useEffect(() => {
    if (current && current.children) setFileContent("");
  }, [current]);
  return (
    <>
      <div className="h-full w-full flex gap-2">
        <section className="h-full w-4/6 rounded-xl p-2 bg-[#101010] flex flex-col">
          <div className="h-full w-full flex flex-col gap-2">
            <div className="h-12 w-full pr-5 bg-[#1c1c1c] rounded-md flex items-center justify-end gap-2">
              <h1 className="text-blue-400 text-lg h-10 w-full ml-5 flex items-center overflow-scroll whitespace-nowrap custom-scrollbar">
                {current && !current.children && current.name}
              </h1>
              <span
                onClick={() => {
                  if (isEditing && current && !current.children) {
                    saveFile(fileContent, current._id);
                  }
                  setIsEditing(!isEditing);
                }}
                className="text-[#808080] cursor-pointer p-1 hover:bg-[#303030] rounded-lg transition-all duration-200 active:bg-[#2b2b2b]"
              >
                {isEditing && current && !current.children ? "Save" : <Edit />}
              </span>
            </div>
            <div className="h-[80vh] w-full border-[0.5px] rounded-md border-[#353535] overflow-scroll custom-scrollbar p-2">
              <div className="h-full w-full text-lg text-white">
                {isEditing && current && !current.children ? (
                  <textarea
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    className="w-full min-h-full max-h-full bg-transparent text-white border-none outline-none"
                  />
                ) : fileContent ? (
                  <Markdown
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <pre
                            className={`hljs ${className}`}
                            style={{ background: "none" }}
                          >
                            <code {...props}>{children}</code>
                          </pre>
                        ) : (
                          <code
                            {...props}
                            className={className}
                            style={{ background: "none" }}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {`\`\`\`${getFileExtension(
                      current.name
                    )}\n${fileContent}\n\`\`\``}
                  </Markdown>
                ) : current && current.children ? (
                  <p className="text-gray-400 text-2xl mt-72 text-center">
                    No file is selected.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>
        <section className="h-full w-2/6 p-2 rounded-xl bg-[#101010] flex flex-col">
          <header className=" h-12 w-full mb-1 pr-5 bg-[#1c1c1c] rounded-md flex justify-end items-center gap-2">
            <h1 className="text-blue-400 text-lg h-10 w-full ml-5 flex items-center overflow-scroll whitespace-nowrap custom-scrollbar">
              {current && current.children && current.name}
            </h1>
            <div className="flex items-center justify-end gap-2">
              <span
                onClick={() => handleClick("file")}
                className="cursor-pointer p-1 hover:bg-[#303030] rounded-lg transition-all duration-200 active:bg-[#2b2b2b]"
              >
                <AddFile />
              </span>
              <span
                onClick={() => handleClick("folder")}
                className="cursor-pointer p-1 hover:bg-[#303030] rounded-lg transition-all duration-200 active:bg-[#2b2b2b]"
              >
                <AddFolder />
              </span>
              <span
                onClick={deleete}
                className="cursor-pointer p-1 hover:bg-[#303030] rounded-lg transition-all duration-200 active:bg-[#2b2b2b]"
              >
                <Delete />
              </span>
            </div>
          </header>
          <div className="mb-5 flex justify-center items-center gap-2">
            <span
              className={`h-5 w-5 ${
                current &&
                current.children &&
                current.children.folders !== undefined &&
                type
                  ? "visible"
                  : "hidden"
              }`}
            >
              {type === "file" ? <File /> : <ClosedFolder />}
            </span>
            <input
              name="create"
              ref={inputRef}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  create();
                }
              }}
              value={newName}
              type="text"
              className={`h-8 w-full border-2 border-white rounded-sm text-white pl-2 ${
                current &&
                current.children &&
                current.children.folders !== undefined &&
                type
                  ? "visible"
                  : "hidden"
              }`}
            />
            <div
              className={`absolute flex justify-center items-center gap-1 h-fit w-72 mt-14 ml-24 text-sm ${
                error && "text-red-400"
              } ${current && type ? "visible" : "hidden"}`}
            >
              {error && error}
            </div>
          </div>
          <div className="h-full w-full overflow-scroll custom-scrollbar2 whitespace-nowrap">
            {tree ? (
              <FolderTree node={tree} setCurrent={setCurrent} />
            ) : (
              <p className="text-gray-400">Loading...</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Project;
