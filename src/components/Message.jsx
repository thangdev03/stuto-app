import React, { useEffect } from 'react'
import { getTimeAgo } from '../utils/getTimeAgo';
const Message = ({ message, own }) => {
  const sentTime = new Date(message.createdAt);

  return own ? (
    <div className="w-full flex flex-row-reverse items-center mt-4 gap-3 px-4">
        <div className="max-w-[70%] flex flex-row-reverse gap-3 items-start">
            <p className="w-full px-4 py-2 bg-primaryColor text-white rounded-3xl">{message.text}</p>
        </div>
        <span className="text-xs">{getTimeAgo(sentTime)}</span>
    </div>
  ) : (
    <div className="w-full flex items-center mt-4 gap-3 px-4">
        <div className="max-w-[70%] flex items-start gap-3">
            <img src="https://i.imgur.com/RbWtBw5.jpg" alt="avatar" className="w-8 h-8 object-cover rounded-full"/>
            <p className="w-full px-4 py-2 bg-slate-100 rounded-3xl">{message.text}</p>
        </div>
        <span className="text-xs">{getTimeAgo(sentTime)}</span>
    </div>
  )
}

export default Message