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
const CardDetalleRol = ({rolDetalle, niveles}) => {
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
          idRol: rolDetalle?.idRol  ? rolDetalle?.idRol : "",
          descripcion: rolDetalle?.descripcion ? rolDetalle?.descripcion : "",
          idNivel: rolDetalle?.idNivel ? rolDetalle?.idNivel : 0
        }
      });

      const onSubmit = handleSubmit(async (data) => {
        try {
          if(nivelAcceso === "SOPORTE"){
            const res = await axios.put(
              `${process.env.NEXT_PUBLIC_API_URL}roles/updateRol`,
              data
            );
            toast(res.data?.message);
            reset();
            router.back(); 
          }else{
             toast("TU NIVEL DE ACCESO NO PERMITE ACTUALIZAR LOS ROLES")
          }
         
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
                    <Label htmlFor="codigo" value="IdRol" />
                  </div>
                  <TextInput
                    id="idRol"
                    type="text"
                    disabled
                    {...register("idRol", {
                      required: {
                        value: true,
                        message: "idRol requerido",
                      },
                    })}
                    name="idRol"
                  />
                  {errors.idRol && (
                    <span className="text-red-600">
                      {errors.idRol.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="descripcion" value="descripcion rol" />
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
                      maxLength: 50,
                      minLength: 2,
                    })}
                  />
                  {errors.descripcion?.type === "required" && (
                    <span className="text-red-600">Descripcion requerida</span>
                  )}
                  {errors.descripcion?.type === "maxLength" && (
                    <span className="text-red-600">
                      La descripcion no debe superar los 50 caracteres
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
                    <Label htmlFor="idNivel" value="Edita el nivel" />
                  </div>
                  <Select id="idNivel" name="idNivel" {...register("idNivel")}>
                    {niveles ? (
                      niveles.map((pres, index) => (
                        <option key={index} value={pres.idNivel}>
                          {pres.nombreNivel}
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
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={()=>{router.back()}}>Regresar</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardDetalleRol