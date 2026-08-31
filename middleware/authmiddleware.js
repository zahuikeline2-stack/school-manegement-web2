import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    let token = null;


    // ========================================
    // TOKEN DANS AUTHORIZATION
    // ========================================

    if (authHeader) {

        token = authHeader.split(" ")[1];

    }


    // ========================================
    // TOKEN DANS L'URL
    // ========================================

    if (!token && req.query.token) {

        token = req.query.token;

    }


    // ========================================
    // TOKEN MANQUANT
    // ========================================

    if (!token) {

        return res.status(401).json({

            status: false,

            message: "Token manquant"

        });

    }


    // ========================================
    // VÉRIFICATION DU TOKEN
    // ========================================

    try {

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.error(
            "Erreur token :",
            error.message
        );

        return res.status(401).json({

            status: false,

            message: "Token invalide ou expiré"

        });

    }

}

export default authMiddleware;