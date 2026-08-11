import express from "express";
import path from "path";
import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// Page principale
router.get("/", (req, res) => {
    res.sendFile(
        path.join(process.cwd(), "views", "index.html")
    );
});


// Page de connexion
router.get("/login", (req, res) => {
    res.sendFile(
        path.join(process.cwd(), "views", "login.html")
    );
});


// Page Admin
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


// Page Professeur
router.get(
    "/professeur",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(process.cwd(), "views", "professeur.html")
        );

    }
);


// Page Étudiant
router.get(
    "/etudiant",
    authMiddleware,
    roleMiddleware("etudiant"),
    (req, res) => {

        res.sendFile(
            path.join(process.cwd(), "views", "etudiant.html")
        );

    }
);


export default router;