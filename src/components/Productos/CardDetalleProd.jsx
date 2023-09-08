"use client";
import { useRouter } from "next/navigation";
const CardDetalleProd = ({detalles}) => {
    const router = useRouter();
  return (
    <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4">
                <h1 className="text-2xl font-semibold">{detalles.descripcion}</h1>
                <p className="text-gray-600">stock minimo: {detalles.stock_minimo}.</p>
                <p className="text-gray-600">vencimiento: {detalles.lote}.</p>
                <p className="text-gray-600">Categoria: {detalles.Categoria}.</p>
                <p className="text-gray-600">Marca: {detalles.marca}.</p>
                <p className="text-gray-600">Sabor: {detalles.sabor}.</p>
                <p className="text-gray-600">Presentación: {detalles.presentacion}.</p>
                <div className="mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={()=>{router.push('/moduloProductos')}}>Regresar</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardDetalleProd