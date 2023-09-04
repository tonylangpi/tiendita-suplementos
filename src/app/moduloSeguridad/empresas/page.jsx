//import  {useEffect} from 'react'
import Tabla from '../../../components/Tabla';
import axios from 'axios'; 
import { useSecurity } from "../../../context/SeguridadContext";
import Spin from '../../../components/Spinner';
// import dynamic from 'next/dynamic';
//  const Tabla = dynamic(() => import('../../../components/Tabla'), { ssr: false, loading: () =><p>Cargando...</p> })
async function cargarEmpresas(){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}empresas/all`); 
  return data; 
}
 const Empresas = async() => {
  const info = await cargarEmpresas(); 
  return (
   <>
     <h5 className="text-center">Sucursales</h5>
     {
      info ? ( <Tabla datos={info} />) : (<Spin/>)
     }
   </>

  )
}

export default Empresas