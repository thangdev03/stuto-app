import React, { useState } from "react";
import { Link } from "react-router-dom";
import { acceptInvitation, cancelInvitation } from "../utils/friendsHandler.js"

const RequestItem = ({ sender, request }) => {
  const [userResponse, setUserResponse] = useState(null);

  return (
    <div className="pb-4 bg-white border border-gray-300 shadow-md rounded-xl overflow-hidden flex flex-col justify-between">
      <div className="w-full flex border-b border-b-gray-300">
        <Link to={"/user/" + sender._id} className="block shrink-0 w-32 h-36">
          <img
            src={sender.avatar || "/img/default-avatar-square.webp"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="py-1 px-3">
          <Link
            to={"/user/" + sender._id}
            className="font-semibold text-lg hover:underline hover:underline-offset-2"
          >
            {sender.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500">
            {request.note}
          </p>
        </div>
      </div>
      {userResponse ? (
        <div className="mt-3 px-4">
          <div className="h-10 w-full py-2 rounded-lg">
          </div>
          <button 
            className="mt-2 h-10 w-full py-2 rounded-lg font-medium text-gray-400 bg-gray-200 cursor-not-allowed"
          >
            Bạn đã {userResponse.response} lời mời
          </button>
        </div>
      ) : (
        <div className="mt-3 px-4">
          <button 
            onClick={() => {
              acceptInvitation(request._id);
              setUserResponse({response: "đồng ý"});
            }} 
            className="h-10 w-full py-2 rounded-lg font-medium bg-primaryColor text-white hover:brightness-95"
          >
            Chấp nhận
          </button>
          <button 
            onClick={() => {
              cancelInvitation(request._id);
              setUserResponse({response: "từ chối"});
            }} 
            className="mt-2 h-10 w-full py-2 rounded-lg font-medium bg-gray-200 hover:brightness-95"
          >
            Từ chối
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestItem;
