import path from "path";
import fs from "fs";

export const uploadPhoto = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Файл не загружен" });
    }

    const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ photoUrl });
};

export const deletePhoto = (req, res) => {
    const { photoUrl } = req.body;

    if (!photoUrl) {
        return res.status(400).json({ error: "Не передан URL фото" });
    }

    const filename = path.basename(photoUrl);
    const filePath = path.join(process.cwd(), "uploads", filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: "Файл не найден" });
        }

        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
                return res.status(500).json({ error: "Ошибка удаления файла" });
            }

            res.status(200).json({ message: "Файл успешно удалён" });
        });
    });
};
