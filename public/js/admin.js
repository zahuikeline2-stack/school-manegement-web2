const token = localStorage.getItem("token");


if (!token) {

    window.location.href = "/login";

}


// Fonction pour aller vers une page avec le token

function allerVers(page) {

    window.location.href =
        page + "?token=" + encodeURIComponent(token);

}


// Étudiants

document
    .getElementById("etudiants")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/etudiants");

    });


// Utilisateurs

document
    .getElementById("users")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/users");

    });


// Professeurs

document
    .getElementById("professeurs")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeurs");

    });


// Matières

document
    .getElementById("matieres")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/matieres");

    });


// Notes

document
    .getElementById("notes")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/notes");

    });


// Absences

document
    .getElementById("absences")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/absences");

    });


// Statistiques

document
    .getElementById("statistiques")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/statistiques");

    });


// Cartes

document
    .getElementById("cardUsers")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/users");

    });


document
    .getElementById("cardEtudiants")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/etudiants");

    });


document
    .getElementById("cardProfesseurs")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/professeurs");

    });


document
    .getElementById("cardMatieres")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/matieres");

    });


document
    .getElementById("cardNotes")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/notes");

    });


document
    .getElementById("cardAbsences")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/absences");

    });


document
    .getElementById("cardStatistiques")
    .addEventListener("click", (e) => {

        e.preventDefault();

        allerVers("/statistiques");

    });


// Déconnexion

document
    .getElementById("deconnecter")
    .addEventListener("click", (e) => {

        e.preventDefault();

        localStorage.removeItem("token");

        window.location.href = "/login";

    });