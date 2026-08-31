function roleMiddleware(role) {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({

                status: false,

                message: "Utilisateur non authentifié"

            });

        }


        if (req.user.role !== role) {

            return res.status(403).json({

                status: false,

                message: "Accès interdit"

            });

        }


        next();

    };

}

export default roleMiddleware;