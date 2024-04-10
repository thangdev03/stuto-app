import io from "socket.io-client"
import Peer from "simple-peer";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoCalendarNumber, IoTimerOutline, IoVideocam, IoVideocamOff } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { TbTargetArrow } from "react-icons/tb";
import { LuScreenShare } from "react-icons/lu";
import { FaGoogleDrive } from "react-icons/fa6";
import { PiMountainsFill } from "react-icons/pi";
import { useAuthContext } from "../../hooks/useAuthContext";

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    },[]);
    
    return (
        <video playsInline autoPlay ref={ref} className={props.className}/>
    )
}

const Meeting = () => {
    const [state, dispatch] = useAuthContext();
    const { user } = state;
    const [activeCamera, setActiveCamera] = useState(false);
    const [peers, setPeers] = useState([]);

    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const { roomId } = useParams();

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:5555");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomId);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userId => {
                    const peer = createPeer(userId, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerId: userId,
                        peer
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            });

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerId, stream);
                peersRef.current.push({
                    peerId: payload.callerId,
                    peer
                })
                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerId !== payload.id);
                item?.peer.signal(payload.signal);
            })
        })

        // return () => {
        //     peersRef.current.forEach(peerObj => {
        //         peerObj.peer.destroy();
        //     });
        // };
    },[]);

    const createPeer = (userToSignal, callerId, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerId, signal })
        })

        return peer;
    }

    const addPeer = (incomingSignal, callerId, stream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        });

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerId })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <div className={`${activeCamera? "bg-slate-700" : "meeting-back"} w-full h-screen px-7 py-5`}>
            <div className="absolute left-5 flex gap-4 items-center">
                <div className="h-16 py-2 px-3 text-center text-white bg-primaryColor/70 rounded-xl cursor-pointer hover:bg-primaryColor/80">
                    <p className="flex items-center gap-1 text-sm"><IoTimerOutline />Đồng hồ bấm giờ</p>
                    <p className="mt-1 font-medium">46:25:00</p>
                </div>
                <div className="h-16 py-2 px-3 text-center text-white bg-primaryColor/70 rounded-xl cursor-pointer hover:bg-primaryColor/80">
                    <p className="flex items-center gap-1 text-sm"><TbTargetArrow />Mục tiêu buổi học</p>
                    <p className="mt-1 font-medium">2/6</p>
                </div>
                <div 
                    className={`h-9 w-24 bg-gray-300 rounded-full flex items-center cursor-pointer opacity-80
                    transition-all ${activeCamera && "bg-primaryColor"}`} 
                    onClick={() => setActiveCamera(!activeCamera)}>
                        <div className={`w-7 h-7 
                        rounded-full transition-all bg-white flex items-center justify-center
                        ${activeCamera ? "ml-16" : "ml-1"}`}>
                            {activeCamera ? (
                            <IoVideocam className="text-primaryColor"/>
                            ) : (
                            <IoVideocamOff className="text-textInactive"/>
                            )}
                        </div>
                </div>
            </div>
            <div className="absolute right-5 right-part flex gap-2">
                <div className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Chiếu MH</p>
                    <LuScreenShare className="mt-1 text-xl shrink-0"/>
                </div>
                <div className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Lịch</p>
                    <IoCalendarNumber className="mt-1 text-xl shrink-0"/>
                </div>
                <div className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Lưu trữ</p>
                    <FaGoogleDrive className="mt-1 text-xl shrink-0"/>
                </div>
                <div className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Space</p>
                    <PiMountainsFill className="mt-1 text-xl shrink-0"/>
                </div>
                <Link to="/phong-hoc-online" className="h-16 w-16 py-2 text-white bg-primaryColor/70 rounded-xl flex flex-col items-center cursor-pointer hover:bg-primaryColor/80">
                    <p className="text-xs">Thoát ra</p>
                    <FiLogOut className="mt-1 text-xl shrink-0"/>
                </Link>
            </div>
            <div className="mt-20 flex justify-between">
                <div className="rounded-xl overflow-hidden">
                    {userVideo && (
                        <video playsInline muted ref={userVideo} autoPlay className=""/>
                    )}
                </div>
                {console.log(peers.length)}
                {peers.map((peer, index) => (
                    <div key={index}>
                        <Video peer={peer} className={""}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Meeting;