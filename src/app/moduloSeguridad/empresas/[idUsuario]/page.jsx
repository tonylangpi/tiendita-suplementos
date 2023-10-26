"use client";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { MaterialReactTable } from "material-react-table";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Label,
  TextInput,
  Select,
  Modal,
  Tooltip,
} from "flowbite-react";
import Delete from "@mui/icons-material/Delete";
export default function UsuarioEmpresa({params}) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}usuarios/getUserEmpresas/${params.idUsuario}`,
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
      idEmpresa: "",
      idUsuario: params.idUsuario,
    },
  });
  const columnsEmpresa = useMemo(
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
        header: "empresa",
        Header: <i style={{ color: "blue" }}>Empresa</i>, //optional custom markup
      },
      {
        accessorKey: "direccion", //alternate way
        enableEditing: false,
        header: "direccion",
        Header: <i style={{ color: "blue" }}>Direccion</i>, //optional custom markup
      },
    ],
    []
  );

  const columnasEmpresasAsignadas = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "id", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "nombre", //alternate way
        header: "empresa",
        Header: <i style={{ color: "blue" }}>Nombre usuario</i>, //optional custom markup
      },
      {
        accessorKey: "correo", //alternate way
        enableEditing: false,
        header: "direccion",
        Header: <i style={{ color: "blue" }}>correo usuario</i>, //optional custom markup
      },
      {
        accessorKey: "celular", //alternate way
        enableEditing: false,
        header: "direccion",
        Header: <i style={{ color: "blue" }}>celular usuario</i>, //optional custom markup
      },
      {
        accessorKey: "Empresa", //alternate way
        enableEditing: false,
        header: "Empresa",
        Header: <i style={{ color: "blue" }}>Empresa usuario</i>, //optional custom markup
      },
      {
        accessorKey: "direccion", //alternate way
        enableEditing: false,
        header: "direccion",
        Header: <i style={{ color: "blue" }}>direccion empresa</i>, //optional custom markup
      }
    ],
    []
  );


  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}usuarios/asignacionEmpresa`,
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
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Elegir Empresa</Modal.Header>
        <Modal.Body>
          <MaterialReactTable
            columns={columnsEmpresa}
            enableRowActions
            data={data?.empresas ? data?.empresas : []}
            enableDensityToggle={false}
            initialState={{ density: "compact" }}
            muiTableProps={{
              sx: {
                border: "1px solid rgba(81, 81, 81, 1)",
              },
            }}
            renderRowActions={({ row, table }) => (
              <div className="flex">
                <Button
                  color="failure"
                  pill
                  onClick={() => {
                    setValue("idEmpresa", row.getValue("idEmpresa"));
                    props.setOpenModal(undefined);
                  }}
                >
                  seleccionar
                </Button>
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
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="flex flex-col pt-5">
        <Card className="max-w-sm mb-4 md:max-w-2xl">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Asignar Empresas Usuario
          </h5>
          <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div>
              <div className="mb-2">
                <Label htmlFor="Empresa" value="Selecciona una empresa" />
                <Button onClick={() => props.setOpenModal("default")}>
                  Buscar
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="idEmpresa" value="ID EMPRESA ELEGIDA" />
                <TextInput
                  id="idEmpresa"
                  name="idEmpresa"
                  disabled
                  type="text"
                  {...register("idEmpresa", {
                    required: {
                      value: true,
                      message: "Empresa requerida",
                    },
                  })}
                />
                {errors.idEmpresa && (
                  <span className="text-red-600">
                    {errors.idEmpresa.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="idUsuario" value="ID USUARIO" />
                <TextInput
                  id="idUsuario"
                  name="idUsuario"
                  disabled
                  type="text"
                  {...register("idUsuario", {
                    required: {
                      value: true,
                      message: "id del usuario requerido",
                    },
                  })}
                />
                {errors.idUsuario && (
                  <span className="text-red-600">
                    {errors.idUsuario.message}
                  </span>
                )}
              </div>
            </div>
            <Button type="submit">Crear</Button>
          </form>
          <Button  onClick={() =>{router.back();}}>Regresar</Button>
        </Card>
        <h3>Empresas a las que pertenece este usuario</h3>
        <Card className="max-w-sm mb-4 md:max-w-2xl">
          <MaterialReactTable
            columns={columnasEmpresasAsignadas}
            enableRowActions
            data={data?.empresasAsignadas ? data.empresasAsignadas : []}
            enableDensityToggle={false}
            initialState={{
              density: "compact",
              columnVisibility: { Tipo_Compra: false, ProveedorId: false },
            }}
            muiTableProps={{
              sx: {
                border: "1px solid rgba(81, 81, 81, 1)",
              },
            }}
            renderRowActions={({ row, table }) => (
              <div className="flex">
                <Tooltip content="Quitarlo de esta empresa">
                  <Button
                    color="failure"
                    pill
                    onClick={async () => {
                      if (
                        !confirm(
                          `Deseas eliminar el usuario de la empresa : ${row.getValue(
                            "Empresa"
                          )}`
                        )
                      ) {
                        return;
                      }
                      const res = await axios.delete(
                        `${
                          process.env.NEXT_PUBLIC_API_URL
                        }usuarios/quitarUsuarioEmpresa/${row.getValue(
                          "id"
                        )}`
                      );
                      toast(res.data?.message,{style:{background:'red'}});
                      mutate();
                    }}
                  >
                    <Delete />
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
