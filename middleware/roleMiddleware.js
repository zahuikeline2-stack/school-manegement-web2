function roleMiddleware(role) {

    return (req, res, next) => {

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