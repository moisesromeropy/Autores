const express = require("express");
const app = express();
const cors = require("cors");
const rutasAutores = require("./rutas/rutasAutores");

require("./configuracion/configuracionBD");

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

rutasAutores(app);




app.listen(8000, ()=>{
    console.log("Listening on port 8000")
});