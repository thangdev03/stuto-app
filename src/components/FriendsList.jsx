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
            <div className="mt-5 flex flex-col gap-4 grow overflow-y-scroll">
                <div className="flex items-top">
                    <div className="relative mr-4">
                        <img 
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/411677944_900591898096751_4513068970627541677_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE3AM_rR1xy0c-wcQmVgIzbwc61ZIpbSwXBzrVkiltLBZddvvq88xO08FISKb7e9iSMDLtuV0rG5Ga9aHx4J2Wl&_nc_ohc=UlWWnGvrM4wAX_g02Fd&_nc_ht=scontent.fhan9-1.fna&oh=00_AfBy6oFbsmERfToFw0u_qpgOXpF0P091vOQYMTAsB_Qvnw&oe=6596E021" 
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
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/411677944_900591898096751_4513068970627541677_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE3AM_rR1xy0c-wcQmVgIzbwc61ZIpbSwXBzrVkiltLBZddvvq88xO08FISKb7e9iSMDLtuV0rG5Ga9aHx4J2Wl&_nc_ohc=UlWWnGvrM4wAX_g02Fd&_nc_ht=scontent.fhan9-1.fna&oh=00_AfBy6oFbsmERfToFw0u_qpgOXpF0P091vOQYMTAsB_Qvnw&oe=6596E021" 
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
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/411677944_900591898096751_4513068970627541677_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE3AM_rR1xy0c-wcQmVgIzbwc61ZIpbSwXBzrVkiltLBZddvvq88xO08FISKb7e9iSMDLtuV0rG5Ga9aHx4J2Wl&_nc_ohc=UlWWnGvrM4wAX_g02Fd&_nc_ht=scontent.fhan9-1.fna&oh=00_AfBy6oFbsmERfToFw0u_qpgOXpF0P091vOQYMTAsB_Qvnw&oe=6596E021" 
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
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/411677944_900591898096751_4513068970627541677_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE3AM_rR1xy0c-wcQmVgIzbwc61ZIpbSwXBzrVkiltLBZddvvq88xO08FISKb7e9iSMDLtuV0rG5Ga9aHx4J2Wl&_nc_ohc=UlWWnGvrM4wAX_g02Fd&_nc_ht=scontent.fhan9-1.fna&oh=00_AfBy6oFbsmERfToFw0u_qpgOXpF0P091vOQYMTAsB_Qvnw&oe=6596E021" 
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
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/411677944_900591898096751_4513068970627541677_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE3AM_rR1xy0c-wcQmVgIzbwc61ZIpbSwXBzrVkiltLBZddvvq88xO08FISKb7e9iSMDLtuV0rG5Ga9aHx4J2Wl&_nc_ohc=UlWWnGvrM4wAX_g02Fd&_nc_ht=scontent.fhan9-1.fna&oh=00_AfBy6oFbsmERfToFw0u_qpgOXpF0P091vOQYMTAsB_Qvnw&oe=6596E021" 
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
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/411677944_900591898096751_4513068970627541677_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE3AM_rR1xy0c-wcQmVgIzbwc61ZIpbSwXBzrVkiltLBZddvvq88xO08FISKb7e9iSMDLtuV0rG5Ga9aHx4J2Wl&_nc_ohc=UlWWnGvrM4wAX_g02Fd&_nc_ht=scontent.fhan9-1.fna&oh=00_AfBy6oFbsmERfToFw0u_qpgOXpF0P091vOQYMTAsB_Qvnw&oe=6596E021" 
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
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/411677944_900591898096751_4513068970627541677_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE3AM_rR1xy0c-wcQmVgIzbwc61ZIpbSwXBzrVkiltLBZddvvq88xO08FISKb7e9iSMDLtuV0rG5Ga9aHx4J2Wl&_nc_ohc=UlWWnGvrM4wAX_g02Fd&_nc_ht=scontent.fhan9-1.fna&oh=00_AfBy6oFbsmERfToFw0u_qpgOXpF0P091vOQYMTAsB_Qvnw&oe=6596E021" 
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
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/411677944_900591898096751_4513068970627541677_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE3AM_rR1xy0c-wcQmVgIzbwc61ZIpbSwXBzrVkiltLBZddvvq88xO08FISKb7e9iSMDLtuV0rG5Ga9aHx4J2Wl&_nc_ohc=UlWWnGvrM4wAX_g02Fd&_nc_ht=scontent.fhan9-1.fna&oh=00_AfBy6oFbsmERfToFw0u_qpgOXpF0P091vOQYMTAsB_Qvnw&oe=6596E021" 
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
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/411677944_900591898096751_4513068970627541677_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE3AM_rR1xy0c-wcQmVgIzbwc61ZIpbSwXBzrVkiltLBZddvvq88xO08FISKb7e9iSMDLtuV0rG5Ga9aHx4J2Wl&_nc_ohc=UlWWnGvrM4wAX_g02Fd&_nc_ht=scontent.fhan9-1.fna&oh=00_AfBy6oFbsmERfToFw0u_qpgOXpF0P091vOQYMTAsB_Qvnw&oe=6596E021" 
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