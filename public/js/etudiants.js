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

const btnAjouter =
    document.getElementById("btnAjouter");

const btnLister =
    document.getElementById("btnLister");

const btnRechercher =
    document.getElementById("btnRechercher");

const btnRetour =
    document.getElementById("btnRetour");

const btnAnnuler =
    document.getElementById("btnAnnuler");

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
// CACHER TOUT
// ========================================

function cacherTout() {

    formulaireSection.style.display = "none";

    rechercheSection.style.display = "none";

    listeSection.style.display = "none";

}


// Au chargement

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
// LISTER
// ========================================

btnLister.addEventListener("click", async () => {

    cacherTout();

    listeSection.style.display = "block";


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


        if (!data.status) {

            alert(data.message);

            return;
        }


        afficherEtudiants(data.etudiants);


    } catch (error) {

        console.error(error);

        alert(
            "Erreur lors du chargement des étudiants"
        );

    }

});


// ========================================
// AFFICHER LES ÉTUDIANTS
// ========================================

function afficherEtudiants(etudiants) {

    etudiantsList.innerHTML = "";


    if (!etudiants || etudiants.length === 0) {

        etudiantsList.innerHTML = `
            <p>Aucun étudiant trouvé.</p>
        `;

        return;
    }


    etudiants.forEach((etudiant) => {

        const div =
            document.createElement("div");

        div.classList.add("student-card");


        div.innerHTML = `

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

        `;


        etudiantsList.appendChild(div);

    });

}


// ========================================
// RECHERCHER
// ========================================

btnRechercher.addEventListener("click", () => {

    cacherTout();

    rechercheSection.style.display = "block";

});


// ========================================
// LANCER LA RECHERCHE
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
                "Veuillez entrer l'identifiant de l'étudiant"
            );

            return;
        }


        try {

            const response = await fetch(
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


            listeSection.style.display =
                "block";


            rechercheSection.style.display =
                "none";


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
// RETOUR AU MENU ADMIN
// ========================================

btnRetour.addEventListener("click", () => {

    window.location.href =
        "/admin?token=" +
        encodeURIComponent(token);

});