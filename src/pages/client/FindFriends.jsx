import { MdLocationOn } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

function FindFriends() {
    return (
        <div className="ml-80 mr-[416px] mt-[114px]">
            <h1 className="font-bold text-3xl">Hi Nhật Thăng, bạn muốn học cùng ai?</h1>
            <div className="mt-8">
                <h3 className="font-semibold text-2xl">Các StuToers phù hợp nhất</h3>
                {/* Users list */}
                <div className="mt-3">
                    <div className="mb-2 pt-3 pr-6 pl-3 pb-4 min-h-64 bg-boxBackground rounded-lg shadow-blockShadow">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <img 
                                    src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/414095711_2062853317397924_4320486541956585795_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGR8cJh3RWBia0pQgtkWO8YDKnlQ1E9WIgMqeVDUT1YiGuge0-Gvmh7ntYv2hOiTl3hrgcoGasNBENWWv9oxpiV&_nc_ohc=BIfH2eF9DlsAX8Xk4Fv&_nc_ht=scontent.fhan9-1.fna&oh=00_AfC3UIIn5FGbpIYGlxOKfMsHR6-oBEASTpnaQaTGxlNBpA&oe=6595E54D" 
                                    alt="avatar"
                                    className="w-16 h-16 object-cover rounded-full" 
                                />
                            </div>
                            <div>
                                <div className="flex justify-between gap-10">
                                    <div>
                                        <h3 className="text-xl font-semibold">Chu Bin</h3>
                                        <div className="flex items-center gap-2 mt-1 mb-1">
                                            <MdLocationOn />
                                            <p className="font-medium">Hồ Chí Minh</p>
                                        </div>
                                        <p><span className="font-medium">Chuyên ngành:</span> Information Technology</p>
                                        <p><span className="font-medium">Trình độ:</span> Undergraduate</p>
                                        <p><span className="font-medium">Mong muốn:</span> Tìm bạn cùng học các môn thuộc Computer Science, đặc biệt là phân tích dữ liệu và trí tuệ nhân tạo</p>
                                    </div>
                                    <div className="flex items-center gap-2 h-7">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <p className="text-textInactive text-sm">Online</p>
                                    </div>
                                </div>
                                <div className="mt-10 flex justify-between items-center gap-24">
                                    <div className="text-primaryColor flex justify-between items-center grow font-medium">
                                        <p className="flex gap-2 items-center"><FaUserFriends />Số bạn học: 12</p>
                                        <span className="block w-[2px] h-6 bg-[#a7a7a7] rounded-full"></span>
                                        <p className="flex gap-2 items-center"><FaClock />Số giờ đã học: 6h 23m</p>
                                    </div>
                                    <button 
                                        className="text-primaryColor font-medium px-3 py-2 border-2 border-primaryColor rounded flex items-center gap-2
                                        hover:text-white hover:bg-primaryColor transition-all"
                                    >
                                        <IoIosSend />
                                        Mời học cùng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindFriends