import jwt from "jsonwebtoken";
import { login } from "../Services/userService.js";

function loginUser(req, res) {

    const { email, password } = req.body;

    const user = login(email, password);

    if (!user) {
        return res.status(401).json({
            status: false,
            message: "Email ou mot de passe incorrect"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        "kelinefranceline",
        {
            expiresIn: "2h"
        }
    );

    return res.json({
        status: true,
        accessToken: token,
        role: user.role
    });
}

export { loginUser };