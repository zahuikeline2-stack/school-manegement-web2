
import db from "../db/base.js";
import Grades from "../model/modelGrades.js";

/// Ajouter une note (entre 0 et 20)
async function addGrade(student_id, subject_id, note) {

    if (note < 0 || note > 20) {
        return;
        // console.log("la note doit être entre 0 et 20");
    }

    const adGrade = await db.prepare(`
        INSERT INTO grades(student_id, subject_id, note)
        VALUES(?, ?, ?)
    `);

    await adGrade.run(student_id, subject_id, note);

    // console.log("note de l'étudiant ajoutée avec succès!");
}


/// Modifier une note
async function updateGrade(note, student_id, subject_id) {

    const updGrade = await db.prepare(`
        UPDATE grades
        SET note = ?
        WHERE student_id = ? AND subject_id = ?
    `);

    await updGrade.run(note, student_id, subject_id);
}


/// Supprimer une note
async function DeleteGrade(id) {

    const DeletGrade = await db.prepare(`
        DELETE FROM grades
        WHERE id = ?
    `);

    await DeletGrade.run(id);
}


/// Calculer la moyenne d’un étudiant
async function getGrade(student_id) {

    const geGrade = await db.prepare(`
        SELECT AVG(note) AS moyenne
        FROM grades
        WHERE student_id = ?
    `);

    const result = await geGrade.get(student_id);

    return result;
}


/// Récupérer toutes les notes
async function getGradesStudent(student_id) {

    const grades = await db.prepare(`
        SELECT *
        FROM grades
        WHERE student_id = ?
    `);

    const result = await grades.all(student_id);

    return result;
}


async function getSubject(student_id) {

    const grades = await db.prepare(`
        SELECT *
        FROM grades
        WHERE student_id = ?
    `);

    const result = await grades.all(student_id);

    return result;
}


export {
    addGrade,
    updateGrade,
    DeleteGrade,
    getGrade,
    getGradesStudent
};

