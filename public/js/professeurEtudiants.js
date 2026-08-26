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

const btnLister =
    document.getElementById("btnLister");

const btnRechercher =
    document.getElementById("btnRechercher");

const btnLancerRecherche =
    document.getElementById("btnLancerRecherche");

const btnRetour =
    document.getElementById("btnRetour");

const rechercheSection =
    document.getElementById("rechercheSection");

const listeSection =
    document.getElementById("listeSection");

const etudiantsList =
    document.getElementById("etudiantsList");


// ========================================
// CACHER LES SECTIONS
// ========================================

function cacherTout() {

    rechercheSection.style.display = "none";

    listeSection.style.display = "none";

}


// ========================================
// AU CHARGEMENT
// ========================================

cacherTout();


// ========================================
// LISTER LES ÉTUDIANTS
// ========================================

btnLister.addEventListener(
    "click",
    async () => {

        cacherTout();

        listeSection.style.display = "block";


        try {

            const response = await fetch(
                "/api/professeur/etudiants",
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

                etudiantsList.innerHTML = `
                    <p class="erreur">
                        ${data.message}
                    </p>
                `;

                return;

            }


            afficherEtudiants(
                data.etudiants
            );


        } catch (error) {

            console.error(error);

            etudiantsList.innerHTML = `
                <p class="erreur">
                    Erreur lors du chargement
                    des étudiants.
                </p>
            `;

        }

    }
);


// ========================================
// AFFICHER LES ÉTUDIANTS
// ========================================

function afficherEtudiants(etudiants) {

    etudiantsList.innerHTML = "";


    if (
        !etudiants ||
        etudiants.length === 0
    ) {

        etudiantsList.innerHTML = `
            <div class="aucun">

                <i class="fa-solid fa-user-graduate"></i>

                <p>
                    Aucun étudiant trouvé.
                </p>

            </div>
        `;

        return;

    }


    etudiants.forEach((etudiant) => {

        const card =
            document.createElement("div");

        card.classList.add(
            "etudiant-card"
        );


        card.innerHTML = `

            <div class="etudiant-icon">

                <i class="fa-solid fa-user-graduate"></i>

            </div>


            <div class="etudiant-info">

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

            </div>

        `;


        etudiantsList.appendChild(card);

    });

}


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
// LANCER LA RECHERCHE
// ========================================

btnLancerRecherche.addEventListener(
    "click",
    async () => {

        const id =
            document.getElementById(
                "recherche"
            ).value;


        if (!id) {

            alert(
                "Veuillez entrer l'ID de l'étudiant."
            );

            return;

        }


        try {

            const response = await fetch(
                "/api/professeur/etudiants/" + id,
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


            rechercheSection.style.display =
                "none";

            listeSection.style.display =
                "block";


            afficherEtudiants([
                data.etudiant
            ]);


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la recherche."
            );

        }

    }
);


// ========================================
// RETOUR
// ========================================

btnRetour.addEventListener(
    "click",
    () => {

        window.location.href =
            "/professeur";

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