import {Link, useNavigate} from "react-router-dom" 
import { Button, Table, Badge } from 'reactstrap';
const Autores = (props)=>{
    const {autores, setError, eliminarAutor} = props;
    const navegacion = useNavigate();

    const borrarAutor = (id) =>{
        eliminarAutor(id);
    }


    return (
        <>  
        <h1>Autores Favoritos</h1>
        <Badge style={{height: "30px",width:"95px" , display:"flex", alignItems:"center"}} color="primary">
            <Link to="/autores/nuevo" style={{color:"white"}}>Agregar Autor</Link>
        </Badge>
        <Table className="table-light">
            <thead>
                <tr>
                    <th>
                        Autores
                    </th>
                    <th>
                        Acciones Disponibles
                    </th>
                </tr>
            </thead>
            <tbody>
                {autores.map((autor)=>(
                <tr key={autor._id}>
                    <td >{autor.nombreAutor}</td>
                    <td>
                    <Button color="warning" style={{ marginRight: '10px' }} onClick={(e)=>navegacion(`/autores/editar/${autor._id}`)}>Editar</Button>
                    
                    <Button color="danger" onClick={(e)=>borrarAutor(autor._id)}>Eliminar</Button>
                    </td>  
                </tr>
                    ))} 
            </tbody>
        </Table>
        </>
    )
}

export default Autores;