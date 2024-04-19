import React, { useEffect, useState } from 'react'
import { getTimeAgo } from '../utils/getTimeAgo';
import { cld } from '../services/const';
import AvatarImage from './AvatarImage';
const Message = ({ message, own, friendId }) => {
  const sentTime = new Date(message.createdAt);
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const getFriend = async () => {
      try {
        const response = await fetch("https://stuto-api.onrender.com/user/" + friendId);
        const data = await response.json();
        setFriend(data)
      } catch (error) {
        console.error(error);
      }

    };
    getFriend();
  },[friendId])

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
            {/* <img src={friend?.avatar || "/img/default-avatar.png"} alt="avatar" className="object-cover rounded-full"/> */}
            <AvatarImage publicId={friend?.avatar} cld={cld} className={"max-w-8 max-h-8"}/>
            <p className="w-full px-4 py-2 bg-slate-100 rounded-3xl">{message.text}</p>
        </div>
        <span className="text-xs">{getTimeAgo(sentTime)}</span>
    </div>
  )
}

export default Message