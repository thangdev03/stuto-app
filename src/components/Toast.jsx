import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa"
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

function Toast({type, message}) {
  const [position, setPosition] = useState("translate-x-[130%]")
  let timer;
  // const handleClose = () => {
  //   setPosition("translate-x-[130%]");
  //   clearTimeout(timer);
  // }

  useEffect(() => {
    setPosition("translate-x-0");

    timer = setTimeout(() => {
      setPosition("translate-x-[130%]");
    }, 3000)

    return () => {
      clearTimeout(timer);
    }
  }, [])

  return (
    <div>
      {(type === "FAILED") && (
        <div
          className={`fixed z-30 top-32 right-8 rounded-xl 
            bg-white py-5 pl-8 pr-6 overflow-hidden flex flex-col transition-all ${position}`}
        >
          <div className="flex justify-between items-center">
            <FaExclamationCircle className="text-red-500 h-8 w-8 text-4xl"/>
            <div className="flex flex-col mx-5">
              <h1 className="text-base font-semibold text-[#333]">{type}</h1>
              <p className="text-base text-[#555]">{message}</p>
            </div>
            {/* <IoMdClose onClick={handleClose} className="text-[#444] cursor-pointer opacity-70 hover:opacity-100 self-start"/> */}
          </div>
          <div
            className="progress w-full h-[3px] 
            before:content-[''] before:block before:w-full before:h-[3px] before:absolute before:bottom-0 before:right-0 
            before:bg-red-500 before:animate-[progress_3s_linear_forwards]"
          ></div>
        </div>
      )}
      {(type === "SUCCESS") && (
        <div
          className={`fixed z-30 top-32 right-8 rounded-xl 
            bg-white py-5 pl-8 pr-6 overflow-hidden flex flex-col transition-all ${position}`}
        >
          <div className="flex justify-between items-center">
            <FaCheckCircle className="text-green-500 h-8 w-8 text-4xl"/>
            <div className="flex flex-col mx-5">
              <h1 className="text-base font-semibold text-[#333]">{type}</h1>
              <p className="text-base text-[#555]">{message}</p>
            </div>
            {/* <IoMdClose onClick={handleClose} className="text-[#444] cursor-pointer opacity-70 hover:opacity-100 self-start"/> */}
          </div>
          <div
            className="progress w-full h-[3px] 
            before:content-[''] before:block before:w-full before:h-[3px] before:absolute before:bottom-0 before:right-0 
            before:bg-blue-500 before:animate-[progress_3s_linear_forwards]"
          ></div>
        </div>
      )}
    </div>
  );
}

export default Toast;
