const token = localStorage.getItem("token");


// Vérifier si le token existe

if (!token) {

    window.location.href = "/login";

}


// Bouton

const bouton = document.getElementById("chargerUsers");

const usersList = document.getElementById("usersList");


// Quand on clique

bouton.addEventListener("click", async () => {

    try {

        const response = await fetch("/api/users", {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });


        const data = await response.json();


        console.log(data);


        if (!data.status) {

            alert(data.message);

            return;

        }


        usersList.innerHTML = "";


        data.users.forEach((user) => {

            const div = document.createElement("div");

            div.classList.add("user-card");


            div.innerHTML = `

                <h3>${user.name}</h3>

                <p>Email : ${user.email}</p>

                <p>Rôle : ${user.role}</p>

            `;


            usersList.appendChild(div);

        });


    } catch (error) {

        console.error(error);

        alert("Erreur lors du chargement des utilisateurs");

    }

});