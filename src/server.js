import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import inventoryRouter from "./routes/inventory.js";

const runApp = () => {
    const app = express();
    const PORT = process.env.PORT;

    // app middlewares
    app.use(express.json());
    app.use(cors());

    app.use(morgan("dev"));

    // routes
    app.use("/api/v1", inventoryRouter);

    app.listen(PORT, () => {
        console.info(`Server is running at port ${PORT}`);
    });
};

runApp();
