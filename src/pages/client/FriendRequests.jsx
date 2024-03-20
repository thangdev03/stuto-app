import React, { useEffect, useState } from 'react'
import RequestItem from '../../components/RequestItem'
import { useAuthContext } from "../../hooks/useAuthContext"
import { Link } from 'react-router-dom';

const FriendRequests = () => {
  const [state, dispatch] = useAuthContext();
  const { user } = state;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
        try {
            const response = await fetch("http://localhost:5555/invitation/" + user.id);
            const data = await response.json();
            if (response.status === 404) {
                return console.error(data.message);
            }
            setRequests(data);
        } catch (error) {
            return console.log(error)
        }
    }
    loadRequests();
  },[user.id])

  console.log(requests)

  return (
    <div className="ml-72 mt-10 mr-7">
        {requests.length > 0 ? (
          <div className="w-full grid grid-cols-1 min-[920px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            {requests.map((request) => (
                <RequestItem key={request._id} request={request} sender={request.sender}/>
            ))}
          </div>
        ) : (
          <div className="h-[calc(100vh-200px)] flex flex-col justify-center items-center">
            <img src="/img/group_friends.png" alt="group of friends" className="w-2/5"/>
            <p className="text-lg font-medium">Không có yêu cầu kết bạn mới</p>
            <Link to="#" className="mt-4 font-medium text-primaryColor">Xem lại các yêu cầu bạn đã gửi</Link>
          </div>
        )
      }
    </div>
  )
}

export default FriendRequests