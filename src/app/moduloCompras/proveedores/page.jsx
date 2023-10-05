"use client";
import TablaProveedores from '../../../components/Compras/TablaProveedores';
import React, { useMemo } from "react";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import axios from "axios";
import { Button, Modal, Label, TextInput, Textarea, Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
function ProveedoresPage(){
  const [openModal, setOpenModal] = useState();
  const router = useRouter();
  /*LLAMADO A LA API PARA LA PETICION DE PROVEEDORES */
  const { data, mutate} = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}proveedores/all`,{
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  /***************************************************** */
  const props = { openModal, setOpenModal };
  const { data: session } = useSession();
  let idUsuario = session?.user?.idUsuario;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombreProve: "",
      telefono: "",
      direccion: "",
      idUsuario: idUsuario,
    },
  });
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    //funciona que captura datos y actualiza los datos a la BD mediante la api
    let res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}proveedores/updateProveedor`,
      values
    );
    toast(res.data?.message, { style: { background: "yellow" } });
    mutate();
    exitEditingMode();
  };

  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idProveedor", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "nombreProve", //alternate way
        header: "Proveedor",
        Header: <i style={{ color: "blue" }}>Proveedor</i>, //optional custom markup
      },
      {
        accessorKey: "telefono", //alternate way
        header: "Telefono",
        Header: <i style={{ color: "blue" }}>Telefono</i>, //optional custom markup
      },
      {
        accessorKey: "direccion", //alternate way
        header: "direccion",
        Header: <i style={{ color: "blue" }}>Direccion</i>, //optional custom markup
      },
      {
        accessorKey: "Estado", //alternate way
        enableEditing: false,
        header: "Estado",
        Header: <i style={{ color: "blue" }}>Estado</i>, //optional custom markup
      },
      {
        accessorKey: "fecha_creacion", //alternate way
        header: "fecha_creacion",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        Header: <i style={{ color: "blue" }}>Fecha de creacion</i>, //optional custom markup
      },
      {
        accessorKey: "idUsuario", //alternate way
        header: "idUsuario",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        Header: <i style={{ color: "blue" }}>Id usuario</i>, //optional custom markup
      }
    ],
    []
  );
  //configuracion del envio de datos post crear una nueva empresa
  const save = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}proveedores/create`,
        data
      );
      toast(res.data?.message);
      reset();
      mutate();
      props.setOpenModal(undefined);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Toaster position="top-center" offset="80px" />
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Agregar Proveedor</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={save}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nombreProveedor" value="nombre Proveedor" />
              </div>
              <TextInput
                id="nombreProveedor"
                required
                type="text"
                name="nombreProveedor"
                {...register("nombreProve", {
                  required: {
                    value: true,
                    message: "nombre de Proveedor  requerido",
                  },
                  maxLength: 150,
                  minLength: 2,
                })}
              />
              {errors.nombreProve && (
                <span className="text-red-600">{errors.nombreProve.message}</span>
              )}
              {errors.nombreProve?.type === "maxLength" && (
                <span className="text-red-600">
                  El nombre del proveedor no debe superar los 150 caracteres
                </span>
              )}
              {errors.nombreProve?.type === "minLength" && (
                <span className="text-red-600">
                  el nombre del proveedor debe ser mayor a 2 caracteres
                </span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="telefono" value="Telefono" />
              </div>
              <TextInput
                id="telefono"
                required
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
                  El telefonon no de sobrepasar los 8 digitos
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
                <Label htmlFor="Direccion" value="Direccion" />
              </div>
              <Textarea
                id="direccion"
                type="text"
                name="direccion"
                rows={4}
                {...register("direccion", {
                  required: {
                    value: true,
                    message: "La direccion es requerida",
                  },
                  maxLength: 150,
                  minLength: 4,
                })}
              />
              {errors.direccion && (
                <span className="text-red-600">{errors.direccion.message}</span>
              )}
              {errors.direccion?.type === "maxLength" && (
                <span className="text-red-600">
                  La direccion no debe sobrepasar los 150 caracteres
                </span>
              )}
              {errors.direccion?.type === "minLength" && (
                <span className="text-red-600">
                   La direccion debe tener al menos 4 caracteres
                </span>
              )}
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
      <h1>Proveedores</h1>
      {
        data ? (<MaterialReactTable
        columns={columns}
        enableRowActions
        data={data ? data : []}
        enableDensityToggle={false}
        initialState={{ columnVisibility: { fecha_creacion: false, idUsuario: false } }}
        muiTableProps={{
        sx: {
          border: '1px solid rgba(81, 81, 81, 1)',
        },
      }}
        onEditingRowSave={handleSaveRowEdits}
        renderRowActions={({ row, table }) => (
          <div className="flex">
          <Tooltip content="Eliminar">
          <Button
              color="failure"
              pill
              onClick={async () => {
                if (
                  !confirm(`Deseas eliminar el proveedor: ${row.getValue("nombreProve")}`)
                ) {
                  return;
                }
                  toast("Evaluar si es factible borrar proveedor", { style: { background: "red" } });
                  //router.refresh();
              }}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
          <Tooltip content="Cambiar Estado">
          <Button
              gradientMonochrome="failure"
              pill
              onClick={async () => {
                if (
                  !confirm(`Deseas cambiar el estado del proveedor: ${row.getValue("nombreProve")}`)
                ) {
                  return;
                }
                let res = await axios.delete(
                  `${
                    process.env.NEXT_PUBLIC_API_URL
                  }proveedores/changeStatus/${row.getValue("idProveedor")}`
                );
                  toast(`${res.data?.message}`, { style: { background: "red" } });
                  mutate();
              }}
            >
              <PowerSettingsNewTwoToneIcon />
            </Button>
          </Tooltip>
          <Tooltip content="Editar">
          <Button
              color="warning"
              pill
              onClick={() => {
                table.setEditingRow(row);
              }}
            >
              <EditIcon />
            </Button>
          </Tooltip> 
          </div>
        )}
        positionActionsColumn="last"
        renderTopToolbarCustomActions={() => (
          <Button onClick={() => props.setOpenModal("default")}>Agregar</Button>
        )}
        localization={{
          actions: "Acciones",
          and: "y",
          cancel: "Cancelar",
          changeFilterMode: "Cambiar modo de filtro",
          changeSearchMode: "Cambiar modo de búsqueda",
          clearFilter: "Borrar filtro",
          clearSearch: "Borrar búsqueda",
          clearSort: "Borrar ordenamiento",
          clickToCopy: "Haga click para copiar",
          collapse: "Colapsar",
          collapseAll: "Colapsar todo",
          columnActions: "Columna de acciones",
          copiedToClipboard: "Copiado al portapapeles",
          dropToGroupBy: "Soltar para agrupar por {column}",
          edit: "Editar",
          expand: "Expandir",
          expandAll: "Expandir todo",
          filterArrIncludes: "Incluye",
          filterArrIncludesAll: "Incluye todos",
          filterArrIncludesSome: "Incluye algunos",
          filterBetween: "Entre",
          filterBetweenInclusive: "Entre (inclusivo)",
          filterByColumn: "Filtrar por {column}",
          filterContains: "Contiene",
          filterEmpty: "Vacio",
          filterEndsWith: "Termina con",
          filterEquals: "Iguales",
          filterEqualsString: "Iguales",
          filterFuzzy: "Difuso",
          filterGreaterThan: "Mas grande que",
          filterGreaterThanOrEqualTo: "Mas grande que o igual a",
          filterInNumberRange: "Entre",
          filterIncludesString: "Contiene",
          filterIncludesStringSensitive: "Contiene",
          filterLessThan: "Menos que",
          filterLessThanOrEqualTo: "Menos que o igual a",
          filterMode: "Modo de filtro: {filterType}",
          filterNotEmpty: "No vacio",
          filterNotEquals: "No iguales",
          filterStartsWith: "Empieza con",
          filterWeakEquals: "Iguales",
          filteringByColumn:
            "Filtrando por {column} - {filterType} - {filterValue}",
          goToFirstPage: "Ir a la primera página",
          goToLastPage: "Ir a la última página",
          goToNextPage: "Ir a la página siguiente",
          goToPreviousPage: "Regresar a la pagina anterior",
          grab: "Agarrar",
          groupByColumn: "Agrupar por {column}",
          groupedBy: "Agrupado por",
          hideAll: "Ocultar todo",
          hideColumn: "Ocultar {column}",
          max: "Máximo",
          min: "Mínimo",
          move: "Mover",
          noRecordsToDisplay: "No hay registros para mostrar",
          noResultsFound: "No se encontraron resultados",
          of: "de",
          or: "o",
          pinToLeft: "Anclar a la izquierda",
          pinToRight: "Anclar a la derecha",
          resetColumnSize: "Resetear tamaño de columna",
          resetOrder: "Resetar orden",
          rowActions: "Acciones de fila",
          rowNumber: "#",
          rowNumbers: "Números de fila",
          rowsPerPage: "Filas por página",
          save: "Guardar",
          search: "Buscar",
          select: "Seleccionar",
          selectedCountOfRowCountRowsSelected:
            "{selectedCount} de {rowCount} fila(s) seleccionada(s)",
          showAll: "Mostrar todo",
          showAllColumns: "Mostrar todas las columnas",
          showHideColumns: "Mostrar/ocultar columnas",
          showHideFilters: "Mostrar/ocultar filtros",
          showHideSearch: "Mostrar/ocultar búsqueda",
          sortByColumnAsc: "Ordenar por {column} ascendente",
          sortByColumnDesc: "Ordenar por {column} descendente",
          sortedByColumnAsc: "Ordenar por {column} ascendente",
          sortedByColumnDesc: "Ordenar por {column} descendente",
          thenBy: ", despues por ",
          toggleDensity: "Alternar densidad",
          toggleFullScreen: "Alternar pantalla completa",
          toggleSelectAll: "Alternar seleccionar todo",
          toggleSelectRow: "Alternar seleccionar fila",
          toggleVisibility: "Alternar visibilidad",
          ungroupByColumn: "Desagrupar por {column}",
          unpin: "Desanclar",
          unpinAll: "Desanclar todo",
          unsorted: "Sin ordenar",
        }}
      />) : (<h1>Recargando</h1>)
      }
    </>
  );
}

export default ProveedoresPage