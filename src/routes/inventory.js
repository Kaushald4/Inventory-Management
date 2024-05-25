import express from "express";
import {
    addItem,
    deleteItem,
    getItem,
    updateItem,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/item", addItem);
router.get("/item", getItem);
router.patch("/item", updateItem);
router.delete("/item/:itemId", deleteItem);

export default router;
