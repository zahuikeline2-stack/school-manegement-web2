
import db from "../db/base.js";
import Student from "../model/modelStudent.js";
import log from "../utils/logger.js";

/// Ajouter un étudiant
async function addStudent(matricule, nom, prenom, age, classe, user_id) {

    const insertStudent = await db.prepare(`
        INSERT INTO students(matricule, nom, prenom, age, classe, user_id)
        VALUES(?, ?, ?, ?, ?, ?)
    `);

    await insertStudent.run(matricule, nom, prenom, age, classe, user_id);

    console.log("Etudiant ajouter avec succès!");
}


/// Modifier un étudiant
async function updateStudent(id, matricule, nom, prenom, age, classe) {

    const uptStudent = await db.prepare(`
        UPDATE students
        SET matricule = ?,
            nom = ?,
            prenom = ?,
            age = ?,
            classe = ?
        WHERE id = ?
    `);

    await uptStudent.run(matricule, nom, prenom, age, classe, id);

    console.log("Etudiant modifier avec succès!");
}


/// Supprimer un étudiant
async function deleteStudent(id) {

    const DeleStudents = await db.prepare(`
        DELETE FROM students
        WHERE id = ?
    `);

    await DeleStudents.run(id);

    console.log("Etudiant supprimer avec succès!");
}


/// Rechercher un étudiant
async function getStudentById(id) {

    const geStudents = await db.prepare(`
        SELECT * FROM students
        WHERE id = ?
    `);

    const result = await geStudents.get(id);

    return result;
}


/// Lister les étudiants
async function getStudents() {

    const listeStudents = await db.prepare(`
        SELECT * FROM students
    `);

    const result = await listeStudents.all();

    return result;
}


export {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getStudentById,
};

