import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import FilterFriends from "../../components/FilterFriends"
import LoadingSpinner from "../../components/LoadingSpinner";
import WishModal from "../../components/WishModal";
import UserItem from "../../components/UserItem";

function FindFriends() {
    const [openWish, setOpenWish] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [requestSenders, setRequestSenders] = useState([]);
    const [requestReceivers, setRequestReceivers] = useState([]);
    const [applyFilter, setApplyFilter] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [state, dispatch] = useAuthContext();
    const { user } = state;
    let username = ""

    if (user) {
        const nameWords = user.name.split(" ");
        const lastName = nameWords.pop();
        if (nameWords.length >= 2) {
            const secondLastName = nameWords.pop();
            username = secondLastName + " " + lastName;
        } else {
            username = user.name;
        }
    }

    const handleFilterUsers = (data) => {
        setFilteredUsers(data);
    }

    useState(() => {
        setIsLoading(true);
        const getUsers = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/user");
                const data = await response.json();
                setAllUsers(data.data);
                response && setIsLoading(false);
            } catch (error) {
                console.error(error);   
            }
        };
        const getCurrUserFriends = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/user/" + user.id);
                const data = await response.json();
                setFriendsList(data.friends);
            } catch (error) {
                console.error(error);
            }
        };
        const getRequestSenders = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/invitation/" + user.id)
                const data = await response.json();
                if (response.status === 200) {
                    let senders = data.reduce((result, item) => {
                        result.push(item.sender?._id);
                        return result;
                    },[]);
                    setRequestSenders(senders);
                }
            } catch (error) {
                console.error(error);
            }
        };
        const getRequestReceiver = async () => {
            try {
                const response = await fetch("https://stuto-api.onrender.com/invitation/sent/" + user.id)       
                const data = await response.json();
                if (response.status === 200) {
                    let receivers = data.reduce((result, item) => {
                        result.push(item.receiver);
                        return result;
                    },[]);
                    setRequestReceivers(receivers);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getUsers();
        getCurrUserFriends();
        getRequestSenders();
        getRequestReceiver();
    },[user.id])

    useEffect(() => {
        const result = allUsers.filter((currUser) => (
            (currUser.info._id !== user.id) && (!friendsList?.includes(currUser.info._id)) && currUser.info.wish?.is_active
        ));
        setAvailableUsers(result);
    },[user.id, allUsers, friendsList])

    return (
        <div className="ml-72 mr-[386px] my-10">
            <h1 className="font-bold text-3xl">Hôm nay bạn muốn học cùng ai?</h1>
            <div className="mt-8 pt-5 px-6 pb-6 bg-white w-full rounded-lg shadow-blockShadow">
                
                <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">Thay đổi trạng thái tìm bạn học</span>
                    <button
                    onClick={() => setOpenWish(true)}
                    className="px-6 py-2 text-primaryColor border-2 border-primaryColor rounded-full transition-all
                    hover:text-white hover:bg-primaryColor">
                        Chỉnh sửa
                    </button>
                </div>
            </div>
            {/* Users list */}
            <div className="mt-8">
                <h3 className="font-semibold text-xl">Các StuToers phù hợp nhất</h3>
                <div className="mt-3 users-container">
                    {/* User Item */}
                    {isLoading ? (
                        <LoadingSpinner className={"mx-auto"}/>
                    ) : (
                        (applyFilter? filteredUsers : availableUsers).map((userItem) => (
                            <UserItem key={userItem.info._id} user={userItem.info} requestSenders={requestSenders} requestReceivers={requestReceivers} />
                        ))
                    )}
                </div>
            </div>
            {openWish && (
                <div onClick={() => setOpenWish(false)} className="fixed z-30 left-0 top-0 right-0 bottom-0 bg-[#222222]/30">
                    <WishModal userId={user.id} closeModal={() => setOpenWish(false)} currAuthUser={user} />
                </div>
            )}
            <FilterFriends applyFilter={() => setApplyFilter(true)} resetFilter={() => setApplyFilter(false)} 
            availableUsers={availableUsers} sendFilteredUsers={handleFilterUsers} />
        </div>
    )
}

export default FindFriends