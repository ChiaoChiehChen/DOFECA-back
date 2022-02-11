import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: process.removeListener.CLOUDINARY_NAME,
  api_ley: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})
