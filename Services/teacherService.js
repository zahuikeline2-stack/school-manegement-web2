
import db from "../db/base.js";

async function addTeacher(nom, matiere, user_id) {

    const insertTeacher = await db.prepare(`
        INSERT INTO teachers(nom, matiere, user_id)
        VALUES(?, ?, ?)
    `);

    await insertTeacher.run(nom, matiere, user_id);
}


async function updateTeacher(id, nom, matiere) {

    const uptTeacher = await db.prepare(`
        UPDATE teachers
        SET nom = ?, matiere = ?
        WHERE id = ?
    `);

    await uptTeacher.run(nom, matiere, id);
}


async function DEleteTeacher(id) {

    const DelTeacher = await db.prepare(`
        DELETE FROM teachers
        WHERE id = ?
    `);

    await DelTeacher.run(id);
}


async function getTeacher(id) {

    const teacher = await db.prepare(`
        SELECT * FROM teachers
        WHERE id = ?
    `);

    const result = await teacher.get(id);

    return result;
}


async function getTeacherById(id) {

    const teacher = await db.prepare(`
        SELECT * FROM teachers
        WHERE id = ?
    `);

    const result = await teacher.get(id);

    return result;
}


// Retrouve la fiche "teacher" liée à un compte utilisateur connecté
async function getTeacherByUserId(user_id) {

    const teacher = await db.prepare(`
        SELECT * FROM teachers
        WHERE user_id = ?
    `);

    const result = await teacher.get(user_id);

    return result;
}


export {
    addTeacher,
    updateTeacher,
    DEleteTeacher,
    getTeacher,
    getTeacherById,
    getTeacherByUserId
};

