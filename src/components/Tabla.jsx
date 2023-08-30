"use client";
import React, { useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios, { AxiosError } from "axios";
import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { revalidatePath } from 'next/cache'
import { useState } from "react";
export default function Tabla({ datos }) {
  const [openModal, setOpenModal] = useState();
  const router = useRouter();
  const props = { openModal, setOpenModal };
  // const ListarEmpresas = () => {
  //   setValores(datos)
  // };
  // useEffect(() => {
  //   ListarEmpresas();
  // });

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {//funciona que captura datos y actualiza los datos a la BD mediante la api
    let res = await axios.put('/api/seguridad/empresa',values);
    alert(res.data?.message);
    router.refresh();
    router.push("/moduloSeguridad"); 
    exitEditingMode(); 
  };
   
  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idEmpresa", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "nombre", //alternate way
        header: "NombreEmpresa",
        Header: <i style={{ color: "blue" }}>NombreEmpresa</i>, //optional custom markup
      },
      {
        accessorKey: "direccion", //alternate way
        header: "Direccion",
        Header: <i style={{ color: "red" }}>Direccion</i>, //optional custom markup
      },
    ],
    []
  );
  //configuracion del envio de datos post crear una nueva empresa
  const [Errores, setErrores] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const FormDAta = new FormData(e.currentTarget);
    try {
      const response = await axios.post("/api/seguridad/empresa", {
        nombre: FormDAta.get("nombre"),
        direccion: FormDAta.get("direccion"),
      });
      setErrores(response?.data?.message);
      router.refresh();
      router.push("/moduloSeguridad"); 
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setErrores(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        {Errores && (
          <div className="bg-red-700 text-white p-2 mb-2">{Errores}</div>
        )}
        <Modal.Header>Agregar Sucursal</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nombre" value="Nombre" />
              </div>
              <TextInput id="nombre" required type="text" name="nombre"/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="direccion" value="Direccion empresa" />
              </div>
              <Textarea
                id="direccion"
                name="direccion"
                placeholder="zona 14 mixco etc..."
                required
                rows={4}
              />
            </div>
            <Button type="submit">Agregar</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <MaterialReactTable
        columns={columns}
        enableRowActions
        data={datos}
        onEditingRowSave={handleSaveRowEdits}
        renderRowActions={({ row, table }) => (
          <div className="flex">
            <Button color="failure" pill onClick={async() => {
      if (
        !confirm(`Deseas eliminar la sucursal: ${row.getValue('nombre')}`)
      ) {
        return;
      }

       let res = await axios.delete(`http://localhost:3000/api/seguridad/empresa/${row.getValue("idEmpresa")}`); 
       if (res.status === 204) {
         alert("Empresa borrada"); 
         router.refresh();
         router.push("/moduloSeguridad"); 
      }
    }}>
              <DeleteIcon />
            </Button>
            <Button color="warning" pill   onClick={() => {
              table.setEditingRow(row);
            }}>
              <EditIcon />
            </Button>
          </div>
        )}
        positionActionsColumn="last"
        renderTopToolbarCustomActions={() => (
          <Button onClick={() => props.setOpenModal("default")}>Agregar</Button>
        )}
      />
    </>
  );
}
