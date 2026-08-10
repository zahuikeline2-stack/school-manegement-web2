import db from "../db/base.js";
import log from "../utils/logger.js";

///Ajouter un prof//

function addTeacher(nom,matiere,user_id){
    const insertTeacher = db.prepare(`
        INSERT INTO teachers(nom,matiere,user_id)
        values(?,?,?)
        `)
    insertTeacher.run(nom,matiere,user_id)
    console.log(" professeur ajouter avec succès!")   
}
//addTeacher('Dybi prince','svt')
//addTeacher('Koffi Elizier','pc')
//addTeacher('Akpa Edwig','Math')
//addTeacher("Ocho", "Maths",2);
//addTeacher('Ocho','ANG',1)



///modifier un prof//

function updateTeacher(id,nom,matiere){
    const uptTeacher=db.prepare(`
        UPDATE teachers 
        SET nom = ?,
        matiere = ?
        WHERE id = ?

        `)
    uptTeacher.run(nom,matiere,id)
    console.log("professeur modifier avec succès!")
}

// suprimer un prof

function DEleteTeacher(id){
    const DelTeacher = db.prepare(`
        DELETE FROM teachers
        WHERE id = ?
        `)
    DelTeacher.run(id)
    console.log("professeur supprimer avec succès!")
}

///REchercher un prof

function getTeacher(id) {
    const geTeacher = db.prepare(`
        SELECT * FROM teachers
        WHERE id = ?
        `).get(id)
        return geTeacher
 }
function getTeacherById(id) {
    return db.prepare(`
        SELECT * FROM teachers
        WHERE id = ?
    `).get(id);
}
 export{
    addTeacher,
    updateTeacher,
    DEleteTeacher,
    getTeacher,
    getTeacherById
 };