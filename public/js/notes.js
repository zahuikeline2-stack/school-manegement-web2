
// ========================================
// RÉCUPÉRER LE TOKEN
// ========================================

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "/login";

}


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

const menuAdmin = [

    "/admin",
    "/users",
    "/etudiants",
    "/professeurs",
    "/matieres",
    "/notes",
    "/absences",
    "/statistiques"

];


// ========================================
// NAVIGATION ENTRE LES PAGES ADMIN
// ========================================

menuAdmin.forEach((page) => {

    const lien = document.querySelector(
        `a[href="${page}"]`
    );

    if (lien) {

        lien.addEventListener("click", (e) => {

            e.preventDefault();

            allerVers(page);

        });

    }

});


// ========================================
// ÉLÉMENTS
// ========================================

const btnAjouter =
    document.getElementById("btnAjouter");

const btnLister =
    document.getElementById("btnLister");

const btnModifier =
    document.getElementById("btnModifier");

const btnSupprimer =
    document.getElementById("btnSupprimer");

const btnMoyenne =
    document.getElementById("btnMoyenne");

const btnRetour =
    document.getElementById("btnRetour");


const ajouterSection =
    document.getElementById("ajouterSection");

const listeSection =
    document.getElementById("listeSection");

const modifierSection =
    document.getElementById("modifierSection");

const supprimerSection =
    document.getElementById("supprimerSection");

const moyenneSection =
    document.getElementById("moyenneSection");


// ========================================
// CACHER TOUT
// ========================================

function cacherTout() {

    ajouterSection.style.display = "none";

    listeSection.style.display = "none";

    modifierSection.style.display = "none";

    supprimerSection.style.display = "none";

    moyenneSection.style.display = "none";

}


// ========================================
// AU DÉMARRAGE
// ========================================

cacherTout();


// ========================================
// AJOUTER
// ========================================

btnAjouter.addEventListener("click", () => {

    cacherTout();

    ajouterSection.style.display = "block";

});


// ========================================
// LISTER
// ========================================

btnLister.addEventListener("click", () => {

    cacherTout();

    listeSection.style.display = "block";

});


// ========================================
// MODIFIER
// ========================================

btnModifier.addEventListener("click", () => {

    cacherTout();

    modifierSection.style.display = "block";

});


// ========================================
// SUPPRIMER
// ========================================

btnSupprimer.addEventListener("click", () => {

    cacherTout();

    supprimerSection.style.display = "block";

});


// ========================================
// MOYENNE
// ========================================

btnMoyenne.addEventListener("click", () => {

    cacherTout();

    moyenneSection.style.display = "block";

});


// ========================================
// AJOUTER UNE NOTE
// ========================================

const noteForm =
    document.getElementById("noteForm");


noteForm.addEventListener(
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


        // Vérifier la note

        if (note < 0 || note > 20) {

            alert(
                "La note doit être entre 0 et 20"
            );

            return;

        }


        try {

            const response =
                await fetch(
                    "/api/notes",
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
                                Number(note)

                        })

                    }
                );


            const data =
                await response.json();


            if (!data.status) {

                alert(data.message);

                return;

            }


            alert(
                "Note ajoutée avec succès"
            );


            noteForm.reset();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de l'ajout de la note"
            );

        }

    }
);


// ========================================
// LISTER LES NOTES
// ========================================

const btnChargerNotes =
    document.getElementById(
        "btnChargerNotes"
    );


btnChargerNotes.addEventListener(
    "click",
    async () => {

        const student_id =
            document.getElementById(
                "studentListe"
            ).value;


        if (!student_id) {

            alert(
                "Entrez l'ID de l'étudiant"
            );

            return;

        }


        try {

            const response =
                await fetch(
                    "/api/notes/" +
                    student_id,
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


            afficherNotes(
                data.notes
            );


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors du chargement des notes"
            );

        }

    }
);


// ========================================
// AFFICHER LES NOTES
// ========================================

function afficherNotes(notes) {

    const notesList =
        document.getElementById(
            "notesList"
        );


    notesList.innerHTML = "";


    if (
        !notes ||
        notes.length === 0
    ) {

        notesList.innerHTML =
            "<p>Aucune note trouvée.</p>";

        return;

    }


    notes.forEach((note) => {

        const div =
            document.createElement(
                "div"
            );


        div.classList.add(
            "note-card"
        );


        div.innerHTML = `

            <p>

                <strong>ID :</strong>

                ${note.id}

            </p>


            <p>

                <strong>Étudiant :</strong>

                ${note.student_id}

            </p>


            <p>

                <strong>Matière :</strong>

                ${note.subject_id}

            </p>


            <p>

                <strong>Note :</strong>

                ${note.note}/20

            </p>

        `;


        notesList.appendChild(div);

    });

}


// ========================================
// MODIFIER UNE NOTE
// ========================================

const modifierForm =
    document.getElementById(
        "modifierForm"
    );


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
            note < 0 ||
            note > 20
        ) {

            alert(
                "La note doit être entre 0 et 20"
            );

            return;

        }


        try {

            const response =
                await fetch(
                    "/api/notes",
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
                                Number(note)

                        })

                    }
                );


            const data =
                await response.json();


            if (!data.status) {

                alert(data.message);

                return;

            }


            alert(
                "Note modifiée avec succès"
            );


            modifierForm.reset();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la modification"
            );

        }

    }
);


// ========================================
// SUPPRIMER UNE NOTE
// ========================================

const btnDelete =
    document.getElementById(
        "btnDelete"
    );


btnDelete.addEventListener(
    "click",
    async () => {

        const id =
            document.getElementById(
                "noteId"
            ).value;


        if (!id) {

            alert(
                "Entrez l'ID de la note"
            );

            return;

        }


        const confirmation =
            confirm(
                "Voulez-vous supprimer cette note ?"
            );


        if (!confirmation) {

            return;

        }


        try {

            const response =
                await fetch(
                    "/api/notes/" + id,
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


            alert(
                "Note supprimée avec succès"
            );


            document.getElementById(
                "noteId"
            ).value = "";


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la suppression"
            );

        }

    }
);


// ========================================
// CALCULER LA MOYENNE
// ========================================

const btnCalculer =
    document.getElementById(
        "btnCalculer"
    );


btnCalculer.addEventListener(
    "click",
    async () => {

        const student_id =
            document.getElementById(
                "studentMoyenne"
            ).value;


        if (!student_id) {

            alert(
                "Entrez l'ID de l'étudiant"
            );

            return;

        }


        try {

            const response =
                await fetch(
                    "/api/notes/" +
                    student_id +
                    "/moyenne",
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


            const moyenne =
                data.moyenne.moyenne;


            document.getElementById(
                "resultatMoyenne"
            ).innerHTML = `

                <div class="moyenne-result">

                    Moyenne de l'étudiant :

                    ${
                        moyenne
                        ? Number(moyenne).toFixed(2)
                        : "0.00"
                    }

                    / 20

                </div>

            `;


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors du calcul de la moyenne"
            );

        }

    }
);


// ========================================
// RETOUR AU MENU ADMIN
// ========================================

btnRetour.addEventListener(
    "click",
    () => {

        allerVers("/admin");

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

