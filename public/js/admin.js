// ========================================
// RÉCUPÉRER LE TOKEN
// ========================================

const token = localStorage.getItem("token");


// ========================================
// VÉRIFIER LE TOKEN
// ========================================

if (!token) {

    window.location.href = "/login";

}


// ========================================
// FONCTION POUR ALLER VERS UNE PAGE
// AVEC LE TOKEN
// ========================================

function allerVers(page) {

    window.location.href =
        page +
        "?token=" +
        encodeURIComponent(token);

}


// ========================================
// ACCUEIL ADMIN
// ========================================

const admin =
    document.getElementById("admin");

if (admin) {

    admin.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/admin");

    });

}


// ========================================
// UTILISATEURS
// ========================================

const users =
    document.getElementById("users");

if (users) {

    users.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/users");

    });

}


// ========================================
// ÉTUDIANTS
// ========================================

const etudiants =
    document.getElementById("etudiants");

if (etudiants) {

    etudiants.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/etudiants");

    });

}


// ========================================
// PROFESSEURS
// ========================================

const professeurs =
    document.getElementById("professeurs");

if (professeurs) {

    professeurs.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeurs");

    });

}


// ========================================
// MATIÈRES
// ========================================

const matieres =
    document.getElementById("matieres");

if (matieres) {

    matieres.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/matieres");

    });

}


// ========================================
// NOTES
// ========================================

const notes =
    document.getElementById("notes");

if (notes) {

    notes.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/notes");

    });

}


// ========================================
// ABSENCES
// ========================================

const absences =
    document.getElementById("absences");

if (absences) {

    absences.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/absences");

    });

}


// ========================================
// STATISTIQUES
// ========================================

const statistiques =
    document.getElementById("statistiques");

if (statistiques) {

    statistiques.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/statistiques");

    });

}


// ========================================
// CARTE UTILISATEURS
// ========================================

const cardUsers =
    document.getElementById("cardUsers");

if (cardUsers) {

    cardUsers.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/users");

    });

}


// ========================================
// CARTE ÉTUDIANTS
// ========================================

const cardEtudiants =
    document.getElementById("cardEtudiants");

if (cardEtudiants) {

    cardEtudiants.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/etudiants");

    });

}


// ========================================
// CARTE PROFESSEURS
// ========================================

const cardProfesseurs =
    document.getElementById("cardProfesseurs");

if (cardProfesseurs) {

    cardProfesseurs.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeurs");

    });

}


// ========================================
// CARTE MATIÈRES
// ========================================

const cardMatieres =
    document.getElementById("cardMatieres");

if (cardMatieres) {

    cardMatieres.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/matieres");

    });

}


// ========================================
// CARTE NOTES
// ========================================

const cardNotes =
    document.getElementById("cardNotes");

if (cardNotes) {

    cardNotes.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/notes");

    });

}


// ========================================
// CARTE ABSENCES
// ========================================

const cardAbsences =
    document.getElementById("cardAbsences");

if (cardAbsences) {

    cardAbsences.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/absences");

    });

}


// ========================================
// CARTE STATISTIQUES
// ========================================

const cardStatistiques =
    document.getElementById("cardStatistiques");

if (cardStatistiques) {

    cardStatistiques.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/statistiques");

    });

}


// ========================================
// DÉCONNEXION
// ========================================

const deconnecter =
    document.getElementById("deconnecter");

if (deconnecter) {

    deconnecter.addEventListener("click", (e) => {

        e.preventDefault();


        // Supprimer le token

        localStorage.removeItem("token");


        // Retour connexion

        window.location.href = "/login";

    });

}