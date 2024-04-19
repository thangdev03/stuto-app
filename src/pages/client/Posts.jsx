import { AiOutlineLike } from "react-icons/ai";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { FaEarthAsia, FaRegComment, FaRegPaperPlane } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import FriendsList from "../../components/FriendsList";
import { useAuthContext } from "../../hooks/useAuthContext";
import AvatarImage from "../../components/AvatarImage";
import { cld } from "../../services/const";

function Posts() {
    const [state, dispatch] = useAuthContext();
    const { user } = state;
    
    return (
        <div className="ml-72 mr-[416px] mt-8 pb-12">
            <div className="mt-4 rounded-3xl pt-6 px-12 pb-4">
                <div className="">
                    {/* CREATE POST */}
                    <div className="mt-3 bg-white border border-[#D6D6D6] rounded-xl min-h-72 relative pt-3 px-4 pb-2">
                        <div className="absolute top-3 right-4 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                            <BsThreeDots className="text-textInactive"/>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                <AvatarImage cld={cld} publicId={user.avatar}/>
                            </div>
                            <div>
                                <h4 className="mt-1 font-semibold">{user.name}</h4>
                                <div className="mt-1 flex gap-1 items-center">
                                    <FaEarthAsia className="text-[#888888] w-3" />
                                    <p className="text-textInactive text-sm">Chế độ công khai</p>
                                    <IoIosArrowDown className="text-textInactive"/>
                                </div>
                            </div>
                        </div>
                        <input className="mt-3 font-medium p-2" placeholder="Nhập tiêu đề của bài viết..."></input>     
                        <textarea 
                        className="mt-3 w-full max-h-96 h-fit bg-[#EFEFEF] resize-none p-2 rounded-lg" 
                        placeholder="Bạn muốn chia sẻ điều gì tới mọi người...?"></textarea>                       

                        <div className="mt-4 w-full bg-[#D0D0D0] h-[1px] rounded"></div>
                        <div className="mt-4 w-full items-center justify-between text-white">
                            <span className="w-full grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer bg-primaryColor hover:bg-primaryColor/80">Đăng bài</span>
                        </div>
                    </div>

                    {/* POSTS */}
                    <div className="mt-3 bg-white border border-[#D6D6D6] rounded-xl min-h-72 relative pt-3 px-4 pb-2">
                        <div className="absolute top-3 right-4 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                            <BsThreeDots className="text-textInactive"/>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                <img 
                                src="https://cdn.tuoitre.vn/ttc/r/2021/01/07/thoi-diem-hien-tai-rose-da-so-huu-visual-dinh-cao-cua-kpop-1610033705.jpg" 
                                alt="avatar" 
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="mt-1 font-semibold">Phác Thái Anh</h4>
                                <div className="mt-1 flex gap-1 items-center">
                                    <p className="text-textInactive text-sm">1h</p>
                                    <BsDot className="text-textInactive"/>
                                    <FaEarthAsia className="text-[#888888] w-3" />
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-3 font-medium">TÌM BẠN HỌC CHUNG LẬP TRÌNH C++</h3>     
                        <p className="mt-6">Mình mới tham gia vào khóa học Lập trình hướng đối tượng C++ của bên Coursera, muốn tìm một vài bạn học cùng để có động lực hơn :>
                        Bạn nào hứng thú hay cũng đang học thì nhắn tin cho mình nha 😘</p>                       
                        <div className="mt-11 w-full bg-[#D0D0D0] h-[1px] rounded"></div>
                        <div className="mt-4 flex items-center justify-between px-10 text-textInactive">
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><AiOutlineLike fontSize={20}/>Thích</span>
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegComment fontSize={18}/>Bình luận</span>
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegPaperPlane fontSize={18}/>Nhắn tin</span>
                        </div>
                    </div>
                    <div className="mt-3 bg-white border border-[#D6D6D6] rounded-xl min-h-72 relative pt-3 px-4 pb-2">
                        <div className="absolute top-3 right-4 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                            <BsThreeDots className="text-textInactive"/>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                <img 
                                src="https://cdn.tuoitre.vn/ttc/r/2021/01/07/thoi-diem-hien-tai-rose-da-so-huu-visual-dinh-cao-cua-kpop-1610033705.jpg" 
                                alt="avatar" 
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="mt-1 font-semibold">Phác Thái Anh</h4>
                                <div className="mt-1 flex gap-1 items-center">
                                    <p className="text-textInactive text-sm">1h</p>
                                    <BsDot className="text-textInactive"/>
                                    <FaEarthAsia className="text-[#888888] w-3" />
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-3 font-medium">TÌM BẠN HỌC CHUNG LẬP TRÌNH C++</h3>     
                        <p className="mt-6">Mình mới tham gia vào khóa học Lập trình hướng đối tượng C++ của bên Coursera, muốn tìm một vài bạn học cùng để có động lực hơn :>
                        Bạn nào hứng thú hay cũng đang học thì nhắn tin cho mình nha 😘</p>                       
                        <div className="mt-11 w-full bg-[#D0D0D0] h-[1px] rounded"></div>
                        <div className="mt-4 flex items-center justify-between px-10 text-textInactive">
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><AiOutlineLike fontSize={20}/>Thích</span>
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegComment fontSize={18}/>Bình luận</span>
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegPaperPlane fontSize={18}/>Nhắn tin</span>
                        </div>
                    </div>
                    <div className="mt-3 bg-white border border-[#D6D6D6] rounded-xl min-h-72 relative pt-3 px-4 pb-2">
                        <div className="absolute top-3 right-4 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                            <BsThreeDots className="text-textInactive"/>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                <img 
                                src="https://cdn.tuoitre.vn/ttc/r/2021/01/07/thoi-diem-hien-tai-rose-da-so-huu-visual-dinh-cao-cua-kpop-1610033705.jpg" 
                                alt="avatar" 
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="mt-1 font-semibold">Phác Thái Anh</h4>
                                <div className="mt-1 flex gap-1 items-center">
                                    <p className="text-textInactive text-sm">1h</p>
                                    <BsDot className="text-textInactive"/>
                                    <FaEarthAsia className="text-[#888888] w-3" />
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-3 font-medium">TÌM BẠN HỌC CHUNG LẬP TRÌNH C++</h3>     
                        <p className="mt-6">Mình mới tham gia vào khóa học Lập trình hướng đối tượng C++ của bên Coursera, muốn tìm một vài bạn học cùng để có động lực hơn :>
                        Bạn nào hứng thú hay cũng đang học thì nhắn tin cho mình nha 😘</p>                       
                        <div className="mt-11 w-full bg-[#D0D0D0] h-[1px] rounded"></div>
                        <div className="mt-4 flex items-center justify-between px-10 text-textInactive">
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><AiOutlineLike fontSize={20}/>Thích</span>
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegComment fontSize={18}/>Bình luận</span>
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegPaperPlane fontSize={18}/>Nhắn tin</span>
                        </div>
                    </div>
                    <div className="mt-3 bg-white border border-[#D6D6D6] rounded-xl min-h-72 relative pt-3 px-4 pb-2">
                        <div className="absolute top-3 right-4 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                            <BsThreeDots className="text-textInactive"/>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                <img 
                                src="https://cdn.tuoitre.vn/ttc/r/2021/01/07/thoi-diem-hien-tai-rose-da-so-huu-visual-dinh-cao-cua-kpop-1610033705.jpg" 
                                alt="avatar" 
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="mt-1 font-semibold">Phác Thái Anh</h4>
                                <div className="mt-1 flex gap-1 items-center">
                                    <p className="text-textInactive text-sm">1h</p>
                                    <BsDot className="text-textInactive"/>
                                    <FaEarthAsia className="text-[#888888] w-3" />
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-3 font-medium">QUOTE TRUYỀN CẢM HỨNG</h3>     
                        <p className="mt-6">Không trồng cây thì sẽ không có cơ hội được nằm dưới bóng râm và thưởng thức trái ngọt. Không học hành chăm chỉ, nỗ lực hết mình ngay từ hôm nay thì cơ hội chạm đến thành công, đạt được ước mơ của bạn sẽ ít hơn người khác.
                        <br />
                        Học không phải là con đường duy nhất dẫn đến thành công nhưng nó được xem là con đường ngắn nhất, vững chắc nhất. Ngay cả người thành công cũng phải học hỏi không ngừng. Vậy tại sao bạn cứ mãi trì hoãn? Hãy “lên tinh thần” bằng top câu nói hay về học tập và thành công sau.</p>                       
                        <div className="mt-11 w-full bg-[#D0D0D0] h-[1px] rounded"></div>
                        <div className="mt-4 flex items-center justify-between px-10 text-textInactive">
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><AiOutlineLike fontSize={20}/>Thích</span>
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegComment fontSize={18}/>Bình luận</span>
                            <span className="grow flex gap-1 justify-center items-center font-medium px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-200"><FaRegPaperPlane fontSize={18}/>Nhắn tin</span>
                        </div>
                    </div>
                </div>
            </div>
            <FriendsList />
        </div>
    )
}

export default Posts;