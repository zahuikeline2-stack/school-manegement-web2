const token = localStorage.getItem("token");


// Vérifier si le token existe
if (!token) {

    window.location.href = "/login";

}


// Fonction pour ajouter le token à l'URL
function allerVers(page) {

    window.location.href = page + "?token=" + token;

}


// Accueil Admin
document.getElementById("admin").addEventListener("click", (e) => {

    e.preventDefault();

    allerVers("/admin");

});


// Utilisateurs
document.getElementById("users").addEventListener("click", (e) => {

    e.preventDefault();

    allerVers("/users");

});


// Ajouter utilisateur
document.getElementById("addUser").addEventListener("click", (e) => {

    e.preventDefault();

    allerVers("/ajouter");

});


// Liste utilisateurs
document.getElementById("usersApi").addEventListener("click", (e) => {

    e.preventDefault();

    allerVers("/users/api");

});


// Carte utilisateurs
document.getElementById("card").addEventListener("click", (e) => {

    e.preventDefault();

    allerVers("/users");

});


// Carte ajouter utilisateur
document.getElementById("addUserCard").addEventListener("click", (e) => {

    e.preventDefault();

    allerVers("/ajouter");

});


// Carte liste utilisateurs
document.getElementById("usersApiCard").addEventListener("click", (e) => {

    e.preventDefault();

    allerVers("/users/api");

});


// Déconnexion
document.getElementById("deconnecter").addEventListener("click", () => {

    localStorage.removeItem("token");

});