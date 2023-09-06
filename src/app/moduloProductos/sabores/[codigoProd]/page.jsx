import axios from 'axios'; 

const cargarSaboresByProduct = async(idProd)=>{ 

    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}productos/getSabores`,{
      "idEmpresa":28,
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