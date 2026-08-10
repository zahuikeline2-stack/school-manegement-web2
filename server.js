import express from "express";
import path from "path";
import router from "./routes/authroute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", router);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(
        path.join(process.cwd(), "views", "index.html")
    );
});

app.get("/login", (req, res) => {
    res.sendFile(
        path.join(process.cwd(), "views", "login.html")
    );
});

app.listen(3000, () => {
    console.log("Serveur lancé");
});