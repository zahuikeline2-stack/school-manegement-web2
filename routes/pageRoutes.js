import express from "express";
import path from "path";

import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// ACCUEIL
// ========================================

router.get("/", (req, res) => {

    res.sendFile(
        path.join(process.cwd(), "views", "index.html")
    );

});


// ========================================
// CONNEXION
// ========================================

router.get("/login", (req, res) => {

    res.sendFile(
        path.join(process.cwd(), "views", "login.html")
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
            path.join(process.cwd(), "views", "admin.html")
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
            path.join(process.cwd(), "views", "users.html")
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
            path.join(process.cwd(), "views", "etudiants.html")
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
            path.join(process.cwd(), "views", "professeurs.html")
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
            path.join(process.cwd(), "views", "matiere.html")
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
            path.join(process.cwd(), "views", "notes.html")
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
            path.join(process.cwd(), "views", "absences.html")
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
            path.join(process.cwd(), "views", "statistique.html")
        );

    }
);
router.get(
    "/professeur",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "professeur.html"
            )
        );

    }
);


// PAGE MES MATIÈRES PROFESSEUR
// ========================================

router.get(
    "/professeur/matieres",

    authMiddleware,

    roleMiddleware("professeur"),

    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "professeurMatieres.html"
            )
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
            path.join(
                process.cwd(),
                "views",
                "professeur.html"
            )
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
            path.join(
                process.cwd(),
                "views",
                "professeurMatieres.html"
            )
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
            path.join(
                process.cwd(),
                "views",
                "professeurEtudiants.html"
            )
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
            path.join(
                process.cwd(),
                "views",
                "professeurNote.html"
            )
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
            path.join(
                process.cwd(),
                "views",
                "professeurAbsence.html"
            )
        );

    }
);

export default router;