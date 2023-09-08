
import axios from 'axios'; 
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../api/auth/[...nextauth]/route.js";
import CardDetalle from '../../../../components/Productos/CardDetalleProd.jsx';
async function cargarDetalleProducto(codigoProd){
  const session = await getServerSession(authOptions);
  const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}productos/oneProducto`,{
    idEmpresa:session?.user?.idEmpresa,
    codProd:codigoProd
  }); 
  return data; 
}
const DetalleProd = async({params}) => {
  const detalleProd = await cargarDetalleProducto(params.codigoProd);
  let objetoDetalleProd = detalleProd[0];
  if(objetoDetalleProd == undefined) throw new Error("objeto vacio"); 
  return (
    <div className="flex flex-col">
          <CardDetalle detalles={objetoDetalleProd}/>
      </div>
  )
}

export default DetalleProd