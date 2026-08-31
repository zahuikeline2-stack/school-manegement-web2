// ========================================
// RÉCUPÉRER LE TOKEN
// ========================================

const token = localStorage.getItem("token");


// ========================================
// VÉRIFIER LE TOKEN ET LE RÔLE
// ========================================

function verifierAdmin(token) {

    try {

        if (!token) {

            return false;

        }


        const parties = token.split(".");

        if (parties.length !== 3) {

            return false;

        }


        const payload = JSON.parse(
            atob(parties[1])
        );


        // Vérifier l'expiration

        if (!payload.exp) {

            return false;

        }


        const maintenant =
            Math.floor(Date.now() / 1000);


        if (payload.exp <= maintenant) {

            return false;

        }


        // Vérifier le rôle

        if (payload.role !== "admin") {

            return false;

        }


        return true;

    } catch (error) {

        console.error(
            "Token invalide :",
            error
        );

        return false;

    }

}


// ========================================
// SI CE N'EST PAS UN ADMIN
// ========================================

if (!verifierAdmin(token)) {

    localStorage.removeItem("token");

    window.location.href = "/login";

}


// ========================================
// ÉLÉMENTS HTML
// ========================================

const btnAjouter =
    document.getElementById("btnAjouter");

const btnLister =
    document.getElementById("btnLister");

const btnRetour =
    document.getElementById("btnRetour");

const formulaireSection =
    document.getElementById("formulaireSection");

const listeSection =
    document.getElementById("listeSection");

const userForm =
    document.getElementById("userForm");

const usersList =
    document.getElementById("usersList");


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

document
    .querySelectorAll(".menu-admin")
    .forEach((lien) => {

        lien.addEventListener(
            "click",
            (e) => {

                e.preventDefault();

                const page =
                    lien.getAttribute("href");

                allerVers(page);

            }
        );

    });


// ========================================
// RETOUR ACCUEIL
// ========================================

document
    .getElementById("retourAccueil")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/admin");

    });


// ========================================
// BOUTON AJOUTER
// ========================================

btnAjouter.addEventListener("click", () => {

    formulaireSection.style.display =
        "block";

    listeSection.style.display =
        "none";

});


// ========================================
// BOUTON LISTER
// ========================================

btnLister.addEventListener(
    "click",
    async () => {

        formulaireSection.style.display =
            "none";

        listeSection.style.display =
            "block";


        try {

            const response =
                await fetch(
                    "/api/users",
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


            if (!response.ok || !data.status) {

                alert(
                    data.message ||
                    "Accès refusé"
                );

                return;

            }


            usersList.innerHTML = "";


            data.users.forEach((user) => {

                const div =
                    document.createElement("div");


                div.classList.add(
                    "user-card"
                );


                div.innerHTML = `

                    <div class="user-info">

                        <h3>
                            ${user.name}
                        </h3>

                        <p>
                            Email : ${user.email}
                        </p>

                        <p>
                            Rôle : ${user.role}
                        </p>

                    </div>

                    <button
                        class="delete-btn"
                        data-id="${user.id}"
                    >
                        Supprimer
                    </button>

                `;


                usersList.appendChild(div);

            });


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors du chargement des utilisateurs"
            );

        }

    }
);


// ========================================
// RETOUR AU MENU
// ========================================

btnRetour.addEventListener(
    "click",
    () => {

        allerVers("/admin");

    }
);


// ========================================
// AJOUTER UN UTILISATEUR
// ========================================

userForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        const role =
            document
                .getElementById("role")
                .value;


        try {

            const response =
                await fetch(
                    "/api/users",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body: JSON.stringify({

                            name,
                            email,
                            password,
                            role

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok || !data.status) {

                alert(
                    data.message ||
                    "Erreur lors de l'ajout"
                );

                return;

            }


            alert(
                "Utilisateur ajouté avec succès"
            );


            userForm.reset();


            formulaireSection.style.display =
                "none";

            listeSection.style.display =
                "block";


            btnLister.click();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de l'ajout de l'utilisateur"
            );

        }

    }
);


// ========================================
// SUPPRIMER UN UTILISATEUR
// ========================================

usersList.addEventListener(
    "click",
    async (e) => {

        if (
            !e.target.classList.contains(
                "delete-btn"
            )
        ) {

            return;

        }


        const id =
            e.target.dataset.id;


        const confirmation =
            confirm(
                "Voulez-vous vraiment supprimer cet utilisateur ?"
            );


        if (!confirmation) {

            return;

        }


        try {

            const response =
                await fetch(
                    "/api/users/" + id,
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


            if (!response.ok || !data.status) {

                alert(
                    data.message ||
                    "Erreur lors de la suppression"
                );

                return;

            }


            alert(
                "Utilisateur supprimé avec succès"
            );


            btnLister.click();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la suppression"
            );

        }

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


            localStorage.removeItem("token");


            window.location.href =
                "/login";

        }
    );