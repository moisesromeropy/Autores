const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ColeccionAutores = mongoose.Schema({
    nombreAutor:{
        type: String,
        unique: true,
        required: [true, "El nombre del autor es obligatorio"],
        minlength:[3, "Mínimo de 3 caracteres"]
    }
})

ColeccionAutores.plugin(uniqueValidator, {message: 'Ya existe otro autor con el nombre {VALUE}'});

const Autor = mongoose.model("Autor", ColeccionAutores);

module.exports = Autor;