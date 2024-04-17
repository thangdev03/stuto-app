import React, { useState } from 'react'
import { sendInvitation } from "../utils/friendsHandler";
import { useAuthContext } from '../hooks/useAuthContext';

const InvitationModal = ({ handleOpenInvitation, inviteTarget, updateSentStatus }) => {
  const [inviteMessage, setInviteMessage] = useState("Chào bạn, mình có thể cùng học với bạn được không? Mình cũng đang học môn này 🥰");
  const [state, dispatch] = useAuthContext();
  const { user } = state;

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    sendInvitation(user.id, inviteTarget._id, inviteMessage);
  };

  return (
    <div onClick={handleOpenInvitation} className="fixed z-30 left-0 top-0 right-0 bottom-0 bg-[#222222]/30">
      <div onClick={(e) => e.stopPropagation()} className="h-80 w-1/3 bg-boxBackground mx-auto mt-20 rounded-xl px-6 pt-4">
          <div className="flex justify-between items-end">
              <h2 className="font-medium">Lời mời kết bạn tới {inviteTarget?.name}</h2>
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
                      updateSentStatus();
                  }}
                  className="min-w-20 text-sm py-2 px-4 bg-primaryColor text-white rounded-lg
                  hover:shadow-blockShadow hover:bg-primaryColor/80">
                  Gửi lời mời
              </button>
          </div>
      </div>
    </div>
  )
}

export default InvitationModal