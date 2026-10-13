import { useState, useEffect } from "react";
import { Camera } from "../assets/Svgs";
import getUserData from "../Api/Fetchdata.jsx";
import axios from "axios";
const User = () => {
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);
  const [User, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserData();
        setUser(user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchUser();
  }, []);

  const imageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };
  };
  const updateUser = async (e) => {
    e.preventDefault();
    if (image !== "") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/update_user`,
          { avatar: image },
          {
            validateStatus: () => true,
            withCredentials: true,
          },
        );
        if (response.status >= 200 && response.status < 300) {
          window.location.reload();
        } else {
          setError("An unexpected error occurred. Please try again.");
          setVisibility(true);
        }
      } catch (error) {
        console.error("Unexpected Error:", error);
        setError("An unexpected error occurred. Please try again.");
        setVisibility(true);
      }
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(false);
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);
  return (
    <div className="h-full w-full rounded-xl bg-[#101010] flex flex-col gap-2 justify-center items-center">
      <div className="IMAGE h-64 w-64 rounded-full ">
        <span
          className={`mt-48 ml-48 flex justify-center items-center p-2 rounded-full absolute bg-[#2e2e2e40] backdrop-blur-md ${
            !edit && "hidden"
          }`}
        >
          <label htmlFor="IMAGEUPLOAD" className="cursor-pointer">
            <Camera />
          </label>
          <input
            id="IMAGEUPLOAD"
            type="file"
            accept="image/*"
            onChange={imageUpload}
            className="hidden"
          />
        </span>
        <img
          src={image ? image : User.Avatar}
          alt="profile"
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="h-10 w-3/4 pl-1 text-white text-3xl text-center overflow-hidden text-ellipsis whitespace-nowrap">
        {User.Username}
      </div>

      <div className="h-10 w-full pl-1 text-[#808080] text-lg text-center overflow-hidden text-ellipsis whitespace-nowrap">
        {User.Email}
      </div>
      {edit === true ? (
        <div className="w-full flex flex-col gap-5 p-2 justify-center items-center">
          <button
            onClick={updateUser}
            className="h-10 w-2/4 text-white text-lg text-center border-[0.1px] border-[#707070] bg-[#1C1C1C] rounded-lg cursor-pointer hover:bg-[#202020]"
          >
            Update
          </button>
          <button
            onClick={() => setEdit(!edit)}
            className="h-10 w-2/4 text-red-500 text-lg text-center border-[0.1px] border-[#707070] bg-[#1C1C1C] rounded-lg cursor-pointer hover:bg-[#202020]"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEdit(!edit)}
          className="h-10 w-2/4 text-white text-lg text-center border-[0.1px] border-[#707070] bg-[#1C1C1C] rounded-lg cursor-pointer hover:bg-[#202020]"
        >
          Edit profile
        </button>
      )}
      <div
        className={`text-red-500 h-fit w-72 ml-6 mt-96 -mb-40 text-sm absolute ${
          visibility ? "visible" : "hidden"
        }`}
      >
        {error}
      </div>
    </div>
  );
};

export default User;
