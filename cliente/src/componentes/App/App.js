import { useEffect, useState } from "react";
import axios from 'axios';
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import Autores from "../Autores/Autores";
import Formulario from "../Formulario/Formulario";
import "./App.css"
const App = () =>{
    const [autores, setAutores] = useState([]);
    const URL_BASE = "http://localhost:8000/api/"
    const [error, setError] = useState("");
    const [errorValidacion, setErrorValidacion] = useState("");
    const navegacion = useNavigate();
    useEffect(()=>{
        const cargarAutores =()=>{
            axios.get(`${URL_BASE}autores`)
            .then((response)=>{
                console.log(response.data)
                setAutores(response.data);
            })
            .catch((error)=>{
                console.log(error);
                setError(error)
            })
        }
        cargarAutores();
    }, [])

    const agregarAlEstado = (autor)=>{
        setAutores([...autores, autor]);
    }

    const agregarAutor = (nuevoAutor, id) =>{
        axios.post(`http://localhost:8000/api/autores/agregar`,
            nuevoAutor,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        )
        .then((response)=>{
            console.log(response)
            agregarAlEstado(response.data);
            setError("");
            setErrorValidacion("");
            navegacion("/");
        })
        .catch((errr)=>{
            console.log(errr);
            setError(errr.response.data.error.errors.nombreAutor.message)

        })
    }
    
    const editarEstado = (autorActualizado) =>{
        const indice = autores.findIndex((autor)=>autor._id===autorActualizado._id);
        console.log(indice)
        const autoresActualizados = [...autores];
        autoresActualizados[indice].nombreAutor= autorActualizado.nombreAutor;
        setAutores(autoresActualizados);
    }

    const editarAutor = (autorEditado, id ) =>{
        axios.put(`${URL_BASE}autores/editar/${id}`,
            autorEditado,
            {
                headers:{
                      'Content-Type':'application/json'
                }
            }
        )
        .then((response)=>{
            editarEstado(response.data);
            navegacion("/");
            console.log(response)
            setError("");
            setErrorValidacion("");
        })
        .catch((errr)=>{
            console.log(errr.response.data.message);
            setError(errr.response.data.message);
        })
    }
    
    const eliminarDelEstado = (id) =>{
        const indice = autores.findIndex((autor)=>autor._id === id);
        const autoresActualizados=[...autores];
        autoresActualizados.splice(indice, 1);
        setAutores(autoresActualizados);
    }

    const eliminarAutor = (id) =>{
        axios.delete(`${URL_BASE}autores/eliminar/${id}`)
        .then((response)=>{
            eliminarDelEstado(id);
            setError("");
        })
        .catch((errr)=>{
            setError(errr);
        })
    }
    
    return(
        <div className="app" >
            
            <Routes>
                <Route path="/" element={<Autores autores={autores} setError={setError} eliminarAutor={eliminarAutor}/>} />
                <Route path="/autores/nuevo" element={<Formulario autores={autores} setErrorValidacion={setErrorValidacion} errorValidacion={errorValidacion} error={error} setError={setError} funcionAEjecutar={agregarAutor}/>}/>
                <Route path="/autores/editar/:id" element={<Formulario autores={autores} setErrorValidacion={setErrorValidacion} errorValidacion={errorValidacion} error={error} setError={setError} funcionAEjecutar={editarAutor}/>}/>
            </Routes>
        </div>
    )
}

export default App;