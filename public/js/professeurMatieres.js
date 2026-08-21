// ========================================
// TOKEN
// ========================================

const token = localStorage.getItem("token");


if (!token) {

    window.location.href = "/login";

}


// ========================================
// ÉLÉMENTS
// ========================================

const btnLister =
    document.getElementById("btnLister");

const btnRetour =
    document.getElementById("btnRetour");

const matieresList =
    document.getElementById("matieresList");


// ========================================
// LISTER LES MATIÈRES
// ========================================

btnLister.addEventListener("click", async () => {

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


        const data =
            await response.json();


        console.log(data);


        if (!data.status) {

            alert(data.message);

            return;

        }


        afficherMatieres(data.matieres);


    } catch (error) {

        console.error(error);

        alert(
            "Erreur lors du chargement des matières"
        );

    }

});


// ========================================
// AFFICHER LES MATIÈRES
// ========================================

function afficherMatieres(matieres) {

    matieresList.innerHTML = "";


    if (
        !matieres ||
        matieres.length === 0
    ) {

        matieresList.innerHTML = `
            <p>Aucune matière trouvée.</p>
        `;

        return;

    }


    matieres.forEach((matiere) => {

        const div =
            document.createElement("div");


        div.classList.add("student-card");


        div.innerHTML = `

            <h3>
                ${matiere.nom}
            </h3>

            <p>
                <strong>ID :</strong>
                ${matiere.id}
            </p>

            <p>
                <strong>Professeur :</strong>
                ${matiere.teacher_id}
            </p>

        `;


        matieresList.appendChild(div);

    });

}


// ========================================
// RETOUR
// ========================================

btnRetour.addEventListener("click", () => {

    window.location.href =
        "/professeur?token=" +
        encodeURIComponent(token);

});