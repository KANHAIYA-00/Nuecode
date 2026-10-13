import axios from "axios";
import { useState, useEffect } from "react";
import { Username, ViewOff, ViewOn } from "../assets/Svgs";
import { Error, Info, Success, Warning } from "../assets/Toastify.jsx";
import { ValidatePassword, ValidateUsername } from "../Functions/Validator.jsx";
const Signin = () => {
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("password");
  const [User, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setMessage("Signin to your account.");
      setToast("info");
    }, 500);
  }, []);

  const handleChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  function validation() {
    const nameError = ValidateUsername(User.username);
    const passwordError = ValidatePassword(User.password);
    if (nameError) {
      setMessage(nameError);
      setToast("warning");
      return false;
    }
    if (passwordError) {
      setMessage(passwordError);
      setToast("warning");
      return false;
    }
    return true;
  }

  const sendDataToBackend = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!User.username || !User.password) {
      setMessage("All fields are required !");
      setToast("warning");
      setLoading(false);
      return;
    }
    if (validation()) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/finduser`,
          User,
          {
            validateStatus: () => true,
            withCredentials: true,
          }
        );
        if (response.status >= 200 && response.status < 300) {
          window.location.href = `/${User.username}/Home`;
        } else {
          setMessage(response.data);
          setToast("error");
        }
      } catch (error) {
        console.error("Unexpected Error:", error);
        setMessage("An unexpected error occurred. Please try again.");
        setToast("error");
      } finally {
        setLoading(false);
      }
    } else setLoading(false);
  };

  useEffect(() => {
    if (toast != "") {
      setIsHidden(false);
      const timer = setTimeout(() => {
        setIsHidden(true);
        setToast("");
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  return (
    <>
      <section>
        {["success", "warning", "info", "error"].map((type, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-300 -translate-x-36 ${
              isHidden || toast !== type ? "-translate-y-96" : "-translate-y-44"
            }`}
          >
            {type === "success" && (
              <Success Message={toast === "success" ? message : ""} />
            )}
            {type === "warning" && (
              <Warning Message={toast === "warning" ? message : ""} />
            )}
            {type === "info" && (
              <Info Message={toast === "info" ? message : ""} />
            )}
            {type === "error" && (
              <Error Message={toast === "error" ? message : ""} />
            )}
          </div>
        ))}
      </section>
      <form onSubmit={sendDataToBackend} action="submit">
        <div className="h-[55vh] w-[30vw] flex justify-center items-center gap-4 flex-col p-8 bg-[#1C1C1C] rounded-2xl">
          <section className="h-1/12 w-full text-2xl text-emerald-400 font-semibold flex">
            <div className="h-full w-full text-center text-4xl cursor-pointer">
              SIGN IN
            </div>
          </section>
          <section className="h-8/12 w-full flex flex-col justify-center items-center gap-8">
            {[
              {
                name: "username",
                type: "text",
                icon: <Username />,
                value: User.username,
              },
              {
                name: "password",
                type: view,
                icon: view === "text" ? <ViewOn /> : <ViewOff />,
                value: User.password,
                toggleIcon: () =>
                  setView(view === "text" ? "password" : "text"),
              },
            ].map(({ name, type, icon, value, toggleIcon }, index) => (
              <div
                key={index}
                className={`relative h-20 w-full flex items-end + ${
                  value
                    ? "border-b-2 border-b-emerald-400"
                    : "border-b-2 border-white"
                }`}
              >
                <input
                  onChange={handleChange}
                  name={name}
                  type={type}
                  value={value}
                  className="h-12 w-5/6 text-white text-xl outline-none peer"
                />
                <div
                  onClick={toggleIcon}
                  className="h-full w-1/6 flex justify-center items-center cursor-pointer"
                >
                  {icon}
                </div>
                <span
                  className={`absolute text-xl font-semibold tracking-wide  peer-focus:translate-x-0 peer-focus:-translate-y-12 peer-focus:text-emerald-400 + ${
                    value
                      ? "translate-x-0 -translate-y-12 text-emerald-400"
                      : "translate-x-2 -translate-y-5 text-[#808080]"
                  } + transition-all duration-300`}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
              </div>
            ))}
            <div className="flex justify-center items-center gap-20">
              <span className="text-xl tracking-wide text-[#aaaaaa] hover:underline cursor-pointer">
                Forgot password ?
              </span>
              <button
                type="submit"
                disabled={loading}
                className="form-submit-btn w-30 p-2 flex justify-center items-center text-white text-xl bg-emerald-600 cursor-pointer rounded-md active:scale-95 transition-all duration-200 font-semibold"
              >
                Sign In
              </button>
            </div>
          </section>
        </div>
      </form>
    </>
  );
};

export default Signin;
