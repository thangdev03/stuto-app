import { useState } from "react";
import { IoMdSearch  } from "react-icons/io";

function FriendsList() {
    const friendsList = [
        {
            id: 1,
            name: 'Chu Bin',
            school: 'NEU',
            major: 'Kinh tế tài nguyên và môi trường',
            avatar: ''
        },
        {
            id: 2,
            name: 'Phương Ly',
            school: 'NEU',
            major: 'Công nghệ thông tin',
            avatar: ''
        },
        {
            id: 3,
            name: 'Andree Trái Tay',
            school: 'NEU',
            major: 'Công nghệ tài chính',
            avatar: ''
        }
    ];

    const [inputValue, setInputValue] = useState("");

    return (
        <div className="fixed top-24 right-5 h-[380px] w-[340px] bg-boxBackground rounded-3xl py-6 pl-7 pr-4 flex flex-col">
            <h3 className="font-semibold text-lg text-textColor mb-2">StuToers đã kết nối</h3>
            <div className={`bg-[#dfdfdf79] rounded-full flex focus-within:opacity-100 transition-all ${inputValue? "opacity-100": "opacity-60"}`}>
                <input 
                    type="text"
                    placeholder="Nhập thông tin của bạn cần tìm..."
                    className="w-full bg-transparent py-2 px-4 focus:outline-none text-textColor text-sm"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                />
                <div className="p-2 text-[#9C9C9C] hover:text-[#333333]">
                    <IoMdSearch id="searchBtn" className="cursor-pointer group-focus-within:text-textColor text-2xl"/>
                </div>
            </div>
            {/* Friends list */}
            <ul className="mt-5 flex flex-col gap-0 grow overflow-y-auto">
                {friendsList.map((friend) => friend.name.toLowerCase().includes(inputValue) || friend.major.toLowerCase().includes(inputValue) ? (
                    <li className="flex items-top hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <div className="relative mr-4">
                            <img 
                                src="./img/default-avatar.png" 
                                alt=""
                                className="w-9 h-9 rounded-full object-cover" 
                            />
                            <div className={`absolute top-7 left-6 bg-green-500 w-2 h-2 rounded-full`}></div>
                        </div>
                        <div className="w-[calc(100%-58px)]">
                            <h4 className="text-sm font-semibold">{friend.name}</h4>
                            <p className="text-xs w-full truncate">{friend.school}, {friend.major}</p>
                        </div>
                    </li>
                ) : (
                    null
                )
                )}
            </ul>
        </div>
    );
}

export default FriendsList