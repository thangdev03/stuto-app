import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const WishModal = ({ closeModal, userId }) => {
  const [inputSubject, setInputSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [openSubject, setOpenSubject] = useState(false);
  const [description, setDescription] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [wish, setWish] = useState(null);
  const [activeFind, setActiveFind] = useState(false);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const response = await fetch("https://stuto-api.onrender.com/subject");
        const data = await response.json();
        setSubjects(data.data);
      } catch (error) {
        return console.log(error);
      }
    };
    getSubjects();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          "https://stuto-api.onrender.com/user/" + userId
        );
        const data = await response.json();
        setWish(data.wish);
      } catch (error) {
        return console.log(error);
      }
    };
    getUser();
  }, [userId]);

  useEffect(() => {
    setDescription(wish?.description);
    setSelectedSubject(wish?.subject?.name || "");
    setSubjectId(wish?.subject?._id || "");
    setActiveFind(wish?.is_active)
  }, [wish]);

  const updateWish = async () => {
    if (!selectedSubject || !description) {
      return window.alert("Vui lòng điền đầy đủ thông tin về môn học và mong muốn của bạn!")
    }

    try {
        const response = await fetch("https://stuto-api.onrender.com/user/" + userId + "/wish", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subject: subjectId, 
                description: description, 
                is_active: activeFind
            })
        })
        if (response.status === 200) {
            closeModal();
            return window.alert("Cập nhật mong muốn thành công");
        }
    } catch (error) {
        return console.log(error)
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[600px] bg-boxBackground mx-auto mt-20 rounded-xl px-6 py-4"
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold">Chỉnh sửa yêu cầu</span>
        <div
          className={`h-6 w-16 bg-gray-300 rounded-full flex items-center cursor-pointer 
           transition-all ${activeFind && "bg-primaryColor"}`}
          onClick={() => setActiveFind(!activeFind)}
        >
          <div
            className={`w-6 h-6 border border-gray-300
            rounded-full transition-all bg-white
            ${activeFind ? "ml-10" : "ml-0"}`}
          ></div>
        </div>
      </div>
      <div className="mt-4">
        <span className="font-medium">Môn học</span>
        <div className="w-full font-normal mt-3 relative">
          <div
            className={`h-10 w-full px-4 py-2 bg-white border border-textInactive rounded-md flex items-center justify-between cursor-pointer
                    ${!selectedSubject && "text-textInactive"}`}
            onClick={(e) => {
              setOpenSubject(!openSubject);
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
                                selectedSubject.toLowerCase() &&
                              "bg-primaryColor text-white"
                            }`}
                onClick={(e) => {
                  if (
                    subject?.name.toLowerCase() !==
                    selectedSubject.toLowerCase()
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

      <div>
        <textarea
          type="text"
          placeholder="Mô tả về mong muốn của bạn"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-4 px-4 py-2 w-full h-40 rounded-md border border-textInactive outline-none text-wrap resize-none"
        />
      </div>

      <div className="mt-2 w-full flex justify-end">
        <button
          onClick={closeModal}
          className="mr-2 min-w-20 text-sm py-2 px-4 bg-gray-400 text-white rounded-lg
            hover:shadow-blockShadow hover:bg-gray-400/80"
        >
          Hủy
        </button>
        <button
          type="submit"
          onClick={updateWish}
          className="min-w-20 text-sm py-2 px-4 bg-primaryColor text-white rounded-lg
            hover:shadow-blockShadow hover:bg-primaryColor/80"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default WishModal;
