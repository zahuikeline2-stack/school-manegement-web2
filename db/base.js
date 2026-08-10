import Database from "better-sqlite3";
const db = new Database('school.db');

//pour gerer mes clé etrangere
db.exec(`PRAGMA foreign_keys = ON`)

//table users

db.exec(`
            CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
            )
            `)

//table etudiant//
db.exec(`
    CREATE TABLE IF NOT EXISTS students( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricule TEXT NOT NULL,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    age INTEGER NOT NULL,
    classe TEXT NOT NULL,
    user_id INTEGER ,
    FOREIGN KEY (user_id) REFERENCES users(id)

    )
    `)

//table prof//

db.exec(`
        CREATE TABLE IF NOT EXISTS teachers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        matiere TEXT NOT NULL,
        user_id INTEGER ,
        FOREIGN KEY (user_id) REFERENCES users(id)
        )
        
        `)


//subjects

db.exec(`
            CREATE TABLE IF NOT EXISTS subjects(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            teacher_id INTEGER NOT NULL,
            FOREIGN KEY (teacher_id) REFERENCES teachers(id)
            )
            `)

// grades

db.exec(`
             CREATE TABLE IF NOT EXISTS grades (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             student_id INTEGER NOT NULL,
             subject_id INTEGER NOT NULL,
             note REAL  NOT NULL,
             FOREIGN KEY (student_id) REFERENCES students(id),
             FOREIGN KEY (subject_id) REFERENCES subjects (id)
             
             )
            `)

//absences

db.exec(`
        CREATE TABLE IF NOT EXISTS absences(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         student_id INTEGER NOT NULL,
         date TEXT NOT NULL,
         status TEXT NOT NULL,
          FOREIGN KEY (student_id) REFERENCES students(id)

        )
        `)


export default db;