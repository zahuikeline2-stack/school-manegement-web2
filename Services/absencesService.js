import Absence from "../model/modelAbsences.js";
import db from "../db/base.js";

///Enregistrer une absence
function addAbsence(student_id,date,status){
    const adAbsence = db.prepare(`
    INSERT INTO absences(student_id,date,status)
    VALUES(?,?,?)   
        `)
        adAbsence .run(student_id,date,status);
       // console.log("Absence enregistrée avec succès !");
}

//addAbsence(9,"2026-28-06","Absence")
///Marquer absence comme justifiée ou non justifiée
function updateAbsence(status,id){

    const updatAbsence = db.prepare(`
        UPDATE absences
        SET status = ?
        WHERE id = ?
        `)
     const  res=  updatAbsence.run(status,id)
        //console.log("Statut de l'absence mis à jour !", res);
}
//updateAbsence("non justifie","2")

//addAbsence("16025297H","13.06.2026" ,"absent")

///Consulter l’historique des absences
function getAbsence(student_id){
    const geAbsence = db.prepare(`
     SELECT * FROM  absences 
     WHERE student_id = ? 
        `).all(student_id)
        return geAbsence
}
export{
    addAbsence,
    updateAbsence,
    getAbsence
}