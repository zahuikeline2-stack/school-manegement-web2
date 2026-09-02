
import jwt from "jsonwebtoken";
import { login } from "../Services/userService.js";
import { JWT_SECRET } from "../config.js";



// CONNEXION


async function loginUser(req, res) {

    try {

        const {
            email,
            password
        } = req.body;


        console.log("Email reçu :", email);


        // RECHERCHER L'UTILISATEUR
      

        const user =
            await login(
                email,
                password
            );


        // IDENTIFIANTS INCORRECTS
     
        if (!user) {

            return res.status(401).json({

                status: false,

                message:
                    "Email ou mot de passe incorrect"

            });

        }


        // CREATION DU TOKEN
      

        const token =
            jwt.sign(

                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },

                JWT_SECRET,

                {
                    expiresIn: "2h"
                }

            );


   
        // REPONSE
    

        return res.json({

            status: true,

            accessToken: token,

            role: user.role

        });


    } catch (error) {

        console.error(
            "ERREUR LOGIN :",
            error
        );


        return res.status(500).json({

            status: false,

            message:
                "Erreur interne du serveur"

        });

    }

}


export {
    loginUser
};

