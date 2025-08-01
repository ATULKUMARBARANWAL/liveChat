import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the directory exists
const uploadPath = path.resolve('assets/userUpload');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Set up storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('File destination:', uploadPath); // Log the destination folder
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    console.log('Uploaded file name:', uniqueName); // Log the generated file name
    cb(null, uniqueName);
  }
});

// File filter (accept only images)
const fileFilter = (req, file, cb) => {
  console.log('File MIME Type:', file.mimetype); // Log the file's MIME type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Init multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

export default upload
