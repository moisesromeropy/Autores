const controladorAutores = require("./../controladores/ControladorAutores");

module.exports = (app) =>{
    app.get('/api/autores', controladorAutores.todosLosAutores);
    app.get('/api/autores/:id', controladorAutores.unAutor);
    app.post('/api/autores/agregar', controladorAutores.agregarAutor);
    app.delete('/api/autores/eliminar/:id', controladorAutores.eliminarAutor);
    app.put('/api/autores/editar/:id', controladorAutores.actualizarAutor);    
}