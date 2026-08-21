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

const btnJustifier =
    document.getElementById("btnJustifier");

const btnHistorique =
    document.getElementById("btnHistorique");

const btnRetour =
    document.getElementById("btnRetour");


const ajouterSection =
    document.getElementById("ajouterSection");

const justifierSection =
    document.getElementById("justifierSection");

const historiqueSection =
    document.getElementById("historiqueSection");


const absenceForm =
    document.getElementById("absenceForm");

const justifierForm =
    document.getElementById("justifierForm");


const btnAnnulerAjout =
    document.getElementById("btnAnnulerAjout");

const btnAnnulerJustification =
    document.getElementById(
        "btnAnnulerJustification"
    );


const btnRechercher =
    document.getElementById("btnRechercher");


const absencesList =
    document.getElementById("absencesList");


// ========================================
// CACHER TOUT
// ========================================

function cacherTout() {

    ajouterSection.style.display = "none";

    justifierSection.style.display = "none";

    historiqueSection.style.display = "none";

}


// ========================================
// AU CHARGEMENT
// ========================================

cacherTout();


// ========================================
// AJOUTER
// ========================================

btnAjouter.addEventListener(
    "click",
    () => {

        cacherTout();

        ajouterSection.style.display = "block";

    }
);


// ========================================
// JUSTIFIER
// ========================================

btnJustifier.addEventListener(
    "click",
    () => {

        cacherTout();

        justifierSection.style.display = "block";

    }
);


// ========================================
// HISTORIQUE
// ========================================

btnHistorique.addEventListener(
    "click",
    () => {

        cacherTout();

        historiqueSection.style.display = "block";

    }
);


// ========================================
// AJOUTER UNE ABSENCE
// ========================================

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


        if (!student_id || !date || !status) {

            alert(
                "Veuillez remplir tous les champs"
            );

            return;

        }


        try {

            const response = await fetch(
                "/api/absences",
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


            if (!data.status) {

                alert(data.message);

                return;

            }


            alert(
                "Absence enregistrée avec succès"
            );


            absenceForm.reset();

        }


        catch (error) {

            console.error(
                "Erreur ajout absence :",
                error
            );


            alert(
                "Erreur lors de l'enregistrement de l'absence"
            );

        }

    }
);


// ========================================
// JUSTIFIER UNE ABSENCE
// ========================================

justifierForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();


        const id =
            document.getElementById(
                "absence_id"
            ).value;


        const status =
            document.getElementById(
                "nouveauStatus"
            ).value;


        if (!id || !status) {

            alert(
                "Veuillez remplir tous les champs"
            );

            return;

        }


        try {

            const response = await fetch(
                "/api/absences/" + id,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body: JSON.stringify({

                        status:
                            status

                    })

                }
            );


            const data =
                await response.json();


            console.log(
                "Réponse modification :",
                data
            );


            if (!data.status) {

                alert(data.message);

                return;

            }


            alert(
                "Absence modifiée avec succès"
            );


            justifierForm.reset();

        }


        catch (error) {

            console.error(
                "Erreur modification :",
                error
            );


            alert(
                "Erreur lors de la modification"
            );

        }

    }
);


// ========================================
// RECHERCHER HISTORIQUE
// ========================================

btnRechercher.addEventListener(
    "click",
    async () => {

        const student_id =
            document.getElementById(
                "historiqueStudent"
            ).value;


        if (!student_id) {

            alert(
                "Veuillez entrer l'ID de l'étudiant"
            );

            return;

        }


        try {

            const response = await fetch(

                "/api/absences/student/"
                + student_id,

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
                "Réponse historique :",
                data
            );


            if (!data.status) {

                alert(data.message);

                return;

            }


            afficherAbsences(
                data.absences
            );

        }


        catch (error) {

            console.error(
                "Erreur historique :",
                error
            );


            alert(
                "Erreur lors du chargement de l'historique"
            );

        }

    }
);


// ========================================
// AFFICHER LES ABSENCES
// ========================================

function afficherAbsences(absences) {

    absencesList.innerHTML = "";


    if (
        !absences ||
        absences.length === 0
    ) {

        absencesList.innerHTML = `

            <div class="aucune-absence">

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
                document.createElement(
                    "div"
                );


            div.classList.add(
                "absence-card"
            );


            div.innerHTML = `

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

                    <span class="status">

                        ${absence.status}

                    </span>

                </p>

            `;


            absencesList.appendChild(
                div
            );

        }
    );

}


// ========================================
// ANNULER AJOUT
// ========================================

btnAnnulerAjout.addEventListener(
    "click",
    () => {

        absenceForm.reset();

        cacherTout();

    }
);


// ========================================
// ANNULER JUSTIFICATION
// ========================================

btnAnnulerJustification.addEventListener(
    "click",
    () => {

        justifierForm.reset();

        cacherTout();

    }
);


// ========================================
// RETOUR MENU ADMIN
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

const deconnecter =
    document.getElementById(
        "deconnecter"
    );


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