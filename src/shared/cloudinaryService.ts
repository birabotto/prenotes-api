const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImageToCloudinary = async (
  filePath: { buffer: Buffer },
  prenote_id: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Uploading to folder:", `articles-${prenote_id}`);

      if (!filePath || !filePath.buffer) {
        return reject(new Error("File invalid or buffer missing."));
      }

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `articles-${prenote_id}`,
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Error upload to Cloudinary:", error);
            return reject(error);
          }

          if (!result || !result.secure_url) {
            return reject(new Error("Error to get a URL from Cloudinary."));
          }

          resolve(result.secure_url);
        }
      );

      stream.end(filePath.buffer);
    } catch (err) {
      reject(err);
    }
  });
};

export { uploadImageToCloudinary };
