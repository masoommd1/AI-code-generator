import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";


const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [outputScreen, setOutputScreen] = useState(true);
  const [tab, setTab] = useState(1);

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-between px-[100px] gap-5">

        {/* LEFT side of UI  */}

        <div className="left w-[50%] h-auto mt-5 bg-gray-800 rounded-2xl p-5 ">
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
              className="generate flex items-center p-4 rounded-lg mt-3  gap-2.5 px-5 transition-all 
              hover:opacity-[0.8] bg-linear-to-r from-purple-400  to-purple-600"
            >
              <BsStars /> Generate
            </button>
          </div>
        </div>

        {/* RIGHT SIDE OF UI IS HERE  */}

        <div className="right w-[50%] h-[85vh] mt-5 bg-gray-800 relative rounded-lg ">
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
                onClick={()=>{setTab(1)}}
                  className={`w-[50%] p-2.5  rounded-md transition-all cursor-pointer font-semibold ${
                    tab === 1
                      ? "bg-linear-to-r from-purple-400  to-purple-600"
                      : ""
                  }`}
                >
                  Code
                </button>

                <button
                onClick={()=>{setTab(2)}}
                  className={`w-[50%] p-2.5  rounded-md transition-all cursor-pointer font-semibold ${
                    tab === 2
                      ? "bg-linear-to-r from-purple-400  to-purple-600"
                      : ""
                  }`}
                >
                  Preview
                </button>
              </div>

              <div className="editor">
                <Editor
                  height="100%"
                  theme="vs-dark"
                  defaultLanguage="javascript"
                  defaultValue="// some comment"
                />
                ;
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
