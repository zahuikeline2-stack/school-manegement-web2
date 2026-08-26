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

const matieresList =
    document.getElementById("matieresList");

const btnRetour =
    document.getElementById("btnRetour");

const deconnecter =
    document.getElementById("deconnecter");


// ========================================
// CHARGER LES MATIÈRES
// ========================================

async function chargerMatieres() {

    try {

        const response = await fetch(
            "/api/professeur/matieres",
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

            matieresList.innerHTML = `
                <p class="erreur">
                    ${data.message}
                </p>
            `;

            return;
        }


        afficherMatieres(data.matieres);


    } catch (error) {

        console.error(error);

        matieresList.innerHTML = `
            <p class="erreur">
                Erreur lors du chargement des matières.
            </p>
        `;

    }

}


// ========================================
// AFFICHER LES MATIÈRES
// ========================================

function afficherMatieres(matieres) {

    matieresList.innerHTML = "";


    if (!matieres || matieres.length === 0) {

        matieresList.innerHTML = `
            <div class="aucune">

                <i class="fa-solid fa-book-open"></i>

                <p>
                    Aucune matière ne vous est affectée.
                </p>

            </div>
        `;

        return;
    }


    matieres.forEach((matiere) => {

        const card =
            document.createElement("div");

        card.classList.add("matiere-card");


        card.innerHTML = `

            <div class="matiere-icon">

                <i class="fa-solid fa-book"></i>

            </div>


            <div class="matiere-info">

                <h3>
                    ${matiere.nom}
                </h3>

                <p>
                    ID de la matière :
                    <strong>${matiere.id}</strong>
                </p>

            </div>

        `;


        matieresList.appendChild(card);

    });

}


// ========================================
// RETOUR
// ========================================

btnRetour.addEventListener("click", () => {

    window.location.href =
        "/professeur";

});


// ========================================
// DÉCONNEXION
// ========================================

deconnecter.addEventListener("click", (e) => {

    e.preventDefault();

    localStorage.removeItem("token");

    window.location.href =
        "/login";

});


// ========================================
// LANCEMENT
// ========================================

chargerMatieres();