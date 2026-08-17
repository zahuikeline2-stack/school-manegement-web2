import express from "express";

import { loginUser } from "../controllers/authcontrollers.js";

import authMiddleware from "../middleware/authmiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

import {
    getUser,
    addUser
} from "../Services/userService.js";

import {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getStudentById
} from "../Services/studentService.js";

const router = express.Router();


// ========================================
// CONNEXION
// ========================================

router.post("/login", loginUser);


// ========================================
// LISTER LES UTILISATEURS
// ========================================

router.get(
    "/api/users",
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


// ========================================
// AJOUTER UN UTILISATEUR
// ========================================

router.post(
    "/api/users",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        try {

            addUser(
                name,
                role,
                password,
                email
            );


            res.json({

                status: true,

                message:
                    "Utilisateur ajouté avec succès"

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors de l'ajout de l'utilisateur"

            });

        }

    }
);


// ========================================
// PAGE API ADMIN
// ========================================

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.json({

            status: true,

            message:
                "Bienvenue dans l'espace Admin"

        });

    }
);


// ========================================
// PAGE API PROFESSEUR
// ========================================

router.get(
    "/professeur",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.json({

            status: true,

            message:
                "Bienvenue dans l'espace Professeur"

        });

    }
);


// ========================================
// PAGE API ETUDIANT
// ========================================

router.get(
    "/etudiant",
    authMiddleware,
    roleMiddleware("etudiant"),
    (req, res) => {

        res.json({

            status: true,

            message:
                "Bienvenue dans l'espace Etudiant"

        });

    }
);

router.post(
    "/api/etudiants",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const {
            matricule,
            nom,
            prenom,
            age,
            classe
        } = req.body;


        try {

            const user_id = req.user.id;

            addStudent(
                matricule,
                nom,
                prenom,
                age,
                classe,
                user_id
            );


            res.json({

                status: true,

                message:
                    "Étudiant ajouté avec succès"

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors de l'ajout de l'étudiant"

            });

        }

    }
);

export default router;