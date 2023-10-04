"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Card, Select, Label, TextInput } from "flowbite-react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";

const FormularioCrearProducto = ({ marcas, categorias, presentaciones, sabores }) => {
  const { data: session } = useSession();
  let idEmpresa = session?.user?.idEmpresa;//obtenemos la empresa del que esta logueado en la app
  let idUsuario = session?.user?.idUsuario; // obtenemos el usuario del que esta logueado.
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      codigo: "",
      descripcion: "",
      stock_minimo: 0,
      lote: "",
      idCategoria: 0,
      idMarca: 0,
      idPresentacion:null,
      idSabor:null,
      idEmpresa: idEmpresa,
      idUsuario: idUsuario,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}productos/createProducto`,
        data
      );
      toast(res.data?.message);
      reset(); 
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Toaster position="top-center" offset="80px" />
      <Card className="max-w-2xl">
        <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
          <div>
            <div className="mb-2">
              <Label htmlFor="codigo" value="codigo sku" />
            </div>
            <TextInput
              id="codigo"
              placeholder="3234"
              type="text"
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
              <Label htmlFor="stock_minimo" value="stock minimo de producto" />
            </div>
            <TextInput
              id="stock_minimo"
              name="stock_minimo"
              type="number"
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
              <Label htmlFor="idCategoria" value="Selecciona una categoria" />
            </div>
            <Select
              id="idCategoria"
              name="idCategoria"
              {...register("idCategoria")}
            >
              {categorias.map((cat, index) => (
                <option key={index} value={cat.idCategoria}>
                  {cat.descripcion}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2">
              <Label htmlFor="idMarca" value="Selecciona una Marca" />
            </div>
            <Select id="idMarca" name="idMarca" {...register("idMarca")}>
              {marcas.map((marc, index) => (
                <option key={index} value={marc.idMarca}>
                  {marc.Marca}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2">
              <Label htmlFor="idPresentacion" value="Selecciona una Presentación" />
            </div>
            <Select id="idPresentacion" name="idPresentacion" {...register("idPresentacion")}>
              {presentaciones.map((pres, index) => (
                <option key={index} value={pres.idPresentacion}>
                  {pres.presentacion}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2">
              <Label htmlFor="idSabor" value="Selecciona un sabor" />
            </div>
            <Select id="idSabor" name="idSabor" {...register("idSabor")}>
              {sabores.map((pres, index) => (
                <option key={index} value={pres.idSabor}>
                  {pres.sabor}
                </option>
              ))}
            </Select>
          </div>
          <Button type="submit">Crear</Button>
        </form>
      </Card>
    </>
  );
};

export default FormularioCrearProducto;
