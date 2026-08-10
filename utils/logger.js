import fs from "fs";
import path from "path";

if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}
// chemin du fichier de log
const logFile = path.join("logs", "app.log");

function log(message, level="info") {

    // date et heure actuelles
    const date = new Date().toISOString();

    // ligne à écrire dans le fichier
    const line = `${date} [${level}] ${message}\n`;

    // ajoute la ligne à la fin du fichier
    fs.appendFileSync(logFile, line);
}

export default log;