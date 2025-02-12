import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

// Создаём папку uploads, если её ещё нет
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Настройка `multer` для сохранения файлов в `uploads`
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});
const upload = multer({ storage });

const ItemTypes = {
    REAL_ESTATE: "Недвижимость",
    AUTO: "Авто",
    SERVICES: "Услуги",
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Раздача статических файлов из папки `uploads`
app.use("/uploads", express.static("uploads"));

// In-memory хранилище для объявлений
let items = [];
let draft = {};

const makeCounter = () => {
    let count = 0;
    return () => count++;
};
const itemsIdCounter = makeCounter();

app.post("/items", upload.single("photo"), (req, res) => {
    const { name, description, location, photo, type, ...rest } = req.body;
    const mode = req.headers.mode;

    const item = mode
        ? {
              name,
              description,
              location,
              photo,
              type,
              ...rest,
          }
        : {
              id: itemsIdCounter(),
              name,
              description,
              location,
              photo,
              type,
              ...rest,
          };

    // if was upload photo put in object
    if (req.file) {
        item.photo = `/uploads/${req.file.filename}`;
    }
    // if mode - true save data in draft
    mode ? (draft = item) : items.push(item);

    res.status(201).json(item);
});

// get all items
app.get("/items", (req, res) => {
    res.json(items);
});

// get item by id
app.get("/items/:id", (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id, 10));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send("ItemDetailed not found");
    }
});

// get item by id
app.get("/draft", (req, res) => {
    res.json(draft);
});

app.delete("/draft", (req, res) => {
    draft = {};
    return res.status(204).send("Черновик удален");
});

// upload item
app.put("/items/:id", upload.single("photo"), (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id, 10));
    if (!item) {
        return res.status(404).send("Item not found");
    }
    console.log(item);
    console.log(req.body);

    Object.assign(item, req.body);
    item.id = Number(item.id);

    if (req.file) {
        item.photo = `/uploads/${req.file.filename}`;
    }

    res.json(item);
});

// delete item and item's photo
app.delete("/items/:id", (req, res) => {
    const itemIndex = items.findIndex(
        (i) => i.id === parseInt(req.params.id, 10),
    );

    if (itemIndex !== -1) {
        const deletedItem = items[itemIndex];

        // if there is photo delete it
        if (deletedItem.photo) {
            const filePath = path.join(__dirname, deletedItem.photo);
            fs.unlink(filePath, (err) => {
                if (err) console.error("Ошибка при удалении файла:", err);
            });
        }

        items.splice(itemIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send("Item not found");
    }
});

// upload photo and return url
app.post("/uploadPhoto", upload.single("photo"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Файл не загружен" });
    }

    const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.json({ photoUrl });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
