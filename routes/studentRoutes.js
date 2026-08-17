import express from "express";

import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
    getStudents,
    getStudentById
} from "../Services/studentService.js";


const router = express.Router();


router.get(
    "/api/etudiants",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const etudiants = getStudents();

            res.json({
                status: true,
                etudiants: etudiants
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de la récupération des étudiants"
            });

        }

    }
);


router.get(
    "/api/etudiants/:id",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const id = req.params.id;

            const etudiant =
                getStudentById(id);


            if (!etudiant) {

                return res.status(404).json({
                    status: false,
                    message: "Étudiant introuvable"
                });

            }


            res.json({
                status: true,
                etudiant: etudiant
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de la recherche"
            });

        }

    }
);


export default router;