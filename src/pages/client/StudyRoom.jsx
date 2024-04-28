import FriendsList from "../../components/FriendsList"
import { FaArrowRight, FaBook, FaChevronDown, FaMicrophoneSlash, FaPlus, FaVideo } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

function StudyRoom() {
    const [state, dispatch] = useAuthContext();
    const { user } = state;
    const [rooms, setRooms] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [openSubject, setOpenSubject] = useState(false);
    const [inputSubject, setInputSubject] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [micAllow, setMicAllow] = useState(false);
    const [videoAllow, setVideoAllow] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [roomsNumber, setRoomsNumber] = useState(3);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/room/all/" + user.id);
                const data = await response.json();
                setRooms(data)
            } catch (error) {
                console.log(error);
            }
        }
        getRooms();
    },[user.id])

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/subject");
                const data = await response.json();
                setSubjects(data.data);
            } catch (error) {
                return console.log(error);
            }
        };
        getSubjects();
    },[])

    const handleCloseModal = () => {
        setIsCreating(false);
        setSelectedSubject(null);
        setInputSubject("");
        setRoomName("");
        setOpenSubject(false);
        setMicAllow(false);
        setVideoAllow(false);
    };

    const handleCreateRoom = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://stuto-api.onrender.com/room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: roomName,
                    subject: subjectId,
                    access_camera: videoAllow,
                    access_mic: micAllow,
                    cover: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    user_id: user.id
                })
            })
            if (response.status === 201) {
                handleCloseModal();
                alert("Tạo phòng học mới thành công.");
                return redirect("/phong-hoc-online")
            }
        } catch (error) {
            console.log(error);
        }
    };

    const showMoreHandle = () => {
        setRoomsNumber((prev) => prev + 6);
    };

    return (
        <div className="ml-72 mr-[386px] mt-10 mb-10">
            <button 
            onClick={() => setIsCreating(true)}
            className="w-full py-3 bg-primaryColor rounded-3xl text-lg text-white font-medium flex items-center justify-center gap-2 shadow-blockShadow hover:bg-primaryColor/80">
                <FaPlus className="text-sm"/>
                Tạo phòng mới
            </button>

            {/* Create Room Modal */}
            {isCreating && (
                <form onClick={() => setIsCreating(false)} className="fixed z-30 bg-[#222222]/30 left-0 top-0 right-0 bottom-0">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white w-[500px] mx-auto mt-20 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold text-lg">Tạo phòng mới</h1>
                            <span onClick={handleCloseModal} className="p-1 cursor-pointer">
                                <IoClose className="text-xl"/>
                            </span>
                        </div>
                        <div className="mt-3 pr-1 flex flex-col gap-3">
                            <div>
                                <span className="font-medium">Tên phòng</span>
                                <input 
                                type="text" 
                                placeholder="Tên phòng của bạn" 
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                required
                                className="mt-2 w-full p-2 border border-textInactive rounded-md outline-none text-base"/>
                            </div>

                            <div className="text-base">
                                <span className="font-medium">Môn học</span>
                                <div className="w-full font-normal mt-2 relative">
                                    <div
                                        className={`h-10 w-full px-4 py-2 bg-white border border-textInactive rounded-md flex items-center justify-between cursor-pointer
                                                ${!selectedSubject && "text-textInactive"}`}
                                        onClick={(e) => {
                                        setOpenSubject(!openSubject);
                                        }}
                                    >
                                        {selectedSubject ? selectedSubject : "Chọn môn học của phòng"}
                                        <FaChevronDown
                                        size={16}
                                        className={`text-textInactive transition-all ${
                                            openSubject && "rotate-180"
                                        }`}
                                        />
                                    </div>
                                    <ul
                                        className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute z-10 ${
                                        openSubject ? "max-h-40" : "max-h-0"
                                        }`}
                                    >
                                        <div className="flex items-center px-4 sticky top-0 bg-white">
                                        <IoIosSearch size={16} className="text-gray-400" />
                                        <input
                                            type="text"
                                            value={inputSubject}
                                            placeholder="Nhập tên môn học"
                                            onChange={(e) => setInputSubject(e.target.value.toLowerCase())}
                                            className="placeholder:text-gray-400 px-4 py-2 text-sm outline-none w-full"
                                        />
                                        </div>
                                        {subjects?.map((subject) => (
                                        <li
                                            key={subject?._id}
                                            className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                                                        ${
                                                        subject?.name.toLowerCase().includes(inputSubject)
                                                            ? "block"
                                                            : "hidden"
                                                        }
                                                        ${
                                                        subject?.name.toLowerCase() ===
                                                            selectedSubject?.toLowerCase() &&
                                                        "bg-primaryColor text-white"
                                                        }`}
                                            onClick={(e) => {
                                            if (
                                                subject?.name.toLowerCase() !==
                                                selectedSubject?.toLowerCase()
                                            ) {
                                                setSelectedSubject(subject?.name);
                                                setSubjectId(subject?._id);
                                                setOpenSubject(false);
                                                setInputSubject("");
                                            }
                                            }}
                                        >
                                            {subject?.name}
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <span className="font-medium">Cài đặt quyền truy cập</span>
                                <div className="mt-2 flex justify-around">
                                    <div className="flex items-center">
                                        <FaVideo />
                                        <span className="ml-2">Camera</span>
                                        <input type="checkbox" checked={videoAllow} onChange={(e) => setVideoAllow(e.target.checked)} className="ml-4 w-4 h-4"/>
                                    </div>
                                    <div className="flex items-center">
                                        <FaMicrophone />
                                        <span className="ml-2">Micro</span>
                                        <input type="checkbox" checked={micAllow} onChange={(e) => setMicAllow(e.target.checked)} className="ml-4 w-4 h-4"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                            onClick={handleCloseModal}
                            className="w-32 text-center py-2 text-sm bg-red-500 text-white rounded-lg border border-red-500 transition-all hover:bg-red-500/80 hover:shadow"
                            >
                            Hủy
                            </button>
                            <button
                            type="submit"
                            onClick={e => handleCreateRoom(e)}
                            className="w-32 text-center py-2 text-sm bg-primaryColor text-white rounded-lg border border-primaryColor transition-all hover:bg-primaryColor/80 hover:shadow"
                            >
                            Tạo
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {/* User's Rooms */}
            <div className="mt-10">
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl">Phòng của bạn</h2>
                    {/* <span className="mr-2 font-medium px-4 py-1 border text-primaryColor border-primaryColor rounded-full cursor-pointer transition-all hover:bg-primaryColor hover:text-white">Chỉnh sửa</span> */}
                </div>
                <div className="mt-4 grid xl:grid-cols-3 gap-6">
                {rooms?.slice(0, roomsNumber).map((room) => (
                        <div key={room._id} className="bg-[#B196FF]/70 rounded-xl pt-2 px-2 pb-3 flex flex-col justify-between gap-3">
                            <div className="grow bg-white rounded-lg p-4">
                                <h3 className="text-center text-base font-semibold w-full truncate" title={room.name}>{room.name}</h3>
                                <div className="mt-3 grid grid-cols-8 items-center gap-y-2 gap-x-1">
                                    <GrStatusGoodSmall className="w-full text-[8px] text-green-500"/>
                                    <p className="text-sm font-medium col-span-7">2 Stutoers đang học</p>
                                    <FaMicrophone className="w-full text-base"/>
                                    <p className="text-sm col-span-7">{room.access_mic? "Cho" : "Không cho"} phép mic</p>
                                    <FaVideo className="w-full text-base"/>
                                    <p className="text-sm col-span-7">{room.access_camera? "Cho" : "Không cho"} phép camera</p>
                                    <FaBook className="w-full text-base"/>
                                    <p className="text-sm col-span-7">{room.subject?.name}</p>
                                </div>
                                <div>
                                    <img src={room.cover} 
                                    alt="" 
                                    className="mt-4 h-32 w-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                            <Link to={"/meeting/" + room._id} 
                            className="text-sm text-center py-3 px-6 bg-primaryColor grow-0 text-white rounded-xl font-medium border border-primaryColor
                            transition-all hover:border-white hover:brightness-105">
                                Tham gia phòng
                            </Link>
                        </div>
                ))}
                </div>
                <button
                onClick={showMoreHandle}
                className={`mt-4 mx-auto px-6 py-2 rounded-full bg-primaryColor text-white flex items-center gap-2 hover:bg-primaryColor/80
                ${(roomsNumber >= rooms.length) && "hidden"}`}
                >
                    Xem thêm
                    <FaArrowRight className="text-sm"/>
                </button>
            </div>

            {/* Public Rooms */}
            <div className="mt-10">
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