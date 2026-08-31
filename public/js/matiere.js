
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
// FONCTION NAVIGATION ADMIN
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
// NAVIGATION ENTRE LES PAGES ADMIN
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
// ELEMENTS HTML
// ========================================

const btnAjouter =
    document.getElementById("btnAjouter");

const btnLister =
    document.getElementById("btnLister");

const btnAffecter =
    document.getElementById("btnAffecter");

const btnRetour =
    document.getElementById("btnRetour");

const btnAnnuler =
    document.getElementById("btnAnnuler");

const formulaireSection =
    document.getElementById("formulaireSection");

const affecterSection =
    document.getElementById("affecterSection");

const listeSection =
    document.getElementById("listeSection");

const matiereForm =
    document.getElementById("matiereForm");

const affecterForm =
    document.getElementById("affecterForm");

const matieresList =
    document.getElementById("matieresList");


// ========================================
// CACHER TOUTES LES SECTIONS
// ========================================

function cacherTout() {

    formulaireSection.style.display = "none";

    affecterSection.style.display = "none";

    listeSection.style.display = "none";

}


// ========================================
// AU DÉMARRAGE
// ========================================

cacherTout();


// ========================================
// BOUTON AJOUTER
// ========================================

btnAjouter.addEventListener("click", () => {

    cacherTout();

    formulaireSection.style.display = "block";

});


// ========================================
// BOUTON ANNULER
// ========================================

btnAnnuler.addEventListener("click", () => {

    matiereForm.reset();

    cacherTout();

});


// ========================================
// BOUTON LISTER
// ========================================

btnLister.addEventListener("click", () => {

    cacherTout();

    listeSection.style.display = "block";

    chargerMatieres();

});


// ========================================
// CHARGER LES MATIERES
// ========================================

async function chargerMatieres() {

    try {

        const response = await fetch(
            "/api/matieres",
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


        afficherMatieres(
            data.matieres
        );


    } catch (error) {

        console.error(error);

        alert(
            "Erreur lors du chargement des matières"
        );

    }

}


// ========================================
// AFFICHER LES MATIERES
// ========================================

function afficherMatieres(matieres) {

    matieresList.innerHTML = "";


    if (!matieres || matieres.length === 0) {

        matieresList.innerHTML = `

            <p>
                Aucune matière trouvée.
            </p>

        `;

        return;

    }


    matieres.forEach((matiere) => {

        const div =
            document.createElement("div");


        div.classList.add(
            "matiere-card"
        );


        div.innerHTML = `

            <h3>
                ${matiere.nom}
            </h3>


            <p>

                <strong>ID :</strong>

                ${matiere.id}

            </p>


            <p>

                <strong>Professeur ID :</strong>

                ${
                    matiere.teacher_id ??
                    "Non affecté"
                }

            </p>

        `;


        matieresList.appendChild(div);

    });

}


// ========================================
// AJOUTER UNE MATIERE
// ========================================

matiereForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();


        const nom =
            document.getElementById(
                "nom"
            ).value;


        const teacher_id =
            document.getElementById(
                "teacher_id"
            ).value;


        try {

            const response =
                await fetch(
                    "/api/matieres",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body: JSON.stringify({

                            nom: nom,

                            teacher_id:
                                Number(teacher_id)

                        })

                    }
                );


            const data =
                await response.json();


            console.log(data);


            if (!data.status) {

                alert(data.message);

                return;

            }


            alert(
                "Matière ajoutée avec succès !"
            );


            matiereForm.reset();


            cacherTout();


            listeSection.style.display =
                "block";


            chargerMatieres();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de l'ajout de la matière"
            );

        }

    }
);


// ========================================
// BOUTON AFFECTER
// ========================================

btnAffecter.addEventListener("click", () => {

    cacherTout();

    affecterSection.style.display = "block";

});


// ========================================
// AFFECTER UN PROFESSEUR
// ========================================

affecterForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();


        const id =
            document.getElementById(
                "matiere_id"
            ).value;


        const teacher_id =
            document.getElementById(
                "affectTeacherId"
            ).value;


        try {

            const response =
                await fetch(
                    "/api/matieres/" +
                    id +
                    "/affecter",
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body: JSON.stringify({

                            teacher_id:
                                Number(teacher_id)

                        })

                    }
                );


            const data =
                await response.json();


            console.log(data);


            if (!data.status) {

                alert(data.message);

                return;

            }


            alert(
                "Professeur affecté avec succès !"
            );


            affecterForm.reset();


            cacherTout();


            listeSection.style.display =
                "block";


            chargerMatieres();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de l'affectation"
            );

        }

    }
);


// ========================================
// RETOUR AU MENU ADMIN
// ========================================

btnRetour.addEventListener("click", () => {

    allerVers("/admin");

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


            localStorage.removeItem(
                "token"
            );


            window.location.href =
                "/login";

        }
    );

}

