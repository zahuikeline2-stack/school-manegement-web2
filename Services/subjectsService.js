import db from "../db/base.js";
import Subject from "../model/modelSubjects.js";

////ajouter une matiere

function addSubjects (nom,teacher_id) {
    const adSubjects = db.prepare(`
        INSERT INTO subjects(nom,teacher_id)
        VALUES(?,?)
        `)
     adSubjects.run(nom,teacher_id)
     console.log("matiere ajouter avec succès!")   
  }
  //addSubjects("Dybi",2)
  //addSubjects("SVT",1)

  ///Lister les matieres

  function getSubjects(){
    const geSubjects = db.prepare(`
        SELECT * FROM subjects
        `).all()
        return geSubjects
  }

    function getSubjectsById(id){
    const geSubjects = db.prepare(`
        SELECT * FROM subjects WHERE id = ?
        `).get(id)
        return geSubjects
  }

  ///affecter un professeur à une matière

  function affectSubject(teacher_id, id){
    const affeSubject = db.prepare(`
        UPDATE subjects
        SET teacher_id = ?
        WHERE id = ?
        `)
       return affeSubject.run(teacher_id,id)

  }
  
  export{
    addSubjects,
    affectSubject,
    getSubjects,
    getSubjectsById
  };

  //affectSubject("13456","svt",)
 // addSubjects("stv","keline")
  // addSubjects("pc","zebi")
 

