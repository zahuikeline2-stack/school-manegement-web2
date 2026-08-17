import express from "express";
import { loginUser } from "../controllers/authcontrollers.js";
import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getUser } from "../Services/userService.js";

const router = express.Router();

router.post("/login", loginUser);
router.get(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const users = getUser();

        res.json({
            status: true,
            users: users
        });

    }
);

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {
        res.json({
            message: "Bienvenue dans l'espace Admin"
        });
    }
);

router.get(
    "/professeur",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {
        res.json({
            message: "Bienvenue dans l'espace Professeur"
        });
    }
);

router.get(
    "/etudiant",
    authMiddleware,
    roleMiddleware("etudiant"),
    (req, res) => {
        res.json({
            message: "Bienvenue dans l'espace Etudiant"
        });
    }
);

export default router;