import React, { useEffect, useState } from 'react'
import AvatarImage from './AvatarImage';
import { cld } from '../services/const';

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((memberId) => memberId !== currentUser.id);

    const getUser = async () => {
      try {
        const response = await fetch("https://stuto-api.onrender.com/user/" + friendId);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  },[currentUser, conversation])


  return (
    <div className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-gray-100">
        <div className="relative w-10 h-10">
            <AvatarImage publicId={user?.avatar} cld={cld}/>
            <div className={`absolute bottom-0 right-0 ${user?.is_ative && "border border-white bg-green-500"} w-3 h-3 rounded-full`}></div>
        </div>
        <span className="font-medium">{user?.name}</span>
    </div>
  )
}

export default Conversations