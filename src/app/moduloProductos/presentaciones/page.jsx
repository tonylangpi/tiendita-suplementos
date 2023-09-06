import TablaPresentaciones from '../../../components/Productos/TablaPresentaciones';
import axios from 'axios'; 
import Spin from '../../../components/Spinner';

async function cargarPresentaciones(){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}presentaciones/all`); 
  return data; 
}
const PresentacionesPage = async() => {
    const Presentaciones = await cargarPresentaciones(); 
  return (
     <>
        <h1>Presentaciones de productos</h1>
        {
            Presentaciones ? <TablaPresentaciones datos={Presentaciones}/> : <Spin/>
        }
     </> 
  )
}

export default PresentacionesPage