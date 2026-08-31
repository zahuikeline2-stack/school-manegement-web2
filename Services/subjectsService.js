
import db from "../db/base.js";

async function addSubjects(nom, teacher_id) {

    const adSubjects = await db.prepare(`
        INSERT INTO subjects(nom, teacher_id)
        VALUES(?, ?)
    `);

    await adSubjects.run(nom, teacher_id);
}


async function getSubjects() {

    const subjects = await db.prepare(`
        SELECT * FROM subjects
    `);

    const result = await subjects.all();

    return result;
}


async function getSubjectsById(id) {

    const subject = await db.prepare(`
        SELECT * FROM subjects
        WHERE id = ?
    `);

    const result = await subject.get(id);

    return result;
}


// Matières d'un professeur précis (teacher_id = id dans la table teachers)
async function getSubjectsByTeacher(teacher_id) {

    const subjects = await db.prepare(`
        SELECT * FROM subjects
        WHERE teacher_id = ?
    `);

    const result = await subjects.all(teacher_id);

    return result;
}


async function affectSubject(teacher_id, id) {

    const affeSubject = await db.prepare(`
        UPDATE subjects
        SET teacher_id = ?
        WHERE id = ?
    `);

    const result = await affeSubject.run(teacher_id, id);

    return result;
}


export {
    addSubjects,
    affectSubject,
    getSubjects,
    getSubjectsById,
    getSubjectsByTeacher
};

