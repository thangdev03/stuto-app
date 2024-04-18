import { FaArrowRight, FaEarthAsia, FaMapPin, FaRegComment, FaRegPaperPlane } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiUserForbidLine } from "react-icons/ri";
import { MdOutlineReport } from "react-icons/md";
import { BsDot, BsThreeDots, BsFillPersonXFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import FriendsList from "../../components/FriendsList";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { cancelInvitation, getInvitation, acceptInvitation, unfriend } from "../../utils/friendsHandler";
import { getAge } from "../../utils/getAge";
import InvitationModal from "../../components/InvitationModal";
import UploadWidget from "../../components/UploadWidget";
import AvatarImage from "../../components/AvatarImage";
import { cloudName, uploadPreset, cld } from "../../services/const";

function Profile() {
    const [openUserActions, setOpenUserActions] = useState(false);
    const [openInvitation, setOpenInvitation] = useState(false);
    const [userData, setUserData] = useState(null);
    const [inviteTarget, setInviteTarget] = useState(null);
    const [inviteMessage, setInviteMessage] = useState("Chào bạn, mình có thể cùng học với bạn được không? Mình cũng đang học môn này 🥰");
    const [userAge, setUserAge] = useState(0);
    const [friends, setFriends] = useState([]);
    const [requestSenders, setRequestSenders] = useState([]);
    const [requestReceivers, setRequestReceivers] = useState([]);
    const [isFriend, setIsFriend] = useState(false);
    const [isSentRequest, setIsSentRequest] = useState(false);
    const [openActions, setOpenActions] = useState(false);
    const [isOpenResponse, setIsOpenResponse] = useState(false);
    const [isResponse, setIsResponse] = useState(false);
    const [isAccept, setIsAccept] = useState(false);
    const { userId } = useParams();
    const currAuthUser = JSON.parse(localStorage.getItem("user"))
    const [publicId, setPublicId] = useState("");
    let isCurrUser = (userId === currAuthUser.id) ? true : false;
    let boxRef = useRef();

    const [uwConfig] = useState({
        cloudName,
        uploadPreset,
        cropping: true,
        maxImageWidth: 250,
        maxImageFileSize: 2000000
    })

    const handleClickOutside = (e) => {
        if (!boxRef.current.contains(e.target)) {
            setOpenUserActions(false);
        }
    }

    const handleOpenInvitation = () => {
        setOpenInvitation(!openInvitation);
    };

    const updateSentStatus = () => {
        setIsSentRequest(true)
    };

    const handleCancelInvite = async () => {
        const invitation = await getInvitation(currAuthUser.id, userId);
        cancelInvitation(invitation._id);
      };

    const handleUnfriend = async () => {
        const invitation = await getInvitation(currAuthUser.id, userId);
        unfriend(currAuthUser.id, userId, invitation?._id);
    }

    const handleAcceptInvite = async () => {
    const invitation = await getInvitation(currAuthUser.id, userId);
    acceptInvitation(invitation._id);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [openUserActions])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/user/" + userId);
                const data = await response.json();
                if (response.status === 404 || response.status === 500 ) {
                    throw new Error("Error, status: ", data.message)
                }
                setUserData(data);
                setPublicId(data.avatar);
            } catch (error) {
                console.error("Error fetching user data")
            }
        }
        fetchData();
    },[userId])

    useEffect(() => {
        const fetchFriendsData = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/user/" + currAuthUser.id);
                const data = await response.json();
                if (response.status === 404 || response.status === 500 ) {
                    throw new Error("Error, status: ", data.message)
                }
                setFriends(data.friends);
            } catch (error) {
                console.error("Error fetching user data")
            }
        }
        fetchFriendsData();
    },[userId])

    useEffect(() => {
        const result = friends.find(friendId => friendId === userId)
        if (result) {
            setIsFriend(true);
        }
    }, [friends])

    useEffect(() => {
        const userAge = getAge(userData?.date_of_birth)
        setUserAge(userAge);
    },[userData])

    useEffect(() => {
        const getRequestSenders = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/invitation/" + currAuthUser.id)
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
                const response = await fetch("https://stuto-api.onrender.com/invitation/sent/" + currAuthUser.id)       
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
        getRequestSenders();
        getRequestReceiver();
    },[currAuthUser.id])

    const renderActionBtn = () => {
        if (isFriend || isAccept) {
            return (
                <div 
                onClick={() => setOpenActions(!openActions)}
                className="w-fit h-9 flex justify-center items-center gap-2 font-medium text-sm px-6 bg-primaryColor rounded-full text-white transition-all hover:shadow-blockShadow hover:bg-primaryColor/80 cursor-pointer relative">
                    <FaUserCheck className="text-xl"/>
                    Bạn bè

                    <ul
                    className={`absolute z-40 left-0 right-0 top-11 border border-gray-200 text-textColor shadow-md text-center rounded-md overflow-hidden
                    ${!openActions && "hidden"}`}
                    >
                        <li
                            onClick={(e) => {
                            handleUnfriend();
                            setIsFriend(false);
                            setIsAccept(false);
                            }}
                            className="px-4 py-2 bg-[#fcfcfc] hover:bg-[#e8e8e8]"
                        >
                            Hủy kết bạn
                        </li>
                    </ul>
                </div>
            )
        } else {
            if (requestSenders.includes(userId) && !isResponse) {
                return (
                    <div 
                    onClick={() => {
                        setIsOpenResponse(!isOpenResponse);
                    }}
                    className="w-32 h-9 flex justify-center items-center gap-2 font-medium text-sm px-4 bg-primaryColor rounded-full text-white transition-all cursor-pointer relative
                    hover:shadow-blockShadow hover:bg-primaryColor/80">
                        <FaUserCheck className="text-xl"/>
                        Phản hồi

                        <ul
                        className={`absolute z-40 left-0 right-0 top-11 border border-gray-200 text-textColor shadow-md text-center rounded-md overflow-hidden
                                    ${!isOpenResponse && "hidden"}`}
                        >
                            <li
                                onClick={(e) => {
                                e.preventDefault();
                                setIsResponse(true);
                                setIsAccept(true);
                                handleAcceptInvite();
                                }}
                                className="px-4 py-2 bg-[#fcfcfc] hover:bg-[#e8e8e8]"
                            >
                                Đồng ý
                            </li>
                            <li
                                onClick={(e) => {
                                e.preventDefault();
                                setIsResponse(true);
                                handleCancelInvite();
                                }}
                                className="px-4 py-2 bg-[#fcfcfc] hover:bg-[#e8e8e8]"
                            >
                                Từ chối
                            </li>
                        </ul>
                    </div>
                )
                } else if (requestReceivers.includes(userId) || isSentRequest) {
                    return (
                        <button 
                        onClick={async () => {
                            const invitation = await getInvitation(currAuthUser.id, userId)
                            cancelInvitation(invitation?._id)
                        }}
                        onClick={() => {
                            setIsSentRequest(false);
                            handleCancelInvite();
                        }}
                        className="w-fit h-9 flex justify-center items-center gap-2 font-medium text-sm px-4 bg-gray-400 rounded-full text-white transition-all hover:shadow-blockShadow hover:brightness-110">
                            <BsFillPersonXFill className="text-xl"/>
                            Hủy lời mời
                        </button>
                    )
                } else {
                    return (
                        <button 
                        onClick={() => {
                            handleOpenInvitation();
                            setInviteTarget(userData);
                        }}
                        className="w-32 h-9 flex justify-center items-center gap-2 font-medium text-sm px-4 bg-primaryColor rounded-full text-white transition-all hover:shadow-blockShadow hover:brightness-110">
                            <MdPersonAddAlt1 className="text-xl"/>
                            Kết bạn
                        </button>
                )
            }
        }
    }

    return (          
            <div className="ml-72 mr-[416px] mt-8 pb-12">
                <FriendsList />
                <div>
                    {/* Basic Info */}
                    <div className="bg-white rounded-3xl">
                        <div className="user-info-bgGradient py-8 px-12 flex items-end gap-8 rounded-t-3xl">
                            <div className="w-44 flex flex-col items-center">
                                <div className="shrink-0 w-40 h-40 relative">
                                    <AvatarImage publicId={publicId} cld={cld}/>
                                    {isCurrUser && (
                                        <UploadWidget 
                                        uwConfig={uwConfig}
                                        setPublicId={setPublicId} 
                                        className={"absolute right-0 bottom-2"}
                                        />
                                    )}
                                </div>
                                <p className="mt-6 flex gap-4 items-center font-medium">
                                    <FaMapPin />
                                    {userData?.location || "Chưa cập nhật"}
                                </p>
                                <p className="mt-1 text-sm font-medium">(12 lượt đề xuất)</p>
                            </div>
                            <div className="grow">
                                <h1 className="text-3xl font-semibold flex flex-wrap items-end gap-1 lg">{userData?.name}{/* <span className="text-lg font-medium">(Biệt danh)</span>*/}</h1>
                                <div className="flex items-end justify-between flex-wrap">
                                    <div className="mt-8 flex items-center gap-10">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-sm font-medium">Số bạn học</p>
                                            <p className="font-semibold">16</p>
                                        </div>
                                        <div className="h-12 w-[2px] bg-textInactive/35 rounded"></div>
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-sm font-medium">Số giờ đã học</p>
                                            <p className="font-semibold">12h 35m</p>
                                        </div>
                                    </div>
                                    <div className={`mt-4 gap-5 ${isCurrUser ? "hidden" : "flex"}`}>
                                        {renderActionBtn()}
                                        <div className="relative" ref={boxRef}>
                                            <button 
                                            onClick={(e) => setOpenUserActions(!openUserActions)}
                                            className="w-32 h-9 flex justify-center items-center gap-2 font-medium text-sm px-4 border-2 border-textInactive/70 rounded-full text-textInactive/80 transition-all hover:shadow-blockShadow hover:brightness-110 hover:bg-white/20 relative">
                                                <HiOutlineDotsHorizontal className="font-normal"/>
                                                Khác
                                            </button>
                                            <ul 
                                            className={`box-w-arrow p-2 bg-white shadow-xl rounded-lg absolute top-12 -left-6 z-10
                                            ${openUserActions? "block": "hidden"}`}
                                            >
                                                <li className="px-1 py-2 w-60 flex items-center gap-2 font-medium hover:bg-[#D1C1FF]/35 cursor-pointer rounded-md">
                                                    <MdOutlineReport />Báo cáo tài khoản
                                                </li>
                                                <li className="px-1 py-2 w-60 flex items-center gap-2 font-medium hover:bg-[#D1C1FF]/35 cursor-pointer rounded-md">
                                                    <RiUserForbidLine />Chặn người dùng
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className="mt-4 flex gap-3 h-48">
                        <div className="w-2/5 h-full bg-white rounded-3xl py-3 px-5">
                            <h3 className="font-semibold text-center text-lg">Tiểu sử</h3>
                            <p className="mt-2">“Đây là giới thiệu về tui, một StuToer tích cực, hòa đồng, muốn tìm những người bạn mới học cùng ngành Công nghệ thông tin.”</p>
                        </div>
                        <div className="grow h-full bg-white rounded-3xl py-3 px-8 flex flex-col items-center">
                            <h3 className="font-semibold text-lg">Thông tin cơ bản</h3>
                            <table className="mt-3 table-fixed">
                                <tbody>
                                    <tr>
                                        <td className="w-32">Hệ đào tạo</td>
                                        <td className="w-6">:</td>
                                        <td className="font-medium">{userData?.study_program.toString() || "Chưa cập nhật"}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-32">Chuyên ngành</td>
                                        <td className="w-6">:</td>
                                        <td className="font-medium">{userData?.major?.name.toString() || "Chưa cập nhật"}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-32">Giới tính</td>
                                        <td className="w-6">:</td>
                                        <td className="font-medium">{userData?.sex.toString() || "Chưa cập nhật"}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-32">Tuổi</td>
                                        <td className="w-6">:</td>
                                        <td className="font-medium">{userAge.toString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recommendation */}
                    <div className="mt-4 bg-white rounded-3xl pt-6 px-12 pb-4">
                        <h3 className="text-xl font-semibold">Đề xuất từ StuToers khác</h3>
                        <div className="my-3 flex items-start gap-6">
                            <div className="shrink-0">
                                <img src="https://kenh14cdn.com/thumb_w/660/2019/1/16/hoatran-7237-15476569125121111606547.jpg" alt="" className="w-14 h-14 rounded-full object-cover"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Phương Ly</h4>
                                <p className="mt-2 text-sm text-[#575757]">Hà Nội, Khoa học máy tính</p>
                                <p className="mt-1 text-sm text-[#575757]">Đã học cùng Phác Thái Anh 16.8 giờ</p>
                                <p className="mt-3">“Rosé là một người bạn học thật tuyệt vời, bạn ý rấc thân thiện, cutee và sẵn sàng giúp đỡ khi mình gặp phải các bài không tìm được hướng giải quyết. Trời ơi người gì vừa xinh mà vừa học giỏi wa zậyyy 😍“</p>
                            </div>
                        </div>
                        <hr />
                        <div className="my-3 flex items-start gap-6">
                            <div className="shrink-0">
                                <img src="https://kenh14cdn.com/thumb_w/660/2019/1/16/hoatran-7237-15476569125121111606547.jpg" alt="" className="w-14 h-14 rounded-full object-cover"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Phương Ly</h4>
                                <p className="mt-2 text-sm text-[#575757]">Hà Nội, Khoa học máy tính</p>
                                <p className="mt-1 text-sm text-[#575757]">Đã học cùng Phác Thái Anh 16.8 giờ</p>
                                <p className="mt-3">“Rosé là một người bạn học thật tuyệt vời, bạn ý rấc thân thiện, cutee và sẵn sàng giúp đỡ khi mình gặp phải các bài không tìm được hướng giải quyết. Trời ơi người gì vừa xinh mà vừa học giỏi wa zậyyy 😍“</p>
                            </div>
                        </div>
                        <div className="mt-6 text-textInactive flex items-center gap-2 cursor-pointer hover:underline justify-center">
                            <span>Xem thêm các đề xuất khác</span> 
                            <FaArrowRight className="text-textInactive/70"/>
                        </div>
                    </div>
                    
                    {/* Invitation model */}
                    {openInvitation && (
                        <InvitationModal handleOpenInvitation={handleOpenInvitation} inviteTarget={inviteTarget} updateSentStatus={updateSentStatus}/>
                    )}

                    {/* Posts */}
                    <div className="mt-4 bg-white rounded-3xl pt-6 px-12 pb-4">
                        <h3 className="text-xl font-semibold">Bài đăng cá nhân</h3>
                        <div className="">
                            <div className="mt-3 bg-[#FCFCFC]/70 border border-[#D6D6D6] rounded-xl min-h-72 relative pt-3 px-4 pb-2">
                                <div className="absolute top-3 right-4 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                    <BsThreeDots className="text-textInactive"/>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-14 h-14 rounded-full overflow-hidden">
                                        <img 
                                        src="https://cdn.tuoitre.vn/ttc/r/2021/01/07/thoi-diem-hien-tai-rose-da-so-huu-visual-dinh-cao-cua-kpop-1610033705.jpg" 
                                        alt="avatar" 
                                        className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="mt-1 font-semibold">Phác Thái Anh</h4>
                                        <div className="mt-1 flex gap-1 items-center">
                                            <p className="text-textInactive text-sm">1h</p>
                                            <BsDot className="text-textInactive"/>
                                            <FaEarthAsia className="text-[#888888] w-3" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="mt-3 font-medium">TÌM BẠN HỌC CHUNG LẬP TRÌNH C++</h3>     
                                <p className="mt-6">Mình mới tham gia vào khóa học Lập trình hướng đối tượng C++ của bên Coursera, muốn tìm một vài bạn học cùng để có động lực hơn :>
                                Bạn nào hứng thú hay cũng đang học thì nhắn tin cho mình nha 😘</p>                       
                                <div className="mt-11 w-full bg-[#D0D0D0] h-[1px] rounded"></div>
                                <div className="mt-4 flex items-center justify-between px-10 text-textInactive">
                                    <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><AiOutlineLike fontSize={20}/>Thích</span>
                                    <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegComment fontSize={18}/>Bình luận</span>
                                    <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegPaperPlane fontSize={18}/>Nhắn tin</span>
                                </div>
                            </div>
                            <div className="mt-3 bg-[#FCFCFC]/70 border border-[#D6D6D6] rounded-xl min-h-72 relative pt-3 px-4 pb-2">
                                <div className="absolute top-3 right-4 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                    <BsThreeDots className="text-textInactive"/>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-14 h-14 rounded-full overflow-hidden">
                                        <img 
                                        src="https://cdn.tuoitre.vn/ttc/r/2021/01/07/thoi-diem-hien-tai-rose-da-so-huu-visual-dinh-cao-cua-kpop-1610033705.jpg" 
                                        alt="avatar" 
                                        className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="mt-1 font-semibold">Phác Thái Anh</h4>
                                        <div className="mt-1 flex gap-1 items-center">
                                            <p className="text-textInactive text-sm">1h</p>
                                            <BsDot className="text-textInactive"/>
                                            <FaEarthAsia className="text-[#888888] w-3" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="mt-3 font-medium">QUOTE TRUYỀN CẢM HỨNG</h3>     
                                <p className="mt-6">Không trồng cây thì sẽ không có cơ hội được nằm dưới bóng râm và thưởng thức trái ngọt. Không học hành chăm chỉ, nỗ lực hết mình ngay từ hôm nay thì cơ hội chạm đến thành công, đạt được ước mơ của bạn sẽ ít hơn người khác.
                                <br />
                                Học không phải là con đường duy nhất dẫn đến thành công nhưng nó được xem là con đường ngắn nhất, vững chắc nhất. Ngay cả người thành công cũng phải học hỏi không ngừng. Vậy tại sao bạn cứ mãi trì hoãn? Hãy “lên tinh thần” bằng top câu nói hay về học tập và thành công sau.</p>                       
                                <div className="mt-11 w-full bg-[#D0D0D0] h-[1px] rounded"></div>
                                <div className="mt-4 flex items-center justify-between px-10 text-textInactive">
                                    <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><AiOutlineLike fontSize={20}/>Thích</span>
                                    <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegComment fontSize={18}/>Bình luận</span>
                                    <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegPaperPlane fontSize={18}/>Nhắn tin</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 text-textInactive flex items-center gap-2 cursor-pointer hover:underline justify-center">
                            <span>Xem thêm các bài đăng khác</span> 
                            <FaArrowRight className="text-textInactive/70"/>
                        </div>
                    </div>

                    {/* Courses */}
                    <div className="mt-4 bg-white rounded-3xl pt-4 px-12 pb-10">
                        <div className="flex gap-3">
                            <button className="px-4 py-3 rounded-3xl font-semibold hover:shadow-md text-white bg-primaryColor">Khóa học đang tham gia</button>
                            <button className="px-4 py-3 rounded-3xl font-semibold hover:shadow-md text-textInactive border border-[#ACACAC]">Khóa học quan tâm</button>
                        </div>
                        <div className="mt-10 w-full overflow-x-auto flex flex-nowrap justify-between gap-2 pb-4">
                            <div className="p-2 bg-boxBackground rounded-xl h-48 w-64 shadow-blockShadow hover:bg-primaryColor/70 hover:text-white transition-all">
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="w-full h-[60%] object-cover rounded-lg"/>
                                <p className="mt-3 font-medium text-center truncate">Lập trình hướng đối tượng C++</p>
                            </div>
                            <div className="p-2 bg-boxBackground rounded-xl h-48 w-64 shadow-blockShadow hover:bg-primaryColor/70 hover:text-white transition-all">
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="w-full h-[60%] object-cover rounded-lg"/>
                                <p className="mt-3 font-medium text-center truncate">Thương mại điện tử</p>
                            </div>
                            <div className="p-2 bg-boxBackground rounded-xl h-48 w-64 shadow-blockShadow hover:bg-primaryColor/70 hover:text-white transition-all">
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="w-full h-[60%] object-cover rounded-lg"/>
                                <p className="mt-3 font-medium text-center truncate">Phân tích dữ liệu</p>
                            </div>
                            <div className="p-2 bg-boxBackground rounded-xl h-48 w-64 shadow-blockShadow hover:bg-primaryColor/70 hover:text-white transition-all">
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="" 
                                className="w-full h-[60%] object-cover rounded-lg"/>
                                <p className="mt-3 font-medium text-center truncate">Phân tích và thiết kế hệ thống CNTT</p>
                            </div>
                        </div>
                    </div>

                    {/* Subjects */}
                    <div className="mt-4 bg-white rounded-3xl pt-4 px-12 pb-10">
                        <h3 className="text-xl font-semibold">Các môn đã học</h3>
                        <ul className="mt-5 w-full">
                            <li className="py-3 px-4 mb-3 border border-gray-400 rounded-xl">1. Lập trình hướng đối tượng</li>
                            <li className="py-3 px-4 mb-3 border border-gray-400 rounded-xl">2. Phân tích dữ liêu</li>
                            <li className="py-3 px-4 mb-3 border border-gray-400 rounded-xl">3. Học máy (Machine Learning)</li>
                        </ul>
                    </div>
                </div>
            </div>
)}

export default Profile;