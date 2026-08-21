import express from "express";

import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
    identifiStudent,
    moyenneGenerale,
    CompterAbsences
} from "../Services/statistiqueService.js";

const router = express.Router();


// ========================================
// STATISTIQUES
// ========================================

router.get(
    "/api/statistiques",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const meilleurEtudiant =
                identifiStudent();

            const moyenne =
                moyenneGenerale();

            const absences =
                CompterAbsences();


            res.json({

                status: true,

                meilleurEtudiant:
                    meilleurEtudiant,

                moyenneGenerale:
                    moyenne,

                absences:
                    absences

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors du chargement des statistiques"

            });

        }

    }
);


export default router;