import db from "../database.js";

export const addItem = async (req, res, _next) => {
    try {
        const { name, price, quantity } = req.body;
        // basic vaalidation
        if (!name || !quantity || !price) {
            return reject(new Error("All Fields are required!"));
        }

        let item = await db.find({ name });

        if (item) {
            return res.status(400).json({
                success: false,
                message: "Item with name already exist!",
            });
        }
        item = await db.insertOne({ name, price, quantity });

        res.status(201).json({ success: true, ...item });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
};

export const getItem = async (req, res, _next) => {
    try {
        const { id, name, price, quantity } = req.body;
        const item = await db.find({ id, name, price, quantity });
        console.log("first");

        res.status(201).json({ success: true, data: item ?? [] });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
};

export const updateItem = async (req, res, _next) => {
    try {
        const { id, name, price, quantity } = req.body;

        let item = await db.find({ id });
        if (!item) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Item Id!" });
        }
        item = await db.updateOne({ id, name, price, quantity });
        res.status(200).json({ success: true, ...item });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
};

export const deleteItem = async (req, res, _next) => {
    try {
        const { itemId } = req.params;

        let item = await db.find({ id: itemId });
        if (!item) {
            return res.status(400).json({ message: "Invalid Item Id!" });
        }
        item = await db.deleteItem(itemId);

        res.status(200).json({ success: true, message: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
};
