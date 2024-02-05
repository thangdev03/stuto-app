import { FaBell } from "react-icons/fa";

function InfoBarWithBell() {
    return (
        <div id="user" className="w-64 flex justify-between items-center gap-3">
            <a href="#" className="px-1">
                <FaBell className="text-textColor text-xl"/>
            </a>
            <div className="py-2 px-3 grow flex items-center bg-boxBackground rounded-full shadow-blockShadow">
                <div className="mr-4">
                    <img 
                        src="./img/default-avatar.png" 
                        alt="Avatar" 
                        className="w-9 h-9 rounded-full object-cover"
                    />
                </div>
                <p className="font-semibold">Nhật Thăng</p>
            </div>
        </div>
    );
}

export default InfoBarWithBell;