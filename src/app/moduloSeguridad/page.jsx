"use client";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import {
  Button,
  Modal,
  Label,
  TextInput,
  Select,
  Radio,
  Card,
  Tooltip,
} from "flowbite-react";
import React, { useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useSWR from "swr";

function Usuarios() {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const router = useRouter();
  const { data: session } = useSession();
  let nivelAcceso = session?.user?.nombreNivel;
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}usuarios/all`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  /**metodos del formulario */
  // obtenemos el usuario del que esta logueado.
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
      nombre: "",
      correo:"",
      celular:"",
      clave:"",
      idRol:""
    },
  });

  const onSubmit = handleSubmit(async (data) => {

    try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}usuarios/createUsuario`,
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
  /* columnas de las tablas de producto */
  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idUsuario", //simple recommended way to define a column
        header: "idUsuario",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "nombre", //simple recommended way to define a column
        header: "nombre",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "correo", //alternate way
        header: "correo",
        Header: <i style={{ color: "blue" }}>Correo</i>, //optional custom markup
      },
      {
        accessorKey: "celular", //simple recommended way to define a column
        header: "celular",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>{renderedCellValue}</strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "Rol", //simple recommended way to define a column
        header: "Rol",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>{renderedCellValue}</strong>
        ), //optional custom cell render
      }
    ],
    []
  );
  return (
    <div className="flex flex-col">
      <Toaster position="top-center" offset="80px" />
      {data ? (
        <>
          <Modal
            show={props.openModal === "default"}
            onClose={() => props.setOpenModal(undefined)}
          >
            <Modal.Header>Agregar USUARIO</Modal.Header>
            <Modal.Body>
              <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="nombre" value="nombre usuario" />
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
                      maxLength: 150,
                      minLength: 2,
                    })}
                  />
                  {errors.nombre?.type === "required" && (
                    <span className="text-red-600">nombre requerida</span>
                  )}
                  {errors.nombre?.type === "maxLength" && (
                    <span className="text-red-600">
                      el nombre no debe superar los 150 caracteres
                    </span>
                  )}
                  {errors.nombre?.type === "minLength" && (
                    <span className="text-red-600">
                      el nombre debe ser mayor a 2 caracteres
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
                    type="email"
                    {...register("correo", {
                      required: {
                        value: true,
                        message: "correo requerido",
                      },
                      maxLength: 90,
                      minLength: 2,
                    })}
                  />
                  {errors.correo?.type === "required" && (
                    <span className="text-red-600">correo requerido</span>
                  )}
                  {errors.correo?.type === "maxLength" && (
                    <span className="text-red-600">
                      el correo no debe superar los 90 caracteres
                    </span>
                  )}
                  {errors.correo?.type === "minLength" && (
                    <span className="text-red-600">
                      el correo debe ser mayor a 2 caracteres
                    </span>
                  )}
                </div>
                <div>
              <div className="mb-2 block">
                <Label htmlFor="celular" value="celular" />
              </div>
              <TextInput
                id="celular"
                type="text"
                name="celular"
                {...register("celular", {
                  required: {
                    value: true,
                    message: "El celular  requerido",
                  },
                  maxLength: 8,
                  minLength: 8,
                  pattern: {
                      value: /^[0-9]+$/,
                      message: "celular no valido, solo numeros",
                    },
                })}
              />
              {errors.celular && (
                <span className="text-red-600">{errors.celular.message}</span>
              )}
              {errors.celular?.type === "maxLength" && (
                <span className="text-red-600">
                  El celular no de sobrepasar los 8 digitos
                </span>
              )}
              {errors.celular?.type === "minLength" && (
                <span className="text-red-600">
                  el celular debe tener al menos 8 digitos
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
                  minLength: 8
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
                <div>
                  <div className="mb-2">
                    <Label htmlFor="idRol" value="Selecciona un  rol" />
                  </div>
                  <Select id="idRol" name="idRol" {...register("idRol")}>
                    {data.roles ? (
                      data?.roles.map((pres, index) => (
                        <option key={index} value={pres.idRol}>
                          {pres.descripcion}
                        </option>
                      ))
                    ) : (
                      <option>no hay registros</option>
                    )}
                  </Select>
                </div>
                <Button type="submit">Crear</Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
          <h1>Usuarios</h1>
          <Card className="max-w-4xl mb-4 md:max-w-4xl">
            <MaterialReactTable
              columns={columns}
              enableRowActions
              data={data?.usuarios ? data.usuarios : []}
              enableDensityToggle={false}
              initialState={{ density: "compact" }}
              muiTableProps={{
                sx: {
                  border: "1px solid rgba(81, 81, 81, 1)",
                },
              }}
              renderRowActions={({ row, table }) => (
                <div className="flex">
                  <Tooltip content="Cambiar contraseña">
                    <Button
                      color="warning"
                      pill
                      onClick={() => {
                        router.push(
                          `/moduloSeguridad/editarUsuario/${row.getValue("idUsuario")}`
                        );
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Asignar Empresa a Usuario">
                    <Button
                      color="failure"
                      pill
                      onClick={() => {
                        router.push(
                          `/moduloSeguridad/empresas/${row.getValue("idUsuario")}`
                        );
                      }}
                    >
                      <ApartmentIcon />
                    </Button>
                  </Tooltip>
                </div>
              )}
              positionActionsColumn="last"
              renderTopToolbarCustomActions={() => (
                <Button onClick={() => props.setOpenModal("default")}>
                  Agregar
                </Button>
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
            />
          </Card>
        </>
      ) : (
        <h1>Cargando....</h1>
      )}
    </div>
  );
}

export default Usuarios;
