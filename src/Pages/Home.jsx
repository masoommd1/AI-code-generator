import React, { useState, useEffect } from "react";
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
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

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
  const [frameWork, setFrameWork] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Apply dark mode to document
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Helper functions for dynamic classes
  const getBgColor = () => (darkMode ? "bg-gray-900" : "bg-white");
  const getCardBgColor = () => (darkMode ? "bg-gray-800" : "bg-gray-100");
  const getTextColor = () => (darkMode ? "text-white" : "text-gray-900");
  const getSecondaryTextColor = () =>
    darkMode ? "text-gray-400" : "text-gray-600";
  const getBorderColor = () =>
    darkMode ? "border-gray-700" : "border-gray-300";
  const getHoverColor = () =>
    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200";

  // React Select styles
  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
      borderColor: darkMode ? "#374151" : "#d1d5db",
      color: darkMode ? "white" : "black",
      borderRadius: "12px",
      minHeight: "45px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
      border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
      borderRadius: "12px",
      overflow: "hidden",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? darkMode
          ? "#374151"
          : "#f3f4f6"
        : darkMode
        ? "#1f2937"
        : "#ffffff",
      color: darkMode ? "white" : "black",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: darkMode ? "white" : "black",
    }),
    input: (base) => ({
      ...base,
      color: darkMode ? "white" : "black",
    }),
    placeholder: (base) => ({
      ...base,
      color: darkMode ? "#9ca3af" : "#6b7280",
    }),
  };

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  async function getResponse() {
    if (!prompt.trim()) {
      toast.error("Please describe your component before generating code!");
      return;
    }

    if (!frameWork) {
      toast.error("Please select a framework!");
      return;
    }

    setOutputScreen(false);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an expert web developer. Create a modern, animated, and responsive UI component for: ${prompt}.
Framework: ${frameWork.label}.
Return ONLY the full code (single HTML file, no explanation).`,
      });

      const result = response.text?.trim();
      setCode(extractCode(result || ""));
      setOutputScreen(true);
      toast.success("Code generated successfully!");
    } catch (error) {
      console.error(error);
      setOutputScreen(true);
      setCode(
        "<!-- Error generating code. Please try again. -->\n<div style='color: red; padding: 20px; text-align: center;'>Error generating code. Please try again.</div>"
      );
      toast.error("Error generating code. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch {
      toast.error("Failed to copy code.");
    }
  };

  const downloadFile = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AI-Generated-Component.html";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded!");
  };

  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div
        className={`flex flex-col lg:flex-row items-start justify-between px-4 lg:px-[100px] gap-4 min-h-screen py-4 transition-colors duration-300 ${getBgColor()}`}
      >
        {/* LEFT PANEL */}
        <div
          className={`right w-full lg:w-[50%] h-auto rounded-2xl p-4 lg:p-6 transition-colors duration-300 ${getCardBgColor()} ${getBorderColor()} border`}
        >
          <h3
            className={`font-semibold text-2xl lg:text-[25px] ${
              darkMode ? "text-purple-400" : "text-violet-600"
            }`}
          >
            AI component generator
          </h3>
          <p
            className={`mt-2 text-sm lg:text-[16px] ${getSecondaryTextColor()}`}
          >
            Describe your thought and let AI code it for you
          </p>

          <p className={`text-[15px] font-semibold mt-6 ${getTextColor()}`}>
            Framework
          </p>
          <Select
            styles={selectStyles}
            options={options}
            value={frameWork}
            onChange={(e) => setFrameWork(e)}
            placeholder="Select Framework"
            className="mt-2"
          />

          <p className={`text-[15px] font-semibold mt-6 ${getTextColor()}`}>
            Describe Your Component
          </p>
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) getResponse();
            }}
            value={prompt}
            className={`w-full min-h-[250px] mt-3 rounded-xl p-4 placeholder-gray-500 transition-colors duration-300 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
              darkMode
                ? "bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-purple-800"
                : "bg-white border-gray-300 text-gray-900"
            } border`}
            placeholder="Example: Responsive navbar with logo, hover animation, and dropdown menu"
          ></textarea>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2.5 mt-4 gap-3">
            <p
              className={`text-[15px] font-semibold ${getSecondaryTextColor()}`}
            >
              Click to Generate the Code
            </p>

            <button
              onClick={getResponse}
              disabled={loading}
              className="generate flex items-center p-3 lg:p-4 rounded-lg gap-2.5 px-5 transition-all hover:opacity-90 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <PulseLoader size={8} color="white" />
              ) : (
                <>
                  <BsStars /> Generate
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className={`left relative w-full lg:w-[50%] h-[70vh] lg:h-[82vh] rounded-xl overflow-hidden transition-colors duration-300 ${getCardBgColor()} ${getBorderColor()} border`}
        >
          {!outputScreen ? (
            <>
              {loading && (
                <div
                  className={`loader absolute left-0 top-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-10 ${
                    darkMode ? "bg-gray-900/80" : "bg-white/80"
                  }`}
                >
                  <div className="text-center">
                    <PulseLoader color="#a855f7" size={15} />
                    <p
                      className={`mt-4 font-semibold ${
                        darkMode ? "text-purple-400" : "text-violet-600"
                      }`}
                    >
                      Generating your code...
                    </p>
                  </div>
                </div>
              )}
              <div className="skeleton w-full h-full flex flex-col items-center justify-center p-4">
                <div className="circle p-5 h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full flex items-center justify-center text-2xl lg:text-3xl bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <HiOutlineCode />
                </div>
                <p
                  className={`text-[15px] lg:text-[16px] font-semibold mt-4 text-center ${getSecondaryTextColor()}`}
                >
                  {loading
                    ? "Generating your code..."
                    : "Code will generate here"}
                </p>
                {!loading && (
                  <p
                    className={`text-[13px] mt-2 text-center ${getSecondaryTextColor()}`}
                  >
                    Select a framework and describe your component to get
                    started
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* TAB BUTTONS */}
              <div
                className={`top w-full h-[60px] px-4 flex items-center gap-4 border-b ${getBorderColor()} ${getCardBgColor()}`}
              >
                <button
                  onClick={() => setTab(1)}
                  className={`w-[50%] p-3 rounded-lg transition-all cursor-pointer font-semibold text-sm lg:text-base ${
                    tab === 1
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                      : `${getSecondaryTextColor()} ${getHoverColor()}`
                  }`}
                >
                  Code
                </button>

                <button
                  onClick={() => setTab(2)}
                  className={`w-[50%] p-3 rounded-lg transition-all cursor-pointer font-semibold text-sm lg:text-base ${
                    tab === 2
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                      : `${getSecondaryTextColor()} ${getHoverColor()}`
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* TOOLBAR */}
              <div
                className={`top2 w-full h-[60px] px-4 flex items-center justify-between gap-4 border-b ${getBorderColor()} ${getCardBgColor()}`}
              >
                <p
                  className={`font-bold text-sm lg:text-base ${getTextColor()}`}
                >
                  Code Editor
                </p>
                <div className="right flex items-center gap-2">
                  {tab === 1 ? (
                    <>
                      <button
                        onClick={copyCode}
                        title="Copy Code"
                        className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl transition-all ${getHoverColor()} ${getBorderColor()} border ${getSecondaryTextColor()}`}
                      >
                        <IoCopy className="text-sm lg:text-base" />
                      </button>
                      <button
                        onClick={downloadFile}
                        title="Download File"
                        className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl transition-all ${getHoverColor()} ${getBorderColor()} border ${getSecondaryTextColor()}`}
                      >
                        <PiExportBold className="text-sm lg:text-base" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsNewTabOpen(true)}
                        title="Open in New Tab"
                        className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl transition-all ${getHoverColor()} ${getBorderColor()} border ${getSecondaryTextColor()}`}
                      >
                        <RxOpenInNewWindow className="text-sm lg:text-base" />
                      </button>
                      <button
                        onClick={refreshPreview}
                        title="Refresh Preview"
                        className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl transition-all ${getHoverColor()} ${getBorderColor()} border ${getSecondaryTextColor()}`}
                      >
                        <FiRefreshCcw className="text-sm lg:text-base" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* MAIN VIEW */}
              <div className="editor h-[calc(100%-120px)]">
                {tab === 1 ? (
                  <Editor
                    height="100%"
                    theme={darkMode ? "vs-dark" : "vs"}
                    language="html"
                    value={code}
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      wordWrap: "on",
                      automaticLayout: true,
                    }}
                  />
                ) : (
                  <iframe
                    key={refreshKey}
                    srcDoc={code}
                    className="w-full h-full bg-white text-black overflow-auto"
                    style={{ minHeight: "100%" }}
                    title="Component Preview"
                  ></iframe>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* FULLSCREEN PREVIEW */}
      {isNewTabOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between bg-gray-900 text-white p-4">
            <p className="text-lg font-bold">Live Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="w-10 h-10 rounded-xl border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-all text-gray-300 hover:text-white"
            >
              <MdClose />
            </button>
          </div>
          <iframe
            key={refreshKey}
            srcDoc={code}
            className="w-full flex-1 bg-white overflow-auto"
            title="Fullscreen Component Preview"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Home;
