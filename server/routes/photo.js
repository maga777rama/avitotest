import express from "express";
import { uploadPhoto, deletePhoto } from "../controllers/photoControllers.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/uploadPhoto", upload.single("photo"), uploadPhoto);
router.delete("/deletePhoto", deletePhoto);

export default router;
