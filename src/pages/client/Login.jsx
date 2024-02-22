import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:5555/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (data.user) {
            localStorage.setItem('user', data.user);
            const user = localStorage.getItem('user')
            console.log(user)
            alert("Đăng nhập thành công");
            // window.location.href = "/"
        } else {
            alert('Vui lòng kiểm tra lại email và mật khẩu của bạn')
        }
    }
    
    return (
        <div className="flex h-screen">
            <div className="grow h-full overflow-hidden relative">
                <img 
                    src="/img/study-group.jpg" 
                    alt="group of boys studying" 
                    className="absolute left-0 top-0 right-0 bottom-0 scale-125 object-cover filter blur-sm saturate-50"
                />
                {/* <span className="absolute left-0 top-0 right-0 bottom-0 bg-[#A586FF]/25"></span> */}
                <div className="absolute left-0 top-0 right-0 bottom-0 z-10 text-white text-3xl flex flex-col items-center mt-48">
                    <div className="flex items-center">
                        <img src="/img/crown-icon.png" alt="crown" 
                            className="scale-75" 
                        />
                        <p 
                            data-text="Hơn 2000+ người học trên hệ thống"
                            className="relative z-20 auth-description translate-y-2 ml-2 font-medium">Hơn 2000+ người học trên hệ thống
                        </p>
                    </div>
                    <div className="flex items-center">
                        <img src="/img/crown-icon.png" alt="crown" 
                            className="scale-75" 
                        />
                        <p 
                            data-text="Kết nối học tập nhanh chóng, tiện lợi"
                            className="auth-description translate-y-2 ml-2 font-medium">Kết nối học tập nhanh chóng, tiện lợi
                        </p>
                    </div>
                    <div className="flex items-center">
                        <img src="/img/crown-icon.png" alt="crown" 
                            className="scale-75" 
                        />
                        <p 
                            data-text="Phòng học thông minh, nhiều tiện ích"
                            className="auth-description translate-y-2 ml-2 font-medium">Phòng học thông minh, nhiều tiện ích
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-1/3 h-full px-16">
                <img src="/img/logo.webp" alt="logo StuTo" className="w-40 mx-auto"/>
                <h1 className="mt-5 text-xl font-semibold">ĐĂNG NHẬP</h1>
                <form onSubmit={loginUser} className="mt-4 flex flex-col gap-2">
                    {/* <label htmlFor="email" className="">Email</label> */}
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" 
                        placeholder="Địa chỉ email" 
                        required 
                        className="h-10 rounded-lg p-3 placeholder:text-textInactive/45 outline-none border 
                        focus:border-primaryColor/70 focus:shadow-md"/>
                    {/* <label htmlFor="password" className="mt-2">Mật khẩu</label> */}
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        placeholder="Mật khẩu" 
                        required 
                        className="mt-2 h-10 rounded-lg p-3 placeholder:text-textInactive/45 outline-none border focus:border-primaryColor/70 focus:shadow-md"/>
                    <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <input type="checkbox" id="remember-login" className="w-4 h-4"/>
                            <label htmlFor="remember-password" className="text-sm">Ghi nhớ đăng nhập</label>
                        </div>
                            <a href="#" className="text-sm text-primaryColor">Quên mật khẩu?</a>
                    </div>
                    <button type="submit" className="mt-4 py-2 rounded-lg bg-primaryColor text-white text-base font-medium shadow-blockShadow hover:bg-primaryColor/90">ĐĂNG NHẬP</button>
                </form>
                <div className="my-4 flex gap-5 items-center">
                    <span className="h-[1px] grow rounded-full bg-[#b9b9b9]"></span>
                    <p className="text-sm text-[#b9b9b9]">hoặc</p>
                    <span className="h-[1px] grow rounded-full bg-[#b9b9b9]"></span>
                </div>
                <a href="#" className="mx-auto max-w-fit px-8 py-2 rounded-lg flex justify-center items-center gap-5 border border-textColor hover:bg-[#cccccc]/10 hover:shadow-sm">
                    <img src="/img/outlook-icon.png" alt="outlook" className="w-7"/>
                    Outlook
                </a>
                <p className="mt-5 text-center text-[#b9b9b9] text-sm">
                    Bạn mới biết đến StuTo? <Link to="/signup" className="text-primaryColor">Đăng ký</Link>
                </p>
            </div>
        </div>
    );
}

export default Login