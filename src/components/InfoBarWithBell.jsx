import { FaBell } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";
import { setLogout } from "../contexts/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
      className="min-w-fit flex justify-between items-center gap-3"
    >
      <button className="px-1">
        <FaBell className="text-textColor text-xl" />
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
          className={`absolute z-20 top-[110%] right-0 min-w-36 w-44 bg-white text-center text-sm rounded-lg shadow-lg overflow-hidden py-2 font-normal ${
            isOpenUserModal ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              to={`/user/${user.id}`}
              className="block py-3 hover:text-white hover:bg-[rgb(169,203,253)]"
            >
              Trang cá nhân
            </Link>
          </li>
          <li>
            <Link to="/update-info" className="block py-3 hover:text-white hover:bg-[rgb(169,203,253)]">
              Cài đặt tài khoản
            </Link>
          </li>
          <li onClick={handleLogoutClick}>
            <Link className="block py-3 hover:text-white hover:bg-[rgb(169,203,253)]">
              Đăng xuất
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InfoBarWithBell;
