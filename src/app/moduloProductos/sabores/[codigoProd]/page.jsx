"use client";
import { useSession } from "next-auth/react";
import CardDetalle from "../../../../components/Productos/CardDetalleProd.jsx";
import useSWR from "swr";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Button, Label, TextInput, Select } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function DetalleProd({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}productos/oneProducto?idEmpresa=${session?.user?.idEmpresa}&codProd=${params?.codigoProd}`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  ); 
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
      codigo: data?.producto[0]?.codigo ? data?.producto[0]?.codigo : "",
      descripcion: data?.producto[0]?.descripcion
        ? data?.producto[0]?.descripcion
        : "",
      stock_minimo: data?.producto[0]?.stock_minimo
        ? data?.producto[0]?.stock_minimo
        : "",
      lote: data?.producto[0]?.lote ? data?.producto[0]?.lote : "",
      idCategoria: data?.producto[0]?.idCategoria
        ? data?.producto[0]?.idCategoria
        : 0,
      idMarca: data?.producto[0]?.idMarca ? data?.producto[0]?.idMarca : 0,
      idPresentacion: data?.producto[0]?.idPresentacion
        ? data?.producto[0]?.idPresentacion
        : 0,
      idSabor: data?.producto[0]?.idSabor ? data?.producto[0]?.idSabor : 0,
      idEmpresa: session?.user?.idEmpresa,
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
      mutate(); 
      router.push("/moduloProductos");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex flex-col">
      <div className="container mx-auto p-4">
        <Toaster position="top-center" offset="80px" />
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
                  <span className="text-red-600">{errors.codigo.message}</span>
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
                  {data ? (
                    data.categorias.map((cat, index) => (
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
                  {data?.marcas ? (
                    data?.marcas.map((marc, index) => (
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
                  {data?.presentaciones ? (
                    data?.presentaciones.map((pres, index) => (
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
                  {data?.sabores ? (
                    data?.sabores.map((pres, index) => (
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
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => {
                  router.push("/moduloProductos");
                }}
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProd;
