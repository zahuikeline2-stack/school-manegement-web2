import express from "express";
import path from "path";

import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// ==========================
// PAGE D'ACCUEIL
// ==========================

router.get("/", (req, res) => {

    res.sendFile(
        path.join(process.cwd(), "views", "index.html")
    );

});


// ==========================
// PAGE DE CONNEXION
// ==========================

router.get("/login", (req, res) => {

    res.sendFile(
        path.join(process.cwd(), "views", "login.html")
    );

});


// ==========================
// PAGE ADMIN
// ==========================

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(process.cwd(), "views", "admin.html")
        );

    }
);


// ==========================
// PAGE UTILISATEURS
// ==========================

router.get(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(process.cwd(), "views", "users.html")
        );

    }
);


// ==========================
// PAGE AJOUTER UTILISATEUR
// ==========================

router.get(
    "/ajouter",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(process.cwd(), "views", "ajouter.html")
        );

    }
);


// ==========================
// PAGE LISTE UTILISATEURS
// ==========================

router.get(
    "/users/api",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(process.cwd(), "views", "usersApi.html")
        );

    }
);
router.get(
    "/etudiants",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "etudiants.html"
            )
        );

    }
);


export default router;