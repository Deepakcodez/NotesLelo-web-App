const cloudinary = require("cloudinary").v2;
const fs = require("fs")
          
cloudinary.config({ 
  cloud_name: 'deripuptv', 
  api_key: '469283271742297', 
  api_secret: 'tBugXTj635tksqCEZ5FClLVbE9k' 
});

const uploadOncloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath){
            return null
        }
        //upload file on cloudinary
        const  response = await cloudinary.uploader.upload
        (localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded successfull
        console.log("file is uploaded on cloudinary",response.url);
        return response;
    } catch(error) {
        fs.unlinkSync(localFilePath)//remove the local saved temporary file as the upload operation got failed
        return null;

    }

}

module.exports={uploadOncloudinary}