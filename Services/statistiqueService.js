
import db from "../db/base.js";

// Identifier le meilleur étudiant (selon moyenne)

async function identifiStudent() {

    const identifStudent = await db.prepare(`
        SELECT student_id, AVG(note) AS moyenne
        FROM grades
        GROUP BY student_id
        ORDER BY moyenne DESC
        LIMIT 1
    `);

    const result = await identifStudent.get();

    return result;
}


/// Calculer la moyenne générale

async function moyenneGenerale() {

    const moyenGenerale = await db.prepare(`
        SELECT AVG(note) AS moyenne_generale
        FROM grades
    `);

    const result = await moyenGenerale.get();

    return result;
}


/// Compter les absences

async function CompterAbsences() {

    const CompteAbsences = await db.prepare(`
        SELECT COUNT(*) AS total_absences
        FROM absences
    `);

    const result = await CompteAbsences.get();

    return result;
}


export {
    identifiStudent,
    moyenneGenerale,
    CompterAbsences
};

