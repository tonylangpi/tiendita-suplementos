import TablaSabores from '../../../components/Productos/TablaSabores';
import axios from 'axios'; 
import Spin from '../../../components/Spinner';

async function cargarSabores(){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}sabores/all`); 
  return data; 
}
const SaboresPage = async() => {
    const sabores = await cargarSabores(); 
  return (
     <>
        <h1>Sabores</h1>
        {
            sabores ? <TablaSabores datos={sabores}/> : <Spin/>
        }
     </> 
  )
}

export default SaboresPage