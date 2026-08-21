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

const professeurForm =
    document.getElementById("professeurForm");

const professeursList =
    document.getElementById("professeursList");

const professeurId =
    document.getElementById("professeurId");

const formTitle =
    document.getElementById("formTitle");


// ========================================
// CACHER TOUT
// ========================================

function cacherTout() {

    formulaireSection.style.display = "none";

    rechercheSection.style.display = "none";

    listeSection.style.display = "none";

}


// ========================================
// AJOUTER
// ========================================

btnAjouter.addEventListener("click", () => {

    cacherTout();

    professeurForm.reset();

    professeurId.value = "";

    formTitle.textContent =
        "Ajouter un professeur";

    formulaireSection.style.display = "block";

});


// ========================================
// ANNULER
// ========================================

btnAnnuler.addEventListener("click", () => {

    professeurForm.reset();

    professeurId.value = "";

    cacherTout();

});


// ========================================
// LISTER
// ========================================

btnLister.addEventListener(
    "click",
    chargerProfesseurs
);


async function chargerProfesseurs() {

    cacherTout();

    listeSection.style.display = "block";


    try {

        const response = await fetch(
            "/api/professeurs",
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


        afficherProfesseurs(
            data.professeurs
        );


    } catch (error) {

        console.error(error);

        alert(
            "Erreur lors du chargement des professeurs"
        );

    }

}


// ========================================
// AFFICHER
// ========================================

function afficherProfesseurs(professeurs) {

    professeursList.innerHTML = "";


    if (
        !professeurs ||
        professeurs.length === 0
    ) {

        professeursList.innerHTML =
            "<p>Aucun professeur trouvé.</p>";

        return;

    }


    professeurs.forEach((professeur) => {

        const div =
            document.createElement("div");

        div.classList.add(
            "teacher-card"
        );


        div.innerHTML = `

            <div class="teacher-info">

                <h3>
                    ${professeur.nom}
                </h3>

                <p>
                    <strong>ID :</strong>
                    ${professeur.id}
                </p>

                <p>
                    <strong>Matière :</strong>
                    ${professeur.matiere}
                </p>

                <p>
                    <strong>User ID :</strong>
                    ${professeur.user_id}
                </p>

            </div>


            <div class="teacher-actions">

                <button
                    class="edit-btn"
                    data-id="${professeur.id}"
                >

                    <i class="fa-solid fa-pen"></i>

                    Modifier

                </button>


                <button
                    class="delete-btn"
                    data-id="${professeur.id}"
                >

                    <i class="fa-solid fa-trash"></i>

                    Supprimer

                </button>

            </div>

        `;


        professeursList.appendChild(div);

    });

}


// ========================================
// AJOUTER / MODIFIER
// ========================================

professeurForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();


        const nom =
            document.getElementById("nom").value;

        const matiere =
            document.getElementById("matiere").value;

        const id =
            professeurId.value;


        try {

            let url =
                "/api/professeurs";

            let method =
                "POST";


            // MODIFICATION

            if (id) {

                url =
                    "/api/professeurs/" + id;

                method =
                    "PUT";

            }


            const response =
                await fetch(
                    url,
                    {
                        method: method,

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body: JSON.stringify({

                            nom: nom,

                            matiere: matiere

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


            alert(data.message);


            professeurForm.reset();

            professeurId.value = "";


            formTitle.textContent =
                "Ajouter un professeur";


            chargerProfesseurs();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de l'enregistrement"
            );

        }

    }
);


// ========================================
// MODIFIER
// ========================================

professeursList.addEventListener(
    "click",
    async (e) => {

        const bouton =
            e.target.closest(".edit-btn");


        if (!bouton) {

            return;

        }


        const id =
            bouton.dataset.id;


        try {

            const response =
                await fetch(
                    "/api/professeurs/" + id,
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


            const professeur =
                data.professeur;


            cacherTout();

            formulaireSection.style.display =
                "block";


            formTitle.textContent =
                "Modifier le professeur";


            professeurId.value =
                professeur.id;

            document.getElementById("nom").value =
                professeur.nom;

            document.getElementById("matiere").value =
                professeur.matiere;


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la récupération du professeur"
            );

        }

    }
);


// ========================================
// SUPPRIMER
// ========================================

professeursList.addEventListener(
    "click",
    async (e) => {

        const bouton =
            e.target.closest(".delete-btn");


        if (!bouton) {

            return;

        }


        const id =
            bouton.dataset.id;


        const confirmation =
            confirm(
                "Voulez-vous vraiment supprimer ce professeur ?"
            );


        if (!confirmation) {

            return;

        }


        try {

            const response =
                await fetch(
                    "/api/professeurs/" + id,
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


            if (!data.status) {

                alert(data.message);

                return;

            }


            alert(data.message);


            chargerProfesseurs();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la suppression"
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

document
    .getElementById("btnLancerRecherche")
    .addEventListener(
        "click",
        async () => {

            const id =
                document.getElementById(
                    "recherche"
                ).value;


            if (!id) {

                alert(
                    "Veuillez entrer l'ID du professeur"
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        "/api/professeurs/" + id,
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


                cacherTout();

                listeSection.style.display =
                    "block";


                afficherProfesseurs(
                    [data.professeur]
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
// DÉCONNEXION
// ========================================

document
    .getElementById("deconnecter")
    .addEventListener(
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