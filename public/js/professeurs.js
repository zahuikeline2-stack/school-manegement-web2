// ========================================
// TOKEN
// ========================================

const token = localStorage.getItem("token");


// ========================================
// VÉRIFIER LE TOKEN
// ========================================

if (!token) {

    window.location.href = "/login";

}


// ========================================
// FONCTION NAVIGATION
// ========================================

function allerVers(page) {

    window.location.href =
        page + "?token=" +
        encodeURIComponent(token);

}


// ========================================
// MATIÈRES
// ========================================

document
    .getElementById("matieres")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/matieres");

    });


// ========================================
// ÉTUDIANTS
// ========================================

document
    .getElementById("etudiants")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/etudiants");

    });


// ========================================
// NOTES
// ========================================

document
    .getElementById("notes")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/notes");

    });


// ========================================
// ABSENCES
// ========================================

document
    .getElementById("absences")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/absences");

    });


// ========================================
// CARTES
// ========================================

document
    .getElementById("cardMatieres")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/matieres");

    });


document
    .getElementById("cardEtudiants")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/etudiants");

    });


document
    .getElementById("cardNotes")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/notes");

    });


document
    .getElementById("cardAbsences")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/absences");

    });


// ========================================
// RETOUR ACCUEIL
// ========================================

document
    .getElementById("accueil")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur");

    });


// ========================================
// DÉCONNEXION
// ========================================

document
    .getElementById("deconnecter")
    .addEventListener("click", (e) => {

        e.preventDefault();

        localStorage.removeItem("token");

        window.location.href = "/login";

    });