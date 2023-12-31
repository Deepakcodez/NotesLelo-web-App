const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises; // Using promises version of fs

// Constants for configuration values
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API = process.env.CLOUD_API;
const API_SECRET = process.env.API_SECRET;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API,
  api_secret: API_SECRET,
});

const uploadOncloudinary = async (localFilePath) => {
  try {
    // Validate input
    if (!localFilePath) {
      throw new Error("Invalid file path");
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File uploaded successfully
    console.log("File is uploaded on Cloudinary", response.url);

    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error.message);

    // Remove the local saved temporary file as the upload operation failed
    try {
      await fs.unlink(localFilePath);
      console.log("Local file deleted successfully");
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError.message);
    }

    return null;
  }
};

module.exports = { uploadOncloudinary };
