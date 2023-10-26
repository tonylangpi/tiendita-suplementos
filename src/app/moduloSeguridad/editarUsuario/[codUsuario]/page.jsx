import CardDetalleUsuario from '../../../../components/Seguridad/CardDetalleUsuario'; 
import axios from 'axios'; 
async function GetDetalleUsuario(codigo) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}usuarios/oneuser/${codigo}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
const EditInfoUsuario = async({params}) => {
    const detalleUsuario = await GetDetalleUsuario(params.codUsuario);
  return (
    <>
       {
        detalleUsuario ? (<CardDetalleUsuario usuarioDetalle={detalleUsuario[0]}/>):(<p>Cargando...</p>)
        }
    </>  
  )
}

export default EditInfoUsuario