import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useEffect, useRef, useState } from "react";
import { Send } from "../assets/Svgs.jsx";
import Loader from "../assets/Loader.jsx";
import "../Style/scrollbar.css";
const AI = () => {
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const [query, setQuery] = useState([]);
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSet = () => {
    if (input) {
      setQuery([...query, { prompt: input, response: null }]);
      setInput("");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchResponse = async () => {
      if (query.length > 0 && query[query.length - 1].response === null) {
        setIsFetching(true);
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}ai/review`,
            {
              query: query[query.length - 1],
            }
          );
          if (response.statusText === "OK") {
            setQuery((prev) => {
              const updatedQueries = [...prev];
              updatedQueries[updatedQueries.length - 1].response =
                response.data;
              return updatedQueries;
            });
          } else {
            console.log("Unexpected response status:", response.status);
          }
        } catch (error) {
          console.log("Error:", error);
        } finally {
          setIsFetching(false);
        }
      }
    };
    fetchResponse();
    return () => controller.abort();
  }, [query]);

  useEffect(() => {
    if (query.length > 0) {
      const { current } = containerRef;
      const start = current.scrollTop;
      const end = current.scrollHeight;
      const duration = 600;
      let startTime = null;

      const smoothScroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = start + (end - start) * (timeElapsed / duration);
        current.scrollTop = run;
        if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
      };
      requestAnimationFrame(smoothScroll);
    }
  }, [query]);

  const Display = () => {
    return (
      <>
        {query.map((query, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="h-fit w-fit p-4 text-lg rounded-2xl bg-[#29292970] max-w-2xl place-self-end overflow-x-scroll custom-scrollbar">
              <Markdown>{query.prompt}</Markdown>
            </div>

            <div className="h-fit w-fit p-4 text-lg rounded-2xl max-w-2xl place-self-start overflow-x-scroll custom-scrollbar">
              {query.response === null ? (
                <div className="flex gap-6 justify-center items-center">
                  <Loader />
                  generating response . . .
                </div>
              ) : (
                <Markdown rehypePlugins={rehypeHighlight}>
                  {query.response}
                </Markdown>
              )}
            </div>
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      <div className="w-full h-full p-3 rounded-lg flex justify-center bg-[#101010] backdrop-blur-xs border-[0.1px] border-[#2e2e2e]">
        <div
          className="h-[75vh] w-full text-white overflow-y-scroll custom-scrollbar rounded-2xl pb-10 flex flex-col gap-2 transition-all duration-150"
          ref={containerRef}
        >
          {query.length !== 0 ? (
            <Display />
          ) : (
            <div className="h-full w-full font-semibold text-4xl flex justify-center items-center gap-8">
              <Loader />
              Hey, how can I help ?
            </div>
          )}
        </div>

        <div className="absolute place-self-end h-fit w-fit rounded-4xl">
          <div className="relative p-1 rounded-4xl flex justify-center items-center  border-2 border-[#363636] bg-[#232323]">
            <textarea
              ref={textareaRef}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="min-h-14 h-auto max-h-60 w-2xl pt-3 p-2 text-white text-lg rounded-3xl flex items-center overflow-y-scroll custom-scrollbar outline-none resize-none transition-all duration-500"
              rows={1}
              placeholder="Enter your message here"
            ></textarea>

            <button
              onClick={handleSet}
              disabled={isFetching}
              className="rounded-full place-self-end bg-[#b6b4b4]"
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AI;
