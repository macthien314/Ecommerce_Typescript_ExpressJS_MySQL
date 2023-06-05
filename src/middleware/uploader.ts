import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

interface ParamsType {
  allowed_formats: any[];
  folder: string;
}

const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png'],
    folder: 'products',
  } as ParamsType,
});

const uploadCloud = multer({ storage: cloudStorage });

export default uploadCloud;
