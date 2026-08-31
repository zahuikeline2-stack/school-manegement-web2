
// ========================================
// RÉCUPÉRER LE TOKEN
// ========================================

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "/login";

}


// ========================================
// FONCTION NAVIGATION ADMIN
// ========================================

function allerVers(page) {

    window.location.href =
        page + "?token=" +
        encodeURIComponent(token);

}


// ========================================
// MENU ADMIN
// ========================================

const menuAdmin = [

    "/admin",
    "/users",
    "/etudiants",
    "/professeurs",
    "/matieres",
    "/notes",
    "/absences",
    "/statistiques"

];


// ========================================
// NAVIGATION DE TOUT LE MENU ADMIN
// ========================================

menuAdmin.forEach((page) => {

    const lien = document.querySelector(
        `a[href="${page}"]`
    );

    if (lien) {

        lien.addEventListener("click", (e) => {

            e.preventDefault();

            allerVers(page);

        });

    }

});


// ========================================
// CARTES DE LA PAGE PROFESSEURS
// ========================================

// Matières

const cardMatieres =
    document.getElementById("cardMatieres");

if (cardMatieres) {

    cardMatieres.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/matieres");

    });

}


// Étudiants

const cardEtudiants =
    document.getElementById("cardEtudiants");

if (cardEtudiants) {

    cardEtudiants.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/etudiants");

    });

}


// Notes

const cardNotes =
    document.getElementById("cardNotes");

if (cardNotes) {

    cardNotes.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/notes");

    });

}


// Absences

const cardAbsences =
    document.getElementById("cardAbsences");

if (cardAbsences) {

    cardAbsences.addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/absences");

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

        localStorage.removeItem("token");

        window.location.href = "/login";

    });

}

