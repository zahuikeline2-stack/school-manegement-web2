
// ========================================
// RÉCUPÉRER LE TOKEN
// ========================================

const token = localStorage.getItem("token");


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

const notesList =
    document.getElementById("notesList");

const absencesList =
    document.getElementById("absencesList");

const statistiquesList =
    document.getElementById("statistiquesList");

const deconnecter =
    document.getElementById("deconnecter");


// ========================================
// MES MATIÈRES
// ========================================

async function chargerMatieres() {

    try {

        const response =
            await fetch(
                "/api/etudiant/matieres",
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


        if (!data.status) {

            matieresList.innerHTML = `
                <p>
                    ${data.message}
                </p>
            `;

            return;
        }


        afficherMatieres(
            data.matieres
        );


    } catch (error) {

        console.error(
            "Erreur matières :",
            error
        );


        matieresList.innerHTML = `
            <p>
                Erreur lors du chargement des matières.
            </p>
        `;

    }

}


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
            <p>
                Aucune matière trouvée.
            </p>
        `;

        return;
    }


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

                <h3>

                    <i class="fa-solid fa-book"></i>

                    ${matiere.nom}

                </h3>

            `;


            matieresList.appendChild(
                div
            );

        }
    );

}


// ========================================
// MES NOTES
// ========================================

async function chargerNotes() {

    try {

        const response =
            await fetch(
                "/api/etudiant/notes",
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
            "Réponse notes :",
            data
        );


        if (!data.status) {

            notesList.innerHTML = `
                <p>
                    ${data.message}
                </p>
            `;

            return;
        }


        afficherNotes(
            data.notes
        );


    } catch (error) {

        console.error(
            "Erreur notes :",
            error
        );


        notesList.innerHTML = `
            <p>
                Erreur lors du chargement des notes.
            </p>
        `;

    }

}


// ========================================
// AFFICHER LES NOTES
// ========================================

function afficherNotes(notes) {

    notesList.innerHTML = "";


    if (
        !notes ||
        notes.length === 0
    ) {

        notesList.innerHTML = `
            <p>
                Aucune note trouvée.
            </p>
        `;

        return;
    }


    notes.forEach(
        (note) => {

            const div =
                document.createElement(
                    "div"
                );


            div.classList.add(
                "note-card"
            );


            div.innerHTML = `

                <h3>

                    <i class="fa-solid fa-pen-to-square"></i>

                    Note

                </h3>


                <p>

                    <strong>
                        Matière :
                    </strong>

                    ${note.nom || note.subject_id}

                </p>


                <p>

                    <strong>
                        Note :
                    </strong>

                    ${note.note}/20

                </p>

            `;


            notesList.appendChild(
                div
            );

        }
    );

}


// ========================================
// MES ABSENCES
// ========================================

async function chargerAbsences() {

    try {

        const response =
            await fetch(
                "/api/etudiant/absences",
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
            "Réponse absences :",
            data
        );


        if (!data.status) {

            absencesList.innerHTML = `
                <p>
                    ${data.message}
                </p>
            `;

            return;
        }


        afficherAbsences(
            data.absences
        );


    } catch (error) {

        console.error(
            "Erreur absences :",
            error
        );


        absencesList.innerHTML = `
            <p>
                Erreur lors du chargement des absences.
            </p>
        `;

    }

}


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
            <p>
                Aucune absence trouvée.
            </p>
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

                    <i class="fa-solid fa-calendar-xmark"></i>

                    Absence #${absence.id}

                </h3>


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
// MES STATISTIQUES
// ========================================

async function chargerStatistiques() {

    try {

        const response =
            await fetch(
                "/api/etudiant/statistiques",
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
            "Réponse statistiques :",
            data
        );


        if (!data.status) {

            statistiquesList.innerHTML = `
                <p>
                    ${data.message}
                </p>
            `;

            return;
        }


        afficherStatistiques(
            data.statistiques
        );


    } catch (error) {

        console.error(
            "Erreur statistiques :",
            error
        );


        statistiquesList.innerHTML = `
            <p>
                Erreur lors du chargement
                des statistiques.
            </p>
        `;

    }

}


// ========================================
// AFFICHER LES STATISTIQUES
// ========================================

function afficherStatistiques(statistiques) {

    statistiquesList.innerHTML = "";


    if (!statistiques) {

        statistiquesList.innerHTML = `
            <p>
                Aucune statistique trouvée.
            </p>
        `;

        return;
    }


    statistiquesList.innerHTML = `

        <div class="stat-card">

            <i class="fa-solid fa-chart-line"></i>

            <h3>
                Moyenne générale
            </h3>

            <p>
                ${statistiques.moyenne || 0}/20
            </p>

        </div>


        <div class="stat-card">

            <i class="fa-solid fa-user-check"></i>

            <h3>
                Nombre d'absences
            </h3>

            <p>
                ${statistiques.absences || 0}
            </p>

        </div>


        <div class="stat-card">

            <i class="fa-solid fa-graduation-cap"></i>

            <h3>
                Nombre de matières
            </h3>

            <p>
                ${statistiques.matieres || 0}
            </p>

        </div>

    `;

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
// CHARGER LES DONNÉES
// ========================================

chargerMatieres();

chargerNotes();

chargerAbsences();

chargerStatistiques();

