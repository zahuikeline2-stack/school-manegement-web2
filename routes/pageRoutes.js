import express from "express";
import path from "path";

import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// CHEMIN DU DOSSIER VIEWS
// ========================================

const viewsPath = path.join(
    process.cwd(),
    "public",
    "views"
);


// ========================================
// ACCUEIL
// ========================================

router.get("/", (req, res) => {

    res.sendFile(
        path.join(viewsPath, "index.html")
    );

});


// ========================================
// CONNEXION
// ========================================

router.get("/login", (req, res) => {

    res.sendFile(
        path.join(viewsPath, "login.html")
    );

});


// ========================================
// ADMIN - ACCUEIL
// ========================================

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "admin.html")
        );

    }
);


// ========================================
// ADMIN - UTILISATEURS
// ========================================

router.get(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "users.html")
        );

    }
);


// ========================================
// ADMIN - ÉTUDIANTS
// ========================================

router.get(
    "/etudiants",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "etudiants.html")
        );

    }
);


// ========================================
// ADMIN - PROFESSEURS
// ========================================

router.get(
    "/professeurs",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "professeurs.html")
        );

    }
);


// ========================================
// ADMIN - MATIÈRES
// ========================================

router.get(
    "/matieres",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "matiere.html")
        );

    }
);


// ========================================
// ADMIN - NOTES
// ========================================

router.get(
    "/notes",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "notes.html")
        );

    }
);


// ========================================
// ADMIN - ABSENCES
// ========================================

router.get(
    "/absences",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "absences.html")
        );

    }
);


// ========================================
// ADMIN - STATISTIQUES
// ========================================

router.get(
    "/statistiques",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "statistique.html")
        );

    }
);


// ========================================
// PROFESSEUR - ACCUEIL
// ========================================

router.get(
    "/professeur",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "professeur.html")
        );

    }
);


// ========================================
// PROFESSEUR - MATIÈRES
// ========================================

router.get(
    "/professeur/matieres",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "professeurMatieres.html")
        );

    }
);


// ========================================
// PROFESSEUR - ÉTUDIANTS
// ========================================

router.get(
    "/professeur/etudiants",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "professeurEtudiants.html")
        );

    }
);


// ========================================
// PROFESSEUR - NOTES
// ========================================

router.get(
    "/professeur/notes",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "professeurNote.html")
        );

    }
);


// ========================================
// PROFESSEUR - ABSENCES
// ========================================

router.get(
    "/professeur/absences",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "professeurAbsence.html")
        );

    }
);

///========================================
// ETUDIANT
// ========================================

router.get(
    "/etudiant",
    authMiddleware,
    roleMiddleware("etudiant"),
    (req, res) => {

        res.sendFile(
            path.join(viewsPath, "etudiant.html")
        );

    }
);


export default router;