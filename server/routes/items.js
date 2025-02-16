import express from "express";
import {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
} from "../controllers/itemsConrollers.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("photo"), createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", upload.single("photo"), updateItem);
router.delete("/:id", deleteItem);

export default router;
