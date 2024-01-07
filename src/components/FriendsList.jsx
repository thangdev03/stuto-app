import { IoMdSearch  } from "react-icons/io";

function FriendsList() {

    return (
        <div className="fixed top-28 right-7 h-[500px] w-[360px] bg-boxBackground rounded-3xl py-7 pl-7 pr-4 flex flex-col">
            <h3 className="font-semibold text-lg text-textColor mb-2">StuToers của bạn</h3>
            <form action="#" method="post" className="bg-[#dfdfdf79] rounded-full flex opacity-60 focus-within:opacity-100">
                <input 
                    type="text"
                    placeholder="Nhập thông tin của bạn cần tìm..."
                    className="w-full bg-transparent py-2 px-4 focus:outline-none text-textColor text-sm "
                />
                <div className="p-2 text-[#9C9C9C] hover:text-[#333333]">
                    <IoMdSearch id="searchBtn" className="cursor-pointer group-focus-within:text-textColor text-2xl"/>
                </div>
            </form>
            {/* Friends list */}
            <div className="mt-5 flex flex-col gap-4 grow overflow-y-auto">
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="./img/default-avatar.png" 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div className={`absolute top-7 left-7 bg-green-500 w-3 h-3 rounded-full`}></div>
                    </div>
                    <div className="w-[calc(100%-58px)]">
                        <h4 className="font-semibold">Chu Bin</h4>
                        <p className="text-xs w-full truncate">NEU, Natural Resources Economics Resources Economic Resources Economic</p>
                    </div>
                </div>
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="./img/default-avatar.png" 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div className={`absolute top-7 left-7 bg-green-500 w-3 h-3 rounded-full`}></div>
                    </div>
                    <div className="w-[calc(100%-56px)] overflow-hidden">
                        <h4 className="font-semibold">Chu Bin</h4>
                        <p className="text-xs w-full truncate">NEU, Natural Resources Economics</p>
                    </div>
                </div>
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="./img/default-avatar.png" 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div className={`absolute top-7 left-7 bg-green-500 w-3 h-3 rounded-full`}></div>
                    </div>
                    <div className="w-[calc(100%-56px)] overflow-hidden">
                        <h4 className="font-semibold">Chu Bin</h4>
                        <p className="text-xs w-full truncate">NEU, Natural Resources Economics</p>
                    </div>
                </div>
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="./img/default-avatar.png" 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div className={`absolute top-7 left-7 bg-green-500 w-3 h-3 rounded-full`}></div>
                    </div>
                    <div className="w-[calc(100%-56px)] overflow-hidden">
                        <h4 className="font-semibold">Chu Bin</h4>
                        <p className="text-xs w-full truncate">NEU, Natural Resources Economics</p>
                    </div>
                </div>
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="./img/default-avatar.png" 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div className={`absolute top-7 left-7 bg-green-500 w-3 h-3 rounded-full`}></div>
                    </div>
                    <div className="w-[calc(100%-56px)] overflow-hidden">
                        <h4 className="font-semibold">Chu Bin</h4>
                        <p className="text-xs w-full truncate">NEU, Natural Resources Economics</p>
                    </div>
                </div>
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="./img/default-avatar.png" 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div className={`absolute top-7 left-7 bg-green-500 w-3 h-3 rounded-full`}></div>
                    </div>
                    <div className="w-[calc(100%-56px)] overflow-hidden">
                        <h4 className="font-semibold">Chu Bin</h4>
                        <p className="text-xs w-full truncate">NEU, Natural Resources Economics</p>
                    </div>
                </div>
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="./img/default-avatar.png" 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div className={`absolute top-7 left-7 bg-green-500 w-3 h-3 rounded-full`}></div>
                    </div>
                    <div className="w-[calc(100%-56px)] overflow-hidden">
                        <h4 className="font-semibold">Chu Bin</h4>
                        <p className="text-xs w-full truncate">NEU, Natural Resources Economics</p>
                    </div>
                </div>
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="./img/default-avatar.png" 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div className={`absolute top-7 left-7 bg-green-500 w-3 h-3 rounded-full`}></div>
                    </div>
                    <div className="w-[calc(100%-56px)] overflow-hidden">
                        <h4 className="font-semibold">Chu Bin</h4>
                        <p className="text-xs w-full truncate">NEU, Natural Resources Economics</p>
                    </div>
                </div>
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="./img/default-avatar.png" 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div className={`absolute top-7 left-7 bg-green-500 w-3 h-3 rounded-full`}></div>
                    </div>
                    <div className="w-[calc(100%-56px)] overflow-hidden">
                        <h4 className="font-semibold">Chu Bin</h4>
                        <p className="text-xs w-full truncate">NEU, Natural Resources Economics</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendsList