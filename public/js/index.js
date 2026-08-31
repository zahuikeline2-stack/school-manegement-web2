// ========================================
// ÉLÉMENTS HTML
// ========================================

const lienConnexion = document.querySelector('nav a[href="/login"]');


// ========================================
// LIRE LE RÔLE DEPUIS LE TOKEN (sans vérification)
// ========================================

function lireRoleDepuisToken(token) {

    try {

        const payloadBase64 = token.split(".")[1];

        const payloadJson = atob(payloadBase64);

        const payload = JSON.parse(payloadJson);

        return payload.role || null;

    } catch (error) {

        return null;

    }

}


// ========================================
// SI DÉJÀ CONNECTÉ, ADAPTER LE LIEN "CONNEXION"
// ========================================

const token = localStorage.getItem("token");

if (token) {

    const role = lireRoleDepuisToken(token);

    if (role) {

        const espaces = {
            admin: "/admin",
            professeur: "/professeur",
            etudiant: "/etudiant"
        };

        const destination = espaces[role];

        if (destination && lienConnexion) {

            lienConnexion.href = destination;

            lienConnexion.textContent = "Mon espace";

        }

    } else {

        // Token invalide ou illisible : on le supprime
        localStorage.removeItem("token");

    }

}