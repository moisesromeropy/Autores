import { useState, useEffect } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";


const Formulario = ({autores,funcionAEjecutar, error, setError, errorValidacion, setErrorValidacion}) => {
    const [autoresAux, setAutoresAux] = useState({nombreAutor:""});
    const navegacion = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        // Verificar si hay un ID válido y si existe el array de autores
        if (id && autores && autores.length > 0) {
          const autorEncontrado = autores.find(autor => autor._id === id);
          if (autorEncontrado) {
            setAutoresAux({ nombreAutor: autorEncontrado.nombreAutor });
          }
        }
      }, [autores, id]); // Dependencias: autores y id

    const irAHome = () =>{
        setErrorValidacion("");
        setError(""); 
        navegacion(`/`)
    }

    const actualizarAutoresAux = (autor, name) =>{
        setErrorValidacion("");
        setError(""); 
        setAutoresAux({...autoresAux, [name]: autor})
    }
    
    const procesarFuncion = (event) =>{
        event.preventDefault();
        if(!autoresAux.nombreAutor ){
            setErrorValidacion("El nombre de autor es obligatorio");
            return; 
        }
        if(autoresAux.nombreAutor.length < 3){
            setErrorValidacion("El nombre de autor tiene que tener mínimo 3 caracteres");
            return;
        }
        console.log(autoresAux)
        funcionAEjecutar(autoresAux, id)
        
    }
    
    return(
        <>
        <h1>Autores favoritos</h1>
        <button onClick={(e)=>irAHome()}> Home</button>
        {(errorValidacion)?errorValidacion : ""}
        {(error)?error : ""}
            <form onSubmit={procesarFuncion}>
                <label htmlFor="nombreAutor">
                    Nombre del Autor
                </label>
                <input value={autoresAux.nombreAutor} id="nombreAutor" name="nombreAutor" onChange={(e)=> actualizarAutoresAux(e.target.value, "nombreAutor")} type="text" placeholder="Ejemplo: Paulo Coelho"></input>
                <button type="submit">Enviar</button>
                <button onClick={(e)=>irAHome()} type="button">Cancel</button>
            </form>
        </>
    )
}

export default Formulario;