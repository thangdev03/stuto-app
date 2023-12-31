import { FaSearch, FaBell } from "react-icons/fa";

function Header() {
    return (
        <header className="fixed z-10 top-6 right-7 left-80 flex items-center justify-between">
            <div 
                id="search-bar" 
                className="flex items-center gap-6 w-[300px] py-3 px-5 rounded-full border group border-[#a7a7a7] hover:border-[#5a5a5a] 
                focus-within:border-[#5a5a5a] focus-within:w-[70%] transition-all"
            >
                <FaSearch className="text-[#9C9C9C] group-focus-within:text-textColor group-hover:text-[#333333]"/>
                <form action="#" method="post" className="grow">
                    <input 
                        type="text" 
                        placeholder="Nhập từ khóa tìm kiếm..." 
                        className="w-full bg-transparent focus:outline-none text-base text-textColor placeholder:text-[#a7a7a7]"
                    />
                </form>
            </div>
            <div id="user" className="w-64 flex justify-between items-center gap-3">
                <a href="#" className="px-1">
                    <FaBell className="text-textInactive text-xl"/>
                </a>
                <div className="py-2 px-5 grow flex items-center bg-boxBackground rounded-full shadow-blockShadow">
                    <div className="mr-4">
                        <img 
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/414095711_2062853317397924_4320486541956585795_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGR8cJh3RWBia0pQgtkWO8YDKnlQ1E9WIgMqeVDUT1YiGuge0-Gvmh7ntYv2hOiTl3hrgcoGasNBENWWv9oxpiV&_nc_ohc=BIfH2eF9DlsAX8Xk4Fv&_nc_ht=scontent.fhan9-1.fna&oh=00_AfC3UIIn5FGbpIYGlxOKfMsHR6-oBEASTpnaQaTGxlNBpA&oe=6595E54D" 
                            alt="Avatar" 
                            className="w-9 h-9 rounded-full object-cover"
                        />
                    </div>
                    <p className="font-semibold">Nhật Thăng</p>
                </div>
            </div>
        </header>
    );
}

export default Header