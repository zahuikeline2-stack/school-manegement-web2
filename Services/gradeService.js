
import db from "../db/base.js";
import Grades from "../model/modelGrades.js";


/// Ajouter une note (entre 0 et 20)
async function addGrade(student_id, subject_id, note) {

    if (note < 0 || note > 20) {
        return;
        // console.log("la note doit être entre 0 et 20");
    }

    await db.execute({
        sql: `
            INSERT INTO grades(student_id, subject_id, note)
            VALUES(?, ?, ?)
        `,
        args: [student_id, subject_id, note]
    });

    // console.log("note de l'étudiant ajoutée avec succès!");
}


/// Modifier une note
async function updateGrade(note, student_id, subject_id) {

    await db.execute({
        sql: `
            UPDATE grades
            SET note = ?
            WHERE student_id = ? AND subject_id = ?
        `,
        args: [note, student_id, subject_id]
    });
}


/// Supprimer une note
async function DeleteGrade(id) {

    await db.execute({
        sql: `
            DELETE FROM grades
            WHERE id = ?
        `,
        args: [id]
    });
}


/// Calculer la moyenne d’un étudiant
async function getGrade(student_id) {

    const result = await db.execute({
        sql: `
            SELECT AVG(note) AS moyenne
            FROM grades
            WHERE student_id = ?
        `,
        args: [student_id]
    });

    return result.rows[0];
}


/// Récupérer toutes les notes
async function getGradesStudent(student_id) {

    const result = await db.execute({
        sql: `
            SELECT *
            FROM grades
            WHERE student_id = ?
        `,
        args: [student_id]
    });

    return result.rows;
}


/// Récupérer les matières associées aux notes de l'étudiant
async function getSubject(student_id) {

    const result = await db.execute({
        sql: `
            SELECT *
            FROM grades
            WHERE student_id = ?
        `,
        args: [student_id]
    });

    return result.rows;
}


export {
    addGrade,
    updateGrade,
    DeleteGrade,
    getGrade,
    getGradesStudent,
    getSubject
};

