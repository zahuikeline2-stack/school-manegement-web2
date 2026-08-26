// ========================================
// TOKEN
// ========================================

const token = localStorage.getItem("token");


if (!token) {

    window.location.href = "/login";

}


// ========================================
// NAVIGATION
// ========================================

function allerVers(page) {

    window.location.href =
        page + "?token=" + encodeURIComponent(token);

}


// ========================================
// MES MATIÈRES
// ========================================

document
    .getElementById("cardMatieres")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/matieres");

    });


// ========================================
// ÉTUDIANTS
// ========================================

document
    .getElementById("cardEtudiants")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/etudiants");

    });


// ========================================
// NOTES
// ========================================

document
    .getElementById("cardNotes")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/notes/ajouter");

    });


// ========================================
// ABSENCES
// ========================================

document
    .getElementById("cardAbsences")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeur/absences/ajouter");

    });


// ========================================
// DÉCONNEXION
// ========================================

const deconnecter =
    document.getElementById("deconnecter");


if (deconnecter) {

    deconnecter.addEventListener("click", (e) => {

        e.preventDefault();

        localStorage.removeItem("token");

        window.location.href = "/login";

    });

}