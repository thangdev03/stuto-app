import { FaClock } from "react-icons/fa"
import Notes from "../../components/Notes";
import FriendsList from "../../components/FriendsList";

function Home() {
    const recentlyGroups = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Lập trình hướng đối tượng"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Kinh tế vĩ mô"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Thương mại điện tử"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Phân tích dữ liệu"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Lập trình web"
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Thiết kế web siêu đỉnh lập trình ảo thật"
        }
    ];

    const courses = [
        {
            id: 1,
            image: "https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/fa2bdb40f4e449dca4514de8c8bca52d.jpg",
            name: "C++ for Beginners",
            duration: "20:00:00"
        },
        {
            id: 2,
            image: "https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/fa2bdb40f4e449dca4514de8c8bca52d.jpg",
            name: "Cloud Essentials",
            duration: "20:00:00"
        },
        {
            id: 3,
            image: "https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/fa2bdb40f4e449dca4514de8c8bca52d.jpg",
            name: "Ecommerce & Marketing: Agency. Marketer",
            duration: "20:00:00"
        },
        {
            id: 4,
            image: "https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/fa2bdb40f4e449dca4514de8c8bca52d.jpg",
            name: "C++ for Beginners",
            duration: "20:00:00"
        },
    ];

    return (
        <div className="ml-80 mr-[416px] mt-[114px]">
            <h1 className="font-bold text-3xl">Đến giờ học rồi, Nhật Thăng ơi</h1>
            <p className="mt-4 text-textInactive font-bold">Hôm nay bạn muốn học môn gì?</p>
            {/* Dashboard */}
            <div id="dashboard" className="mt-8 h-44 px-9 py-8 bg-boxBackground rounded-3xl grid grid-cols-2 gap-x-52 gap-y-7">
                <div className="flex gap-3">
                    <div>
                        <img src="./img/time.webp" alt="clock" />
                    </div>
                    <div>
                        <h4 className="font-semibold">12h 35m</h4>
                        <p className="text-textInactive font-medium text-sm">Thời gian học tích lũy</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div>
                        <img src="./img/target.webp" alt="target" />
                    </div>
                    <div>
                        <h4 className="font-semibold">6/12</h4>
                        <p className="text-textInactive font-medium text-sm">Số mục tiêu đã đạt</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div>
                        <img src="./img/achievement.webp" alt="cup" />
                    </div>
                    <div>
                        <h4 className="font-semibold">15</h4>
                        <p className="text-textInactive font-medium text-sm">Số khóa học đã hoàn thành</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div>
                        <img src="./img/badget.webp" alt="badget" />
                    </div>
                    <div>
                        <h4 className="font-semibold">25%</h4>
                        <p className="text-textInactive font-medium text-sm">Kho huy hiệu cá nhân</p>
                    </div>
                </div>
            </div>
            {/* Top 8 Recently Access */}
            <h2 className="font-semibold text-xl mt-8">Những nhóm học cùng gần đây</h2>
            <div className="mt-2 grid grid-cols-4 gap-2 overflow-hidden w-full py-2">
                {recentlyGroups.map(group => {
                    return (
                        <div key={group.id} className="p-1 bg-boxBackground rounded-xl h-48 shadow-blockShadow">
                            <img 
                                src={group.image}
                                alt="code on laptop on black table"
                                className="w-full h-[60%] object-cover rounded-lg"
                            />
                            <p className="mt-3 font-medium text-center truncate" title={group.name}>{group.name}</p>
                        </div>
                    );
                })}
            </div>
            {/* Courses Recommend */}
            <h2 className="font-semibold text-xl mt-12">Các khóa học cho bạn</h2>
            <div className="mt-2 mb-8 grid grid-cols-4 gap-2 overflow-hidden w-full py-2">
                {courses.map(course => {
                    return (
                        <div key={course.id} className="p-1 bg-boxBackground rounded-xl h-72 shadow-blockShadow relative">
                            <img 
                                src={course.image}
                                alt="code on laptop on black table"
                                className="w-full h-[45%] object-cover rounded-lg"
                            />
                            <p className="mt-3 font-medium text-center truncate" title={course.name}>{course.name}</p>
                            <div className="w-full absolute bottom-3 flex justify-around items-center">
                                <p className="text-sm font-medium flex items-center gap-1">
                                    <span><FaClock /></span>
                                    {course.duration}
                                </p>
                                <button 
                                    className="p-2 text-primaryColor border border-primaryColor font-medium rounded-lg \
                                    hover:text-white hover:bg-primaryColor transition-all"
                                >
                                    Tham gia ngay
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <FriendsList />
            <Notes />
        </div>
    )
}

export default Home