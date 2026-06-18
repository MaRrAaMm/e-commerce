import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
});
export default cloudinary;

//upload 
// cloudinary.uploader.upload(file.path,{folder,public_id});