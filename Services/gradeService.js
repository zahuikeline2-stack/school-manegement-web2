import db from "../db/base.js";
import Grades from "../model/modelGrades.js";

///ajouter une note(entre 0et 20)
function addGrade(student_id,subject_id,note){
    if (note < 0 || note > 20){
        return
     // console.log("la note doit etre entre 0 et 20")  

    }
    const adGrade = db.prepare(`
        INSERT INTO grades(student_id,subject_id,note)
        VALUES(?,?,?)
        `)
    adGrade.run(student_id,subject_id,note)
    //console.log("noté de l' etudiant ajoutée avec succès!")    
}

///Modifier une note

function updateGrade( note,student_id,subject_id){
    const updGrade = db.prepare(`
        UPDATE grades
        SET  note = ?
        WHERE student_id = ? AND subject_id = ? 
        `)
    updGrade.run( note,student_id,subject_id) 
    

}

///Supprimer une note

function DeleteGrade(id){
    const DeletGrade = db.prepare(`
        DELETE FROM grades
        WHERE id = ?
        `)
    DeletGrade.run(id)
}

////Calculer la moyenne d’un étudiant

function getGrade(student_id){
    const geGrade = db.prepare(`
        SELECT AVG(note) AS moyenne
        FROM grades
        WHERE student_id = ?
        `).get(student_id);
        return geGrade;
}
///recuper tous les notes

function getGradesStudent(student_id) {

    const grades = db.prepare(`
        SELECT *
        FROM grades
        WHERE student_id = ?
    `).all(student_id);

    return grades;
}

function getSubject(student_id) {

    const grades = db.prepare(`
        SELECT *
        FROM grades
        WHERE student_id = ?
    `).all(student_id);

    return grades;
}
export{
    addGrade,
    updateGrade,
    DeleteGrade,
    getGrade,
    getGradesStudent
}
