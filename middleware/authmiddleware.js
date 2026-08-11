import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: false,
            message: "Token manquant"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            "kelinefranceline"
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            status: false,
            message: "Token invalide"
        });

    }
}

export default authMiddleware;