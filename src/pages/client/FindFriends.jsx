import { useEffect, useState } from "react";
import { MdLocationOn, MdPersonAddAlt1 } from "react-icons/md";
import { FaUserFriends, FaUserTimes, FaUserCheck } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { useAuthContext } from "../../hooks/useAuthContext";
import FilterFriends from "../../components/FilterFriends"
import LoadingSpinner from "../../components/LoadingSpinner";
import WishModal from "../../components/WishModal";
import { Link } from "react-router-dom";
import { cancelInvitation, getInvitation, sendInvitation } from "../../utils/friendsHandler";

function FindFriends() {
    const [openInvitation, setOpenInvitation] = useState(false);
    const [openWish, setOpenWish] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inviteTarget, setInviteTarget] = useState(null);
    const [inviteMessage, setInviteMessage] = useState("Chào bạn, mình có thể cùng học với bạn được không? Mình cũng đang học môn này 🥰");
    const [availableUsers, setAvailableUsers] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [requestSenders, setRequestSenders] = useState([]);
    const [requestReceivers, setRequestReceivers] = useState([]);
    const [applyFilter, setApplyFilter] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
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

    const handleOpenInvitation = () => {
        setOpenInvitation(!openInvitation);
    };

    const handleSubmitAdd = (event) => {
        event.preventDefault();
        sendInvitation(user.id, inviteTarget._id, inviteMessage);
    };

    const handleFilterUsers = (data) => {
        setFilteredUsers(data);
    }

    useState(() => {
        setIsLoading(true);
        const getUsers = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/user");
                const data = await response.json();
                setAllUsers(data.data);
                response && setIsLoading(false);
            } catch (error) {
                console.error(error);   
            }
        };
        const getCurrUserFriends = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/user/" + user.id);
                const data = await response.json();
                setFriendsList(data.friends);
            } catch (error) {
                console.error(error);
            }
        };
        const getRequestSenders = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/invitation/" + user.id)
                const data = await response.json();
                if (response.status === 200) {
                    let senders = data.reduce((result, item) => {
                        result.push(item.sender?._id);
                        return result;
                    },[]);
                    setRequestSenders(senders);
                }
            } catch (error) {
                console.error(error);
            }
        };
        const getRequestReceiver = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/invitation/sent/" + user.id)       
                const data = await response.json();
                if (response.status === 200) {
                    let receivers = data.reduce((result, item) => {
                        result.push(item.receiver);
                        return result;
                    },[]);
                    setRequestReceivers(receivers);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getUsers();
        getCurrUserFriends();
        getRequestSenders();
        getRequestReceiver();
    },[user.id])

    useEffect(() => {
        const result = allUsers.filter((currUser) => (
            (currUser.info._id !== user.id) && (!friendsList?.includes(currUser.info._id)) && currUser.info.wish?.is_active
        ));
        setAvailableUsers(result);
    },[user.id, allUsers, friendsList])

    return (
        <div className="ml-72 mr-[386px] my-10">
            {/* <h1 className="font-bold text-3xl">Nè {username}, bạn muốn học cùng ai?</h1> */}
            <h1 className="font-bold text-3xl">Hôm nay bạn muốn học cùng ai?</h1>
            <div className="mt-8 pt-5 px-6 pb-6 bg-white w-full rounded-lg shadow-blockShadow">
                
                <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">Thay đổi mong muốn của bạn</span>
                    <button
                    onClick={() => setOpenWish(true)}
                    className="px-6 py-2 text-primaryColor border-2 border-primaryColor rounded-full transition-all
                    hover:text-white hover:bg-primaryColor">
                        Chỉnh sửa
                    </button>
                </div>
            </div>
            {/* Users list */}
            <div className="mt-8">
                <h3 className="font-semibold text-xl">Các StuToers phù hợp nhất</h3>
                <div className="mt-3 users-container">
                    {/* User Item */}
                    {isLoading ? (
                        <LoadingSpinner className={"mx-auto"}/>
                    ) : (
                        (applyFilter? filteredUsers : availableUsers).map((userItem) => (
                            <div
                                key={userItem.info._id} 
                                className="mb-2 pt-3 pr-6 pl-3 pb-4 min-h-64 bg-boxBackground rounded-lg shadow-blockShadow">
                                <div className="flex gap-4">
                                    <Link 
                                    to={"/user/" + userItem.info._id} 
                                    className="block flex-shrink-0">
                                        <img 
                                            src={userItem.info.avatar || "./img/default-avatar.png"}
                                            alt="avatar"
                                            className="w-16 h-16 object-cover rounded-full hover:brightness-105" 
                                        />
                                    </Link>
                                    <div className="grow flex flex-col overflow-hidden">
                                        <div className="relative">
                                            <div>
                                                <Link 
                                                to={"/user/" + userItem.info._id} 
                                                className="text-lg font-semibold hover:underline">{userItem.info.name}</Link>
                                                <div className="flex items-center gap-2 mt-1 mb-1">
                                                    <MdLocationOn />
                                                    <p className="font-medium">{userItem.info.location || "Chưa cập nhật"}</p>
                                                </div>
                                                <p><span className="font-medium">Chuyên ngành:</span> {userItem.info.major?.name || "Chưa cập nhật"}</p>
                                                <p><span className="font-medium">Hệ đào tạo:</span> {userItem.info.study_program || "Chưa cập nhật"}</p>
                                                <p><span className="font-medium">Môn học:</span> Chưa có code</p>
                                                <p><span className="font-medium">Mong muốn:</span> Chưa code nốt :'{")"}</p>
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
                                            {!requestReceivers.includes(userItem.info._id) && !requestSenders.includes(userItem.info._id) && (
                                                <button 
                                                    onClick={() => {
                                                        handleOpenInvitation();
                                                        setInviteTarget(userItem.info);
                                                    }}
                                                    className="mt-4 text-sm text-primaryColor font-medium px-6 py-2 border-2 border-primaryColor rounded-full flex items-center gap-2
                                                    hover:text-white hover:bg-primaryColor transition-all"
                                                >
                                                    <MdPersonAddAlt1 className="text-xl"/>
                                                    Kết bạn
                                                </button>
                                            )}
                                            {requestReceivers.includes(userItem.info._id) && (
                                                <button 
                                                    onClick={async () => {
                                                        const invitation = await getInvitation(userItem.info._id, user.id);
                                                        cancelInvitation(invitation._id)
                                                    }}
                                                    className="mt-4 text-sm text-textColor font-medium px-3 py-2 border-2 border-gray-300 bg-gray-300 rounded-full flex items-center gap-2
                                                    hover:bg-gray-200 hover:border-gray-200 transition-all"
                                                >
                                                    <FaUserTimes className="text-xl"/>
                                                    Hủy lời mời
                                                </button>
                                            )}
                                            {requestSenders.includes(userItem.info._id) && (
                                                <button 
                                                    className="mt-4 text-sm text-white font-medium px-5 py-2 border-2 border-primaryColor bg-primaryColor rounded-full flex items-center gap-2
                                                    hover:text-primaryColor hover:bg-white transition-all"
                                                >
                                                    <FaUserCheck className="text-xl"/>
                                                    Phản hồi
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {openInvitation && (
                        <div onClick={handleOpenInvitation} className="fixed z-30 left-0 top-0 right-0 bottom-0 bg-[#222222]/30">
                            <div onClick={(e) => e.stopPropagation()} className="h-80 w-1/3 bg-boxBackground mx-auto mt-20 rounded-xl px-6 pt-4">
                                <div className="flex justify-between items-end">
                                    <h2 className="font-medium">Lời mời kết bạn tới {inviteTarget.name}</h2>
                                    <p className="text-xs">{inviteMessage.length}/80</p>
                                </div>
                                <textarea 
                                type="text"
                                value={inviteMessage}
                                onChange={(e) => setInviteMessage(e.target.value)}
                                maxLength={80}
                                className="mt-2 py-2 text-wrap px-3 w-full h-56 text-sm resize-none bg-[#cdcdcd]/20 outline-none border border-[#444444]/80 rounded-md">
                                    
                                </textarea>
                                <div className="float-right inline-block">
                                    <button 
                                        type="submit"
                                        onClick={handleOpenInvitation} 
                                        className="mr-2 min-w-20 text-sm py-2 px-4 bg-red-500 text-white rounded-lg
                                        hover:shadow-blockShadow hover:bg-red-500/80">
                                        Hủy
                                    </button>
                                    <button 
                                        type="submit" 
                                        onClick={(event) => {
                                            handleOpenInvitation();
                                            handleSubmitAdd(event);
                                        }}
                                        className="min-w-20 text-sm py-2 px-4 bg-primaryColor text-white rounded-lg
                                        hover:shadow-blockShadow hover:bg-primaryColor/80">
                                        Gửi lời mời
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {openWish &&
                <div onClick={() => setOpenWish(false)} className="fixed z-30 left-0 top-0 right-0 bottom-0 bg-[#222222]/30">
                    <WishModal userId={user.id} closeModal={() => setOpenWish(false)} />
                </div>
            }
            <FilterFriends applyFilter={() => setApplyFilter(true)} resetFilter={() => setApplyFilter(false)} 
            availableUsers={availableUsers} sendFilteredUsers={handleFilterUsers} />
        </div>
    )
}

export default FindFriends