import React, { useEffect, useState, useRef } from "react";
import { MdLocationOn, MdPersonAddAlt1 } from "react-icons/md";
import { FaUserFriends, FaUserTimes, FaUserCheck } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  cancelInvitation,
  getInvitation,
  acceptInvitation,
} from "../utils/friendsHandler.js";
import InvitationModal from "./InvitationModal";
import { useAuthContext } from "../hooks/useAuthContext.js";
import AvatarImage from "./AvatarImage.jsx";
import { cld } from "../services/const.js";

const UserItem = ({ user, requestSenders, requestReceivers }) => {
  const [openInvitation, setOpenInvitation] = useState(false);
  const [inviteTarget, setInviteTarget] = useState(null);
  const [isSentRequest, setIsSentRequest] = useState(false);
  const [isOpenResponse, setIsOpenResponse] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [state, dispatch] = useAuthContext();
  const currAuthUser = state.user;

  const handleOpenInvitation = () => {
    setOpenInvitation(!openInvitation);
  };

  const updateSentStatus = () => {
    setIsSentRequest(true);
  };

  const handleCancelInvite = async () => {
    const invitation = await getInvitation(currAuthUser.id, user?._id);
    cancelInvitation(invitation._id);
  };

  const handleAcceptInvite = async () => {
    const invitation = await getInvitation(currAuthUser.id, user?._id);
    acceptInvitation(invitation._id);
  };

  return (
    <div className="mb-2 pt-3 pr-6 pl-3 pb-4 min-h-64 bg-boxBackground rounded-lg shadow-blockShadow">
      <div className="flex gap-4">
        <Link to={"/user/" + user?._id} className="block w-16 h-16  flex-shrink-0">
          <AvatarImage publicId={user?.avatar} cld={cld} className={""}/>
        </Link>
        <div className="grow flex flex-col">
          <div className="relative">
            <div>
              <Link
                to={"/user/" + user?._id}
                className="text-lg font-semibold hover:underline"
              >
                {user?.name}
              </Link>
              <div className="flex items-center gap-2 mt-1 mb-1">
                <MdLocationOn />
                <p className="font-medium">
                  {user?.location || "Chưa cập nhật"}
                </p>
              </div>
              <p>
                <span className="font-medium">Chuyên ngành:</span>{" "}
                {user?.major?.name || "Chưa cập nhật"}
              </p>
              <p>
                <span className="font-medium">Hệ đào tạo:</span>{" "}
                {user?.study_program || "Chưa cập nhật"}
              </p>
              <p>
                <span className="font-medium">Môn học:</span>{" "}
                {user?.wish?.subject?.name || "Chưa cập nhật"}
              </p>
              <p>
                <span className="font-medium">Mong muốn:</span>{" "}
                {user?.wish?.description || "Chưa cập nhật"}
              </p>
            </div>
            <div className="flex items-center gap-2 h-7 absolute top-0 right-0">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-textInactive text-sm">Online</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center flex-wrap">
            <div className="mt-4 text-primaryColor flex justify-between items-center gap-3 font-medium">
              <p className="flex gap-2 items-center text-sm">
                <FaUserFriends />
                Số bạn học: 12
              </p>
              <span className="block w-[2px] h-6 bg-[#bbbbbb] rounded-full"></span>
              <p className="flex gap-2 items-center text-sm">
                <FaClock />
                Số giờ đã học: 6h 23m
              </p>
            </div>
            {requestSenders.includes(user?._id) && !isResponse ? (
              <div
                onClick={(e) => setIsOpenResponse(!isOpenResponse)}
                className="mt-4 text-sm text-white font-medium px-5 py-2 border-2 bg-primaryColor rounded-full flex items-center gap-2
                        hover:bg-primaryColor/80 transition-all cursor-pointer relative"
              >
                <FaUserCheck className="text-xl" />
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
            ) : requestReceivers.includes(user?._id) || isSentRequest ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsSentRequest(false);
                  handleCancelInvite();
                }}
                className="mt-4 text-sm text-textColor font-medium px-3 py-2 border-2 border-gray-300 bg-gray-300 rounded-full flex items-center gap-2
                            hover:bg-gray-200 hover:border-gray-200 transition-all"
              >
                <FaUserTimes className="text-xl" />
                Hủy lời mời
              </button>
            ) : !isAccept ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenInvitation();
                  setInviteTarget(user);
                }}
                className="mt-4 text-sm text-primaryColor font-medium px-6 py-2 border-2 border-primaryColor rounded-full flex items-center gap-2
                        hover:text-white hover:bg-primaryColor transition-all"
              >
                <MdPersonAddAlt1 className="text-xl" />
                Kết bạn
              </button>
            ) : (
              <span className="mt-4 text-sm text-white font-medium px-5 py-2 border-2 bg-primaryColor rounded-full flex items-center gap-2
              hover:bg-primaryColor/80 transition-all cursor-pointer relative">
                <FaUserCheck className="text-xl" />
                Bạn bè
              </span>
            )}

            {openInvitation && (
              <InvitationModal
                handleOpenInvitation={handleOpenInvitation}
                inviteTarget={inviteTarget}
                updateSentStatus={updateSentStatus}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
