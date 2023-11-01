"use client";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import EditIcon from "@mui/icons-material/Edit";
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import { MaterialReactTable } from "material-react-table";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Label,
  TextInput,
  Textarea,
  Modal,
  Tooltip,
} from "flowbite-react";
export default function Clientes() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}clientes/all`,
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
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
        nitCliente: "",
        nombre: "",
        telefono: "",
        direccion:"",
        idTipoCliente:""
    },
  });

  const columnsClientes = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idCliente", //simple recommended way to define a column
        header: "ID CLIENTE",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "nitCliente", //alternate way
        header: "Nit del cliente",
        Header: <i style={{ color: "blue" }}>NIT</i>, //optional custom markup
      },
      {
        accessorKey: "nombre", //alternate way
        header: "nombre",
        Header: <i style={{ color: "blue" }}>nombre Cliente</i>, //optional custom markup
      },
      {
        accessorKey: "telefono", //alternate way
        header: "telefono",
        Header: <i style={{ color: "blue" }}>Telefono</i>, //optional custom markup
      },
      {
        accessorKey: "direccion", //alternate way
        header: "direccion",
        Header: <i style={{ color: "blue" }}>Direccion</i>, //optional custom markup
      },
      {
        accessorKey: "Estado", //alternate way
        header: "Estado",
        Header: <i style={{ color: "blue" }}>Estado</i>, //optional custom markup
      }
    ],
    []
  );
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}clientes/create`,
        data
      );
      toast(res.data?.message);
      reset();
      mutate();
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Toaster position="top-center" offset="80px" />
      <div className="flex flex-col pt-5">
        <Card className="max-w-sm mb-4 md:max-w-2xl">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            CLIENTES
          </h5>
          <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div>
              <div className="mb-2">
                <Label
                  htmlFor="nitCliente"
                  value="Ingresa el NIT del cliente"
                />
              </div>
              <TextInput
                id="nitCliente"
                name="nitCliente"
                {...register("nitCliente", {
                  required: {
                    value: true,
                    message: "El nit es requerido",
                  },
                })}
              />
              {errors.nitCliente && (
                <span className="text-red-600">
                  {errors.nitCliente.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="nombre" value="nombre del cliente" />
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
            <Button type="submit">Crear</Button>
          </form>
        </Card>
        <h3>Listado de clientes</h3>
        <Card className="max-w-sm mb-4 md:max-w-2xl">
          <MaterialReactTable
            columns={columnsClientes}
            enableRowActions
            data={data?.clientes ? data.clientes : []}
            enableDensityToggle={false}
            initialState={{
              density: "compact"
            }}
            muiTableProps={{
              sx: {
                border: "1px solid rgba(81, 81, 81, 1)",
              },
            }}
            renderRowActions={({ row, table }) => (
              <div className="flex">
                   <Tooltip content="Cambiar Estado">
          <Button
              gradientMonochrome="failure"
              pill
              onClick={async () => {
                if (
                  !confirm(`Deseas cambiar el estado del cliente: ${row.getValue("nombre")}`)
                ) {
                  return;
                }
                let res = await axios.delete(
                  `${
                    process.env.NEXT_PUBLIC_API_URL
                  }clientes/changeStatus/${row.getValue("idCliente")}`
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
                router.push(
                          `/moduloVentas/clientes/${row.getValue("idCliente")}`
                        );
              }}
            >
              <EditIcon />
            </Button>
          </Tooltip> 
              </div>
            )}
            positionActionsColumn="first"
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
      </div>
    </>
  );
}
