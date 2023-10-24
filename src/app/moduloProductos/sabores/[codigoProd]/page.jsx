import {authOptions} from '../../../../app/api/auth/[...nextauth]/route.js';
import { getServerSession } from "next-auth/next";
import CardDetalleProd from '../../../../components/Productos/CardDetalleProd.jsx';
import axios from 'axios';
async function GetDetalleProducto(codigo) {
  const session = await getServerSession(authOptions);
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}productos/oneProducto?idEmpresa=${session?.user?.idEmpresa}&codProd=${codigo}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function DetalleProd({ params }) {
  const detalles = await GetDetalleProducto(params.codigoProd);
  return(
     <>
       {
        detalles ? (
            <CardDetalleProd detallesProd={detalles?.producto[0]} categorias={detalles?.categorias} marcas={detalles?.marcas} sabores={detalles?.sabores} presentaciones={detalles?.presentaciones}/>
        ) : (<h2>Cargando...</h2>)
       }
     </>
  );
}

export default DetalleProd;
