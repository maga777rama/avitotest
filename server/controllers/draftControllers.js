let draft = {};

export const getDraft = (req, res) => {
    res.json(draft);
};

export const deleteDraft = (req, res) => {
    draft = {};
    res.status(204).send("Черновик удален");
};

export const createDraft = (req, res) => {
    const { name, description, location, photo, type, ...rest } = req.body;

    const item = {
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

    draft = item;
    res.status(201).json(item);
};
