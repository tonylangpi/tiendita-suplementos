import axios from 'axios'; 
import TablaProductos from '../../components/Productos/TablaProductos';
import FormularioCrearProducto from '../../components/Productos/FormularioCrearProducto';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route.js";
async function cargarProductos(){
  const session = await getServerSession(authOptions);
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}productos/all/${session?.user?.idEmpresa}`); 
  return data; 
}
async function cargarCategorias(){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}categorias/all`); 
  return data; 
}
async function cargarMarcas(){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}marcas/all`); 
  return data; 
}
async function cargarPresentaciones(){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}presentaciones/all`); 
  return data; 
}
async function cargarSabores(){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}sabores/all`); 
  return data; 
}
const Productospage = async() => {
  
 const productos = await cargarProductos();
 const marcas = await cargarMarcas();
 const categorias = await cargarCategorias(); 
 const present = await cargarPresentaciones();
 const sabor = await cargarSabores(); 
  return (
      <div className="flex flex-col">
             <FormularioCrearProducto marcas={marcas} categorias={categorias} presentaciones={present} sabores={sabor} />
          {
            productos ? <TablaProductos datos={productos}/> : <h1>Cargando...</h1>
          }
      </div>
  );
};

export default Productospage;
