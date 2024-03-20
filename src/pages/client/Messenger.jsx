import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client"
import Conversations from '../../components/Conversations'
import ConversationHeader from '../../components/ConversationHeader'
import Message from '../../components/Message'
import { IoMdSearch } from 'react-icons/io'
import { BsSendFill } from "react-icons/bs";
import { useAuthContext } from "../../hooks/useAuthContext"
import { AiOutlineMessage } from "react-icons/ai";
import LoadingSpinner from "../../components/LoadingSpinner"

const Messenger = () => {
  const [searchText, setSearchText] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [friendId, setFriendId] = useState(null);
  const [ state, dispatch ] = useAuthContext();
  const { user } = state;
  const scrollRef = useRef();
  const socket = useRef();

  const autoGrow = (element) => {
    element.style.height = "40px";
    element.style.height = (element.scrollHeight) + "px";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);   
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
        conversation: currentChat._id,
        sender: user.id,
        text: newMessage,
        attachment_url: ""
    };

    const receiverId = currentChat.members.find((member) => member !== user.id);

    socket.current.emit("sendMessage", {
        senderId: user.id,
        receiverId,
        text: newMessage
    });

    try {
        const response = await fetch("https://stuto-api.onrender.com/messages/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });
        const data = await response.json()
        setMessages([...messages, data]);
        setNewMessage("");
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    socket.current = io("https://stuto-api.onrender.com");
    socket.current.on("getMessage", (data) => {
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now()
        });
    })
  },[]);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
        setMessages((prev) => [...prev, arrivalMessage])
    }
  },[arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    // socket.current.on("getUsers", users => {
    //     console.log(users);
    // })
  },[user]);

  useEffect(() => {
    const fetchConversations = async () => {
        try {
            setIsLoadingConversation(true)
            const response = await fetch("https://stuto-api.onrender.com/conversations/" + user.id);
            const data = await response.json();
            setConversations(data)
            if (response) {
                setIsLoadingConversation(false)
            }
        } catch (error) {
            console.error(error);
        }
    };
    fetchConversations();
  },[user.id]);

  useEffect(() => {
    const getMessages = async () => {
        try {
            if (currentChat) {
                const response = await fetch("https://stuto-api.onrender.com/messages/" + currentChat._id);
                const data = await response.json();
                setMessages(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    getMessages();
    const currFriendId = currentChat?.members.find((member) => member !== user.id)
    setFriendId(currFriendId);
  },[currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
        behavior: "smooth"
    })
  },[messages]);

  return (
    <div className="ml-72 h-[calc(100vh-64px)] flex justify-between border-l border-gray-300 bg-boxBackground overflow-y-hidden">
        {currentChat ? (
            <div className="w-[70%] flex flex-col">
                <ConversationHeader conversation={currentChat} currentUser={user} />
                {messages.length == 0 ? (
                    <span className="grow py-10 text-center text-gray-400 flex flex-col gap-8 items-center">
                        Hãy gửi tin nhắn đầu tiên để bắt đầu cuộc trò chuyện
                        <AiOutlineMessage className="text-primaryColor w-12 h-12"/>
                    </span>
                ) : (
                    <div className="grow overflow-y-auto">
                    
                        {messages.map((message, index) => (
                                <div key={index} ref={scrollRef}>
                                    <Message message={message} own={message.sender === user.id} friendId={friendId}/>
                                </div>
                        ))}
                    </div>
                )}
                <div className="py-3 px-4 flex items-center gap-3">
                    <textarea
                        type="text"
                        placeholder="Nhập tin nhắn của bạn ở đây..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onInput={(e) => autoGrow(e.target)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        className="grow px-4 py-2 bg-slate-100 rounded-3xl outline-none h-10 max-h-36 text-wrap resize-none"
                    />
                    <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleSubmit}>
                        <BsSendFill className="text-2xl text-primaryColor"/>
                    </button>
                </div>
            </div>
        ) : (
            <div className="w-[70%] flex flex-col justify-center items-center gap-4">
                <img src="/img/clicking.png" alt="" className="w-16 h-16 opacity-80" />
                <span className="font-semibold text-xl text-gray-400">Hãy mở 1 cuộc trò chuyện để bắt đầu nhắn tin</span>
            </div>
        )}
        
        <div className="w-[30%] px-3 py-4 flex flex-col border-l border-l-gray-300">
            <h1 className="text-2xl font-semibold">Tin nhắn</h1>
            <div className="mt-2 bg-slate-100 rounded-full flex items-center transition-all px-4">
                <IoMdSearch className="text-2xl text-textColor/50"/>
                <input 
                    type="text"
                    placeholder="Tìm kiếm tin nhắn"
                    className="w-full bg-transparent py-2 px-2 focus:outline-none text-textColor text-sm"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className="mt-3 grow overflow-y-auto shadow-inner">
                {isLoadingConversation ? (
                    <LoadingSpinner width={32} height={32}/>
                ) : (
                    conversations.map((conversation,index) => (
                        <div key={index} onClick={() => setCurrentChat(conversation)}>
                            <Conversations conversation={conversation} currentUser={user} />
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  )
}

export default Messenger