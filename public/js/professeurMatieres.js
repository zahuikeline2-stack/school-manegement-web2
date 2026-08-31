
// ========================================
// TOKEN
// ========================================

const token =
    localStorage.getItem("token");


// ========================================
// VÉRIFIER LE TOKEN
// ========================================

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
// FONCTION NAVIGATION
// ========================================

function allerVers(page) {

    window.location.href =
        page +
        "?token=" +
        encodeURIComponent(token);

}


// ========================================
// MENU PROFESSEUR
// ========================================

const menuProfesseur = [

    "/professeur",

    "/professeur/matieres",

    "/professeur/etudiants",

    "/professeur/notes",

    "/professeur/absences"

];


// ========================================
// LIENS DE LA BARRE LATERALE
// ========================================

const liens =
    document.querySelectorAll(
        ".Barre nav a"
    );


liens.forEach(
    (lien) => {

        lien.addEventListener(
            "click",
            (e) => {

                e.preventDefault();


                const page =
                    lien.getAttribute(
                        "href"
                    );


                if (
                    menuProfesseur.includes(page)
                ) {

                    allerVers(page);

                }

            }
        );

    }
);


// ========================================
// CHARGER MES MATIÈRES
// ========================================

async function chargerMatieres() {

    try {

        matieresList.innerHTML = `

            <p class="loading">

                Chargement des matières...

            </p>

        `;


        const response =
            await fetch(
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


        console.log(
            "Réponse matières :",
            data
        );


        // ========================================
        // TOKEN INVALIDE OU EXPIRÉ
        // ========================================

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            localStorage.removeItem(
                "token"
            );

            window.location.href =
                "/login";

            return;

        }


        // ========================================
        // ERREUR API
        // ========================================

        if (!data.status) {

            matieresList.innerHTML = `

                <p class="loading">

                    ${data.message}

                </p>

            `;

            return;

        }


        // ========================================
        // AFFICHER LES MATIÈRES
        // ========================================

        afficherMatieres(
            data.matieres
        );


    } catch (error) {

        console.error(
            "Erreur chargement matières :",
            error
        );


        matieresList.innerHTML = `

            <p class="loading">

                Erreur lors du chargement
                des matières.

            </p>

        `;

    }

}


// ========================================
// AFFICHER LES MATIÈRES
// ========================================

function afficherMatieres(matieres) {

    matieresList.innerHTML = "";


    // ========================================
    // AUCUNE MATIÈRE
    // ========================================

    if (
        !matieres ||
        matieres.length === 0
    ) {

        matieresList.innerHTML = `

            <div class="matiere-vide">

                <i class="fa-solid fa-book-open"></i>

                <p>

                    Aucune matière ne vous
                    est affectée.

                </p>

            </div>

        `;

        return;

    }


    // ========================================
    // CRÉER LES CARTES
    // ========================================

    matieres.forEach(
        (matiere) => {

            const div =
                document.createElement(
                    "div"
                );


            div.classList.add(
                "matiere-card"
            );


            div.innerHTML = `

                <div class="matiere-icon">

                    <i class="fa-solid fa-book"></i>

                </div>


                <div class="matiere-info">

                    <h3>

                        ${matiere.nom}

                    </h3>


                    <p>

                        <strong>
                            ID :
                        </strong>

                        ${matiere.id}

                    </p>

                </div>

            `;


            matieresList.appendChild(
                div
            );

        }
    );

}


// ========================================
// BOUTON RETOUR
// ========================================

if (btnRetour) {

    btnRetour.addEventListener(
        "click",
        () => {

            allerVers(
                "/professeur"
            );

        }
    );

}


// ========================================
// DÉCONNEXION
// ========================================

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


// ========================================
// CHARGEMENT AUTOMATIQUE
// ========================================

chargerMatieres();

