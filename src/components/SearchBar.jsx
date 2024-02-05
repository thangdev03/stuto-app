import { FaSearch } from "react-icons/fa";

function SearchBar() {
    return (
        <div 
            id="search-bar" 
            className="flex items-center gap-6 w-[300px] py-3 px-5 rounded-full border group border-[#5a5a5a]
            focus-within:w-[60%] transition-all"
        >
            <FaSearch className="text-[#5a5a5a] group-focus-within:text-textColor"/>
            <form action="#" method="post" className="grow">
                <input 
                    type="text" 
                    placeholder="Nhập từ khóa tìm kiếm..." 
                    className="w-full bg-transparent focus:outline-none text-base text-textColor placeholder:text-[#878787]"
                />
            </form>
        </div>
    );
}

export default SearchBar;