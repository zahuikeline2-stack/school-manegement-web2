
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
// RÉCUPÉRER LES BOUTONS
// ========================================

const btnAjouter = document.getElementById("btnAjouter");

const btnLister = document.getElementById("btnLister");

const btnRechercher = document.getElementById("btnRechercher");

const btnAnnuler = document.getElementById("btnAnnuler");

const btnLancerRecherche =
    document.getElementById("btnLancerRecherche");

const btnRetour =
    document.getElementById("btnRetour");


// ========================================
// RÉCUPÉRER LES SECTIONS
// ========================================

const formulaireSection =
    document.getElementById("formulaireSection");

const listeSection =
    document.getElementById("listeSection");

const rechercheSection =
    document.getElementById("rechercheSection");


// ========================================
// AFFICHER UNE SEULE SECTION
// ========================================

function afficherSection(section) {

    // Cacher toutes les sections

    formulaireSection.style.display = "none";

    listeSection.style.display = "none";

    rechercheSection.style.display = "none";


    // Afficher la section demandée

    section.style.display = "block";

}


// ========================================
// BOUTON AJOUTER
// ========================================

btnAjouter.addEventListener("click", () => {

    afficherSection(formulaireSection);

});


// ========================================
// BOUTON LISTER
// ========================================

btnLister.addEventListener("click", () => {

    afficherSection(listeSection);

    chargerEtudiants();

});


// ========================================
// BOUTON RECHERCHER
// ========================================

btnRechercher.addEventListener("click", () => {

    afficherSection(rechercheSection);

});


// ========================================
// BOUTON ANNULER
// ========================================

btnAnnuler.addEventListener("click", () => {

    formulaireSection.style.display = "none";

});


// ========================================
// BOUTON RETOUR AU MENU
// ========================================

btnRetour.addEventListener("click", () => {

    allerVers("/admin");

});


// ========================================
// AJOUTER UN ÉTUDIANT
// ========================================

const etudiantForm =
    document.getElementById("etudiantForm");

etudiantForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    // Récupérer les valeurs du formulaire

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

    const user_id =
        document.getElementById("user_id").value;


    try {

        const response = await fetch(
            "/api/etudiants",
            {
                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify({

                    matricule: matricule,
                    nom: nom,
                    prenom: prenom,
                    age: age,
                    classe: classe,
                    user_id: Number(user_id)

                })

            }
        );


        const data = await response.json();


        if (!response.ok || !data.status) {

            alert(
                data.message ||
                "Erreur lors de l'ajout de l'étudiant"
            );

            return;

        }


        alert("Étudiant ajouté avec succès !");


        // Réinitialiser le formulaire

        etudiantForm.reset();


        // Cacher le formulaire

        formulaireSection.style.display = "none";


        // Afficher la liste

        afficherSection(listeSection);

        chargerEtudiants();


    } catch (error) {

        console.error(error);

        alert(
            "Erreur lors de la communication avec le serveur."
        );

    }

});


// ========================================
// CHARGER LA LISTE DES ÉTUDIANTS
// ========================================

async function chargerEtudiants() {

    const etudiantsList =
        document.getElementById("etudiantsList");


    etudiantsList.innerHTML =
        "<p>Chargement des étudiants...</p>";


    try {

        const response = await fetch(
            "/api/etudiants",
            {
                method: "GET",

                headers: {

                    "Authorization": "Bearer " + token

                }

            }
        );


        const data = await response.json();


        if (!response.ok || !data.status) {

            etudiantsList.innerHTML =
                "<p>Erreur lors du chargement des étudiants.</p>";

            return;

        }


        const etudiants = data.etudiants;


        if (!etudiants || etudiants.length === 0) {

            etudiantsList.innerHTML =
                "<p>Aucun étudiant enregistré.</p>";

            return;

        }


        etudiantsList.innerHTML = "";


        etudiants.forEach((etudiant) => {

            const card =
                document.createElement("div");

            card.classList.add("etudiant-card");


            card.innerHTML = `

                <h3>
                    ${etudiant.nom} ${etudiant.prenom}
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
                    <strong>ID utilisateur :</strong>
                    ${etudiant.user_id}
                </p>

            `;


            etudiantsList.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        etudiantsList.innerHTML =
            "<p>Erreur lors du chargement des étudiants.</p>";

    }

}


// ========================================
// RECHERCHER UN ÉTUDIANT
// ========================================

btnLancerRecherche.addEventListener(
    "click",
    async () => {

        const id =
            document.getElementById("recherche").value;


        if (!id) {

            alert(
                "Veuillez entrer l'identifiant de l'étudiant."
            );

            return;

        }


        try {

            const response = await fetch(
                `/api/etudiants/${id}`,
                {
                    method: "GET",

                    headers: {

                        "Authorization": "Bearer " + token

                    }

                }
            );


            const data = await response.json();


            if (!response.ok || !data.status) {

                alert(
                    data.message ||
                    "Étudiant introuvable."
                );

                return;

            }


            const etudiant = data.etudiant;


            const etudiantsList =
                document.getElementById("etudiantsList");


            afficherSection(listeSection);


            etudiantsList.innerHTML = `

                <div class="etudiant-card">

                    <h3>
                        ${etudiant.nom} ${etudiant.prenom}
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
                        <strong>ID utilisateur :</strong>
                        ${etudiant.user_id}
                    </p>

                </div>

            `;


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la recherche."
            );

        }

    }
);

