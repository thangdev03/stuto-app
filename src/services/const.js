import { Cloudinary } from "@cloudinary/url-gen";

export const cloudName = "ddgwckqgy";
export const uploadPreset = "dw86tqvl";

export const cld = new Cloudinary({
    cloud: {
        cloudName
    }
});