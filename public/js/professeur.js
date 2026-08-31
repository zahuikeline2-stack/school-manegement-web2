
// ========================================
// TOKEN
// ========================================

const token =
    localStorage.getItem("token");


// ========================================
// VÉRIFIER LE TOKEN
// ========================================

if (!token) {

    window.location.href = "/login";

}


// ========================================
// NAVIGATION
// ========================================

function allerVers(page) {

    window.location.href =
        page +
        "?token=" +
        encodeURIComponent(token);

}


// ========================================
// MENU PROFESSEUR
// ========================================

const menuProfesseur = [

    "/professeur",
    "/professeur/matieres",
    "/professeur/etudiants",
    "/professeur/notes",
    "/professeur/absences"

];


menuProfesseur.forEach(
    (page) => {

        const lien =
            document.querySelector(
                `a[href="${page}"]`
            );


        if (lien) {

            lien.addEventListener(
                "click",
                (e) => {

                    e.preventDefault();

                    allerVers(page);

                }
            );

        }

    }
);


// ========================================
// DÉCONNEXION
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


            localStorage.removeItem(
                "token"
            );


            window.location.href =
                "/login";

        }
    );

}

