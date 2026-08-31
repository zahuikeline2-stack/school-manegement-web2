// ========================================
// ÉLÉMENTS HTML
// ========================================

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");


// ========================================
// VÉRIFIER SI UN TOKEN EST VALIDE
// ========================================

function tokenValide(token) {

    try {

        const parties = token.split(".");

        if (parties.length !== 3) {
            return false;
        }

        const payload = JSON.parse(
            atob(parties[1])
        );

        if (!payload.exp) {
            return false;
        }

        const maintenant =
            Math.floor(Date.now() / 1000);

        if (payload.exp <= maintenant) {
            return false;
        }

        return payload;

    } catch (error) {

        console.error("Token invalide :", error);

        return false;
    }
}


// ========================================
// VÉRIFIER LE TOKEN EXISTANT
// ========================================

const existingToken =
    localStorage.getItem("token");

if (existingToken) {

    const payload =
        tokenValide(existingToken);

    if (!payload) {

        localStorage.removeItem("token");

    }
}


// ========================================
// CONNEXION
// ========================================

loginForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        loginError.textContent = "";

        const email =
            document.getElementById("email")
                .value
                .trim();

        const password =
            document.getElementById("password")
                .value;


        // ========================================
        // VÉRIFICATION
        // ========================================

        if (!email || !password) {

            loginError.textContent =
                "Veuillez remplir tous les champs.";

            return;
        }


        try {

            const response =
                await fetch("/login", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })

                });


            const data =
                await response.json();


            // ========================================
            // ERREUR
            // ========================================

            if (
                !response.ok ||
                !data.status
            ) {

                loginError.textContent =
                    data.message ||
                    "Email ou mot de passe incorrect.";

                return;
            }


            // ========================================
            // VÉRIFIER LE TOKEN
            // ========================================

            if (!data.accessToken) {

                loginError.textContent =
                    "Token non reçu par le serveur.";

                return;
            }


            // ========================================
            // ENREGISTRER LE TOKEN
            // ========================================

            localStorage.setItem(
                "token",
                data.accessToken
            );


            // ========================================
            // REDIRECTION
            // ========================================

            rediriger(
                data.role,
                data.accessToken
            );

        } catch (error) {

            console.error(
                "ERREUR CONNEXION :",
                error
            );

            loginError.textContent =
                "Erreur de connexion au serveur.";

        }

    }
);


// ========================================
// REDIRECTION SELON LE RÔLE
// ========================================

function rediriger(role, token) {

    // On accepte étudiant ET etudiant
    const roleNormalise =
        role
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


    const espaces = {

        admin: "/admin",

        professeur: "/professeur",

        etudiant: "/etudiant"

    };


    const destination =
        espaces[roleNormalise];


    if (!destination) {

        loginError.textContent =
            "Rôle inconnu : " + role;

        return;
    }


    // ========================================
    // ENVOYER LE TOKEN À LA PAGE
    // ========================================

    window.location.href =
        destination +
        "?token=" +
        encodeURIComponent(token);

}