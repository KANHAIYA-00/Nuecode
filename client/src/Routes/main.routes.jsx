import { Routes, Route } from "react-router-dom";
import Main from "../Pages/Main";
import Form from "../Pages/Form.jsx";
import LandingPage from "../Pages/Landingpage.jsx";
import CodeEditor from "../Pages/Codeditor.jsx";
const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Form />} />
        <Route path="/signin" element={<Form />} />
        <Route path={"/CodeEditor"} element={<CodeEditor />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
