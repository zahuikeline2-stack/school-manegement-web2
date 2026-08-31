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

console.log("URL TURSO :", process.env.TURSO_DATABASE_URL);
console.log(
    "TOKEN TURSO présent :",
    !!process.env.TURSO_AUTH_TOKEN
);
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