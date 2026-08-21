// ========================================
// TOKEN
// ========================================

const token = localStorage.getItem("token");


if (!token) {

    window.location.href = "/login";

}


// ========================================
// ÉLÉMENTS HTML
// ========================================

const meilleurEtudiant =
    document.getElementById(
        "meilleurEtudiant"
    );


const moyenneGenerale =
    document.getElementById(
        "moyenneGenerale"
    );


const totalAbsences =
    document.getElementById(
        "totalAbsences"
    );


const btnActualiser =
    document.getElementById(
        "btnActualiser"
    );


const btnRetour =
    document.getElementById(
        "btnRetour"
    );


// ========================================
// CHARGER LES STATISTIQUES
// ========================================

async function chargerStatistiques() {

    try {

        const response = await fetch(
            "/api/statistiques",
            {

                method: "GET",

                headers: {

                    "Authorization":
                        "Bearer " + token

                }

            }
        );


        const data =
            await response.json();


        console.log(data);


        if (!data.status) {

            alert(data.message);

            return;

        }


        // =================================
        // MEILLEUR ÉTUDIANT
        // =================================

        if (data.meilleurEtudiant) {

            meilleurEtudiant.textContent =
                "Étudiant ID : " +
                data.meilleurEtudiant.student_id +
                " — Moyenne : " +
                Number(
                    data.meilleurEtudiant.moyenne
                ).toFixed(2) +
                "/20";

        } else {

            meilleurEtudiant.textContent =
                "Aucun étudiant";

        }


        // =================================
        // MOYENNE GÉNÉRALE
        // =================================

        if (data.moyenneGenerale) {

            const moyenne =
                data.moyenneGenerale
                    .moyenne_generale;


            if (moyenne !== null) {

                moyenneGenerale.textContent =
                    Number(moyenne)
                        .toFixed(2) +
                    " / 20";

            } else {

                moyenneGenerale.textContent =
                    "Aucune note";

            }

        }


        // =================================
        // ABSENCES
        // =================================

        if (data.absences) {

            totalAbsences.textContent =
                data.absences.total_absences;

        } else {

            totalAbsences.textContent =
                "0";

        }


    } catch (error) {

        console.error(error);

        alert(
            "Erreur lors du chargement des statistiques"
        );

    }

}


// ========================================
// ACTUALISER
// ========================================

btnActualiser.addEventListener(
    "click",
    () => {

        chargerStatistiques();

    }
);


// ========================================
// RETOUR
// ========================================

btnRetour.addEventListener(
    "click",
    () => {

        window.location.href =
            "/admin?token=" +
            encodeURIComponent(token);

    }
);


// ========================================
// DÉCONNEXION
// ========================================

const deconnecter =
    document.getElementById(
        "deconnecter"
    );


deconnecter.addEventListener(
    "click",
    (e) => {

        e.preventDefault();

        localStorage.removeItem("token");

        window.location.href =
            "/login";

    }
);


// ========================================
// CHARGEMENT AUTOMATIQUE
// ========================================

chargerStatistiques();