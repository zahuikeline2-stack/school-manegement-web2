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
// NAVIGATION ADMIN
// ========================================

function allerVers(page) {

    window.location.href =
        page +
        "?token=" +
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
// AJOUTER LE TOKEN À TOUS LES LIENS
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