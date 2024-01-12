import { FaArrowRight, FaMapPin, FaPaperPlane } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiUserForbidLine } from "react-icons/ri";
import { MdOutlineReport } from "react-icons/md";
import FriendsList from "../../components/FriendsList";
import { useEffect, useState, useRef } from "react";


function Profile() {
    const [openUserActions, setOpenUserActions] = useState(false);
    const boxRef = useRef();

    const handleOpenUserActions = () => {
        setOpenUserActions(!openUserActions);
        console.log(openUserActions);
    }
    
    //FIXME: Fix close modal when clicking outside the box
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setOpenUserActions(false);
                console.log(openUserActions);
            }
        }

        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])
    
    
    return (
        <div className="ml-80 mr-[416px] mt-10 pb-12">
            <FriendsList />
            {/* Basic Info */}
            <div className="bg-white rounded-3xl">
                <div className="user-info-bgGradient py-8 px-12 flex items-end gap-8 rounded-t-3xl">
                    <div className="w-44 flex flex-col items-center">
                        <div className="shrink-0 w-40 h-40">
                            <img 
                            src="https://cdn.tuoitre.vn/ttc/r/2021/01/07/thoi-diem-hien-tai-rose-da-so-huu-visual-dinh-cao-cua-kpop-1610033705.jpg" 
                            alt="avatar" 
                            className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <p className="mt-6 flex gap-4 items-center font-medium">
                            <FaMapPin />
                            Hà Nội
                        </p>
                        <p className="mt-1 text-sm font-medium">(12 lượt đề xuất)</p>
                    </div>
                    <div className="grow">
                        <h1 className="text-3xl font-semibold flex flex-wrap items-end gap-1 lg">Phác Thái Anh <span className="text-lg font-medium">(Park Chae-young)</span></h1>
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
                            <div className="mt-4 flex gap-5">
                                <button className="w-32 h-9 flex justify-center items-center gap-2 font-medium text-sm px-4 bg-primaryColor shadow-blockShadow rounded-full text-white transition-all hover:brightness-110">
                                    <FaPlus className="font-normal"/>
                                    Kết bạn
                                </button>
                                <button className="w-32 h-9 flex justify-center items-center gap-2 font-medium text-sm px-4 border-2 border-primaryColor shadow-blockShadow rounded-full text-primaryColor transition-all hover:brightness-110 hover:bg-white/20">
                                    <FaPaperPlane className="font-normal"/>
                                    Mời học
                                </button>
                                <div className="relative">
                                    <button 
                                    onClick={(e) => handleOpenUserActions()}
                                    className="w-32 h-9 flex justify-center items-center gap-2 font-medium text-sm px-4 border-2 border-textInactive/70 shadow-blockShadow rounded-full text-textInactive/80 transition-all hover:brightness-110 hover:bg-white/20 relative">
                                        <HiOutlineDotsHorizontal className="font-normal"/>
                                        Khác
                                    </button>
                                    <ul 
                                    className={`box-w-arrow p-2 bg-white shadow-xl rounded-lg absolute top-12 -left-6 z-10
                                    ${openUserActions? "block": "hidden"}`}
                                    ref={boxRef}
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
            <div className="mt-4 flex gap-3">
                <div className="w-2/5 h-44 bg-white rounded-3xl py-3 px-12">
                    <h3 className="font-semibold text-center text-lg">Tiểu sử</h3>
                    <p className="mt-3 text-center">“Đây là giới thiệu về tui, một StuToer tích cực, hòa đồng, muốn tìm những người bạn mới học cùng ngành Công nghệ thông tin.”</p>
                </div>
                <div className="grow h-44 bg-white rounded-3xl py-3 px-8 flex flex-col items-center">
                    <h3 className="font-semibold text-lg">Thông tin cơ bản</h3>
                    <table className="mt-3 table-auto">
                        <tbody>
                            <tr>
                                <td className="w-32">Trường</td>
                                <td className="w-6">:</td>
                                <td className="font-medium">Đại học Kinh tế Quốc dân</td>
                            </tr>
                            <tr>
                                <td className="w-32">Chuyên ngành</td>
                                <td className="w-6">:</td>
                                <td className="font-medium">Công nghệ thông tin</td>
                            </tr>
                            <tr>
                                <td className="w-32">Giới tính</td>
                                <td className="w-6">:</td>
                                <td className="font-medium">Nữ</td>
                            </tr>
                            <tr>
                                <td className="w-32">Tuổi</td>
                                <td className="w-6">:</td>
                                <td className="font-medium">20</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Subjects */}
            <div className="mt-4 bg-white rounded-3xl pt-6 px-12 pb-4">
                <h3 className="text-center text-lg font-semibold">Đề xuất từ StuToers khác</h3>
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
            {/* Recommendation */}
            <div className="mt-4 bg-white rounded-3xl pt-6 px-12 pb-4">
                
            </div>

            {/* Posts */}

        </div>
    );
}

export default Profile;