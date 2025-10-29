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

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  // AIzaSyCKom0ugvBn5YoZXP7wzmHUfMZ9VKFHNwo

  const [outputScreen, setOutputScreen] = useState(true);
  const [tab, setTab] = useState(1);

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCKom0ugvBn5YoZXP7wzmHUfMZ9VKFHNwo",
  });

  async function getResponse() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
  }

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
          />
          <p className="text-[15px] font-semibold mt-4">
            Describe Your Components
          </p>
          <textarea
            className="w-full min-h-[250px] bg-[#111827] mt-3 rounded-xl p-2.5  hover:border  border-purple-500 "
            placeholder="Describe Your Components in detail"
          ></textarea>
          <div className="flex items-center justify-between px-2.5">
            <p className="text-gray-500 text-[17px] font-semibold">
              Click to Generate the Code{" "}
            </p>

            <button
              onClick={getResponse}
              className="generate flex items-center p-4 rounded-lg mt-3  gap-2.5 px-5 transition-all 
              hover:opacity-[0.8] bg-linear-to-r from-purple-400  to-purple-600"
            ><BsStars /> Generate</button>
          </div>
        </div>

        {/* RIGHT SIDE OF UI IS HERE  */}

        <div className="left w-[50%] h-[85vh] mt-5 bg-gray-800 rounded-lg">
          {outputScreen === false ? (
            <>
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
                      <button className="copy w-10 h-10 flex items-center justify-center border border-zinc-700 rounded-xl transition-all hover:bg-gray-700 ">
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
