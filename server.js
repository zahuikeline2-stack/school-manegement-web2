 import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import homeRouter from "./routes/pageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { initDb } from "./db/base.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// MIDDLEWARES

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.static(path.join(__dirname, "public"))
);


// ROUTES

app.use("/", homeRouter);

app.use("/", authRoutes);


// SERVEUR

const PORT = 3000;

app.listen(PORT, () => {

    initDb().then(() => {

        console.log(
            `Serveur démarré sur http://localhost:${PORT}`
        );

    });

});