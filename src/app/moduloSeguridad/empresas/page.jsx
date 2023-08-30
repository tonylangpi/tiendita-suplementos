import React from 'react'
//import Tabla from '../../../components/Tabla';
import axios from 'axios'; 
import {Suspense} from 'react'
import dynamic from 'next/dynamic';
 const Tabla = dynamic(() => import('../../../components/Tabla'), { ssr: false, loading: () =><p>Cargando...</p> })
 async function cargarEmpresas(){
    const {data} = await axios.get('http://localhost:3000/api/seguridad/empresa')
   return data; 
}
 const Empresas = async() => {
  const empresas = await cargarEmpresas(); 
  return (
   <>
     <h5 className="text-center">Sucursales</h5>
     <Suspense fallback={<h1>CARGANDO...</h1>}>
     <Tabla datos={empresas}/>
     </Suspense>
   </>

  )
}

export default Empresas