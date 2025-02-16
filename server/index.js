import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import itemsRoutes from "./routes/items.js";
import draftRoutes from "./routes/draft.js";
import uploadsRoutes from "./routes/photo.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/items", itemsRoutes);
app.use("/draft", draftRoutes);
app.use("/", uploadsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
