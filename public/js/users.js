// ========================================
// RÉCUPÉRER LE TOKEN
// ========================================

const token = localStorage.getItem("token");


// Vérifier si le token existe

if (!token) {

    window.location.href = "/login";

}


// ========================================
// RÉCUPÉRER LES ÉLÉMENTS HTML
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
// BOUTON AJOUTER
// ========================================

btnAjouter.addEventListener("click", () => {

    formulaireSection.style.display = "block";

    listeSection.style.display = "none";

});


// ========================================
// BOUTON LISTER
// ========================================

btnLister.addEventListener("click", async () => {

    formulaireSection.style.display = "none";

    listeSection.style.display = "block";


    try {

        const response = await fetch("/api/users", {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });


        const data = await response.json();


        console.log(data);


        if (!data.status) {

            alert(data.message);

            return;

        }


        usersList.innerHTML = "";


        data.users.forEach((user) => {

            const div = document.createElement("div");

            div.classList.add("user-card");


            div.innerHTML = `

                <div class="user-info">

                    <h3>${user.name}</h3>

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

});


// ========================================
// RETOUR AU MENU ADMIN
// ========================================

btnRetour.addEventListener("click", () => {

    window.location.href =
        "/admin?token=" + token;

});


// ========================================
// AJOUTER UN UTILISATEUR
// ========================================

userForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const role =
        document.getElementById("role").value;


    try {

        const response = await fetch("/api/users", {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json",

                "Authorization":
                    "Bearer " + token

            },

            body: JSON.stringify({

                name: name,

                email: email,

                password: password,

                role: role

            })

        });


        const data = await response.json();


        console.log(data);


        if (!data.status) {

            alert(data.message);

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

});


// ========================================
// SUPPRIMER UN UTILISATEUR
// ========================================

usersList.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("delete-btn")) {

        return;

    }


    const id = e.target.dataset.id;


    const confirmation = confirm(
        "Voulez-vous vraiment supprimer cet utilisateur ?"
    );


    if (!confirmation) {

        return;

    }


    try {

        const response = await fetch(
            "/api/users/" + id,
            {

                method: "DELETE",

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

});


// ========================================
// DÉCONNEXION
// ========================================

const deconnecter =
    document.getElementById("deconnecter");


deconnecter.addEventListener("click", (e) => {

    e.preventDefault();


    localStorage.removeItem("token");


    window.location.href = "/login";

});