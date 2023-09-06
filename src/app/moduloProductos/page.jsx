import axios from 'axios'; 
import TablaProductos from '../../components/Productos/TablaProductos';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route.js";
async function cargarProductos(){
  const session = await getServerSession(authOptions);
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}productos/all/${session?.user?.idEmpresa}`); 
  return data; 
}
const Productospage = async() => {
  
 const productos = await cargarProductos();
  return (
      <div className="flex flex-col">
        <div>FORMULARIO 1</div>
        <div>
          {
            productos ? <TablaProductos datos={productos}/> : <h1>Cargando...</h1>
          }
        </div>
      </div>
  );
};

export default Productospage;
