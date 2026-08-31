import db from "../db/base.js";


// ========================================
// AJOUTER UN UTILISATEUR
// ========================================

async function addUser(name, role, password, email) {

    const insertUser = await db.prepare(`
        INSERT INTO users(name, role, password, email)
        VALUES (?, ?, ?, ?)
    `);

    await insertUser.run(
        name,
        role,
        password,
        email
    );

    console.log("Utilisateur enregistré avec succès !");
}
//addUser("zebi", "admin", "8888", "ZEBI@gmail.com");

// ========================================
// SUPPRIMER UN UTILISATEUR
// ========================================

async function DeleteUser(id) {

    const deleteUser = await db.prepare(`
        DELETE FROM users
        WHERE id = ?
    `);

    await deleteUser.run(id);

    console.log("Utilisateur supprimé avec succès !");
}


// ========================================
// LISTER LES UTILISATEURS
// ========================================

async function getUser() {

    const getUsers = await db.prepare(`
        SELECT * FROM users
    `);

    const result = await getUsers.all();

    return result;
}


// ========================================
// CONNEXION
// ========================================

async function login(email, password) {

    const user = await db.prepare(`
        SELECT *
        FROM users
        WHERE email = ?
        AND password = ?
    `);

    const result = await user.get(email, password);

    return result;
}


// ========================================
// EXPORTS
// ========================================

export {
    addUser,
    DeleteUser,
    getUser,
    login
};
