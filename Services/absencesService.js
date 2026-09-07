
import Absence from "../model/modelAbsences.js";
import db from "../db/base.js";


/// Enregistrer une absence
async function addAbsence(student_id, date, status) {

    await db.execute({
        sql: `
            INSERT INTO absences(student_id, date, status)
            VALUES(?, ?, ?)
        `,
        args: [student_id, date, status]
    });

    // console.log("Absence enregistrée avec succès !");
}


/// Marquer absence comme justifiée ou non justifiée
async function updateAbsence(status, id) {

    await db.execute({
        sql: `
            UPDATE absences
            SET status = ?
            WHERE id = ?
        `,
        args: [status, id]
    });

    // console.log("Statut de l'absence mis à jour !");
}


/// Consulter l’historique des absences
async function getAbsence(student_id) {

    const result = await db.execute({
        sql: `
            SELECT *
            FROM absences
            WHERE student_id = ?
        `,
        args: [student_id]
    });

    return result.rows;
}


export {
    addAbsence,
    updateAbsence,
    getAbsence
};

