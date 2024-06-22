const {request} = require("express");
const Autor = require("./../modelos/ModeloAutores");

module.exports.todosLosAutores = ((req, res)=> {
    Autor.find()
    .then((autoresEncontrados)=>{
        return res.status(200).json(autoresEncontrados)
    })
    .catch((error)=>{
        return res.status(404).json({message: "Ha ocurrido un error", error})
    });
})

module.exports.unAutor = ((req, res) =>{
    Autor.find({_id: req.params.id})
    .then((autorEncontrado)=>{
        return res.status(200).json(autorEncontrado)
    })
    .catch((error)=>{
        return res.status(404).json({message: "Ha ocurrido un error", error})
    })
})

module.exports.agregarAutor = ((req, res) =>{
    const {nombreAutor} = req.body;
    if(!nombreAutor || nombreAutor.length < 3){
        return res.status(400).json({message:"El nombre de autor es obligatorio y tiene que tener mínimo 3 caracteres"})
    }
    Autor.create(req.body)
    .then((autorCreado)=>{
        return res.status(201).json(autorCreado)
    })
    .catch((error)=>{
        return res.status(500).json({error})
    })
})

module.exports.eliminarAutor = ((req, res)=>{
    const id = req.params.id;

    Autor.deleteOne({_id: id})
    .then((autorRemovido)=>{
        console.log(autorRemovido)
        return res.status(204).end()
    })
    .catch((error)=>{
        return res.status(500).json({message: "Hubo un error al eliminar al autor", error})
    })
})

module.exports.actualizarAutor = ((req, res)=>{
    const id = req.params.id;
    const {nombreAutor} = req.body;
    const otroAutor = Autor.findOne({nombreAutor: req.body.nombreAutor})

    if(otroAutor){
        return res.status(500).json({message: "Existe otro autor con el mismo nombre"})
    }

    if(!nombreAutor || nombreAutor.length < 3){
        return res.status(500).json({message:"El nombre de autor es obligatorio y tiene que tener mínimo 3 caracteres"})
    }

    Autor.findOneAndUpdate({_id: id}, {nombreAutor: req.body.nombreAutor}, {new: true})
    .then(autorActualizado=>{
        if(!autorActualizado){
            return res.status(404).json({message: "Autor no encontrado"})
        }
        return res.status(200).json(autorActualizado)
    })
    .catch((error)=>{
        return res.status(500).json({message: "Ha ocurrido un error al actualizar el Autor", error})
    })
})

