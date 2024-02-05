import { IconStar } from "../assets/svg";

function BtnUpgradePro({className}) {
    return (
        <div className={`px-6 border border-[#B196FF] bg-white rounded-3xl text-center relative ${className}`}>
            <IconStar className="absolute -top-6 left-1/2 -translate-x-1/2"/>
            <h3 className="mt-8 text-sm font-semibold">Đăng ký trở thành StuToPro</h3>
            <p className="mt-3 text-sm font-medium text-[#222222]/60">Truy cập không giới hạn và nhận certificate khóa học</p>
            <button className="mt-5 mb-5 text-sm w-full rounded-xl bg-primaryColor text-white font-semibold py-3 px-4 transition-all hover:bg-primaryColor/90 hover:shadow-blockShadow">Nâng cấp StuToPro</button>
        </div>
    );
}

export default BtnUpgradePro;