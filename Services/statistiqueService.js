
import db from "../db/base.js";


// Identifier le meilleur étudiant (selon moyenne)

async function identifiStudent() {

    const result = await db.execute({
        sql: `
            SELECT student_id, AVG(note) AS moyenne
            FROM grades
            GROUP BY student_id
            ORDER BY moyenne DESC
            LIMIT 1
        `,
        args: []
    });

    return result.rows[0];
}


/// Calculer la moyenne générale

async function moyenneGenerale() {

    const result = await db.execute({
        sql: `
            SELECT AVG(note) AS moyenne_generale
            FROM grades
        `,
        args: []
    });

    return result.rows[0];
}


/// Compter les absences

async function CompterAbsences() {

    const result = await db.execute({
        sql: `
            SELECT COUNT(*) AS total_absences
            FROM absences
        `,
        args: []
    });

    return result.rows[0];
}


export {
    identifiStudent,
    moyenneGenerale,
    CompterAbsences
};

