import TablaCategorias from '../../../components/TablaCategorias';
import axios from 'axios'; 
import Spin from '../../../components/Spinner';

async function cargarCategorias(){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}categorias/all`); 
  return data; 
}
const CategoriasPage = async() => {
    const categorias = await cargarCategorias(); 
  return (
     <>
        <h1>Categorias</h1>
        {
            categorias ? <TablaCategorias datos={categorias}/> : <Spin/>
        }
     </> 
  )
}

export default CategoriasPage