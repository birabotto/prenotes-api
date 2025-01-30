const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = (fileBuffer: Buffer, fileName: string) => {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: fileName, // Nome do arquivo
          folder: "prenotes", // Pasta onde será armazenado
          resource_type: "auto", // Cloudinary detecta o tipo de arquivo automaticamente
        },
        (error: any, result: any) => {
          if (error) {
            reject(error); // Se houver erro, rejeita a Promise
          } else {
            resolve(result.secure_url); // Retorna a URL segura após o upload
          }
        }
      )
      .end(fileBuffer); // O buffer do arquivo é passado com .end(fileBuffer)
  });
};

export { uploadToCloudinary };
