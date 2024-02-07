import FriendsList from "../../components/FriendsList"
import { FaBook, FaMicrophoneSlash, FaPlus, FaVideo } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";


function StudyRoom() {
    return (
        <div className="ml-72 mr-[386px] mt-10 mb-10">
            <button className="w-full py-3 bg-primaryColor rounded-3xl text-lg text-white font-medium flex items-center justify-center gap-2 shadow-blockShadow hover:bg-primaryColor/80">
                <FaPlus className="text-sm"/>
                Tạo phòng mới
            </button>

            {/* User's Rooms */}
            <div className="mt-10">
                <h2 className="font-semibold text-xl">Phòng của bạn</h2>
                <div className="mt-4 grid xl:grid-cols-3 gap-6">
                    <div className="bg-[#B196FF]/70 rounded-xl pt-2 px-2 pb-3 flex flex-col justify-between gap-3">
                        <div className="grow bg-white rounded-lg p-4">
                            <h3 className="text-center text-base font-semibold w-full truncate" title="">Vượt qua vật lý đại ĐC ^.^</h3>
                            <div className="mt-3 grid grid-cols-8 items-center gap-y-2 gap-x-1">
                                <GrStatusGoodSmall className="w-full text-[8px] text-green-500"/>
                                <p className="text-sm font-medium col-span-7">2 Stutoers đang học</p>
                                <FaMicrophone className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật mic</p>
                                <FaVideo className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật camera</p>
                                <FaBook className="w-full text-base"/>
                                <p className="text-sm col-span-7">Vật lý đại cương </p>
                            </div>
                            <div>
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="mt-4 h-32 w-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <a href="#" 
                        className="text-sm text-center py-3 px-6 bg-primaryColor grow-0 text-white rounded-xl font-medium border border-primaryColor
                        transition-all hover:border-white hover:brightness-105">
                            Tham gia phòng
                        </a>
                    </div>
                    <div className="bg-[#B196FF]/70 rounded-xl pt-2 px-2 pb-3 flex flex-col justify-between gap-3">
                        <div className="grow bg-white rounded-lg p-4">
                            <h3 className="text-center text-base font-semibold w-full truncate" title="">Vượt qua vật lý đại ĐC ^.^</h3>
                            <div className="mt-3 grid grid-cols-8 items-center gap-y-2 gap-x-1">
                                <GrStatusGoodSmall className="w-full text-[8px] text-green-500"/>
                                <p className="text-sm font-medium col-span-7">2 Stutoers đang học</p>
                                <FaMicrophone className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật mic</p>
                                <FaVideo className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật camera</p>
                                <FaBook className="w-full text-base"/>
                                <p className="text-sm col-span-7">Vật lý đại cương </p>
                            </div>
                            <div>
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="mt-4 h-32 w-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <a href="#" 
                        className="text-sm text-center py-3 px-6 bg-primaryColor grow-0 text-white rounded-xl font-medium border border-primaryColor
                        transition-all hover:border-white hover:brightness-105">
                            Tham gia phòng
                        </a>
                    </div>
                    <div className="bg-[#B196FF]/70 rounded-xl pt-2 px-2 pb-3 flex flex-col justify-between gap-3">
                        <div className="grow bg-white rounded-lg p-4">
                            <h3 className="text-center text-base font-semibold w-full truncate" title="">Vượt qua vật lý đại ĐC ^.^</h3>
                            <div className="mt-3 grid grid-cols-8 items-center gap-y-2 gap-x-1">
                                <GrStatusGoodSmall className="w-full text-[8px] text-green-500"/>
                                <p className="text-sm font-medium col-span-7">2 Stutoers đang học</p>
                                <FaMicrophone className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật mic</p>
                                <FaVideo className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật camera</p>
                                <FaBook className="w-full text-base"/>
                                <p className="text-sm col-span-7">Vật lý đại cương </p>
                            </div>
                            <div>
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="mt-4 h-32 w-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <a href="#" 
                        className="text-sm text-center py-3 px-6 bg-primaryColor grow-0 text-white rounded-xl font-medium border border-primaryColor
                        transition-all hover:border-white hover:brightness-105">
                            Tham gia phòng
                        </a>
                    </div>
                    <div className="bg-[#B196FF]/70 rounded-xl pt-2 px-2 pb-3 flex flex-col justify-between gap-3">
                        <div className="grow bg-white rounded-lg p-4">
                            <h3 className="text-center text-base font-semibold w-full truncate" title="">Vượt qua vật lý đại ĐC ^.^</h3>
                            <div className="mt-3 grid grid-cols-8 items-center gap-y-2 gap-x-1">
                                <GrStatusGoodSmall className="w-full text-[8px] text-green-500"/>
                                <p className="text-sm font-medium col-span-7">2 Stutoers đang học</p>
                                <FaMicrophone className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật mic</p>
                                <FaVideo className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật camera</p>
                                <FaBook className="w-full text-base"/>
                                <p className="text-sm col-span-7">Vật lý đại cương </p>
                            </div>
                            <div>
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="mt-4 h-32 w-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <a href="#" 
                        className="text-sm text-center py-3 px-6 bg-primaryColor grow-0 text-white rounded-xl font-medium border border-primaryColor
                        transition-all hover:border-white hover:brightness-105">
                            Tham gia phòng
                        </a>
                    </div>
                </div>
            </div>

            {/* Public Rooms */}
            <div className="mt-14">
                <h2 className="font-semibold text-xl">Phòng cộng đồng</h2>
                <div className="mt-4 grid xl:grid-cols-3 gap-6">
                    <div className="bg-[#B196FF]/70 rounded-xl pt-2 px-2 pb-3 flex flex-col justify-between gap-3">
                        <div className="grow bg-white rounded-lg p-4">
                            <h3 className="text-center text-base font-semibold w-full truncate" title="">Space Sharing</h3>
                            <div className="mt-3 grid grid-cols-8 items-center gap-y-2 gap-x-1">
                                <GrStatusGoodSmall className="w-full text-[8px] text-green-500"/>
                                <p className="text-sm font-medium col-span-7">2 Stutoers đang học</p>
                                <FaMicrophoneSlash className="w-full text-base"/>
                                <p className="text-sm col-span-7">Vô hiệu hóa mic</p>
                                <FaVideo className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật camera</p>
                                <FaBook className="w-full text-base"/>
                                <p className="text-sm col-span-7">Bất kỳ</p>
                            </div>
                            <div>
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="mt-4 h-32 w-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <a href="#" 
                        className="text-sm text-center py-3 px-6 bg-primaryColor grow-0 text-white rounded-xl font-medium border border-primaryColor
                        transition-all hover:border-white hover:brightness-105">
                            Tham gia phòng
                        </a>
                    </div>
                    <div className="bg-[#B196FF]/70 rounded-xl pt-2 px-2 pb-3 flex flex-col justify-between gap-3">
                        <div className="grow bg-white rounded-lg p-4">
                            <h3 className="text-center text-base font-semibold w-full truncate" title="">Innovate Together</h3>
                            <div className="mt-3 grid grid-cols-8 items-center gap-y-2 gap-x-1">
                                <GrStatusGoodSmall className="w-full text-[8px] text-green-500"/>
                                <p className="text-sm font-medium col-span-7">2 Stutoers đang học</p>
                                <FaMicrophoneSlash className="w-full text-base"/>
                                <p className="text-sm col-span-7">Vô hiệu hóa mic</p>
                                <FaVideo className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật camera</p>
                                <FaBook className="w-full text-base"/>
                                <p className="text-sm col-span-7">Bất kỳ</p>
                            </div>
                            <div>
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="mt-4 h-32 w-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <a href="#" 
                        className="text-sm text-center py-3 px-6 bg-primaryColor grow-0 text-white rounded-xl font-medium border border-primaryColor
                        transition-all hover:border-white hover:brightness-105">
                            Tham gia phòng
                        </a>
                    </div>
                    <div className="bg-[#B196FF]/70 rounded-xl pt-2 px-2 pb-3 flex flex-col justify-between gap-3">
                        <div className="grow bg-white rounded-lg p-4">
                            <h3 className="text-center text-base font-semibold w-full truncate" title="">Relax Room</h3>
                            <div className="mt-3 grid grid-cols-8 items-center gap-y-2 gap-x-1">
                                <GrStatusGoodSmall className="w-full text-[8px] text-green-500"/>
                                <p className="text-sm font-medium col-span-7">2 Stutoers đang học</p>
                                <FaMicrophone className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật mic</p>
                                <FaVideo className="w-full text-base"/>
                                <p className="text-sm col-span-7">Cho phép bật camera</p>
                                <FaBook className="w-full text-base"/>
                                <p className="text-sm col-span-7">Bất kỳ</p>
                            </div>
                            <div>
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="mt-4 h-32 w-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <a href="#" 
                        className="text-sm text-center py-3 px-6 bg-primaryColor grow-0 text-white rounded-xl font-medium border border-primaryColor
                        transition-all hover:border-white hover:brightness-105">
                            Tham gia phòng
                        </a>
                    </div>
                </div>
            </div>

            <FriendsList />
        </div>
    )
}

export default StudyRoom