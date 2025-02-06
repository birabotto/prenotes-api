"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const uploadToCloudinary = (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({
            public_id: fileName,
            folder: "prenotes",
            resource_type: "auto",
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result.secure_url);
            }
        })
            .end(fileBuffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
