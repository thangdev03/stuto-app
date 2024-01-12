import { FaSearch } from "react-icons/fa";

function SearchBar() {
    return (
        <div 
            id="search-bar" 
            className="flex items-center gap-6 w-[300px] py-3 px-5 rounded-full border group border-[#a7a7a7] bg-backgroundColor/90
            hover:border-[#5a5a5a] focus-within:border-[#5a5a5a] focus-within:w-[60%] transition-all
            mt-6 ml-80"
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
    );
}

export default SearchBar;