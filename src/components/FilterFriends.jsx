import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import Slider from "react-slider";
import { handleFilter } from "../utils/filterUsers";
import { getMaxAge, getMinAge } from "../utils/getAge";

function FilterFriends({ applyFilter, resetFilter, availableUsers, sendFilteredUsers }) {
  const [majors, setMajors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [inputMajor, setInputMajor] = useState("");
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [openMajor, setOpenMajor] = useState(false);
  const [inputSubject, setInputSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [openSubject, setOpenSubject] = useState(false);
  const [inputCity, setInputCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [openCity, setOpenCity] = useState(false);
  const [cities, setCities] = useState(null);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(50);
  const [ageValues, setAgeValues] = useState([minAge, maxAge]);
  const [selectedGender, setSelectedGender] = useState("all");
  const [subjectId, setSubjectId] = useState("");
  const [majorId, setMajorId] = useState("");

  useEffect(() => {
    const getProvinces = async () => {
      try {
        fetch("https://vapi.vnappmob.com/api/province")
          .then((res) => res.json())
          .then((citiesData) => setCities(citiesData.results));
      } catch (error) {
        return console.log(error)
      }
    }

    const getSubjects = async () => {
      try {
        const response = await fetch("https://stuto-api.onrender.com/subject");
        const data = await response.json();
        setSubjects(data.data);
      } catch (error) {
        return console.log(error);
      }
    };

    const getMajors = async () => {
      try {
        const response = await fetch("https://stuto-api.onrender.com/major");
        const data = await response.json();
        setMajors(data.data);
      } catch (error) {
        return console.log(error);
      }
    };
    
    getProvinces();
    getSubjects();
    getMajors();
  }, []);

  const handleSubmit = () => {
    applyFilter();
    const data = handleFilter(availableUsers, ageValues[0], ageValues[1], selectedGender, selectedMajor, selectedSubject, selectedCity);
    sendFilteredUsers(data);
  }

  const handleCancel = () => {
    setAgeValues([minAge, maxAge]);
    setSelectedGender("all");
    setSelectedMajor("");
    setSelectedSubject("");
    setSelectedCity("");
    resetFilter();
  }

  useEffect(() => {
    setMinAge(getMinAge(availableUsers));
    setMaxAge(getMaxAge(availableUsers));
  },[availableUsers])

  useEffect(() => {
    setAgeValues([minAge, maxAge]);
  },[minAge, maxAge])

  return (
    <div className="fixed top-24 right-5 min-h-[500px] w-[340px] bg-boxBackground rounded-3xl py-6 px-7 flex flex-col">
      <h3 className="font-semibold text-lg text-textColor">Bộ lọc</h3>
      <div className="mt-3 text-sm">
        <span className="font-medium">Độ tuổi</span>
        <div className="mt-3 flex items-center justify-between text-sm">
          <p className="py-1 px-5 border border-[#bebebe] rounded w-20 text-center">
            {ageValues[0]}
          </p>
          <div className="bg-[#bebebe] w-20 h-[1px] grow"></div>
          <p className="py-1 px-5 border border-[#bebebe] rounded w-20 text-center">
            {ageValues[1]}
          </p>
        </div>
        <Slider
          className="mt-3 w-full h-1 bg-gray-300 rounded-full"
          thumbClassName="w-5 h-5 bg-[#cbb8ff] rounded-full outline-none cursor-grab -top-2 active:bg-[#BAA1FF] hover:bg-[#BAA1FF]"
          trackClassName="slider-track"
          onChange={setAgeValues}
          value={ageValues}
          min={minAge}
          max={maxAge}
        />
      </div>

      {/* GIỚI TÍNH - GENDER*/}
      <div className="mt-4 text-sm">
        <span className="font-medium block w-full mb-3">Giới tính</span>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="gender_all"
              className="accent-primaryColor"
              value={"all"}
              name="gender"
              checked={selectedGender === "all"}
              onChange={() => setSelectedGender("all")}
            />
            <label htmlFor="gender_all">Bất kỳ</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="gender_man"
              className="accent-primaryColor"
              value={"man"}
              name="gender"
              checked={selectedGender === "man"}
              onChange={() => setSelectedGender("man")}
            />
            <label htmlFor="gender_man">Nam</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="gender_woman"
              className="accent-primaryColor"
              value={"woman"}
              name="gender"
              checked={selectedGender === "woman"}
              onChange={() => setSelectedGender("woman")}
            />
            <label htmlFor="gender_woman">Nữ</label>
          </div>
        </div>
      </div>

      {/* CHUYÊN NGÀNH - MAJOR*/}
      <div className="mt-4 text-sm">
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
            {selectedMajor ? selectedMajor : "Chọn chuyên ngành của bạn học"}
            <FaChevronDown
              size={16}
              className={`text-textInactive transition-all ${
                openMajor && "rotate-180"
              }`}
            />
          </div>
          <ul
            className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute z-10 ${
              openMajor ? "max-h-40" : "max-h-0"
            }`}
          >
            <div className="flex items-center px-4 sticky top-0 bg-white">
              <IoIosSearch size={16} className="text-gray-400" />
              <input
                type="text"
                value={inputMajor}
                placeholder="Nhập tên chuyên ngành"
                onChange={(e) => setInputMajor(e.target.value.toLowerCase())}
                className="placeholder:text-gray-400 px-4 py-2 text-sm outline-none w-full"
              />
            </div>
            {majors?.map((major) => (
              <li
                key={major?._id}
                className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${
                              major?.name.toLowerCase().includes(inputMajor)
                                ? "block"
                                : "hidden"
                            }
                            ${
                              major?.name.toLowerCase() ===
                                selectedMajor?.toLowerCase() &&
                              "bg-primaryColor text-white"
                            }`}
                onClick={(e) => {
                  if (major?.name.toLowerCase() !== selectedMajor?.toLowerCase()) {
                    setSelectedMajor(major?.name);
                    setMajorId(major?._id);
                    setOpenMajor(false);
                    setInputMajor("");
                  }
                }}
              >
                {major?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MÔN HỌC - SUBJECT */}
      <div className="mt-4 text-sm">
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
            {selectedSubject ? selectedSubject : "Chọn môn muốn học"}
            <FaChevronDown
              size={16}
              className={`text-textInactive transition-all ${
                openSubject && "rotate-180"
              }`}
            />
          </div>
          <ul
            className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute z-10 ${
              openSubject ? "max-h-40" : "max-h-0"
            }`}
          >
            <div className="flex items-center px-4 sticky top-0 bg-white">
              <IoIosSearch size={16} className="text-gray-400" />
              <input
                type="text"
                value={inputSubject}
                placeholder="Nhập tên môn học"
                onChange={(e) => setInputSubject(e.target.value.toLowerCase())}
                className="placeholder:text-gray-400 px-4 py-2 text-sm outline-none w-full"
              />
            </div>
            {subjects?.map((subject) => (
              <li
                key={subject?._id}
                className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${
                              subject?.name.toLowerCase().includes(inputSubject)
                                ? "block"
                                : "hidden"
                            }
                            ${
                              subject?.name.toLowerCase() ===
                                selectedSubject?.toLowerCase() &&
                              "bg-primaryColor text-white"
                            }`}
                onClick={(e) => {
                  if (
                    subject?.name.toLowerCase() !==
                    selectedSubject?.toLowerCase()
                  ) {
                    setSelectedSubject(subject?.name);
                    setSubjectId(subject?._id);
                    setOpenSubject(false);
                    setInputSubject("");
                  }
                }}
              >
                {subject?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 text-sm">
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
            {selectedCity ? selectedCity : "Chọn Thành phố/ Tỉnh"}
            <FaChevronDown
              size={16}
              className={`text-textInactive transition-all ${
                openCity && "rotate-180"
              }`}
            />
          </div>
          <ul
            className={`w-full bg-white mt-1 rounded-md shadow-md overflow-y-auto absolute z-10 ${
              openCity ? "max-h-40" : "max-h-0"
            }`}
          >
            <div className="flex items-center px-4 sticky top-0 bg-white">
              <IoIosSearch size={16} className="text-gray-400" />
              <input
                type="text"
                value={inputCity}
                placeholder="Nhập tên Thành phố/ Tỉnh"
                onChange={(e) => setInputCity(e.target.value.toLowerCase())}
                className="placeholder:text-gray-400 px-4 py-2 text-sm outline-none w-full"
              />
            </div>
            {/* { console.log(cities) } */}
            {cities?.map((city, index) => (
              <li
                key={index}
                className={`px-4 py-2 text-sm hover:bg-primaryColor hover:text-white first:rounded-t-md last:rounded-b-md cursor-pointer
                            ${
                              city?.province_name
                                ?.toLowerCase()
                                .includes(inputCity)
                                ? "block"
                                : "hidden"
                            }
                            ${
                              city?.province_name?.toLowerCase() ===
                                selectedCity?.toLowerCase() &&
                              "bg-primaryColor text-white"
                            }`}
                onClick={(e) => {
                  if (
                    city?.province_name?.toLowerCase() !==
                    selectedCity.toLowerCase()
                  ) {
                    setSelectedCity(city?.province_name);
                    setOpenCity(false);
                    setInputCity("");
                  }
                }}
              >
                {city?.province_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="w-32 text-center py-2 text-sm text-red-500 rounded-lg border border-red-500 transition-all hover:bg-red-500 hover:text-white hover:shadow"
          onClick={handleCancel}
        >
          Bỏ chọn
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-32 text-center py-2 text-sm bg-primaryColor text-white rounded-lg border border-primaryColor transition-all hover:bg-primaryColor/80 hover:shadow"
        >
          Xem kết quả
        </button>
      </div>
    </div>
  );
}

export default FilterFriends;
