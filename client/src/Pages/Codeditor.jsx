import { useState } from "react";
import "../Style/scrollbar.css";

const CodeEditor = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [fullScreen, setFullScreen] = useState(false);

  const handleSave = () => {
    const outputDoc = document.getElementById("output").contentDocument;
    outputDoc.body.innerHTML = html;
    outputDoc.head.innerHTML = `<style>${css}</style>`;
    outputDoc.defaultView.eval(js);
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="w-full h-screen bg-[#101010] flex flex-col">
      <div className="flex flex-wrap gap-2 p-4 justify-evenly ">
        {["HTML", "CSS", "JS"].map((type) => (
          <div
            key={type}
            className="w-[30vw] h-[60vh] bg-[#101010] shadow-md border-2 border-gray-700 rounded-lg overflow-auto custom-scrollbar"
          >
            <div className="flex justify-between items-center bg-[#101010] text-white rounded-b-lg p-4">
              <div className="flex items-center gap-2">
                <img
                  src={`/images/${type.toLowerCase()}.png`}
                  alt={type}
                  className="w-6"
                />
                <span>{type}</span>
              </div>
              <img
                src="/svg/copy.svg"
                alt="Copy"
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() =>
                  handleCopy(type === "HTML" ? html : type === "CSS" ? css : js)
                }
              />
            </div>
            <textarea
              className="w-full h-full bg-[#1c1c1c] text-white p-4 text-lg outline-none resize-none custom-scrollbar2"
              spellCheck="false"
              value={type === "HTML" ? html : type === "CSS" ? css : js}
              onChange={(e) =>
                type === "HTML"
                  ? setHtml(e.target.value)
                  : type === "CSS"
                  ? setCss(e.target.value)
                  : setJs(e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <div
        className={`fixed bottom-0 w-full bg-[#1c1c1c] text-white shadow-md transition-all ${
          fullScreen ? "h-screen" : "h-1/3"
        }`}
      >
        <div className="flex justify-end gap-4 p-4">
          <img
            src="/svg/save.svg"
            alt="Save"
            className="cursor-pointer hover:scale-110"
            onClick={handleSave}
          />
          <img
            src="/svg/full.svg"
            alt="Fullscreen"
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={() => setFullScreen(!fullScreen)}
          />
        </div>
        <iframe id="output" className="w-full h-full bg-white"></iframe>
      </div>
    </div>
  );
};

export default CodeEditor;
