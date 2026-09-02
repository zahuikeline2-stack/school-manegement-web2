
import db from "../db/base.js";


async function addTeacher(nom, matiere, user_id) {

    await db.execute({
        sql: `
            INSERT INTO teachers(nom, matiere, user_id)
            VALUES(?, ?, ?)
        `,
        args: [nom, matiere, user_id]
    });
}


async function updateTeacher(id, nom, matiere) {

    await db.execute({
        sql: `
            UPDATE teachers
            SET nom = ?, matiere = ?
            WHERE id = ?
        `,
        args: [nom, matiere, id]
    });
}


async function DEleteTeacher(id) {

    await db.execute({
        sql: `
            DELETE FROM teachers
            WHERE id = ?
        `,
        args: [id]
    });
}


async function getTeacher(id) {

    const result = await db.execute({
        sql: `
            SELECT * FROM teachers
            WHERE id = ?
        `,
        args: [id]
    });

    return result.rows[0] || null;
}


async function getTeacherById(id) {

    const result = await db.execute({
        sql: `
            SELECT * FROM teachers
            WHERE id = ?
        `,
        args: [id]
    });

    return result.rows[0] || null;
}


// Retrouve la fiche "teacher" liée à un compte utilisateur connecté
async function getTeacherByUserId(user_id) {

    const result = await db.execute({
        sql: `
            SELECT * FROM teachers
            WHERE user_id = ?
        `,
        args: [user_id]
    });

    return result.rows[0] || null;
}


export {
    addTeacher,
    updateTeacher,
    DEleteTeacher,
    getTeacher,
    getTeacherById,
    getTeacherByUserId
};

