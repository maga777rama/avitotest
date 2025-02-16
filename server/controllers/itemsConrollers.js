import path from "path";
import fs from "fs";

let items = [];
const makeCounter = () => {
    let count = 0;
    return () => count++;
};
const itemsIdCounter = makeCounter();

export const createItem = (req, res) => {
    const { name, description, location, photo, type, ...rest } = req.body;

    const item = {
        id: itemsIdCounter(),
        name,
        description,
        location,
        photo,
        type,
        ...rest,
    };

    if (req.file) {
        item.photo = `/uploads/${req.file.filename}`;
    }

    items.push(item);
    res.status(201).json(item);
};

export const getAllItems = (req, res) => {
    res.json(items);
};

export const getItemById = (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id, 10));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send("Item not found");
    }
};

export const updateItem = (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id, 10));
    if (!item) {
        return res.status(404).send("Item not found");
    }

    Object.assign(item, req.body);
    item.id = Number(item.id);

    if (req.file) {
        item.photo = `/uploads/${req.file.filename}`;
    }

    res.json(item);
};

export const deleteItem = (req, res) => {
    const itemIndex = items.findIndex(
        (i) => i.id === parseInt(req.params.id, 10),
    );

    if (itemIndex !== -1) {
        const deletedItem = items[itemIndex];

        if (deletedItem.photo) {
            const filePath = path.join(process.cwd(), deletedItem.photo);
            fs.unlink(filePath, (err) => {
                if (err) console.error("Ошибка при удалении файла:", err);
            });
        }

        items.splice(itemIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send("Item not found");
    }
};
