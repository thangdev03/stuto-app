import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import LoadingSpinner from "./LoadingSpinner";
import { FaCheck } from "react-icons/fa";
import { FaChevronDown, FaXmark } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const UpdateInfo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [inputName, setInputName] = useState("");
    const [inputStudentId, setInputStudentId] = useState("");
    // const [inputStudyProgram, setInputStudyProgram] = useState("");
    const [inputDOB, setInputDOB] = useState("");
    const [inputCreatedAt, setInputCreatedAt] = useState("");
    const [locationList, setLocationList] = useState([]);
    const [majorList, setMajorList] = useState([]);
    const [searchText, setSearchText] = useState({
        location: "",
        major: ""
    });
    const [locationOption, setLocationOption] = useState({
        isOpen: false,
        selected: ""
    });
    const [majorOption, setMajorOption] = useState({
        isOpen: false,
        selected: "",
        id: ""
    });
    const [sexOption, setSexOption] = useState({
        isOpen: false,
        selected: ""
    });
    const [programOption, setProgramOption] = useState({
        isOpen: false,
        selected: ""
    });
    const genderList = ["Nam", "Nữ", "Khác"];
    const programList = ["Chính quy", "Tiên tiến", "Quốc tế"];

    const user = JSON.parse(localStorage.getItem("user"));

    const updateInfo = async (event) => {
        event.preventDefault();

        if (!inputName || !inputStudentId || !programOption.selected || !majorOption.selected || !inputDOB || !sexOption.selected || !locationOption.selected) {
            return alert("Điền đầy đủ các trường thông tin")
        }

        setIsLoading(true);

        const response = await fetch("https://stuto-api.onrender.com/user/" + user.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: inputName,
                student_id: inputStudentId,
                study_program: programOption.selected,
                major: majorOption.id,
                date_of_birth: inputDOB,
                sex: sexOption.selected,
                location: locationOption.selected,
                avatar: ""
            })
        })

        if (response) {
            setIsLoading(false);
            setUpdateStatus(response.status);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/user/" + user.id);
                const data = await response.json()
                
                if (response.status === 404 || response.status === 500 ) {
                    throw new Error("Error, status: ", data.message)
                }

                setInputName(data.name);
                setInputStudentId(data.student_id);
                setProgramOption((prevState) => ({...prevState, selected: data.study_program}));
                setMajorOption((prevState) => ({...prevState, selected: data.major?.name, id: data.major?._id}))
                setInputDOB(data.date_of_birth.split("T")[0]);
                setSexOption((prevState) => ({...prevState, selected: data.sex}));
                setLocationOption((prevState) => ({...prevState, selected: data.location}))
                setInputCreatedAt(data.createdAt.split("T")[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        }
        fetchData();
    },[user.id, updateStatus])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/major");
                const data = await response.json()
                
                if (data) {
                    setMajorList(data.data);
                } else {
                    console.error("Cannot fetch majors!")
                }
            } catch (error) {
                console.error("Error fetching major list: ", error);
            }
        }
        fetchData();
    },[user.id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://vapi.vnappmob.com/api/province");
                const data = await response.json()
                
                if (data) {
                    setLocationList(data.results);
                } else {
                    console.error("Cannot fetch location!")
                }
            } catch (error) {
                console.error("Error fetching location list: ", error);
            }
        }
        fetchData();
    },[])

    return (
    <div className="ml-72 mt-10 w-fit">
        <div className="pt-5 px-10 pb-10 bg-[rgb(242,247,255)] rounded-lg flex flex-col">
            <h1 className="text-2xl font-semibold text-center">Cập nhật thông tin của bạn</h1>
            <p className="mt-2 text-center">Để người khác có thể dễ dàng tìm thấy bạn hơn</p>
            <form className="mt-5 grid grid-cols-2 gap-y-5 gap-x-60">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Họ tên</label>
                    <input 
                        type="text" 
                        placeholder="Họ tên của bạn"
                        value={inputName}
                        readOnly
                        className="w-96 px-3 py-2 bg-boxBackground rounded-lg border border-gray-300 cursor-not-allowed"     
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Mã sinh viên</label>
                    <input 
                        type="text"
                        placeholder="Mã sinh viên gồm 8 số"
                        value={inputStudentId || ""}
                        onChange={(e) => setInputStudentId(e.target.value)}
                        maxLength={8}
                        className="w-96 px-3 py-2 bg-boxBackground rounded-lg border border-gray-300"     
                    />
                </div>
                <div className="flex flex-col gap-2 w-96 relative">
                    <label className="font-semibold">Hệ đào tạo</label>
                    <div 
                        onClick={(e) => setProgramOption((prevState) => ({
                            ...prevState,
                            isOpen: !programOption.isOpen
                        }))}
                        className={`px-3 py-2 bg-boxBackground rounded-lg border border-gray-300 flex justify-between items-center cursor-pointer
                        ${!programOption.selected && "text-textInactive/80"}`}
                    >
                        {programOption.selected || "Chọn hệ đào tạo"}
                        <FaChevronDown size={16} className={`text-textInactive transition-all ${programOption.isOpen && 'rotate-180'}`}/>
                    </div>
                    <ul className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute top-full z-10 ${programOption.isOpen ? 'max-h-40' : 'max-h-0'}`}>
                        {programList.map((program, index) => (
                            <li 
                            key={index} 
                            className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${program.toLowerCase() === programOption.selected?.toLowerCase() && "bg-primaryColor text-white"}`}
                            onClick={() => {
                                if (program.toLowerCase() !== programOption.selected?.toLowerCase()) {
                                    setProgramOption({
                                        isOpen: false,
                                        selected: program
                                    })
                                }
                            }}
                            >
                                {program}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-2 w-96 relative">
                    <label className="font-semibold">Chuyên ngành</label>
                    <div 
                        onClick={(e) => setMajorOption((prevState) => ({
                            ...prevState,
                            isOpen: !majorOption.isOpen
                        }))}
                        className={`px-3 py-2 bg-boxBackground rounded-lg border border-gray-300 flex justify-between items-center cursor-pointer
                        ${!majorOption.selected && "text-textInactive/80"}`}
                    >
                        {majorOption.selected || "Chọn chuyên ngành đang học"}
                        <FaChevronDown size={16} className={`text-textInactive transition-all ${majorOption.isOpen && 'rotate-180'}`}/>
                    </div>
                    <ul className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute top-full z-10 ${majorOption.isOpen ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="flex items-center px-4 sticky top-0 bg-white">
                            <IoIosSearch size={16} className="text-gray-400"/>
                            <input 
                            type="text"
                            value={searchText.major}
                            placeholder="Nhập tên chuyên ngành" 
                            onChange={(e) => setSearchText((prevState) => ({
                                ...prevState,
                                major: e.target.value
                            }))}
                            className="placeholder:text-gray-400 px-4 py-2 text-sm outline-none w-full"/>
                        </div> 
                        {majorList.map((major, index) => (
                            <li 
                            key={index} 
                            className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${major?.name.toLowerCase().includes(searchText.major.toLowerCase()) ? 'block' : 'hidden' }
                            ${major?.name.toLowerCase() === majorOption.selected?.toLowerCase() && "bg-primaryColor text-white"}`}
                            onClick={() => {
                                if (major?.name.toLowerCase() !== majorOption.selected?.toLowerCase()) {
                                    setMajorOption({
                                        isOpen: false,
                                        selected: major?.name,
                                        id: major?._id
                                    })
                                    setSearchText((prevState) => ({
                                        ...prevState,
                                        major: ""
                                    }))
                                }
                            }}
                            >
                                {major?.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Ngày sinh</label>
                    <input 
                        name="dob"
                        type="date"
                        value={inputDOB}
                        onChange={(e) => setInputDOB(e.target.value)}
                        className="w-96 px-3 py-2 bg-boxBackground rounded-lg border border-gray-300"     
                    />
                </div>
                <div className="flex flex-col gap-2 w-96 relative">
                    <label className="font-semibold">Giới tính</label>
                    <div 
                        onClick={(e) => setSexOption((prevState) => ({
                            ...prevState,
                            isOpen: !sexOption.isOpen
                        }))}
                        className={`px-3 py-2 bg-boxBackground rounded-lg border border-gray-300 flex justify-between items-center cursor-pointer
                        ${!sexOption.selected && "text-textInactive/80"}`}
                    >
                        {sexOption.selected || "Chọn giới tính"}
                        <FaChevronDown size={16} className={`text-textInactive transition-all ${sexOption.isOpen && 'rotate-180'}`}/>
                    </div>
                    <ul className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute top-full z-10 ${sexOption.isOpen ? 'max-h-40' : 'max-h-0'}`}>
                        {genderList.map((gender, index) => (
                            <li 
                            key={index} 
                            className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${gender.toLowerCase() === sexOption.selected?.toLowerCase() && "bg-primaryColor text-white"}`}
                            onClick={() => {
                                if (gender.toLowerCase() !== sexOption.selected?.toLowerCase()) {
                                    setSexOption({
                                        isOpen: false,
                                        selected: gender
                                    })
                                }
                            }}
                            >
                                {gender}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-2 w-96 relative">
                    <label className="font-semibold">Khu vực sinh sống</label>
                    <div 
                        onClick={(e) => setLocationOption((prevState) => ({
                            ...prevState,
                            isOpen: !locationOption.isOpen
                        }))}
                        className={`px-3 py-2 bg-boxBackground rounded-lg border border-gray-300 flex justify-between items-center cursor-pointer
                        ${!locationOption.selected && "text-textInactive/80"}`}
                    >
                        {locationOption.selected || "Chọn khu vực sinh sống của bạn"}
                        <FaChevronDown size={16} className={`text-textInactive transition-all ${locationOption.isOpen && 'rotate-180'}`}/>
                    </div>
                    <ul className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute top-full z-10 ${locationOption.isOpen ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="flex items-center px-4 sticky top-0 bg-white">
                            <IoIosSearch size={16} className="text-gray-400"/>
                            <input 
                            type="text"
                            value={searchText.location}
                            placeholder="Nhập tên Thành phố/ Tỉnh" 
                            onChange={(e) => setSearchText((prevState) => ({
                                ...prevState,
                                location: e.target.value
                            }))}
                            className="placeholder:text-gray-400 px-4 py-2 text-sm outline-none w-full"/>
                        </div> 
                        {locationList?.map((city, index) => (
                            <li 
                            key={index} 
                            className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${city?.province_name.toLowerCase().includes(searchText.location.toLowerCase()) ? 'block' : 'hidden' }
                            ${city?.province_name.toLowerCase() === locationOption.selected?.toLowerCase() && "bg-primaryColor text-white"}`}
                            onClick={() => {
                                if (city?.province_name.toLowerCase() !== locationOption.selected?.toLowerCase()) {
                                    setLocationOption({
                                        isOpen: false,
                                        selected: city?.province_name
                                    })
                                    setSearchText((prevState) => ({
                                        ...prevState,
                                        location: ""
                                    }))
                                }
                            }}
                            >
                                {city?.province_name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Ngày tham gia</label>
                    <input 
                        type="date" 
                        value={inputCreatedAt}
                        readOnly
                        className="w-96 px-3 py-2 bg-boxBackground rounded-lg border border-gray-300 cursor-not-allowed"     
                    />
                </div>
            </form>
            <div className="flex items-center justify-end mt-5 gap-4">
                {isLoading &&(
                    <div className="">
                        <LoadingSpinner className={"min-h-fit p-1"}/>
                    </div>
                )}
                {updateStatus && (updateStatus === 404) && (
                    <FaXmark className="text-red-500 text-2xl"/>
                )}
                {updateStatus && (updateStatus === 200) && (
                    <FaCheck className="text-green-500 text-2xl"/>
                )}
                <button 
                    onClick={(e) => updateInfo(e)}
                    className="shrink-0 py-3 px-4 text-white font-medium rounded-lg bg-primaryColor hover:bg-primaryColor/90 hover:shadow-blockShadow" 
                >
                    Lưu thông tin
                </button>
            </div>
        </div>
    </div>
    );
};

export default UpdateInfo;
