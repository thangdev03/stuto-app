import React from 'react'

const Conversations = () => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-gray-100">
        <div className="relative">
            <img src="https://i.imgur.com/RbWtBw5.jpg" alt="avatar" className="w-10 h-10 object-cover rounded-full" />
            <div className={`absolute bottom-0 right-0 border border-white bg-green-500 w-3 h-3 rounded-full`}></div>
        </div>
        <span className="font-medium">Roseanne Park</span>
    </div>
  )
}

export default Conversations