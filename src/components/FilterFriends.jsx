function FilterFriends() {
    return (
        <div className="fixed top-28 right-7 h-[500px] w-[360px] bg-boxBackground rounded-3xl py-7 px-7 flex flex-col">
            <h3 className="font-semibold text-lg text-textColor mb-4">Bộ lọc</h3>
            <div className="text-sm">
                <span className="font-medium">Độ tuổi</span>
            </div>
            <div className="mt-5 text-sm">
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
            <div className="mt-5 text-sm">
                <span className="font-medium">Chủ đề</span>
            </div>
            <div className="mt-5 text-sm">
                <span className="font-medium">Môn học</span>
            </div>
            <div className="mt-5 text-sm">
                <span className="font-medium">Khu vực</span>
            </div>
        </div>
    );
}

export default FilterFriends