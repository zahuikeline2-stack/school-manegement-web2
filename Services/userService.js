import db from "../db/base.js";



// AJOUTER UN UTILISATEUR


async function addUser(name, role, password, email) {

    await db.execute({
        sql: `
            INSERT INTO users(name, role, password, email)
            VALUES (?, ?, ?, ?)
        `,
        args: [
            name,
            role,
            password,
            email
        ]
    });

    console.log("Utilisateur enregistré avec succès !");
}

//addUser("keline" ,"professeur",5555,"keline@gmail.com")

// SUPPRIMER UN UTILISATEUR


async function DeleteUser(id) {

    await db.execute({
        sql: `
            DELETE FROM users
            WHERE id = ?
        `,
        args: [id]
    });

    console.log("Utilisateur supprimé avec succès !");
}



// LISTER LES UTILISATEURS


async function getUser() {

    const result = await db.execute({
        sql: `
            SELECT * FROM users
        `,
        args: []
    });

    return result.rows;
}


// CONNEXION

async function login(email, password) {

    const result = await db.execute({
        sql: `
            SELECT *
            FROM users
            WHERE email = ?
            AND password = ?
        `,
        args: [
            email,
            password
        ]
    });

    return result.rows[0] || null;
}



// EXPORTS


export {
    addUser,
    DeleteUser,
    getUser,
    login
};