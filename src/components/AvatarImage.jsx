import React from "react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";

const AvatarImage = ({publicId, cld, className}) => {

  const myImage = cld
    .image(publicId)
    .resize(thumbnail().width(200).height(200).gravity(autoGravity()))
    .delivery(format("auto"))
    .delivery(quality("auto"));

    return myImage.publicID ? (
        <AdvancedImage 
        cldImg={myImage}
        plugins={[placeholder()]}
        className={`w-full h-full object-cover rounded-full ${className}`}
        />
    ) : (
        <img 
        src="/img/default-avatar.png"
        className={`w-full h-full object-cover rounded-full ${className}`}
        />
    )
};

export default AvatarImage;
