import { v2 as cloudinary } from 'cloudinary'

export const cloudinaryOptions = {
  use_filename: false,
  unique_filename: true,
  overwrite: false
}

cloudinary.config({
  secure: true
})

export default cloudinary
