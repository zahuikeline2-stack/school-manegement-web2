
import db from "../db/base.js";
import Student from "../model/modelStudent.js";
import log from "../utils/logger.js";


/// Ajouter un étudiant
async function addStudent(matricule, nom, prenom, age, classe, user_id) {

    await db.execute({
        sql: `
            INSERT INTO students(matricule, nom, prenom, age, classe, user_id)
            VALUES(?, ?, ?, ?, ?, ?)
        `,
        args: [matricule, nom, prenom, age, classe, user_id]
    });

    console.log("Etudiant ajouter avec succès!");
}


/// Modifier un étudiant
async function updateStudent(id, matricule, nom, prenom, age, classe) {

    await db.execute({
        sql: `
            UPDATE students
            SET matricule = ?,
                nom = ?,
                prenom = ?,
                age = ?,
                classe = ?
            WHERE id = ?
        `,
        args: [matricule, nom, prenom, age, classe, id]
    });

    console.log("Etudiant modifier avec succès!");
}


/// Supprimer un étudiant
async function deleteStudent(id) {

    await db.execute({
        sql: `
            DELETE FROM students
            WHERE id = ?
        `,
        args: [id]
    });

    console.log("Etudiant supprimer avec succès!");
}


/// Rechercher un étudiant
async function getStudentById(id) {

    const result = await db.execute({
        sql: `
            SELECT
                id,
                matricule,
                nom,
                prenom,
                age,
                classe,
                user_id
            FROM students
            WHERE id = ?
        `,
        args: [id]
    });

    if (result.rows.length === 0) {
        return null;
    }

    const student = result.rows[0];

    return {
        id: student.id,
        matricule: student.matricule,
        nom: student.nom,
        prenom: student.prenom,
        age: student.age,
        classe: student.classe,
        user_id: student.user_id
    };
}


/// Lister les étudiants
async function getStudents() {

    const result = await db.execute({
        sql: `
            SELECT
                id,
                matricule,
                nom,
                prenom,
                age,
                classe,
                user_id
            FROM students
        `,
        args: []
    });

    return result.rows.map((student) => ({
        id: student.id,
        matricule: student.matricule,
        nom: student.nom,
        prenom: student.prenom,
        age: student.age,
        classe: student.classe,
        user_id: student.user_id
    }));
}


export {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getStudentById,
};
