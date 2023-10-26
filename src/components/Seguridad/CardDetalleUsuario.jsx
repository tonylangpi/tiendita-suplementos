"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { Button, Label, TextInput, Select } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
const CardDetalleUsuario = ({ usuarioDetalle }) => {
  const router = useRouter();
  const { data: session } = useSession();
  let nivelAcceso = session?.user?.nombreNivel; //obtenemos la empresa del que esta logueado en la app
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
      idUsuario: usuarioDetalle?.idUsuario ? usuarioDetalle?.idUsuario : "",
      nombre: usuarioDetalle?.nombre ? usuarioDetalle?.nombre : "",
      correo: usuarioDetalle?.correo ? usuarioDetalle?.correo : "",
      celular: usuarioDetalle?.celular ? usuarioDetalle?.celular : 0,
      clave: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try { 
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}usuarios/editPass`,
          data
        );
        toast(res.data?.message);
        reset();
        router.back();
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" offset="80px" />
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4">
          <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div>
              <div className="mb-2">
                <Label htmlFor="codigo" value="idUsuario" />
              </div>
              <TextInput
                id="idUsuario"
                type="text"
                disabled
                {...register("idUsuario", {
                  required: {
                    value: true,
                    message: "idUsuario requerido",
                  },
                })}
                name="idUsuario"
              />
              {errors.idUsuario && (
                <span className="text-red-600">{errors.idUsuario.message}</span>
              )}
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="nombre" value="nombre usuario" />
              </div>
              <TextInput
                id="nombre"
                name="nombre"
                disabled
                type="text"
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "nombre requerido",
                  },
                  maxLength: 50,
                  minLength: 2,
                })}
              />
              {errors.nombre?.type === "required" && (
                <span className="text-red-600">nombre requerido</span>
              )}
              {errors.nombre?.type === "maxLength" && (
                <span className="text-red-600">
                  El nombre no debe superar los 50 caracteres
                </span>
              )}
              {errors.nombre?.type === "minLength" && (
                <span className="text-red-600">
                  El nombre debe ser mayor a 2 caracteres
                </span>
              )}
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="correo" value="correo usuario" />
              </div>
              <TextInput
                id="correo"
                name="correo"
                disabled
                type="text"
                {...register("correo", {
                  required: {
                    value: true,
                    message: "correo requerido",
                  },
                  maxLength: 50,
                  minLength: 2,
                })}
              />
              {errors.correo?.type === "required" && (
                <span className="text-red-600">correo requerido</span>
              )}
              {errors.correo?.type === "maxLength" && (
                <span className="text-red-600">
                  El correo no debe superar los 50 caracteres
                </span>
              )}
              {errors.correo?.type === "minLength" && (
                <span className="text-red-600">
                  El correo debe ser mayor a 2 caracteres
                </span>
              )}
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="celular" value="celular usuario" />
              </div>
              <TextInput
                id="celular"
                name="celular"
                disabled
                type="text"
                {...register("celular", {
                  required: {
                    value: true,
                    message: "celular requerido",
                  },
                  maxLength: 8,
                  minLength: 8,
                })}
              />
              {errors.celular?.type === "required" && (
                <span className="text-red-600">celular requerido</span>
              )}
              {errors.celular?.type === "maxLength" && (
                <span className="text-red-600">
                  El celular no debe superar los 8 caracteres
                </span>
              )}
              {errors.celular?.type === "minLength" && (
                <span className="text-red-600">
                  El celular debe ser mayor a 8 caracteres
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="clave" value="clave" />
              </div>
              <TextInput
                id="clave"
                type="text"
                name="clave"
                {...register("clave", {
                  required: {
                    value: true,
                    message: "La clave es  requerida",
                  },
                  maxLength: 8,
                  minLength: 8,
                })}
              />
              {errors.clave && (
                <span className="text-red-600">{errors.clave.message}</span>
              )}
              {errors.clave?.type === "maxLength" && (
                <span className="text-red-600">
                  la clave no de sobrepasar los 8 digitos
                </span>
              )}
              {errors.clave?.type === "minLength" && (
                <span className="text-red-600">
                  la clave debe tener al menos 8 digitos
                </span>
              )}
            </div>
            <Button type="submit">Actualizar</Button>
          </form>
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => {
                router.back();
              }}
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetalleUsuario;
