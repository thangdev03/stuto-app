import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import Slider from "react-slider"

const minAge = 18;
const maxAge = 26;


function FilterFriends() {
    const [inputMajor, setInputMajor] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("");
    const [openMajor, setOpenMajor] = useState(false);
    const [inputSubject, setInputSubject] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [openSubject, setOpenSubject] = useState(false);
    const [inputCity, setInputCity] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [openCity, setOpenCity] = useState(false);
    const majors = ['Công nghệ thông tin', 'Khoa học máy tính', 'Hệ thống thông tin quản lý', 'Marketing', 'Quản trị nhân lực'];
    const subjects = ['Nhập môn công nghệ thông tin', 'Lập trình hướng đối tượng', 'Cấu trúc dữ liệu và giải thuật', 'Kinh tế vi mô', 'Pháp luật đại cương'];
    const [cities, setCities] = useState(null);
    const [ageValues, setAgeValues] = useState([minAge, maxAge]);
    
    useEffect(() => {
        fetch('https://provinces.open-api.vn/api/p')
            .then((res) => res.json())
            .then((citiesData) => setCities(citiesData));
    }, []);
    return (
        <div className="fixed top-28 right-7 min-h-[500px] w-[360px] bg-boxBackground rounded-3xl py-7 px-7 flex flex-col">
            <h3 className="font-semibold text-xl text-textColor mb-4">Bộ lọc</h3>
            <div className="text-base">
                <span className="font-medium">Độ tuổi</span>
                <div className="mt-3 flex items-center justify-between">
                    <p className="py-1 px-5 border border-[#bebebe] rounded w-20 text-center">{ageValues[0]}</p>
                    <div className="bg-[#bebebe] w-20 h-[1px] grow"></div>
                    <p className="py-1 px-5 border border-[#bebebe] rounded w-20 text-center">{ageValues[1]}</p>
                </div>
                <Slider 
                    className="mt-3 w-full h-1 bg-gray-300 rounded-full"
                    thumbClassName="w-5 h-5 bg-[#cbb8ff] rounded-full outline-none cursor-grab -top-2 active:bg-[#BAA1FF] hover:bg-[#BAA1FF]"
                    onChange={setAgeValues}
                    value={ageValues}
                    min={minAge}
                    max={maxAge}
                />
            </div>
            <div className="mt-5 text-base">
                <span className="font-medium block w-full mb-3">Giới tính</span>
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <input type="radio" id="gender_all" className="accent-primaryColor" value={"All"} name="gender"/>
                        <label htmlFor="gender_all">Bất kỳ</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" id="gender_men" className="accent-primaryColor" value={"Men"} name="gender"/>
                        <label htmlFor="gender_men">Nam</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" id="gender_women" className="accent-primaryColor" value={"Women"} name="gender"/>
                        <label htmlFor="gender_women">Nữ</label>
                    </div>
                </div>
            </div>
            <div className="mt-5 text-base">
                <span className="font-medium">Chuyên ngành</span>
                <div className="w-full font-normal mt-3 relative">
                    <div 
                    className={`h-10 w-full px-4 py-2 bg-white border border-textInactive text-sm rounded-md flex items-center justify-between cursor-pointer
                    ${!selectedMajor && "text-textInactive"}`}
                    onClick={(e) => {
                        setOpenMajor(!openMajor);
                        setOpenSubject(false);
                        setOpenCity(false);
                    }}
                    >
                        {selectedMajor ? selectedMajor : 'Chọn chuyên ngành của bạn học'}
                        <FaChevronDown size={16} className={`text-textInactive transition-all ${openMajor && 'rotate-180'}`}/>
                    </div>
                    <ul className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute z-10 ${openMajor ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="flex items-center px-4 sticky top-0 bg-white">
                            <IoIosSearch size={16} className="text-gray-400"/>
                            <input 
                            type="text"
                            value={inputMajor}
                            placeholder="Nhập tên chuyên ngành" 
                            onChange={(e) => setInputMajor(e.target.value.toLowerCase())}
                            className="placeholder:text-gray-400 px-4 py-2 text-sm outline-none w-full"/>
                        </div>
                        {majors.map((major, index) => (
                            <li 
                            key={index} 
                            className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${major.toLowerCase().includes(inputMajor) ? 'block' : 'hidden' }
                            ${major.toLowerCase() === selectedMajor.toLowerCase() && "bg-primaryColor text-white"}`}
                            onClick={(e) => {
                                if (major.toLowerCase() !== selectedMajor.toLowerCase()) {
                                    setSelectedMajor(major);
                                    setOpenMajor(false);
                                    setInputMajor("");
                                }
                            }}
                            >
                                {major}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-5 text-base">
                <span className="font-medium">Môn học</span>
                <div className="w-full font-normal mt-3 relative">
                    <div 
                    className={`h-10 w-full px-4 py-2 bg-white border border-textInactive text-sm rounded-md flex items-center justify-between cursor-pointer
                    ${!selectedSubject && "text-textInactive"}`}
                    onClick={(e) => {
                        setOpenSubject(!openSubject);
                        setOpenMajor(false);
                        setOpenCity(false);
                    }}
                    >
                        {selectedSubject ? selectedSubject : 'Chọn môn muốn học'}
                        <FaChevronDown size={16} className={`text-textInactive transition-all ${openSubject && 'rotate-180'}`}/>
                    </div>
                    <ul className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute z-10 ${openSubject ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="flex items-center px-4 sticky top-0 bg-white">
                            <IoIosSearch size={16} className="text-gray-400"/>
                            <input 
                            type="text"
                            value={inputSubject}
                            placeholder="Nhập tên môn học" 
                            onChange={(e) => setInputSubject(e.target.value.toLowerCase())}
                            className="placeholder:text-gray-400 px-4 py-2 text-sm outline-none w-full"/>
                        </div>
                        {subjects.map((subject, index) => (
                            <li 
                            key={index} 
                            className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${subject.toLowerCase().includes(inputSubject) ? 'block' : 'hidden' }
                            ${subject.toLowerCase() === selectedSubject.toLowerCase() && "bg-primaryColor text-white"}`}
                            onClick={(e) => {
                                if (subject.toLowerCase() !== selectedSubject.toLowerCase()) {
                                    setSelectedSubject(subject);
                                    setOpenSubject(false);
                                    setInputSubject("");
                                }
                            }}
                            >
                                {subject}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-5 text-base">
                <span className="font-medium">Khu vực</span>
                <div className="w-full font-normal mt-3 relative">
                    <div 
                    className={`h-10 w-full px-4 py-2 bg-white border border-textInactive text-sm rounded-md flex items-center justify-between cursor-pointer
                    ${!selectedCity && "text-textInactive"}`}
                    onClick={(e) => {
                        setOpenCity(!openCity);
                        setOpenMajor(false);
                        setOpenSubject(false);
                    }}
                    >
                        {selectedCity ? selectedCity : 'Chọn Thành phố/ Tỉnh'}
                        <FaChevronDown size={16} className={`text-textInactive transition-all ${openCity && 'rotate-180'}`}/>
                    </div>
                    <ul className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute z-10 ${openCity ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="flex items-center px-4 sticky top-0 bg-white">
                            <IoIosSearch size={16} className="text-gray-400"/>
                            <input 
                            type="text"
                            value={inputCity}
                            placeholder="Nhập tên chuyên ngành" 
                            onChange={(e) => setInputCity(e.target.value.toLowerCase())}
                            className="placeholder:text-gray-400 px-4 py-2 text-sm outline-none w-full"/>
                        </div>
                        {cities?.map((city, index) => (
                            <li 
                            key={index} 
                            className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${city?.name?.toLowerCase().includes(inputCity) ? 'block' : 'hidden' }
                            ${city?.name?.toLowerCase() === selectedCity?.toLowerCase() && "bg-primaryColor text-white"}`}
                            onClick={(e) => {
                                if (city?.name?.toLowerCase() !== selectedCity.toLowerCase()) {
                                    setSelectedCity(city?.name);
                                    setOpenCity(false);
                                    setInputCity("");
                                }
                            }}
                            >
                                {city?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <a href="#" className="w-36 text-center py-2 text-base text-red-500 rounded-lg border border-red-500 transition-all hover:brightness-110 hover:shadow">
                    Bỏ chọn
                </a>
                <a href="#" type="submit" className="w-36 text-center py-2 text-base bg-primaryColor text-white rounded-lg border border-primaryColor transition-all hover:brightness-105 hover:shadow">
                    Xem kết quả
                </a>
            </div>
        </div>
    );
}

export default FilterFriends