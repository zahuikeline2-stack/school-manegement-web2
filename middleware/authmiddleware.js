import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {

    let token = null;


    // ==========================
    // 1. Chercher le token dans Authorization
    // ==========================

    const authHeader = req.headers.authorization;

    if (authHeader) {

        token = authHeader.split(" ")[1];

    }


    // ==========================
    // 2. Chercher le token dans l'URL
    // ==========================

    if (!token) {

        token = req.query.token;

    }


    // ==========================
    // 3. Vérifier si le token existe
    // ==========================

    if (!token) {

        return res.status(401).json({

            status: false,

            message: "Token manquant"

        });

    }


    // ==========================
    // 4. Vérifier le token
    // ==========================

    try {

        const decoded = jwt.verify(
            token,
            "kelinefranceline"
        );


        // Mettre les informations
        // de l'utilisateur dans req.user

        req.user = decoded;


        // Continuer vers le prochain middleware
        // ou vers la route

        next();


    } catch (error) {

        return res.status(401).json({

            status: false,

            message: "Token invalide"

        });

    }

}


export default authMiddleware;