import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {

    console.log(req.body);

    res.json({
        message: "Requête de connexion reçue"
    });

});

export default router;