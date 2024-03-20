import { useAuthContext } from "../hooks/useAuthContext";
import { setLogout } from "../contexts/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { RiUserShared2Fill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

function InfoBarWithBell() {
  const [state, dispatch] = useAuthContext();
  const { user } = state;
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const userModalContainer = useRef();
  let userLastName = "";

  if (user) {
    const lastIndex = user.name.lastIndexOf(" ");
    userLastName = user.name.substring(lastIndex);
  }

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    dispatch(setLogout());
  };

  const handleClickOutside = (e) => {
    if (userModalContainer && !userModalContainer.current.contains(e.target)) {
      setIsOpenUserModal(false);
    }
  };

  useEffect(() => {
    if (isOpenUserModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenUserModal]);

  return (
    <div
      id="user"
      className="min-w-fit flex justify-between items-center gap-4"
    >
      <Link to="/messenger">
        <IoChatbubbles className="text-gray-800 hover:text-gray-700 transition-all text-2xl"/>
      </Link>
      <button className="px-1">
        <FaBell className="text-gray-800 hover:text-gray-700 transition-all text-2xl"/>
      </button>
      <div
        ref={userModalContainer}
        onClick={() => setIsOpenUserModal(!isOpenUserModal)}
        className="py-2 pl-3 pr-10 grow flex items-center bg-boxBackground rounded-full cursor-pointer relative hover:shadow-blockShadow min-w-44 max-w-52"
      >
        <div className="mr-4 w-9 h-9 shrink-0">
          <img
            src="/img/default-avatar.png"
            alt="Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <p className="font-medium">{user && userLastName}</p>
        <ul
          className={`absolute z-20 top-[110%] right-0 min-w-36 w-44 bg-white text-sm rounded-lg shadow-lg overflow-hidden py-2 font-normal ${
            isOpenUserModal ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              to={`/user/${user.id}`}
              className="py-3 pl-3 hover:text-white hover:bg-[rgb(169,203,253)] flex items-center gap-2"
            >
              <FaCircleUser className="text-lg"/>
              Trang cá nhân
            </Link>
          </li>
          <li>
            <Link 
              to="/friend/requests" 
              className="py-3 pl-3 hover:text-white hover:bg-[rgb(169,203,253)] flex items-center gap-2"
            >
              <RiUserShared2Fill className="text-lg"/>
              Lời mời kết bạn
            </Link>
          </li>
          <li>
            <Link
              to="/update-info"
              className="py-3 pl-3 hover:text-white hover:bg-[rgb(169,203,253)] flex items-center gap-2"
            >
              <FaCog className="text-lg"/>
              Cài đặt tài khoản
            </Link>
          </li>
          <li onClick={handleLogoutClick}>
            <Link 
              className="py-3 pl-3 hover:text-white hover:bg-[rgb(169,203,253)] flex items-center gap-2"
            >
              <IoLogOut className="text-lg"/>
              Đăng xuất
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InfoBarWithBell;
