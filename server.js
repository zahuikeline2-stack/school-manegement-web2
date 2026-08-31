import express from "express";

import homeRouter from "./routes/pageRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();


// ========================================
// MIDDLEWARES
// ========================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.static("public")
);


// ========================================
// ROUTES
// ========================================

app.use("/", homeRouter);

app.use("/", authRoutes);


// ========================================
// SERVEUR
// ========================================

const PORT = 3000;

app.listen(
    PORT,
    () => {

        console.log(
            `Serveur démarré sur http://localhost:${PORT}`
        );

    }
);