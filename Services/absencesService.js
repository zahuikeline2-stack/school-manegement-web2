
import Absence from "../model/modelAbsences.js";
import db from "../db/base.js";


/// Enregistrer une absence
async function addAbsence(student_id, date, status) {

    const adAbsence = await db.prepare(`
        INSERT INTO absences(student_id, date, status)
        VALUES(?, ?, ?)   
    `);

    await adAbsence.run(student_id, date, status);

    // console.log("Absence enregistrée avec succès !");
}


/// Marquer absence comme justifiée ou non justifiée
async function updateAbsence(status, id) {

    const updatAbsence = await db.prepare(`
        UPDATE absences
        SET status = ?
        WHERE id = ?
    `);

    const res = await updatAbsence.run(status, id);

    // console.log("Statut de l'absence mis à jour !", res);
}


/// Consulter l’historique des absences
async function getAbsence(student_id) {

    const geAbsence = await db.prepare(`
        SELECT * FROM absences
        WHERE student_id = ?
    `);

    const result = await geAbsence.all(student_id);

    return result;
}


export {
    addAbsence,
    updateAbsence,
    getAbsence
};

