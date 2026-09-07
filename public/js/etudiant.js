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
// FONCTION NAVIGATION ÉTUDIANT
// ========================================

function allerVers(page) {

    window.location.href =
        page +
        "?token=" +
        encodeURIComponent(token);

}


// ========================================
// MENU ÉTUDIANT
// ========================================

const menuEtudiant = [

    "/etudiant",
    "/etudiant/matieres",
    "/etudiant/notes",
    "/etudiant/absences",
    "/etudiant/statistiques"

];


// ========================================
// NAVIGATION ENTRE LES PAGES ÉTUDIANT
// ========================================

menuEtudiant.forEach((page) => {

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
// BOUTONS DES CARTES
// ========================================

const cartesEtudiant = document.querySelectorAll(
    ".action-card"
);


cartesEtudiant.forEach((carte) => {

    carte.addEventListener("click", (e) => {

        e.preventDefault();

        const page = carte.getAttribute("href");

        allerVers(page);

    });

});


// ========================================
// DECONNEXION
// ========================================

const deconnecter =
    document.getElementById(
        "deconnecter"
    );


if (deconnecter) {

    deconnecter.addEventListener(
        "click",
        (e) => {

            e.preventDefault();


            // Supprimer le token
            localStorage.removeItem(
                "token"
            );


            // Supprimer le rôle
            localStorage.removeItem(
                "role"
            );


            // Retour à la connexion
            window.location.href =
                "/login";

        }
    );

}