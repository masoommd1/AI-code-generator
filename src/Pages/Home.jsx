import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { FiRefreshCcw } from "react-icons/fi";
import { RxOpenInNewWindow } from "react-icons/rx";
import { GoogleGenAI } from "@google/genai";
import { BounceLoader, ClipLoader, PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // using regex to extract the code from triple back ticks

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey:
      import.meta.env.VITE_GEMINI_API_KEY ||
      "AIzaSyCKom0ugvBn5YoZXP7wzmHUfMZ9VKFHNwo",
  });

  async function getResponse() {
    // Check if prompt is empty
    if (!prompt.trim()) {
      toast.error("Please describe your component before generating code! ");
      return;
    }
    setOutputScreen(false); // Reset to show loading state
    setLoading(true);

    // ... rest of your existing code
    // setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: ` You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
The code must be clean, well-structured, and easy to understand.  
Optimize for SEO where applicable.  
Focus on creating a modern, animated, and responsive UI design.  
Include high-quality hover effects, shadows, animations, colors, and typography.  
Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
Do NOT include explanations, text, comments, or anything else besides the code.  
And give the whole code in a single HTML file.`,
      });
      console.log(response.text);
      setOutputScreen(true);
      setCode(extractCode(response.text));
      setLoading(false);
    } catch (error) {
      console.log(error);
      // Keep output screen visible even on error
      setOutputScreen(true);
      setCode("// Error generating code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // funtion for copying code
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copies to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-between px-[100px] gap-5">
        {/* LEFT side of UI  */}

        <div className="right w-[50%] h-auto mt-5 bg-gray-800 rounded-2xl p-5 ">
          <h3 className="font-semibold text-[25px] text-violet-600">
            AI component generator
          </h3>
          <p className="text-gray-500 mt-2 text-[16px]">
            Describe Your thought and Let AI to code{" "}
          </p>

          <p className="text-[15px] font-semibold mt-4">Framework</p>
          <Select
            className="dark-select mt-2 "
            classNamePrefix="react-select"
            options={options}
            onChange={(e) => {
              setFrameWork(e.value);
              console.log(e);
            }}
          />
          <p className="text-[15px] font-semibold mt-4 ">
            Describe Your Components
          </p>
          <textarea
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevents new line
                getResponse();
              }
            }}
            value={prompt}
            className="w-full min-h-[250px] bg-[#111827] mt-3 rounded-xl p-2.5 placeholder-gray-500 "
            placeholder="Describe your UI component requirements in detail...

Example specifications:
• Responsive navigation bar with dark theme
• User profile card with hover animations  
• E-commerce product grid with filter options
• Dashboard statistics widget with charts
• Contact form with validation states"
          ></textarea>

          <div className="flex items-center justify-between px-2.5">
            <p className="text-gray-500 text-[17px] font-semibold">
              Click to Generate the Code
            </p>

            <button
              onClick={getResponse}
              className="generate flex items-center p-4 rounded-lg mt-3  gap-2.5 px-5 transition-all 
              hover:opacity-[0.8] bg-linear-to-r from-purple-400  to-purple-600"
            >
              <BsStars /> Generate
            </button>
          </div>
        </div>

        {/* RIGHT SIDE OF UI IS HERE  */}

        <div className="left relative w-[50%] h-[82vh] mt-5 bg-gray-800 rounded-lg">
          {outputScreen === false ? (
            <>
              {loading === true ? (
                <>
                  <div className="loader absolute left-0 top-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
                    {/* <ClipLoader /> */}
                    {/* <BounceLoader/> */}
                    <PulseLoader />
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="skeleton w-full h-full items-center flex flex-col justify-center">
                <div
                  className="circle p-5 h-[100px] w-[100px] rounded-[50%] flex items-center justify-center text-2xl
            bg-linear-to-r from-purple-400  to-purple-600 "
                >
                  <HiOutlineCode />
                </div>
                <p className="text-[16px] text-gray-500 font-semibold mt-3">
                  Code will generate here
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="top w-full h-[60px] px-5 bg-transparent flex items-center gap-5">
                <button
                  onClick={() => {
                    setTab(1);
                  }}
                  className={`w-[50%] p-2.5  rounded-md transition-all cursor-pointer font-semibold ${
                    tab === 1
                      ? "bg-linear-to-r from-purple-400  to-purple-600"
                      : ""
                  }`}
                >
                  Code
                </button>

                <button
                  onClick={() => {
                    setTab(2);
                  }}
                  className={`w-[50%] p-2.5  rounded-md transition-all cursor-pointer font-semibold ${
                    tab === 2
                      ? "bg-linear-to-r from-purple-400  to-purple-600"
                      : ""
                  }`}
                >
                  Preview
                </button>
              </div>
              <div className="top2 w-full h-[60px] px-5 bg-transparent flex items-center justify-between gap-5 ">
                <div className="left">
                  <p className="font-bold">Code Editor</p>
                </div>
                <div className="right flex items-center gap-2.5 ">
                  {tab === 1 ? (
                    <>
                      <button
                        onClick={copyCode}
                        className="copy w-10 h-10 flex items-center justify-center border border-zinc-700 rounded-xl transition-all hover:bg-gray-700 "
                      >
                        <IoCopy />
                      </button>
                      <button className="export w-10 h-10 flex items-center justify-center border border-zinc-700 rounded-xl transition-all hover:bg-gray-700 ">
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="copy w-10 h-10 flex items-center  justify-center border border-zinc-700 rounded-xl transition-all hover:bg-gray-700 ">
                        <RxOpenInNewWindow />
                      </button>
                      <button className="export w-10 h-10 flex items-center justify-center border border-zinc-700 rounded-xl transition-all hover:bg-gray-700 ">
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="editor h-full">
                {tab === 1 ? (
                  <Editor
                    height="100%"
                    theme="vs-dark"
                    language="html"
                    value={code}
                    // defaultValue="// some comment"
                  />
                ) : (
                  <div className="preview h-full w-full flex items-center bg-amber-50 text-black justify-center"></div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
