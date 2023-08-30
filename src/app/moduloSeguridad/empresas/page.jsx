"use client"
import {useState,useEffect} from 'react'
import Tabla from '../../../components/Tabla';
import axios from 'axios'; 
import Spin from '../../../components/Spinner';
// import dynamic from 'next/dynamic';
//  const Tabla = dynamic(() => import('../../../components/Tabla'), { ssr: false, loading: () =><p>Cargando...</p> })
 
 const Empresas = () => {
  const [empresas, setEmpresas] = useState(0); 
  useEffect(() => {
    const cargarEmpresas = async() =>{
      const {data} = await axios.get('http://localhost:3000/api/seguridad/empresa'); 
      setEmpresas(data); 
  }
  cargarEmpresas().catch((e) => {
    console.error('An error occurred while fetching the data: ', e)
  })
  }, [])

  return (
   <>
     <h5 className="text-center">Sucursales</h5>
     {
      empresas ? ( <Tabla datos={empresas}/>) : (<Spin/>)
     }
   </>

  )
}

export default Empresas