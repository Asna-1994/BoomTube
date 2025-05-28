import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { CustomError } from '../middlewares/errorHandler';
import { STATUSCODE } from '../constants/StatusCodes';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
      cb(null, true);
    } else {
      cb(
new CustomError('Only MP4 video files are allowed.', STATUSCODE.BAD_REQUEST)
      );
    }
  },
});

const uploadToCloudinary = async (filePath: string, folder: string) => {

  const result = await cloudinary.uploader.upload(filePath, {
    resource_type : 'video',
    folder,
  });

  await fs.unlink(filePath);
  return {
    url  :result.secure_url,
    publicId : result.public_id
  }
};

const deleteFromCloudinary = async (public_id: string) => {
    return await cloudinary.uploader.destroy(public_id);
  };

export { upload, uploadToCloudinary, cloudinary, deleteFromCloudinary };
