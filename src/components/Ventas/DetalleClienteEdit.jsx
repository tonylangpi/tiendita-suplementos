"use client";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function DetalleClienteEdit({ detalleCliente}) {
  const router = useRouter();
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
    idCliente: detalleCliente ? detalleCliente?.idCliente : "",
    nitCliente: detalleCliente
        ? detalleCliente?.nitCliente
        : "",
    nombre: detalleCliente
        ? detalleCliente?.nombre
        : "",
    telefono: detalleCliente ? detalleCliente.telefono : "",
    direccion: detalleCliente
        ? detalleCliente?.direccion
        : ""
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}clientes/updateCliente`,
        data
      );
      toast(res.data?.message);
      reset();
      router.refresh(); 
      router.push("/moduloVentas/clientes");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex flex-col">
      <div className="container mx-auto p-4">
        <Toaster position="top-center" offset="80px" />
        <div className="bg-white rounded-lg shadow-lg">
           <h3>EDITAR CLIENTE</h3>
          <div className="p-4">
            <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
              <div>
                <div className="mb-2">
                  <Label htmlFor="codigo" value="ID CLIENTE" />
                </div>
                <TextInput
                  id="idCliente"
                  type="text"
                  disabled
                  {...register("idCliente", {
                    required: {
                      value: true,
                      message: "idCliente sku requerido",
                    },
                  })}
                  name="idCliente"
                />
                {errors.idCliente && (
                  <span className="text-red-600">{errors.idCliente.message}</span>
                )}
              </div>
              <div>
                <div className="mb-2">
                  <Label htmlFor="nitCliente" value="NIT cliente" />
                </div>
                <TextInput
                  id="nitCliente"
                  name="nitCliente"
                  type="text"
                  {...register("nitCliente", {
                    required: {
                      value: true,
                      message: "nitCliente requerida",
                    }
                  })}
                />
                {errors.nitCliente?.type === "required" && (
                  <span className="text-red-600">nitCliente requerida</span>
                )}
              </div>
              <div>
                <div className="mb-2">
                  <Label
                    htmlFor="nombre"
                    value="Nombre Cliente"
                  />
                </div>
                <TextInput
                  id="nombre"
                  name="nombre"
                  type="text"
                  {...register("nombre", {
                    required: {
                      value: true,
                      message: "nombre requerido",
                    },
                  })}
                />
                {errors.nombre && (
                  <span className="text-red-600">
                    {errors.nombre.message}
                  </span>
                )}
              </div>
              <div>
              <div className="mb-2 block">
                <Label htmlFor="telefono" value="Telefono" />
              </div>
              <TextInput
                id="telefono"
                type="text"
                name="telefono"
                {...register("telefono", {
                  required: {
                    value: true,
                    message: "El telefono  requerido",
                  },
                  maxLength: 8,
                  minLength: 8,
                  pattern: {
                      value: /^[0-9]+$/,
                      message: "Telefono no valido, solo numeros",
                    },
                })}
              />
              {errors.telefono && (
                <span className="text-red-600">{errors.telefono.message}</span>
              )}
              {errors.telefono?.type === "maxLength" && (
                <span className="text-red-600">
                  El telefono no de sobrepasar los 8 digitos
                </span>
              )}
              {errors.telefono?.type === "minLength" && (
                <span className="text-red-600">
                  el telefono debe tener al menos 8 digitos
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="direccion" value="direccion" />
              </div>
              <Textarea
                id="direccion"
                type="text"
                name="direccion"
                rows={3}
                {...register("direccion", {
                  required: {
                    value: true,
                    message: "La direccion es requerida",
                  },
                  maxLength: 200,
                  minLength: 5
                })}
              />
              {errors.direccion && (
                <span className="text-red-600">{errors.direccion.message}</span>
              )}
              {errors.direccion?.type === "maxLength" && (
                <span className="text-red-600">
                  la direccion no de sobrepasar los 200 caracteres
                </span>
              )}
              {errors.direccion?.type === "minLength" && (
                <span className="text-red-600">
                  la direccion debe tener al menos 5 caracteres
                </span>
              )}
            </div>
              <Button type="submit">Actualizar</Button>
            </form>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => {
                  router.push("/moduloVentas/clientes");
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

export default DetalleClienteEdit;
