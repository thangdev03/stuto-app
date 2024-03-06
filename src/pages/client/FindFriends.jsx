import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import FilterFriends from "../../components/FilterFriends"
import { useAuthContext } from "../../hooks/useAuthContext";

var statusFindFriend = true;

function FindFriends() {
    const [activeFind, setActiveFind] = useState(statusFindFriend);
    const [openInvitation, setOpenInvitation] = useState(false);
    const [state, dispatch] = useAuthContext();
    const { user } = state;
    let username = ""

    if (user) {
        const nameWords = user.name.split(" ");
        const lastName = nameWords.pop();
        if (nameWords.length >= 2) {
            const secondLastName = nameWords.pop();
            username = secondLastName + " " + lastName;
        } else {
            username = user.name;
        }
    }

    function handleOpenInvitation() {
        setOpenInvitation(!openInvitation);
    }

    return (
        <div className="ml-72 mr-[386px] my-10">
            <h1 className="font-bold text-3xl">Nè {username}, bạn muốn học cùng ai?</h1>
            <div className="mt-8 pt-5 px-6 pb-6 bg-white w-full rounded-lg shadow-blockShadow">
                <div className="flex justify-between items-center">
                    <span className="font-medium">Chế độ tìm bạn học</span>
                    <div 
                    className={`h-10 w-32 bg-gray-300 rounded-full flex items-center cursor-pointer
                    transition-all ${activeFind && "bg-primaryColor"}`} 
                    onClick={() => setActiveFind(!activeFind)}>
                        <div className={`w-8 h-8 
                        rounded-full transition-all bg-white
                        ${activeFind ? "ml-[92px]" : "ml-1"}`}></div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">Thay đổi yêu cầu của bạn</span>
                    <button className="px-6 py-2 text-primaryColor border border-primaryColor rounded-full transition-all
                    hover:text-white hover:bg-primaryColor">
                        Chỉnh sửa
                    </button>
                </div>
            </div>
            {/* Users list */}
            <div className="mt-8">
                <h3 className="font-semibold text-xl">Các StuToers phù hợp nhất</h3>
                <div className="mt-3 users-container">
                    <div className="mb-2 pt-3 pr-6 pl-3 pb-4 min-h-64 bg-boxBackground rounded-lg shadow-blockShadow">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <img 
                                    src="./img/default-avatar.png" 
                                    alt="avatar"
                                    className="w-16 h-16 object-cover rounded-full" 
                                />
                            </div>
                            <div className="grow flex flex-col overflow-hidden">
                                <div className="relative">
                                    <div>
                                        <h3 className="text-lg font-semibold">Chu Bin</h3>
                                        <div className="flex items-center gap-2 mt-1 mb-1">
                                            <MdLocationOn />
                                            <p className="font-medium">Hồ Chí Minh</p>
                                        </div>
                                        <p><span className="font-medium">Chuyên ngành:</span> Information Technology</p>
                                        <p><span className="font-medium">Trình độ:</span> Undergraduate</p>
                                        <p><span className="font-medium">Môn học:</span> Trí tuệ nhân tạo</p>
                                        <p><span className="font-medium">Mong muốn:</span> Tìm bạn cùng học các môn thuộc Computer Science, đặc biệt là phân tích dữ liệu và trí tuệ nhân tạo</p>
                                    </div>
                                    <div className="flex items-center gap-2 h-7 absolute top-0 right-0">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <p className="text-textInactive text-sm">Online</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between items-center flex-wrap">
                                    <div className="mt-4 text-primaryColor flex justify-between items-center gap-3 font-medium">
                                        <p className="flex gap-2 items-center text-sm"><FaUserFriends />Số bạn học: 12</p>
                                        <span className="block w-[2px] h-6 bg-[#bbbbbb] rounded-full"></span>
                                        <p className="flex gap-2 items-center text-sm"><FaClock />Số giờ đã học: 6h 23m</p>
                                    </div>
                                    <button 
                                        onClick={handleOpenInvitation}
                                        className="mt-4 text-sm text-primaryColor font-medium px-3 py-2 border-2 border-primaryColor rounded flex items-center gap-2
                                        hover:text-white hover:bg-primaryColor transition-all"
                                    >
                                        <IoIosSend />
                                        Mời học cùng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {openInvitation && (
                        <div onClick={handleOpenInvitation} className="fixed z-30 left-0 top-0 right-0 bottom-0 bg-[#222222]/30">
                            <div onClick={(e) => e.stopPropagation()} className="h-80 w-1/3 bg-boxBackground mx-auto mt-20 rounded-xl px-4 pt-4">
                                <h2 className="font-medium">Lời mời gửi tới Chu Bin</h2>
                                <textarea type="text" className="mt-2 py-2 text-wrap px-3 w-full h-56 text-sm resize-none bg-[#cdcdcd]/20 outline-none border border-[#444444]/80 rounded-md">
                                    Chào bạn, mình có thể kết nối với bạn để cùng học chung được không? Mình cũng đang làm bài về môn học này ^^
                                </textarea>
                                <div className="float-right inline-block">
                                    <button 
                                        type="submit"
                                        onClick={handleOpenInvitation} 
                                        className="mr-2 min-w-20 text-sm py-2 px-4 bg-red-500 text-white rounded-lg
                                        hover:shadow-blockShadow hover:bg-red-500/80">
                                        Hủy
                                    </button>
                                    <button type="submit" className="min-w-20 text-sm py-2 px-4 bg-primaryColor text-white rounded-lg
                                    hover:shadow-blockShadow hover:bg-primaryColor/80">
                                        Gửi lời mời
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FilterFriends />
        </div>
    )
}

export default FindFriends