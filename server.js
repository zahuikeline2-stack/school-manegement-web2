import express from "express";

import pageRoutes from "./routes/pageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import statistiquesRoutes from "./routes/statistiquesRoutes.js";
const app = express();


app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(statistiquesRoutes);

app.use(express.static("public"));


// Pages HTML
app.use("/", pageRoutes);


// API
app.use(authRoutes);


app.listen(3000, () => {

    console.log("Serveur lancé sur le port 3000");

});