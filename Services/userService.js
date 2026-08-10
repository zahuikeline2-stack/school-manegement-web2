import db from "../db/base.js"
import User from "../model/modelUsers.js";
import log from "../utils/logger.js";

///ajouter un utilisateur//

function addUser(name,role,password,email){
    const insertUser = db.prepare(`
        INSERT INTO  users(name,role,password,email)
        VALUES(?,?,?,?)
        `)
        insertUser.run(name,role,password,email)
    console.log("utilisateur enregistré avec succes !")
}
//addUser("zebi","admin","1111","keline@gmail.com")

//addUser(
    //"franceline",
    //"étudiant",
    //"1234",
    //"franceline@gmail.com" 
//);//

//addUser('Ocho','professeur','5555','Ocho@gmail.com')
///supprimer un utilisateur

function DeleteUser(id){
    const DeleUser = db.prepare(`
        DELETE  FROM users
        WHERE id = ?
        `)
        DeleUser.run(id)
          console.log("utilisateur supprimer avec succes !")
}

///listers les utilisateurs

function getUser(){
    const geUser = db.prepare(`
        SELECT * FROM users
    
        `).all()
        return geUser
}

///menu de connections
function login(email,password){
    const Login = db.prepare(`
        SELECT * FROM users
        WHERE email = ? AND password = ?
        `).get(email,password)
        return Login
        
}

export{
    addUser,
    DeleteUser,
    getUser,
    login
}

