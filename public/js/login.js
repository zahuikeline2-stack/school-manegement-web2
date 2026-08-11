const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    const response = await fetch("/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })

    });

    const data = await response.json();

    console.log(data);


    // Si la connexion échoue
    if (!data.status) {

        alert(data.message);

        return;
    }


    // Connexion réussie
    alert("Connexion réussie !");


    // Récupération du token
    const token = data.accessToken;


    // Enregistrer le token
    localStorage.setItem("token", token);


    // Redirection selon le rôle

    if (data.role === "admin") {

        window.location.href =
            "/admin?token=" + token;

    }

    else if (data.role === "professeur") {

        window.location.href =
            "/professeur?token=" + token;

    }

    else if (data.role === "étudiant") {

        window.location.href =
            "/etudiant?token=" + token;

    }

});