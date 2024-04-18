import React, { useEffect, useRef, useState } from 'react'
import { BsCameraFill } from "react-icons/bs";
import { useAuthContext } from '../hooks/useAuthContext';
import { setLogin } from '../contexts/AuthContext';

const UploadWidget = ({ className, setPublicId, uwConfig }) => { 
  const [state, dispatch] = useAuthContext();
  const { user } = state;
  const widgetRef = useRef();

  const [loaded, setLoaded] = useState(false);

  const updateAvatar = async (publicId) => {
    try {
        const response = await fetch("https://stuto-api.onrender.com/user/" + user.id + "/avatar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: publicId
            })
        })
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
        widgetRef.current = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
            if (!error && result && result.event === "success") {
                // console.log("Done! Here is the image info: ", result.info);
                setPublicId(result.info.public_id);
                updateAvatar(result.info.public_id);

                const storedUser = JSON.parse(localStorage.getItem("user"));
                storedUser.avatar = result.info.public_id;
                localStorage.setItem("user", JSON.stringify(storedUser));

                dispatch(setLogin(storedUser));
            }
        }
        );
    }
  }


  return (
    <div 
    onClick={() => {
        initializeCloudinaryWidget();
        widgetRef.current.open();
    }}
    className={`p-2 bg-gray-100 text-xl rounded-full cursor-pointer shadow-sm hover:bg-gray-200 ${className}`}
    >
        <BsCameraFill className=""/>
    </div>
  )
}

export default UploadWidget