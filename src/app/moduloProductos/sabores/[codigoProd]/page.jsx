import axios from 'axios'; 
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../../../api/auth/[...nextauth]/route.js";

const DetalleProd = async({params}) => {
   console.log(params.codigoProd);
  return (
    <div>DetalleProd</div>
  )
}

export default DetalleProd