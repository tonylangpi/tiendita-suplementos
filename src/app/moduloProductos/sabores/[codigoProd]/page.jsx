import axios from 'axios'; 
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../api/auth/[...nextauth]/route.js";
const cargarSaboresByProduct = async(idProd)=>{ 
  const session = await getServerSession(authOptions);
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}productos/getSabores`,{
      "idEmpresa":session?.user?.idEmpresa,
      "codigoProd":idProd
    }); 
     return data;
}
const DetalleProd = async({params}) => {
   const info = await cargarSaboresByProduct(params.codigoProd);
   console.log(info);
  return (
    <div>DetalleProd</div>
  )
}

export default DetalleProd