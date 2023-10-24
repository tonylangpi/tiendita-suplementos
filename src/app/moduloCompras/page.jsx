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
export default function Compras() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const { data: session } = useSession();
  let idEmpresa = session?.user?.idEmpresa;
  let idUsuario = session?.user?.idUsuario;
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}encabezadosCompra/all/${idEmpresa}`,
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
      Tipo_Compra: 0,
      Fecha_compra: "",
      ProveedorId: "",
      idEmpresa: idEmpresa,
      idUsuario: idUsuario,
    },
  });
  const columnsProveedores = useMemo(
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
        accessorKey: "Estado", //alternate way
        enableEditing: false,
        header: "Estado",
        Header: <i style={{ color: "blue" }}>Estado</i>, //optional custom markup
      },
    ],
    []
  );

  const columnsEncabezadosCompras = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idEncabezado", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "Tipo_Compra", //alternate way
        header: "Tipo de Compra",
        Header: <i style={{ color: "blue" }}>Tipo de Compra id</i>, //optional custom markup
      },
      {
        accessorKey: "tipo", //alternate way
        header: "tipo",
        Header: <i style={{ color: "blue" }}>Tipo Compra</i>, //optional custom markup
      },
      {
        accessorKey: "ProveedorId", //alternate way
        header: "ProveedorId",
        Header: <i style={{ color: "blue" }}>Proveedorid</i>, //optional custom markup
      },
      {
        accessorKey: "nombreProve", //alternate way
        header: "nombreProve",
        Header: <i style={{ color: "blue" }}>Proveedor</i>, //optional custom markup
      },
      {
        accessorKey: "Fecha_compra", //alternate way
        header: "Fecha_compra",
        Header: <i style={{ color: "blue" }}>Fecha Compra</i>, //optional custom markup
      },
      {
        accessorKey: "Usuario", //alternate way
        header: "Usuario",
        Header: <i style={{ color: "blue" }}>Usuario</i>, //optional custom markup
      },
      {
        accessorKey: "totalCompra", //alternate way
        header: "TotalCompra",
        Header: <i style={{ color: "blue" }}>Total compra</i>, //optional custom markup
      },
    ],
    []
  );
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}encabezadosCompra/createFacturaEncabezado`,
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
        <Modal.Header>Agregar Proveedor</Modal.Header>
        <Modal.Body>
          <MaterialReactTable
            columns={columnsProveedores}
            enableRowActions
            data={data?.proveedores ? data.proveedores : []}
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
                    setValue("ProveedorId", row.getValue("idProveedor"));
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
            COMPRAS ENCABEZADOS
          </h5>
          <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div>
              <div className="mb-2">
                <Label
                  htmlFor="Tipo_Compra"
                  value="Selecciona un tipo de Compra"
                />
              </div>
              <Select
                id="Tipo_Compra"
                name="Tipo_Compra"
                {...register("Tipo_Compra", {
                  required: {
                    value: true,
                    message: "El tipo de compra es requerido",
                  },
                })}
              >
                {data?.tipocompras ? (
                  data?.tipocompras.map((tipocompra, index) => (
                    <option key={index} value={tipocompra.idTipoCompra}>
                      {tipocompra.tipo}
                    </option>
                  ))
                ) : (
                  <option>NO HAY REGISTROS</option>
                )}
              </Select>
              {errors.Tipo_Compra && (
                <span className="text-red-600">
                  {errors.Tipo_Compra.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="Fecha_compra" value="fecha de la compra" />
              </div>
              <TextInput
                id="Fecha_compra"
                name="Fecha_compra"
                type="date"
                {...register("Fecha_compra", {
                  required: {
                    value: true,
                    message: "Fecha_compra requerido",
                  },
                })}
              />
              {errors.Fecha_compra && (
                <span className="text-red-600">
                  {errors.Fecha_compra.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="Proveedor" value="Selecciona un proveedor" />
                <Button onClick={() => props.setOpenModal("default")}>
                  SELECCIONAR
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="ProveedorId" value="ID PROVEEDOR ELEGIDO" />
                <TextInput
                  id="ProveedorId"
                  name="ProveedorId"
                  disabled
                  type="text"
                  {...register("ProveedorId", {
                    required: {
                      value: true,
                      message: "Proveedor requerido",
                    },
                  })}
                />
                {errors.ProveedorId && (
                  <span className="text-red-600">
                    {errors.ProveedorId.message}
                  </span>
                )}
              </div>
            </div>
            <Button type="submit">Crear</Button>
          </form>
        </Card>
        <h3>Facturas Encabezado Compras</h3>
        <Card className="max-w-sm mb-4 md:max-w-2xl">
          <MaterialReactTable
            columns={columnsEncabezadosCompras}
            enableRowActions
            data={data?.encabezados ? data.encabezados : []}
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
                <Tooltip content="Administrar Detalles">
                  <Button
                    color="success"
                    pill
                    onClick={() => {
                      router.push(
                        `/moduloCompras/detallesCompra/${row.getValue(
                          "idEncabezado"
                        )}`
                      );
                    }}
                  >
                    <SettingsApplicationsIcon />
                  </Button>
                </Tooltip>
                <Tooltip content="Eliminar encabezado">
                  <Button
                    color="failure"
                    pill
                    onClick={async () => {
                      if (
                        !confirm(
                          `Deseas eliminar el encabezado con id : ${row.getValue(
                            "idEncabezado"
                          )}`
                        )
                      ) {
                        return;
                      }
                      const res = await axios.delete(
                        `${
                          process.env.NEXT_PUBLIC_API_URL
                        }encabezadosCompra/deleteencabezado?idEncabezado=${row.getValue(
                          "idEncabezado"
                        )}&idEmpresa=${idEmpresa}`
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
