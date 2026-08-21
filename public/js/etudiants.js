// ========================================
// TOKEN
// ========================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login";
}


// ========================================
// ELEMENTS HTML
// ========================================

const btnAjouter = document.getElementById("btnAjouter");
const btnLister = document.getElementById("btnLister");
const btnRechercher = document.getElementById("btnRechercher");
const btnRetour = document.getElementById("btnRetour");

const btnAnnuler = document.getElementById("btnAnnuler");

const formulaireSection =
    document.getElementById("formulaireSection");

const rechercheSection =
    document.getElementById("rechercheSection");

const listeSection =
    document.getElementById("listeSection");

const etudiantForm =
    document.getElementById("etudiantForm");

const etudiantsList =
    document.getElementById("etudiantsList");


// ========================================
// CACHER LES SECTIONS
// ========================================

function cacherTout() {

    formulaireSection.style.display = "none";
    rechercheSection.style.display = "none";
    listeSection.style.display = "none";

}


// Au démarrage

cacherTout();


// ========================================
// AJOUTER
// ========================================

btnAjouter.addEventListener("click", () => {

    cacherTout();

    formulaireSection.style.display = "block";

});


// ========================================
// ANNULER
// ========================================

btnAnnuler.addEventListener("click", () => {

    etudiantForm.reset();

    cacherTout();

});


// ========================================
// AJOUTER UN ETUDIANT
// ========================================

etudiantForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const matricule =
        document.getElementById("matricule").value;

    const nom =
        document.getElementById("nom").value;

    const prenom =
        document.getElementById("prenom").value;

    const age =
        document.getElementById("age").value;

    const classe =
        document.getElementById("classe").value;


    try {

        const response = await fetch(
            "/api/etudiants",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " + token

                },

                body: JSON.stringify({

                    matricule: matricule,
                    nom: nom,
                    prenom: prenom,
                    age: age,
                    classe: classe

                })

            }
        );


        const data = await response.json();


        console.log(data);


        if (!data.status) {

            alert(data.message);

            return;

        }


        alert(
            "Étudiant ajouté avec succès !"
        );


        etudiantForm.reset();


        cacherTout();


        listeSection.style.display = "block";


        chargerEtudiants();


    } catch (error) {

        console.error(error);

        alert(
            "Erreur lors de l'ajout de l'étudiant"
        );

    }

});


// ========================================
// LISTER LES ETUDIANTS
// ========================================

btnLister.addEventListener("click", () => {

    cacherTout();

    listeSection.style.display = "block";

    chargerEtudiants();

});


async function chargerEtudiants() {

    try {

        const response = await fetch(
            "/api/etudiants",
            {

                method: "GET",

                headers: {

                    "Authorization":
                        "Bearer " + token

                }

            }
        );


        const data = await response.json();


        console.log(data);


        if (!data.status) {

            alert(data.message);

            return;

        }


        afficherEtudiants(
            data.etudiants
        );


    } catch (error) {

        console.error(error);

        alert(
            "Erreur lors du chargement des étudiants"
        );

    }

}


// ========================================
// AFFICHER LES ETUDIANTS
// ========================================

function afficherEtudiants(etudiants) {

    etudiantsList.innerHTML = "";


    if (!etudiants || etudiants.length === 0) {

        etudiantsList.innerHTML = `
            <p class="aucun-etudiant">
                Aucun étudiant enregistré.
            </p>
        `;

        return;

    }


    etudiants.forEach((etudiant) => {

        const div =
            document.createElement("div");

        div.classList.add(
            "student-card"
        );


        div.innerHTML = `

            <div class="student-info">

                <h3>
                    ${etudiant.nom}
                    ${etudiant.prenom}
                </h3>

                <p>
                    <strong>ID :</strong>
                    ${etudiant.id}
                </p>

                <p>
                    <strong>Matricule :</strong>
                    ${etudiant.matricule}
                </p>

                <p>
                    <strong>Âge :</strong>
                    ${etudiant.age}
                </p>

                <p>
                    <strong>Classe :</strong>
                    ${etudiant.classe}
                </p>

                <p>
                    <strong>User ID :</strong>
                    ${etudiant.user_id}
                </p>

            </div>


            <div class="student-actions">

                <button
                    class="btn-modifier"
                    data-id="${etudiant.id}"
                >
                    <i class="fa-solid fa-pen"></i>
                    Modifier
                </button>


                <button
                    class="btn-supprimer"
                    data-id="${etudiant.id}"
                >
                    <i class="fa-solid fa-trash"></i>
                    Supprimer
                </button>

            </div>

        `;


        etudiantsList.appendChild(div);

    });

}


// ========================================
// SUPPRIMER UN ETUDIANT
// ========================================

etudiantsList.addEventListener(
    "click",
    async (e) => {

        const bouton =
            e.target.closest(
                ".btn-supprimer"
            );


        if (!bouton) {

            return;

        }


        const id =
            bouton.dataset.id;


        const confirmation =
            confirm(
                "Voulez-vous vraiment supprimer cet étudiant ?"
            );


        if (!confirmation) {

            return;

        }


        try {

            const response =
                await fetch(
                    "/api/etudiants/" + id,
                    {

                        method: "DELETE",

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


            alert(
                "Étudiant supprimé avec succès !"
            );


            chargerEtudiants();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la suppression de l'étudiant"
            );

        }

    }
);


// ========================================
// MODIFIER UN ETUDIANT
// ========================================

etudiantsList.addEventListener(
    "click",
    async (e) => {

        const bouton =
            e.target.closest(
                ".btn-modifier"
            );


        if (!bouton) {

            return;

        }


        const id =
            bouton.dataset.id;


        const matricule =
            prompt(
                "Nouveau matricule :"
            );


        if (matricule === null) {
            return;
        }


        const nom =
            prompt(
                "Nouveau nom :"
            );


        if (nom === null) {
            return;
        }


        const prenom =
            prompt(
                "Nouveau prénom :"
            );


        if (prenom === null) {
            return;
        }


        const age =
            prompt(
                "Nouvel âge :"
            );


        if (age === null) {
            return;
        }


        const classe =
            prompt(
                "Nouvelle classe :"
            );


        if (classe === null) {
            return;
        }


        try {

            const response =
                await fetch(
                    "/api/etudiants/" + id,
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body: JSON.stringify({

                            matricule:
                                matricule,

                            nom:
                                nom,

                            prenom:
                                prenom,

                            age:
                                age,

                            classe:
                                classe

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
                "Étudiant modifié avec succès !"
            );


            chargerEtudiants();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la modification"
            );

        }

    }
);


// ========================================
// RECHERCHER
// ========================================

btnRechercher.addEventListener(
    "click",
    () => {

        cacherTout();

        rechercheSection.style.display =
            "block";

    }
);


// ========================================
// LANCER RECHERCHE
// ========================================

const btnLancerRecherche =
    document.getElementById(
        "btnLancerRecherche"
    );


btnLancerRecherche.addEventListener(
    "click",
    async () => {

        const id =
            document.getElementById(
                "recherche"
            ).value;


        if (!id) {

            alert(
                "Entrez l'identifiant de l'étudiant"
            );

            return;

        }


        try {

            const response =
                await fetch(
                    "/api/etudiants/" + id,
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


            if (!data.status) {

                alert(data.message);

                return;

            }


            rechercheSection.style.display =
                "none";

            listeSection.style.display =
                "block";


            afficherEtudiants(
                [data.etudiant]
            );


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la recherche"
            );

        }

    }
);


// ========================================
// RETOUR ADMIN
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