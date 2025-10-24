import React from "react";
import NavBar from "../components/NavBar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];
  return (
    <>
      <NavBar />
      <div className="flex items-center justify-between px-[100px] gap-5">
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
            className="w-full min-h-[250px] bg-[#111827] mt-3 rounded-xl p-2.5  hover:border-2 border-purple-800 "
            placeholder="Describe Your Components in detail"
          ></textarea>
          <div className="flex items-center justify-between px-2.5">
          <p className="text-gray-500 text-[17px] font-semibold">Click to Generate the Code </p>

          <button
            className="generate flex items-center p-4 rounded-lg mt-3  gap-2.5 px-5 transition-all hover:opacity-[0.8]
                        -auto bg-gradient-to-r from-purple-400  to-purple-600">
            <BsStars /> Generate</button>
          </div>
        </div>
        <div className="left w-[50%] h-[85vh] mt-5 bg-gray-800 rounded-2xl "></div>
      </div>
    </>
  );
};

export default Home;
