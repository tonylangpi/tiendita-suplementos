import CardEditCliente from '../../../../components/Ventas/DetalleClienteEdit';
import axios from 'axios'; 
async function GetDetalleCliente(codigo) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}clientes/getoneCliente?codCliente=${codigo}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function DetalleClienteEdit({params}) {
    const detalles = await GetDetalleCliente(params.idCliente);
  return (
      <>
      {
        detalles ? (
             <CardEditCliente detalleCliente={detalles?.clientes[0]}/>
        ) : (<p>Cargando...</p>)
      }
      </>
  );
}

export default DetalleClienteEdit;
