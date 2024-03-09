import React, { useEffect, useState } from 'react'
import Conversations from '../../components/Conversations'
import Message from '../../components/Message'
import { IoMdSearch } from 'react-icons/io'
import { BsSendFill } from "react-icons/bs";
import { useAuthContext } from "../../hooks/useAuthContext"


const Messenger = () => {
  const [searchText, setSearchText] = useState("");
  const [conversations, setConversations] = useState([]);
  const [ state, dispatch ] = useAuthContext();
  const { user } = state

  useEffect(() => {
    const fetchConversations = async () => {
        try {
            const response = await fetch("http://localhost:5555/conversations/" + user.id);
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };
    fetchConversations();
  },[user._id])

  return (
    <div className="ml-72 h-[calc(100vh-64px)] flex justify-between border-l border-gray-300 bg-boxBackground overflow-y-hidden">
        <div className="w-[70%] flex flex-col">
            <div className="flex gap-3 p-4 border-b border-gray-300 shadow-sm">
                <div className="relative">
                    <img src="https://i.imgur.com/RbWtBw5.jpg" alt="avatar" className="w-10 h-10 object-cover rounded-full" />
                    <div className={`absolute bottom-0 right-0 border border-white bg-green-500 w-3 h-3 rounded-full`}></div>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Roseanne Park</span>
                    <span className="text-xs text-textInactive">Đang hoạt động</span>
                </div>
            </div>
            <div className="grow overflow-y-auto">
                <Message />
                <Message own={true}/>
                <Message />
                <Message own={true}/>
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
            <div className="py-3 px-4 flex items-center gap-3">
                <input 
                    type="text"
                    placeholder="Nhập tin nhắn của bạn ở đây..." 
                    className="grow px-4 py-2 bg-slate-100 rounded-full outline-none"
                />
                <button className="p-2">
                    <BsSendFill className="text-2xl text-primaryColor"/>
                </button>
            </div>
        </div>
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
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
            </div>
        </div>
    </div>
  )
}

export default Messenger