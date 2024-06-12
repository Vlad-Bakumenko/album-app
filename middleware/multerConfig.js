import multer from "multer";

const path = process.env.NODE_ENV === "development" ? "frontend/public" : "frontend/dist";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 150000 }, // 150kb
});

const upload = multer({ storage: storage });

export default upload;