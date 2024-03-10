import React, { useEffect, useRef, useState } from 'react'
import Conversations from '../../components/Conversations'
import ConversationHeader from '../../components/ConversationHeader'
import Message from '../../components/Message'
import { IoMdSearch } from 'react-icons/io'
import { BsSendFill } from "react-icons/bs";
import { useAuthContext } from "../../hooks/useAuthContext"


const Messenger = () => {
  const [searchText, setSearchText] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ state, dispatch ] = useAuthContext();
  const { user } = state;
  const scrollRef = useRef();

  const autoGrow = (element) => {
    element.style.height = "40px";
    element.style.height = (element.scrollHeight) + "px";
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);   
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
        conversation: currentChat._id,
        sender: user.id,
        text: newMessage,
        attachment_url: ""
    };
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
  }

  useEffect(() => {
    const fetchConversations = async () => {
        try {
            const response = await fetch("https://stuto-api.onrender.com/conversations/" + user.id);
            const data = await response.json();
            setConversations(data)
        } catch (error) {
            console.error(error);
        }
    };
    fetchConversations();
  },[user._id])

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
  },[currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
        behavior: "smooth"
    })
  },[messages])

  return (
    <div className="ml-72 h-[calc(100vh-64px)] flex justify-between border-l border-gray-300 bg-boxBackground overflow-y-hidden">
        {currentChat ? (
            <div className="w-[70%] flex flex-col">
                <ConversationHeader conversation={currentChat} currentUser={user} />
                <div className="grow overflow-y-auto">
                    {messages?.map((message, index) => (
                        <div key={index} ref={scrollRef}>
                            <Message message={message} own={message.sender === user.id}/>
                        </div>
                    ))}
                </div>
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
                {conversations.map((conversation,index) => (
                    <div key={index} onClick={() => setCurrentChat(conversation)}>
                        <Conversations conversation={conversation} currentUser={user} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Messenger