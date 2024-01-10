import FriendsList from "../../components/FriendsList"
import { FaPlus } from "react-icons/fa";


function StudyRoom() {
    return (
        <div className="ml-80 mr-[416px] mt-10">
            <button className="w-full py-3 bg-primaryColor rounded-3xl text-white font-semibold flex items-center justify-center gap-2 text-xl shadow-blockShadow hover:brightness-105">
                <FaPlus className="text-base"/>
                Tạo phòng mới
            </button>

            {/* User's Rooms */}
            <div className="mt-10">
                <h2 className="font-semibold text-2xl">Phòng riêng</h2>
                <div className="mt-4 grid grid-cols-4 gap-y-2">
                    <div className="w-48 h-72 bg-[#B196FF]/70 rounded-xl">
                        <div>
                            <h3>Vượt qua vật lý đại ĐC ^.^</h3>
                            <p>2 Stutoers đang học</p>
                            <p>Mic cho phép</p>
                            <p>Camera cho phép</p>
                            <p>Vật lý đại cương</p>
                        </div>
                        <button>
                            Tham gia phòng
                        </button>
                    </div>
                </div>
            </div>

            {/* Public Rooms */}

            <FriendsList />
        </div>
    )
}

export default StudyRoom