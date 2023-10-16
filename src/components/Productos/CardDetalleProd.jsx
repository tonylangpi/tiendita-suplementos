"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import {
  Button,
  Label,
  TextInput,
  Select
} from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
const CardDetalleProd = ({detallesProd, categorias, marcas, sabores, presentaciones}) => {
    const router = useRouter();
    const { data: session } = useSession();
    let idEmpresa = session?.user?.idEmpresa; //obtenemos la empresa del que esta logueado en la app
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setValue,
      } = useForm({
        mode: "onChange",
        defaultValues: {
          codigo: detallesProd?.codigo  ? detallesProd?.codigo : "",
          descripcion: detallesProd?.descripcion ? detallesProd?.descripcion : "",
          stock_minimo: detallesProd?.stock_minimo ? detallesProd?.stock_minimo : "",
          lote:  detallesProd?.lote ? detallesProd?.lote : "",
          idCategoria: detallesProd?.idCategoria ? detallesProd?.idCategoria : 0,
          idMarca: detallesProd?.idMarca ? detallesProd?.idMarca :  0,
          idPresentacion: detallesProd?.idPresentacion ? detallesProd?.idPresentacion : 0,
          idSabor: detallesProd?.idSabor ? detallesProd?.idSabor :  0,
          idEmpresa: idEmpresa
        },
      });

      const onSubmit = handleSubmit(async (data) => {
        try {
          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}productos/updateProducto`,
            data
          );
          toast(res.data?.message);
          reset();
          router.push('/moduloProductos'); 
        } catch (error) {
          console.log(error);
        }
      });
  return (
    <div className="container mx-auto p-4">
     <Toaster position="top-center" offset="80px"/>
        <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4">
            <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="codigo" value="codigo sku" />
                  </div>
                  <TextInput
                    id="codigo"
                    type="text"
                    disabled
                    {...register("codigo", {
                      required: {
                        value: true,
                        message: "codigo sku requerido",
                      },
                    })}
                    name="codigo"
                  />
                  {errors.codigo && (
                    <span className="text-red-600">
                      {errors.codigo.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="descripcion" value="descripcion producto" />
                  </div>
                  <TextInput
                    id="descripcion"
                    name="descripcion"
                    type="text"
                    {...register("descripcion", {
                      required: {
                        value: true,
                        message: "descripcion requerida",
                      },
                      maxLength: 250,
                      minLength: 2,
                    })}
                  />
                  {errors.descripcion?.type === "required" && (
                    <span className="text-red-600">Descripcion requerida</span>
                  )}
                  {errors.descripcion?.type === "maxLength" && (
                    <span className="text-red-600">
                      La descripcion no debe superar los 250 caracteres
                    </span>
                  )}
                  {errors.descripcion?.type === "minLength" && (
                    <span className="text-red-600">
                      La descripcion debe ser mayor a 2 caracteres
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="stock_minimo"
                      value="stock minimo de producto"
                    />
                  </div>
                  <TextInput
                    id="stock_minimo"
                    name="stock_minimo"
                    type="number"
                    min={0}
                    {...register("stock_minimo", {
                      required: {
                        value: true,
                        message: "stock_minimo requerido",
                      },
                    })}
                  />
                  {errors.stock_minimo && (
                    <span className="text-red-600">
                      {errors.stock_minimo.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="lote"
                      value="lote/fecha de vencimiento del producto"
                    />
                  </div>
                  <TextInput
                    id="lote"
                    name="lote"
                    type="date"
                    {...register("lote", {
                      required: {
                        value: true,
                        message: "lote requerido",
                      },
                    })}
                  />
                  {errors.lote && (
                    <span className="text-red-600">{errors.lote.message}</span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="idCategoria"
                      value="Selecciona una categoria"
                    />
                  </div>
                  <Select
                    id="idCategoria"
                    name="idCategoria"
                    {...register("idCategoria")}
                  >
                    {categorias ? (
                      categorias.map((cat, index) => (
                        <option key={index} value={cat.idCategoria}>
                          {cat.descripcion}
                        </option>
                      ))
                    ) : (
                      <option>NO HAY REGISTROS</option>
                    )}
                  </Select>
                </div>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="idMarca" value="Selecciona una Marca" />
                  </div>
                  <Select id="idMarca" name="idMarca" {...register("idMarca")}>
                    {marcas ? (
                      marcas.map((marc, index) => (
                        <option key={index} value={marc.idMarca}>
                          {marc.marca}
                        </option>
                      ))
                    ) : (
                      <option>no hay registros</option>
                    )}
                  </Select>
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="idPresentacion"
                      value="Selecciona una Presentación"
                    />
                  </div>
                  <Select
                    id="idPresentacion"
                    name="idPresentacion"
                    {...register("idPresentacion")}
                  >
                    {presentaciones ? (
                      presentaciones.map((pres, index) => (
                        <option key={index} value={pres.idPresentacion}>
                          {pres.presentacion}
                        </option>
                      ))
                    ) : (
                      <option>no hay registros</option>
                    )}
                  </Select>
                </div>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="idSabor" value="Selecciona un sabor" />
                  </div>
                  <Select id="idSabor" name="idSabor" {...register("idSabor")}>
                    {sabores ? (
                      sabores.map((pres, index) => (
                        <option key={index} value={pres.idSabor}>
                          {pres.sabor}
                        </option>
                      ))
                    ) : (
                      <option>no hay registros</option>
                    )}
                  </Select>
                </div>
                <Button type="submit">Actualizar</Button>
              </form>
            <div className="mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={()=>{router.push('/moduloProductos')}}>Regresar</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardDetalleProd