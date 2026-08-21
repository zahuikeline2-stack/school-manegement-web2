// ========================================
// TOKEN
// ========================================

const token =
    localStorage.getItem("token");


if (!token) {

    window.location.href = "/login";

}


// ========================================
// ÉLÉMENTS HTML
// ========================================

const btnMeilleur =
    document.getElementById("btnMeilleur");

const btnMoyenne =
    document.getElementById("btnMoyenne");

const btnAbsences =
    document.getElementById("btnAbsences");

const btnRetour =
    document.getElementById("btnRetour");

const resultat =
    document.getElementById("resultat");


// ========================================
// CHARGER LES STATISTIQUES
// ========================================

async function chargerStatistiques() {

    try {

        const response =
            await fetch(
                "/api/statistiques",
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


        console.log(data);


        if (!data.status) {

            alert(data.message);

            return;

        }


        return data;


    } catch (error) {

        console.error(error);

        alert(
            "Erreur lors du chargement des statistiques"
        );

    }

}


// ========================================
// MEILLEUR ÉTUDIANT
// ========================================

if (btnMeilleur) {

    btnMeilleur.addEventListener(
        "click",
        async () => {

            const data =
                await chargerStatistiques();


            if (!data) return;


            const meilleur =
                data.meilleurEtudiant;


            if (!meilleur) {

                resultat.innerHTML =
                    "<p>Aucune note trouvée.</p>";

                return;

            }


            resultat.innerHTML = `

                <div class="stat-card">

                    <h3>🏆 Meilleur étudiant</h3>

                    <p>
                        <strong>ID étudiant :</strong>
                        ${meilleur.student_id}
                    </p>

                    <p>
                        <strong>Moyenne :</strong>
                        ${Number(
                            meilleur.moyenne
                        ).toFixed(2)}/20
                    </p>

                </div>

            `;

        }
    );

}


// ========================================
// MOYENNE GÉNÉRALE
// ========================================

if (btnMoyenne) {

    btnMoyenne.addEventListener(
        "click",
        async () => {

            const data =
                await chargerStatistiques();


            if (!data) return;


            const moyenne =
                data.moyenneGenerale;


            resultat.innerHTML = `

                <div class="stat-card">

                    <h3>📊 Moyenne générale</h3>

                    <p>
                        Moyenne :
                        <strong>
                            ${Number(
                                moyenne.moyenne_generale || 0
                            ).toFixed(2)}/20
                        </strong>
                    </p>

                </div>

            `;

        }
    );

}


// ========================================
// TOTAL ABSENCES
// ========================================

if (btnAbsences) {

    btnAbsences.addEventListener(
        "click",
        async () => {

            const data =
                await chargerStatistiques();


            if (!data) return;


            const absences =
                data.totalAbsences;


            resultat.innerHTML = `

                <div class="stat-card">

                    <h3>📅 Absences</h3>

                    <p>
                        Nombre total :
                        <strong>
                            ${absences.total_absences}
                        </strong>
                    </p>

                </div>

            `;

        }
    );

}


// ========================================
// RETOUR
// ========================================

if (btnRetour) {

    btnRetour.addEventListener(
        "click",
        () => {

            window.location.href =
                "/admin?token=" +
                encodeURIComponent(token);

        }
    );

}