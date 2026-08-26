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

const modifierNoteForm =
    document.getElementById("modifierNoteForm");

const btnRetour =
    document.getElementById("btnRetour");

const btnAnnuler =
    document.getElementById("btnAnnuler");

const deconnecter =
    document.getElementById("deconnecter");


// ========================================
// MODIFIER UNE NOTE
// ========================================

modifierNoteForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();


        const student_id =
            Number(
                document.getElementById(
                    "student_id"
                ).value
            );


        const subject_id =
            Number(
                document.getElementById(
                    "subject_id"
                ).value
            );


        const note =
            Number(
                document.getElementById(
                    "note"
                ).value
            );


        // Vérification de la note

        if (note < 0 || note > 20) {

            alert(
                "La note doit être comprise entre 0 et 20."
            );

            return;
        }


        try {

            const response = await fetch(
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
                            student_id,

                        subject_id:
                            subject_id,

                        note:
                            note

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


            alert(
                "Note modifiée avec succès."
            );


            modifierNoteForm.reset();


        } catch (error) {

            console.error(error);

            alert(
                "Erreur lors de la modification de la note."
            );

        }

    }
);


// ========================================
// RETOUR
// ========================================

btnRetour.addEventListener(
    "click",
    () => {

        window.location.href =
            "/professeur";

    }
);


// ========================================
// ANNULER
// ========================================

btnAnnuler.addEventListener(
    "click",
    () => {

        modifierNoteForm.reset();

    }
);


// ========================================
// DÉCONNEXION
// ========================================

deconnecter.addEventListener(
    "click",
    (e) => {

        e.preventDefault();

        localStorage.removeItem("token");

        window.location.href =
            "/login";

    }
);