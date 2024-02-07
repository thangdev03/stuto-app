import { useState } from "react";
import { Link } from "react-router-dom";
import { IoCalendarNumber, IoTimerOutline, IoVideocam, IoVideocamOff } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { TbTargetArrow } from "react-icons/tb";
import { LuScreenShare } from "react-icons/lu";
import { FaGoogleDrive } from "react-icons/fa6";
import { PiMountainsFill } from "react-icons/pi";

function Meeting() {
    const [activeCamera, setActiveCamera] = useState(false);

    return (
        <div className="meeting-back w-full h-screen px-7 py-5 flex justify-between items-start">
            <div className="flex gap-4 items-center">
                <div className="h-16 py-2 px-3 text-center text-white bg-primaryColor/70 rounded-xl cursor-pointer hover:bg-primaryColor/80">
                    <p className="flex items-center gap-1 text-sm"><IoTimerOutline />Đồng hồ bấm giờ</p>
                    <p className="mt-1 font-medium">46:25:00</p>
                </div>
                <div className="h-16 py-2 px-3 text-center text-white bg-primaryColor/70 rounded-xl cursor-pointer hover:bg-primaryColor/80">
                    <p className="flex items-center gap-1 text-sm"><TbTargetArrow />Mục tiêu buổi học</p>
                    <p className="mt-1 font-medium">2/6</p>
                </div>
                <div 
                    className={`h-9 w-24 bg-gray-300 rounded-full flex items-center cursor-pointer opacity-80
                    transition-all ${activeCamera && "bg-primaryColor"}`} 
                    onClick={() => setActiveCamera(!activeCamera)}>
                        <div className={`w-7 h-7 
                        rounded-full transition-all bg-white flex items-center justify-center
                        ${activeCamera ? "ml-16" : "ml-1"}`}>
                            {activeCamera ? (
                            <IoVideocam className="text-primaryColor"/>
                            ) : (
                            <IoVideocamOff className="text-textInactive"/>
                            )}
                        </div>
                </div>
            </div>
            <div className="right-part flex gap-2">
                <div className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Chiếu MH</p>
                    <LuScreenShare className="mt-1 text-xl shrink-0"/>
                </div>
                <div className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Lịch</p>
                    <IoCalendarNumber className="mt-1 text-xl shrink-0"/>
                </div>
                <div className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Lưu trữ</p>
                    <FaGoogleDrive className="mt-1 text-xl shrink-0"/>
                </div>
                <div className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Space</p>
                    <PiMountainsFill className="mt-1 text-xl shrink-0"/>
                </div>
                <Link to="/phong-hoc-online" className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Thoát ra</p>
                    <FiLogOut className="mt-1 text-xl shrink-0"/>
                </Link>
            </div>
        </div>
    );
}

export default Meeting;