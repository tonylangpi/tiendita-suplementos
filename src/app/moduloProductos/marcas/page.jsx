import TablaMarcas from '../../../components/Productos/TablaMarcas';
import axios from 'axios'; 
import Spin from '../../../components/Spinner';

async function cargarMarcas(){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}marcas/all`); 
  return data; 
}
const MarcasPage = async() => {
    const marcas = await cargarMarcas(); 
  return (
     <>
        <h1>Marcas</h1>
        {
            marcas ? <TablaMarcas datos={marcas}/> : <Spin/>
        }
     </> 
  )
}

export default MarcasPage