import express from "express";
import {
    getDraft,
    deleteDraft,
    createDraft,
} from "../controllers/draftControllers.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getDraft);
router.delete("/", deleteDraft);
router.post("/", upload.single("photo"), createDraft);

export default router;
