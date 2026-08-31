
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

const btnModifier =
    document.getElementById("btnModifier");

const ajouterSection =
    document.getElementById("ajouterSection");

const modifierSection =
    document.getElementById("modifierSection");

const ajouterForm =
    document.getElementById("ajouterForm");

const modifierForm =
    document.getElementById("modifierForm");

const annulerAjout =
    document.getElementById("annulerAjout");

const annulerModification =
    document.getElementById("annulerModification");

const btnRetour =
    document.getElementById("btnRetour");

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
// LIENS DU MENU
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
// AFFICHER UN MESSAGE
// ========================================

function afficherMessage(
    texte,
    type = "success"
) {

    message.textContent =
        texte;

    message.className =
        "message " + type;


    setTimeout(
        () => {

            message.textContent =
                "";

            message.className =
                "message";

        },
        4000
    );

}


// ========================================
// MASQUER LES SECTIONS
// ========================================

function cacherSections() {

    ajouterSection.style.display =
        "none";

    modifierSection.style.display =
        "none";

}


// ========================================
// AJOUTER UNE NOTE
// ========================================

if (btnAjouter) {

    btnAjouter.addEventListener(
        "click",
        () => {

            cacherSections();

            ajouterSection.style.display =
                "block";

            ajouterSection.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


// ========================================
// MODIFIER UNE NOTE
// ========================================

if (btnModifier) {

    btnModifier.addEventListener(
        "click",
        () => {

            cacherSections();

            modifierSection.style.display =
                "block";

            modifierSection.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


// ========================================
// ANNULER AJOUT
// ========================================

if (annulerAjout) {

    annulerAjout.addEventListener(
        "click",
        () => {

            ajouterForm.reset();

            ajouterSection.style.display =
                "none";

        }
    );

}


// ========================================
// ANNULER MODIFICATION
// ========================================

if (annulerModification) {

    annulerModification.addEventListener(
        "click",
        () => {

            modifierForm.reset();

            modifierSection.style.display =
                "none";

        }
    );

}


// ========================================
// AJOUTER UNE NOTE
// ========================================

if (ajouterForm) {

    ajouterForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();


            const student_id =
                document.getElementById(
                    "student_id"
                ).value;

            const subject_id =
                document.getElementById(
                    "subject_id"
                ).value;

            const note =
                document.getElementById(
                    "note"
                ).value;


            if (
                !student_id ||
                !subject_id ||
                note === ""
            ) {

                afficherMessage(
                    "Tous les champs sont obligatoires.",
                    "error"
                );

                return;

            }


            const noteNumber =
                Number(note);


            if (
                noteNumber < 0 ||
                noteNumber > 20
            ) {

                afficherMessage(
                    "La note doit être comprise entre 0 et 20.",
                    "error"
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        "/api/professeur/notes",
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

                                subject_id:
                                    Number(subject_id),

                                note:
                                    noteNumber

                            })

                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Réponse ajout note :",
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

                    afficherMessage(
                        data.message,
                        "error"
                    );

                    return;

                }


                afficherMessage(
                    data.message,
                    "success"
                );


                ajouterForm.reset();


            } catch (error) {

                console.error(
                    "Erreur ajout note :",
                    error
                );


                afficherMessage(
                    "Erreur lors de l'ajout de la note.",
                    "error"
                );

            }

        }
    );

}


// ========================================
// MODIFIER UNE NOTE
// ========================================

if (modifierForm) {

    modifierForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();


            const student_id =
                document.getElementById(
                    "modifierStudent"
                ).value;

            const subject_id =
                document.getElementById(
                    "modifierSubject"
                ).value;

            const note =
                document.getElementById(
                    "nouvelleNote"
                ).value;


            if (
                !student_id ||
                !subject_id ||
                note === ""
            ) {

                afficherMessage(
                    "Tous les champs sont obligatoires.",
                    "error"
                );

                return;

            }


            const noteNumber =
                Number(note);


            if (
                noteNumber < 0 ||
                noteNumber > 20
            ) {

                afficherMessage(
                    "La note doit être comprise entre 0 et 20.",
                    "error"
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        "/api/professeur/notes",
                        {

                            method: "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    "Bearer " + token

                            },

                            body: JSON.stringify({

                                student_id:
                                    Number(student_id),

                                subject_id:
                                    Number(subject_id),

                                note:
                                    noteNumber

                            })

                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Réponse modification note :",
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

                    afficherMessage(
                        data.message,
                        "error"
                    );

                    return;

                }


                afficherMessage(
                    data.message,
                    "success"
                );


                modifierForm.reset();


            } catch (error) {

                console.error(
                    "Erreur modification note :",
                    error
                );


                afficherMessage(
                    "Erreur lors de la modification de la note.",
                    "error"
                );

            }

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
// AU DÉPART : CACHER LES FORMULAIRES
// ========================================

cacherSections();

