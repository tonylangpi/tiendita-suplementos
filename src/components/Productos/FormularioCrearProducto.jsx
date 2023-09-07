"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Card, Select, Label, TextInput } from "flowbite-react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from 'axios';

const FormularioCrearProducto = ({ marcas, categorias }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [input, setInput] = useState({
    codigo: "",
    descripcion: "",
    stock_minimo: 0,
    lote: "",
    idCategoria: 0,
    idMarca: 0,
    idEmpresa: session?.user?.idEmpresa,
    idUsuario: session?.user?.idUsuario,
  });
  const handledChanged = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  /*FUNCION QUE ENVIA LOS DATOS AL BACKEND XD */
  const saveSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}productos/createProducto`,
        input
      );
      toast(res.data?.message);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Toaster position="top-center" offset="80px" />
      <Card className="basis-14">
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={saveSubmit}
        >
          <div>
            <div className="mb-2">
              <Label htmlFor="codigo" value="codigo sku" />
            </div>
            <TextInput
              id="codigo"
              placeholder="3234"
              required
              type="text"
              onChange={(e) => handledChanged(e)}
              name="codigo"
            />
          </div>
          <div>
            <div className="mb-2">
              <Label htmlFor="descripcion" value="descripcion producto" />
            </div>
            <TextInput
              id="descripcion"
              name="descripcion"
              required
              type="text"
              onChange={(e) => handledChanged(e)}
            />
          </div>
          <div>
            <div className="mb-2">
              <Label htmlFor="stock_minimo" value="stock minimo de producto" />
            </div>
            <TextInput
              id="stock_minimo"
              name="stock_minimo"
              required
              type="number"
              onChange={(e) => handledChanged(e)}
            />
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
              required
              type="text"
              onChange={(e) => handledChanged(e)}
            />
          </div>
          <div>
            <div className="mb-2">
              <Label htmlFor="idCategoria" value="Selecciona una categoria" />
            </div>
            <Select
              id="idCategoria"
              name="idCategoria"
              onChange={(e) => handledChanged(e)}
              required
            >
              {categorias.map((cat,index) => (
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
            <Select
              id="idMarca"
              name="idMarca"
              onChange={(e) => handledChanged(e)}
              required
            >
              {marcas.map((marc,index) => (
                <option key={index} value={marc.idMarca}>
                  {marc.marca}
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
