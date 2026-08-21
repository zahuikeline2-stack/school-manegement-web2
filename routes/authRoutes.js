import express from "express";
import db from "../db/base.js";
import { loginUser } from "../controllers/authcontrollers.js";
import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
    getUser,
    addUser,
    DeleteUser
} from "../Services/userService.js";
import {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getStudentById
} from "../Services/studentService.js";
import {
    addTeacher,
    updateTeacher,
    DEleteTeacher,
    getTeacherById
} from "../Services/teacherService.js";

import {
    addSubjects,
    affectSubject,
    getSubjects,
    getSubjectsById
} from "../Services/subjectsService.js";
import {
    addGrade,
    updateGrade,
    DeleteGrade,
    getGrade,
    getGradesStudent
} from "../Services/gradeService.js";

import {
    addAbsence,
    updateAbsence,
    getAbsence
} from "../Services/absencesService.js";

import {
    identifiStudent,
    moyenneGenerale,
    CompterAbsences
} from "../Services/statistiqueService.js";

const router = express.Router();


// ========================================
// CONNEXION
// ========================================

router.post(
    "/login",
    loginUser
);


// ========================================
// LISTER LES UTILISATEURS
// ========================================

router.get(
    "/api/users",

    authMiddleware,
    roleMiddleware("admin"),

    (req, res) => {

        try {

            const users = getUser();

            res.json({
                status: true,
                users: users
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message:
                    "Erreur lors de la récupération des utilisateurs"
            });

        }

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
// SUPPRIMER UN UTILISATEUR
// ========================================

router.delete(
    "/api/users/:id",

    authMiddleware,
    roleMiddleware("admin"),

    (req, res) => {

        try {

            const id = req.params.id;


            DeleteUser(id);


            res.json({

                status: true,

                message:
                    "Utilisateur supprimé avec succès"

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors de la suppression"

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


// ========================================
// AJOUTER UN ÉTUDIANT
// ========================================

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


// ========================================
// LISTER LES ÉTUDIANTS
// ========================================

router.get(
    "/api/etudiants",

    authMiddleware,
    roleMiddleware("admin"),

    (req, res) => {

        try {

            const etudiants =
                getStudents();


            res.json({

                status: true,

                etudiants: etudiants

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors de la récupération des étudiants"

            });

        }

    }
);


// ========================================
// RECHERCHER UN ÉTUDIANT
// ========================================

router.get(
    "/api/etudiants/:id",

    authMiddleware,
    roleMiddleware("admin"),

    (req, res) => {

        try {

            const id =
                req.params.id;


            const etudiant =
                getStudentById(id);


            if (!etudiant) {

                return res.status(404).json({

                    status: false,

                    message:
                        "Étudiant introuvable"

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

                message:
                    "Erreur lors de la recherche"

            });

        }

    }
);


// ========================================
// MODIFIER UN ÉTUDIANT
// ========================================

router.put(
    "/api/etudiants/:id",

    authMiddleware,
    roleMiddleware("admin"),

    (req, res) => {

        const id =
            req.params.id;


        const {
            matricule,
            nom,
            prenom,
            age,
            classe
        } = req.body;


        try {

            updateStudent(
                id,
                matricule,
                nom,
                prenom,
                age,
                classe
            );


            res.json({

                status: true,

                message:
                    "Étudiant modifié avec succès"

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors de la modification"

            });

        }

    }
);


// ========================================
// SUPPRIMER UN ÉTUDIANT
// ========================================

router.delete(
    "/api/etudiants/:id",

    authMiddleware,
    roleMiddleware("admin"),

    (req, res) => {

        const id =
            req.params.id;


        try {

            deleteStudent(id);


            res.json({

                status: true,

                message:
                    "Étudiant supprimé avec succès"

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors de la suppression"

            });

        }

    }
);
// ========================================
// LISTER LES PROFESSEURS
// ========================================

router.get(
    "/api/professeurs",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const professeurs = db.prepare(`
                SELECT * FROM teachers
            `).all();

            res.json({
                status: true,
                professeurs: professeurs
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors du chargement des professeurs"
            });

        }

    }
);
// ========================================
// AJOUTER UN PROFESSEUR
// ========================================

router.post(
    "/api/professeurs",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const {
            nom,
            matiere
        } = req.body;

        try {

            const user_id = req.user.id;

            addTeacher(
                nom,
                matiere,
                user_id
            );

            res.json({
                status: true,
                message: "Professeur ajouté avec succès"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de l'ajout du professeur"
            });

        }

    }
);
// ========================================
// MODIFIER UN PROFESSEUR
// ========================================

router.put(
    "/api/professeurs/:id",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const id = req.params.id;

        const {
            nom,
            matiere
        } = req.body;

        try {

            updateTeacher(
                id,
                nom,
                matiere
            );

            res.json({
                status: true,
                message: "Professeur modifié avec succès"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de la modification"
            });

        }

    }
);
// ========================================
// SUPPRIMER UN PROFESSEUR
// ========================================

router.delete(
    "/api/professeurs/:id",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const id = req.params.id;

        try {

            DEleteTeacher(id);

            res.json({
                status: true,
                message: "Professeur supprimé avec succès"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de la suppression"
            });

        }

    }
);
// ========================================
// RECHERCHER UN PROFESSEUR
// ========================================

router.get(
    "/api/professeurs/:id",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const id = req.params.id;

        try {

            const professeur = getTeacherById(id);

            if (!professeur) {

                return res.status(404).json({
                    status: false,
                    message: "Professeur introuvable"
                });

            }

            res.json({
                status: true,
                professeur: professeur
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
// ========================================
// LISTER LES MATIERES
// ========================================

router.get(
    "/api/matieres",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const matieres = getSubjects();

            res.json({
                status: true,
                matieres: matieres
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message:
                    "Erreur lors du chargement des matières"
            });

        }

    }
);


// ========================================
// AJOUTER UNE MATIERE
// ========================================

router.post(
    "/api/matieres",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const {
            nom,
            teacher_id
        } = req.body;

        try {

            addSubjects(
                nom,
                teacher_id
            );

            res.json({
                status: true,
                message:
                    "Matière ajoutée avec succès"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message:
                    "Erreur lors de l'ajout de la matière"
            });

        }

    }
);


// ========================================
// RECHERCHER UNE MATIERE
// ========================================

router.get(
    "/api/matieres/:id",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const id = req.params.id;

            const matiere =
                getSubjectsById(id);

            if (!matiere) {

                return res.status(404).json({

                    status: false,

                    message:
                        "Matière introuvable"

                });

            }

            res.json({

                status: true,

                matiere: matiere

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors de la recherche"

            });

        }

    }
);


// ========================================
// AFFECTER UN PROFESSEUR
// ========================================

router.put(
    "/api/matieres/:id/affecter",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const id = req.params.id;

        const {
            teacher_id
        } = req.body;


        try {

            affectSubject(
                teacher_id,
                id
            );

            res.json({

                status: true,

                message:
                    "Professeur affecté avec succès"

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors de l'affectation"

            });

        }

    }
);
// ========================================
// AJOUTER UNE NOTE
// ========================================

router.post(
    "/api/notes",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const {
            student_id,
            subject_id,
            note
        } = req.body;

        try {

            if (note < 0 || note > 20) {

                return res.status(400).json({
                    status: false,
                    message: "La note doit être entre 0 et 20"
                });

            }

            addGrade(
                student_id,
                subject_id,
                note
            );

            res.json({
                status: true,
                message: "Note ajoutée avec succès"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de l'ajout de la note"
            });

        }

    }
);


// ========================================
// LISTER LES NOTES D'UN ÉTUDIANT
// ========================================

router.get(
    "/api/notes/:student_id",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const student_id =
                req.params.student_id;

            const notes =
                getGradesStudent(student_id);

            res.json({
                status: true,
                notes: notes
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors du chargement des notes"
            });

        }

    }
);


// ========================================
// MODIFIER UNE NOTE
// ========================================

router.put(
    "/api/notes",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        const {
            student_id,
            subject_id,
            note
        } = req.body;

        try {

            updateGrade(
                note,
                student_id,
                subject_id
            );

            res.json({
                status: true,
                message: "Note modifiée avec succès"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de la modification"
            });

        }

    }
);


// ========================================
// SUPPRIMER UNE NOTE
// ========================================

router.delete(
    "/api/notes/:id",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const id =
                req.params.id;

            DeleteGrade(id);

            res.json({
                status: true,
                message: "Note supprimée avec succès"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de la suppression"
            });

        }

    }
);


// ========================================
// MOYENNE
// ========================================

router.get(
    "/api/notes/:student_id/moyenne",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const student_id =
                req.params.student_id;

            const moyenne =
                getGrade(student_id);

            res.json({
                status: true,
                moyenne: moyenne
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors du calcul de la moyenne"
            });

        }

    }
);
// ========================================
// ENREGISTRER UNE ABSENCE
// ========================================

router.post(
    "/api/absences",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const {
                student_id,
                date,
                status
            } = req.body;

            if (!student_id || !date || !status) {

                return res.status(400).json({
                    status: false,
                    message: "Tous les champs sont obligatoires"
                });

            }

            addAbsence(
                student_id,
                date,
                status
            );

            res.json({
                status: true,
                message: "Absence enregistrée avec succès"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de l'enregistrement de l'absence"
            });

        }

    }
);
// ========================================
// JUSTIFIER UNE ABSENCE
// ========================================

router.put(
    "/api/absences/:id",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const id = req.params.id;

            const { status } = req.body;

            if (!status) {

                return res.status(400).json({
                    status: false,
                    message: "Le statut est obligatoire"
                });

            }

            updateAbsence(status, id);

            res.json({
                status: true,
                message: "Absence modifiée avec succès"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                status: false,
                message: "Erreur lors de la modification"
            });

        }

    }
);
router.get(
    "/api/absences/student/:student_id",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        try {

            const student_id = req.params.student_id;

            console.log("ID étudiant reçu :", student_id);

            const absences = getAbsence(student_id);

            console.log("Absences trouvées :", absences);

            res.json({
                status: true,
                absences: absences
            });

        } catch (error) {

            console.error("ERREUR HISTORIQUE :", error);

            res.status(500).json({
                status: false,
                message: "Erreur lors du chargement de l'historique"
            });

        }

    }
);
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

                totalAbsences:
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
router.get(
    "/api/professeur/matieres",
    authMiddleware,
    roleMiddleware("professeur"),
    (req, res) => {

        try {

            const matieres = getSubjects();

            res.json({

                status: true,

                matieres: matieres

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                status: false,

                message:
                    "Erreur lors du chargement des matières"

            });

        }

    }
);
export default router;