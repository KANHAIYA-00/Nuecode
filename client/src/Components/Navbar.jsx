/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Notification, NotificationOff, Search } from "../assets/Svgs.jsx";
import getUserData from "../Api/Fetchdata.jsx";
// import axios from "axios";
import "../Style/scrollbar.css";
const Navbar = () => {
  // const [notification, setNotification] = useState(true);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [results, setResults] = useState([]);

  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_SERVER_URL}/api/search`
  //     );
  //     setResults(response.data);
  //   } catch (err) {
  //     console.error("Error fetching users:", err);
  //   }
  // };

  // useEffect(() => {
  //   if (searchTerm.trim() !== "") {
  //     handleSearch(searchTerm);
  //   } else {
  //     setResults([]);
  //   }
  // }, [searchTerm]);

  useEffect(() => {
    async function fetchAvatar() {
      try {
        const user = await getUserData();
        setImage(user.Avatar);
        setUsername(user.Username);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    }
    fetchAvatar();
  }, []);
  // const highlightMatch = (username, term) => {
  //   const parts = username.split(new RegExp(`(${term})`, "gi"));
  //   return parts.map((part, index) =>
  //     part.toLowerCase() === term.toLowerCase() ? (
  //       <span key={index} style={{ fontWeight: "bold", color: "blue" }}>
  //         {part}
  //       </span>
  //     ) : (
  //       part
  //     )
  //   );
  // };
  return (
    <>
      <nav className="h-[9vh] w-full flex justify-center items-center text-white border-b-[0.1px] border-[#2d2d2d]">
        <section className="h-full w-3/4 flex justify-start items-center pl-2">
          <div className="h-14 w-[30vw] rounded-lg bg-[#101010] flex justify-center items-center gap-1">
            <div className="h-12 w-12 rounded-lg flex justify-center items-center hover:bg-[#3f3f3f65] transition-all duration-200">
              <Search />
            </div>
            <input
              type="text"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="h-full w-[26vw] p-1 outline-none"
            />
          </div>
        </section>
        <section className="h-full w-1/4 flex justify-center items-center gap-10">
          {/* <div
            onClick={() => {
              setNotification(!notification);
            }}
            className="cursor-pointer h-10 w-10 rounded-full flex justify-center items-center bg-[#2E2E2E]"
          >
            {notification === true ? <Notification /> : <NotificationOff />}
          </div> */}
          <div className="h-15 w-15 rounded-full">
            <img
              src={image ? image : "/images/cover.png"}
              alt="profile"
              className="h-full w-full rounded-full"
            />
          </div>
        </section>
      </nav>
      {/* <ul
        className={`h-0 max-h-80 w-[26vw] text-white p-2 bg-[#2e2e2e90] backdrop-blur-md z-10 rounded-lg overflow-y-scroll custom-scrollbar absolute ml-10 ${
          searchTerm ? "visible min-h-20" : "hidden"
        }`}
      >
        {results.length ? (
          results.map((user) => (
            <li key={user._id}>{highlightMatch(user.username, searchTerm)}</li>
          ))
        ) : (
          <p>No matches found</p>
        )}
      </ul> */}
    </>
  );
};

export default Navbar;
