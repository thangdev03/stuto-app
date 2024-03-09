import React from 'react'

const Message = ({ own }) => {
  return own ? (
    <div className="w-full flex flex-row-reverse items-center mt-4 gap-3 px-4">
        <div className="max-w-[70%] flex flex-row-reverse gap-3 items-start">
            {/* <img src="https://i.imgur.com/RbWtBw5.jpg" alt="avatar" className="w-8 h-8 object-cover rounded-full"/> */}
            <p className="w-full px-4 py-3 bg-primaryColor text-white rounded-3xl">tinctio corrupti iure, quis maiores. Obcaecati, vero.</p>
        </div>
        <span className="text-xs">15:00</span>
    </div>
  ) : (
    <div className="w-full flex items-center mt-4 gap-3 px-4">
        <div className="max-w-[70%] flex items-start gap-3">
            <img src="https://i.imgur.com/RbWtBw5.jpg" alt="avatar" className="w-8 h-8 object-cover rounded-full"/>
            <p className="w-full px-4 py-3 bg-slate-100 rounded-3xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum perferendis ut sed totam eveniet quo reprehenderit cumque tenetur harum dolor beatae officia saepe distinctio corrupti iure, quis maiores. Obcaecati, vero.</p>
        </div>
        <span className="text-xs">15:00</span>
    </div>
  )
}

export default Message