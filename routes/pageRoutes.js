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
// ========================================
// PAGE PROFESSEURS
// ========================================

router.get(
    "/professeurs",
    authMiddleware,
    roleMiddleware("admin"),
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
router.get(
    "/matieres",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "matiere.html"
            )
        );

    }
);
// ========================================
// PAGE GESTION DES NOTES
// ========================================

router.get(
    "/notes",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "notes.html"
            )
        );

    }
);
router.get(
    "/absences",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "absences.html"
            )
        );

    }
);
router.get(
    "/statistiques",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "statistique.html"
            )
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
                "professeurs.html"
            )
        );

    }
);
// ========================================
// ESPACE PROFESSEUR
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
// MES MATIÈRES
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
// ÉTUDIANTS
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
// AJOUTER UNE NOTE
// ========================================

router.get(
    "/professeur/notes/ajouter",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "professeurAjouterNote.html"
            )
        );

    }
);


// ========================================
// MODIFIER UNE NOTE
// ========================================

router.get(
    "/professeur/notes/modifier",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "professeurModifierNote.html"
            )
        );

    }
);


// ========================================
// ENREGISTRER UNE ABSENCE
// ========================================

router.get(
    "/professeur/absences/ajouter",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "professeurAjouterAbsence.html"
            )
        );

    }
);


// ========================================
// JUSTIFIER UNE ABSENCE
// ========================================

router.get(
    "/professeur/absences/justifier",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "professeurJustifierAbsence.html"
            )
        );

    }
);


// ========================================
// HISTORIQUE DES ABSENCES
// ========================================

router.get(
    "/professeur/absences/historique",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "professeurHistoriqueAbsences.html"
            )
        );

    }
);


// ========================================
// RECHERCHER UN ÉTUDIANT
// ========================================

router.get(
    "/professeur/etudiants/rechercher",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        res.sendFile(
            path.join(
                process.cwd(),
                "views",
                "professeurRechercherEtudiant.html"
            )
        );

    }
);
export default router;