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

const btnAjouter =
    document.getElementById("btnAjouter");

const btnRechercher =
    document.getElementById("btnRechercher");

const btnHistorique =
    document.getElementById("btnHistorique");

const btnLancerRecherche =
    document.getElementById("btnLancerRecherche");

const btnRetour =
    document.getElementById("btnRetour");

const annulerAjout =
    document.getElementById("annulerAjout");

const absenceForm =
    document.getElementById("absenceForm");

const rechercheStudent =
    document.getElementById("rechercheStudent");

const ajouterSection =
    document.getElementById("ajouterSection");

const rechercheSection =
    document.getElementById("rechercheSection");

const historiqueSection =
    document.getElementById("historiqueSection");

const resultatRecherche =
    document.getElementById("resultatRecherche");

const historiqueList =
    document.getElementById("historiqueList");

const message =
    document.getElementById("message");

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
// NAVIGATION DE LA BARRE LATERALE
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
                    lien.getAttribute("href");


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
// AFFICHER UNE SECTION
// ========================================

function afficherSection(section) {

    if (ajouterSection) {

        ajouterSection.style.display =
            "none";

    }

    if (rechercheSection) {

        rechercheSection.style.display =
            "none";

    }

    if (historiqueSection) {

        historiqueSection.style.display =
            "none";

    }


    if (section) {

        section.style.display =
            "block";

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ========================================
// BOUTON AJOUTER
// ========================================

if (btnAjouter) {

    btnAjouter.addEventListener(
        "click",
        () => {

            afficherSection(
                ajouterSection
            );

        }
    );

}


// ========================================
// BOUTON RECHERCHER
// ========================================

if (btnRechercher) {

    btnRechercher.addEventListener(
        "click",
        () => {

            afficherSection(
                rechercheSection
            );

        }
    );

}


// ========================================
// BOUTON HISTORIQUE
// ========================================

if (btnHistorique) {

    btnHistorique.addEventListener(
        "click",
        () => {

            afficherSection(
                historiqueSection
            );

            chargerHistorique();

        }
    );

}


// ========================================
// AJOUTER UNE ABSENCE
// ========================================

if (absenceForm) {

    absenceForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();


            const student_id =
                document.getElementById(
                    "student_id"
                ).value;

            const date =
                document.getElementById(
                    "date"
                ).value;

            const status =
                document.getElementById(
                    "status"
                ).value;


            if (
                !student_id ||
                !date ||
                !status
            ) {

                afficherMessage(
                    "Veuillez remplir tous les champs.",
                    false
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        "/api/professeur/absences",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    "Bearer " + token

                            },

                            body: JSON.stringify({

                                student_id:
                                    Number(student_id),

                                date:
                                    date,

                                status:
                                    status

                            })

                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Réponse ajout absence :",
                    data
                );


                // TOKEN INVALIDE

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


                if (!data.status) {

                    afficherMessage(
                        data.message ||
                        "Erreur lors de l'enregistrement.",
                        false
                    );

                    return;

                }


                afficherMessage(
                    data.message,
                    true
                );


                absenceForm.reset();


            } catch (error) {

                console.error(
                    "ERREUR AJOUT ABSENCE :",
                    error
                );


                afficherMessage(
                    "Erreur lors de l'enregistrement de l'absence.",
                    false
                );

            }

        }
    );

}


// ========================================
// RECHERCHER LES ABSENCES
// ========================================

if (btnLancerRecherche) {

    btnLancerRecherche.addEventListener(
        "click",
        async () => {

            const studentId =
                rechercheStudent.value.trim();


            if (!studentId) {

                afficherMessage(
                    "Veuillez entrer l'ID de l'étudiant.",
                    false
                );

                return;

            }


            resultatRecherche.innerHTML = `

                <p class="loading">

                    Recherche en cours...

                </p>

            `;


            try {

                const response =
                    await fetch(
                        `/api/professeur/absences/student/${studentId}`,
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
                    "Résultat recherche absence :",
                    data
                );


                // TOKEN INVALIDE

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


                if (!data.status) {

                    resultatRecherche.innerHTML = `

                        <p class="error">

                            ${data.message}

                        </p>

                    `;

                    return;

                }


                afficherAbsencesRecherche(
                    data.absences
                );


            } catch (error) {

                console.error(
                    "ERREUR RECHERCHE :",
                    error
                );


                resultatRecherche.innerHTML = `

                    <p class="error">

                        Erreur lors de la recherche.

                    </p>

                `;

            }

        }
    );

}


// ========================================
// AFFICHER LE RÉSULTAT DE RECHERCHE
// ========================================

function afficherAbsencesRecherche(absences) {

    resultatRecherche.innerHTML = "";


    if (
        !absences ||
        absences.length === 0
    ) {

        resultatRecherche.innerHTML = `

            <div class="absence-vide">

                <i class="fa-solid fa-calendar-check"></i>

                <p>
                    Aucune absence trouvée
                    pour cet étudiant.
                </p>

            </div>

        `;

        return;

    }


    absences.forEach(
        (absence) => {

            const div =
                document.createElement("div");


            div.className =
                "absence-card";


            div.innerHTML = `

                <div class="absence-icon">

                    <i class="fa-solid fa-calendar-xmark"></i>

                </div>

                <div class="absence-info">

                    <h3>
                        Absence #${absence.id}
                    </h3>

                    <p>

                        <strong>
                            Étudiant :
                        </strong>

                        ${absence.student_id}

                    </p>

                    <p>

                        <strong>
                            Date :
                        </strong>

                        ${absence.date}

                    </p>

                    <p>

                        <strong>
                            Statut :
                        </strong>

                        ${absence.status}

                    </p>

                </div>

            `;


            resultatRecherche.appendChild(
                div
            );

        }
    );

}


// ========================================
// CHARGER L'HISTORIQUE
// ========================================

async function chargerHistorique() {

    historiqueList.innerHTML = `

        <p class="loading">

            Chargement de l'historique...

        </p>

    `;


    try {

        /*
         * Ici on utilise l'ID de l'étudiant
         * entré dans la recherche.
         *
         * Si aucun ID n'est entré,
         * on demande d'abord un étudiant.
         */

        const studentId =
            rechercheStudent
                ? rechercheStudent.value.trim()
                : "";


        if (!studentId) {

            historiqueList.innerHTML = `

                <p class="loading">

                    Entrez d'abord l'ID d'un étudiant
                    pour afficher son historique.

                </p>

            `;

            return;

        }


        const response =
            await fetch(
                `/api/professeur/absences/student/${studentId}`,
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
            "Historique :",
            data
        );


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


        if (!data.status) {

            historiqueList.innerHTML = `

                <p class="error">

                    ${data.message}

                </p>

            `;

            return;

        }


        afficherHistorique(
            data.absences
        );


    } catch (error) {

        console.error(
            "ERREUR HISTORIQUE :",
            error
        );


        historiqueList.innerHTML = `

            <p class="error">

                Erreur lors du chargement
                de l'historique.

            </p>

        `;

    }

}


// ========================================
// AFFICHER HISTORIQUE
// ========================================

function afficherHistorique(absences) {

    historiqueList.innerHTML = "";


    if (
        !absences ||
        absences.length === 0
    ) {

        historiqueList.innerHTML = `

            <div class="absence-vide">

                <i class="fa-solid fa-calendar-check"></i>

                <p>
                    Aucune absence enregistrée.
                </p>

            </div>

        `;

        return;

    }


    absences.forEach(
        (absence) => {

            const div =
                document.createElement("div");


            div.className =
                "absence-card";


            div.innerHTML = `

                <div class="absence-icon">

                    <i class="fa-solid fa-calendar-xmark"></i>

                </div>

                <div class="absence-info">

                    <h3>
                        Absence #${absence.id}
                    </h3>

                    <p>

                        <strong>
                            Étudiant :
                        </strong>

                        ${absence.student_id}

                    </p>

                    <p>

                        <strong>
                            Date :
                        </strong>

                        ${absence.date}

                    </p>

                    <p>

                        <strong>
                            Statut :
                        </strong>

                        ${absence.status}

                    </p>

                </div>

            `;


            historiqueList.appendChild(
                div
            );

        }
    );

}


// ========================================
// MESSAGE
// ========================================

function afficherMessage(
    texte,
    succes = true
) {

    if (!message) {

        return;

    }


    message.textContent =
        texte;


    message.className =
        succes
            ? "message success"
            : "message error";


    setTimeout(
        () => {

            message.textContent = "";

            message.className =
                "message";

        },
        4000
    );

}


// ========================================
// ANNULER L'AJOUT
// ========================================

if (annulerAjout) {

    annulerAjout.addEventListener(
        "click",
        () => {

            absenceForm.reset();

            afficherSection(null);

        }
    );

}


// ========================================
// RETOUR
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
// CACHER LES SECTIONS AU DÉPART
// ========================================

if (ajouterSection) {

    ajouterSection.style.display =
        "none";

}

if (rechercheSection) {

    rechercheSection.style.display =
        "none";

}

if (historiqueSection) {

    historiqueSection.style.display =
        "none";

}

