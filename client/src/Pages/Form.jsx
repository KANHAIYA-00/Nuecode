import Signin from "../Components/Signin.jsx";
import Signup from "../Components/Signup.jsx";
import { useLocation, useNavigate } from "react-router-dom";
const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getTransformClass = () => {
    switch (location.pathname) {
      case "/signin":
        return "translate-x-56";
      case "/signup":
        return "-translate-x-56";
      default:
        return "-translate-x-56";
    }
  };
  return (
    <>
      <div className="relative overflow-hidden z-10 h-screen w-screen bg-[#101010] flex justify-center items-center">
        <div className="h-[45vh] w-3/6 rounded-2xl flex bg-linear-65 from-[#ff00ff] to-[#3700ff]">
          <section className="h-full w-2/4 text-[#d3d3d3] flex flex-col justify-center items-center gap-4 p-4 bg-[#101010] hover:scale-[0.98] hover:rounded-s-2xl transition-all duration-300">
            <span className="text-5xl">Don&apos;t have an account?</span>
            <button
              onClick={() => navigate("/signup")}
              className="h-10 w-30 border-2 border-[#808080] text-xl rounded-xl cursor-pointer"
            >
              SIGN UP
            </button>
          </section>
          <section className="h-full w-2/4 text-[#d3d3d3] flex flex-col justify-center items-center gap-4 p-4 bg-[#101010] hover:scale-[0.98] hover:rounded-e-2xl transition-all duration-300">
            <span className="text-5xl">Have an account?</span>
            <button
              onClick={() => navigate("/signin")}
              className="h-10 w-30 border-2 border-[#808080] text-xl rounded-xl cursor-pointer"
            >
              SIGN IN
            </button>
          </section>
        </div>
        <div
          className={`absolute ${getTransformClass()} transition-all duration-700`}
        >
          {location.pathname === "/signin" && <Signin />}
          {location.pathname === "/signup" && <Signup />}
        </div>
      </div>
    </>
  );
};

export default Form;
