import CardDetalleRol from '../../../../components/Seguridad/CardDetalleRol';
import axios from 'axios';
async function GetDetalleRol(codigo) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}roles/oneRol?idRol=${codigo}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function DetalleRol({ params }) {
  const detalles = await GetDetalleRol(params.idRol);
  return(
     <>
       {
        detalles ? (
            <CardDetalleRol rolDetalle={detalles?.rol[0]} niveles={detalles?.niveles}/>
        ) : (<h2>Cargando...</h2>)
       }
     </>
  );
}

export default DetalleRol;
