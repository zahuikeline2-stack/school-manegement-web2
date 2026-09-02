
import db from "../db/base.js";


async function addSubjects(nom, teacher_id) {

    await db.execute({
        sql: `
            INSERT INTO subjects(nom, teacher_id)
            VALUES(?, ?)
        `,
        args: [nom, teacher_id]
    });
}


async function getSubjects() {

    const result = await db.execute({
        sql: `
            SELECT * FROM subjects
        `,
        args: []
    });

    return result.rows;
}


async function getSubjectsById(id) {

    const result = await db.execute({
        sql: `
            SELECT * FROM subjects
            WHERE id = ?
        `,
        args: [id]
    });

    return result.rows[0] || null;
}


// Matières d'un professeur précis (teacher_id = id dans la table teachers)
async function getSubjectsByTeacher(teacher_id) {

    const result = await db.execute({
        sql: `
            SELECT * FROM subjects
            WHERE teacher_id = ?
        `,
        args: [teacher_id]
    });

    return result.rows;
}


async function affectSubject(teacher_id, id) {

    const result = await db.execute({
        sql: `
            UPDATE subjects
            SET teacher_id = ?
            WHERE id = ?
        `,
        args: [teacher_id, id]
    });

    return result;
}


export {
    addSubjects,
    affectSubject,
    getSubjects,
    getSubjectsById,
    getSubjectsByTeacher
};

