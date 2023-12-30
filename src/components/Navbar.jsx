import { Link, useLocation } from 'react-router-dom' 
import { FaHome, FaUserFriends, FaVideo, FaCalendarAlt, FaUserGraduate } from "react-icons/fa";
import { BsPostcardFill } from "react-icons/bs";

function Navbar() {
    const location = useLocation();

    return (
        <nav className="fixed z-10">
            <Link to="/" className="block ml-8 mb-2">
                <img src="./img/logo2.png" width={150} alt=""/>
            </Link>
            <ul className="w-64 ml-5 font-semibold flex flex-col gap-3">
                <li>
                    <Link to="/"
                    className={
                        `flex items-center gap-3 h-12 px-5 text-[18px] rounded-xl hover:bg-[#f8f8f8] transition-all
                        ${location.pathname === '/'? 
                        "text-primaryColor bg-boxBackground": 
                        "text-textInactive"
                        }`
                    }>
                        <FaHome className=""/>
                        <span className={location.pathname === '/'? "text-textColor": "text-textInactive"}>Trang chủ</span>
                    </Link>
                </li>
                <li>
                    <Link to="/tim-ban-hoc" 
                    className={
                        `flex items-center gap-3 h-12 px-5 text-[18px] rounded-xl hover:bg-[#f8f8f8] transition-all
                        ${location.pathname === '/tim-ban-hoc'? 
                        "text-primaryColor bg-boxBackground": 
                        "text-textInactive"
                        }`
                    }>
                        <FaUserFriends className=""/>
                        <span className={location.pathname === '/tim-ban-hoc'? "text-textColor": "text-textInactive"}>Tìm bạn học</span>
                    </Link>
                </li>
                <li>
                    <Link to="/phong-hoc-online"
                    className={
                        `flex items-center gap-3 h-12 px-5 text-[18px] rounded-xl hover:bg-[#f8f8f8] transition-all
                        ${location.pathname === '/phong-hoc-online'? 
                        "text-primaryColor bg-boxBackground": 
                        "text-textInactive"
                        }`
                    }>
                        <FaVideo className=""/>
                        <span className={location.pathname === '/phong-hoc-online'? "text-textColor": "text-textInactive"}>Phòng học online</span>
                    </Link>
                </li>
                <li>
                    <Link to="/thoi-gian-bieu"
                    className={
                        `flex items-center gap-3 h-12 px-5 text-[18px] rounded-xl hover:bg-[#f8f8f8] transition-all
                        ${location.pathname === '/thoi-gian-bieu'? 
                        "text-primaryColor bg-boxBackground": 
                        "text-textInactive"
                        }`
                    }>
                        <FaCalendarAlt className=""/>
                        <span className={location.pathname === '/thoi-gian-bieu'? "text-textColor": "text-textInactive"}>Thời gian biểu</span>
                    </Link>
                </li>
                <li>
                    <Link to="/khoa-hoc" 
                    className={
                        `flex items-center gap-3 h-12 px-5 text-[18px] rounded-xl hover:bg-[#f8f8f8] transition-all
                        ${location.pathname === '/khoa-hoc'? 
                        "text-primaryColor bg-boxBackground": 
                        "text-textInactive"
                        }`
                    }>
                        <FaUserGraduate className=""/>
                        <span className={location.pathname === '/khoa-hoc'? "text-textColor": "text-textInactive"}>Khóa học</span>
                    </Link>
                </li>
                <li>
                    <Link to="/bai-dang" 
                    className={
                        `flex items-center gap-3 h-12 px-5 text-[18px] rounded-xl hover:bg-[#f8f8f8] transition-all
                        ${location.pathname === '/bai-dang'? 
                        "text-primaryColor bg-boxBackground": 
                        "text-textInactive"
                        }`
                    }>
                        <BsPostcardFill className=""/>
                        <span className={location.pathname === '/bai-dang'? "text-textColor": "text-textInactive"}>Bài đăng</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar