import db from "../db/base.js";
import Student from "../model/modelStudent.js";
import log from "../utils/logger.js";
///ajouter un Etudiants

function addStudent(matricule,nom,prenom,age,classe,user_id) {
   const insertStudent = db.prepare(`
    INSERT INTO students(matricule,nom,prenom,age,classe,user_id)
    VALUES(?,?,?,?,?,?)
    `)
    insertStudent.run(matricule,nom,prenom,age,classe,user_id);
    console.log("Etudiant ajouter avec succès!")
}
addStudent("16025297H","franceline","zahui",23,"Tle",3)

///modifier un etudiant//
function updateStudent(id,matricule,nom,prenom,age,classe) {
    const uptStudent=db.prepare(`
        UPDATE students
        SET matricule =?,
        nom =?,
        prenom =?,
        age = ?,
        classe = ?
        WHERE id = ?
        `)
        uptStudent.run(matricule,nom,prenom,age,classe,id)
        console.log("Etudiant modifier avec succès!")
}
///supprimer un etudiant

function deleteStudent(id) {
    const DeleStudents = db.prepare(`
        DELETE FROM students
        WHERE id = ?
        `)
        DeleStudents.run(id)
        console.log("Etudiant supprimer avec succès!")
}

////Rechercher un etudiant

function  getStudentById(id) {
    const geStudents = db.prepare(`
        SELECT * FROM students
        WHERE id = ?
        `).get(id)
        return geStudents;

}

// lister les etudiants



function getStudents() {
    const listeStudents = db.prepare(`
        SELECT * FROM students
        `).all()
        return  listeStudents;

}


//addStudent("143674Y","rethu","keline",25,"td3")
//deleteStudent(1)

//addStudent("3446Y","akpa","sophia",45,"master")

export {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getStudentById,
};