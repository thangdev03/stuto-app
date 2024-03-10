import React, { useEffect, useState } from "react";

const ConversationHeader = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (memberId) => memberId !== currentUser.id
    );

    const getUser = async () => {
      try {
        const response = await fetch(
          "https://stuto-api.onrender.com/user/" + friendId
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="flex gap-3 p-4 border-b border-gray-300 shadow-sm">
      <div className="relative">
        <img
          src={user?.avatar || "img/default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div
          className={`absolute bottom-0 right-0 ${user?.is_ative && "border border-white bg-green-500"} w-3 h-3 rounded-full`}
        ></div>
      </div>
      <div className="flex flex-col">
        <span className="font-medium">{user?.name}</span>
        <span className="text-xs text-textInactive">{user?.is_ative? "Đang hoạt động" : "Offline"}</span>
      </div>
    </div>
  );
};

export default ConversationHeader;
