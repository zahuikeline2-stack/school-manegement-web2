// ========================================
// TOKEN
// ========================================

const token =
    localStorage.getItem("token");


if (!token) {

    window.location.href = "/login";

}


// ========================================
// FONCTION NAVIGATION
// ========================================

function allerVers(page) {

    window.location.href =
        page +
        "?token=" +
        encodeURIComponent(token);

}


// ========================================
// BARRE LATERALE PROFESSEUR
// ========================================

const menuProfesseur = [
"/professeur",
    "/professeur/matieres",
    "/professeur/etudiants",
    "/professeur/notes",
    "/professeur/absences"

];


menuProfesseur.forEach((page) => {

    const lien =
        document.querySelector(
            `a[href="${page}"]`
        );


    if (lien) {

        lien.addEventListener(
            "click",
            (e) => {

                e.preventDefault();

                allerVers(page);

            }
        );

    }

});


// ========================================
// ÉLÉMENTS HTML
// ========================================

const btnLister =
    document.getElementById("btnLister");


const btnRechercher =
    document.getElementById("btnRechercher");


const btnLancerRecherche =
    document.getElementById(
        "btnLancerRecherche"
    );


const btnRetour =
    document.getElementById("btnRetour");


const recherche =
    document.getElementById("recherche");


const etudiantsList =
    document.getElementById(
        "etudiantsList"
    );


const rechercheSection =
    document.getElementById(
        "rechercheSection"
    );


const listeSection =
    document.getElementById(
        "listeSection"
    );


// ========================================
// LISTER LES ÉTUDIANTS
// ========================================

if (btnLister) {

    btnLister.addEventListener(
        "click",
        async () => {

            try {

                etudiantsList.innerHTML = `
                    <p class="chargement">
                        Chargement des étudiants...
                    </p>
                `;


                const response =
                    await fetch(
                        "/api/professeur/etudiants",
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
                    "Étudiants :",
                    data
                );


                if (!data.status) {

                    etudiantsList.innerHTML = `
                        <p>
                            ${data.message}
                        </p>
                    `;

                    return;

                }


                const etudiants =
                    data.etudiants;


                if (
                    !etudiants ||
                    etudiants.length === 0
                ) {

                    etudiantsList.innerHTML = `
                        <p>
                            Aucun étudiant trouvé.
                        </p>
                    `;

                    return;

                }


                etudiantsList.innerHTML = "";


                etudiants.forEach(
                    (etudiant) => {

                        const card =
                            document.createElement(
                                "div"
                            );


                        card.className =
                            "etudiant-card";


                        card.innerHTML = `

                            <div class="etudiant-icon">

                                <i class="fa-solid fa-user-graduate"></i>

                            </div>


                            <div class="etudiant-info">

                                <h3>
                                    ${etudiant.nom}
                                    ${etudiant.prenom}
                                </h3>


                                <p>

                                    <strong>
                                        ID :
                                    </strong>

                                    ${etudiant.id}

                                </p>


                                <p>

                                    <strong>
                                        Matricule :
                                    </strong>

                                    ${etudiant.matricule}

                                </p>


                                <p>

                                    <strong>
                                        Âge :
                                    </strong>

                                    ${etudiant.age}

                                </p>


                                <p>

                                    <strong>
                                        Classe :
                                    </strong>

                                    ${etudiant.classe}

                                </p>

                            </div>

                        `;


                        etudiantsList.appendChild(
                            card
                        );

                    }
                );


                listeSection.scrollIntoView({
                    behavior: "smooth"
                });


            } catch (error) {

                console.error(
                    "Erreur liste étudiants :",
                    error
                );


                etudiantsList.innerHTML = `
                    <p>
                        Erreur lors du chargement
                        des étudiants.
                    </p>
                `;

            }

        }
    );

}


// ========================================
// AFFICHER LA RECHERCHE
// ========================================

if (btnRechercher) {

    btnRechercher.addEventListener(
        "click",
        () => {

            rechercheSection.style.display =
                "block";


            recherche.focus();


            rechercheSection.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


// ========================================
// RECHERCHER UN ÉTUDIANT
// ========================================

if (btnLancerRecherche) {

    btnLancerRecherche.addEventListener(
        "click",
        async () => {

            const id =
                recherche.value.trim();


            if (!id) {

                alert(
                    "Veuillez entrer l'ID de l'étudiant."
                );

                return;

            }


            try {

                etudiantsList.innerHTML = `
                    <p class="chargement">
                        Recherche en cours...
                    </p>
                `;


                const response =
                    await fetch(
                        `/api/professeur/etudiants/${id}`,
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
                    "Résultat recherche :",
                    data
                );


                if (!data.status) {

                    etudiantsList.innerHTML = `
                        <p>
                            ${data.message}
                        </p>
                    `;

                    listeSection.scrollIntoView({
                        behavior: "smooth"
                    });

                    return;

                }


                const etudiant =
                    data.etudiant;


                if (!etudiant) {

                    etudiantsList.innerHTML = `
                        <p>
                            Étudiant introuvable.
                        </p>
                    `;

                    return;

                }


                etudiantsList.innerHTML = `

                    <div class="etudiant-card">

                        <div class="etudiant-icon">

                            <i class="fa-solid fa-user-graduate"></i>

                        </div>


                        <div class="etudiant-info">

                            <h3>

                                ${etudiant.nom}
                                ${etudiant.prenom}

                            </h3>


                            <p>

                                <strong>
                                    ID :
                                </strong>

                                ${etudiant.id}

                            </p>


                            <p>

                                <strong>
                                    Matricule :
                                </strong>

                                ${etudiant.matricule}

                            </p>


                            <p>

                                <strong>
                                    Âge :
                                </strong>

                                ${etudiant.age}

                            </p>


                            <p>

                                <strong>
                                    Classe :
                                </strong>

                                ${etudiant.classe}

                            </p>

                        </div>

                    </div>

                `;


                listeSection.scrollIntoView({
                    behavior: "smooth"
                });


            } catch (error) {

                console.error(
                    "Erreur recherche :",
                    error
                );


                etudiantsList.innerHTML = `
                    <p>
                        Erreur lors de la recherche
                        de l'étudiant.
                    </p>
                `;

            }

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

            allerVers(
                "/professeur"
            );

        }
    );

}


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