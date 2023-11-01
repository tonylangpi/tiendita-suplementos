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
import PowerSettingsNewTwoToneIcon from "@mui/icons-material/PowerSettingsNewTwoTone";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Spin from '../../../components/Spinner'; 
function Roles() {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const router = useRouter();
  const { data: session } = useSession();
  let nivelAcceso = session?.user?.nombreNivel;
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}roles/all`,
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
      descripcion: "",
      idNivel:""
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}roles/createRol`,
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
        accessorKey: "idRol", //simple recommended way to define a column
        header: "idRol",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "descripcion", //alternate way
        header: "Descripcion",
        Header: <i style={{ color: "blue" }}>Rol</i>, //optional custom markup
      },
      {
        accessorKey: "esActivo", //simple recommended way to define a column
        header: "Estado",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>{renderedCellValue}</strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "nombreNivel", //simple recommended way to define a column
        header: "nombre Nivel",
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
            <Modal.Header>Agregar Rol</Modal.Header>
            <Modal.Body>
              <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
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
                    <Label htmlFor="idNivel" value="Selecciona un nivel al rol" />
                  </div>
                  <Select id="idNivel" name="idNivel" {...register("idNivel")}>
                    {data.niveles ? (
                      data?.niveles.map((pres, index) => (
                        <option key={index} value={pres.idNivel}>
                          {pres.nombreNivel}
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
          <h1>Roles</h1>
          <Card className="max-w-4xl mb-4 md:max-w-4xl">
            <MaterialReactTable
              columns={columns}
              enableRowActions
              data={data?.roles ? data.roles : []}
              enableDensityToggle={false}
              initialState={{ density: "compact" }}
              muiTableProps={{
                sx: {
                  border: "1px solid rgba(81, 81, 81, 1)",
                },
              }}
              renderRowActions={({ row, table }) => (
                <div className="flex">
                  <Tooltip content="Editar">
                    <Button
                      color="warning"
                      pill
                      onClick={() => {
                        router.push(
                          `/moduloSeguridad/roles/${row.getValue("idRol")}`
                        );
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Cambiar estado">
                    <Button
                      color="failure"
                      pill
                      onClick={async () => {
                        if (
                          !confirm(
                            `Deseas cambiar el estado del rol: ${row.getValue(
                              "descripcion"
                            )}`
                          )
                        ) {
                          return;
                        }
                        let res = await axios.delete(
                          `${
                            process.env.NEXT_PUBLIC_API_URL
                          }roles/changeStatusRole/${row.getValue(
                            "idRol"
                          )}`
                        );
                        toast(`${res.data?.message}`, {
                          style: { background: "red" },
                        });
                        mutate();
                      }}
                    >
                      <PowerSettingsNewTwoToneIcon />
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
        <Spin/>
      )}
    </div>
  );
}

export default Roles;
