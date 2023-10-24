"use client";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
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
export default function Ventas() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const { data: session } = useSession();
  let idEmpresa = session?.user?.idEmpresa;
  let idUsuario = session?.user?.idUsuario;
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}encabezadosVenta/all/${idEmpresa}`,
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
      idCliente: "",
      idMetodoPago: "",
      nitCliente: "",
      nombreCliente: "",
      idEmpresa: idEmpresa,
      idUsuario: idUsuario,
      idtipoVenta: "",
      Estado: "VIGENTE",
    },
  });
  const columnsClientes = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idCliente", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "nitCliente", //alternate way
        header: "cliente nit",
        Header: <i style={{ color: "blue" }}>cliente nit</i>, //optional custom markup
      },
      {
        accessorKey: "nombre", //alternate way
        header: "nombre cliente",
        Header: <i style={{ color: "blue" }}>cliente nombre</i>, //optional custom markup
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

  const columnsEncabezadosVentas = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idEncabezadoVenta", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "idtipoVenta", //alternate way
        header: "ID TIPO VENTA",
        Header: <i style={{ color: "blue" }}>ID TIPO VENTA</i>, //optional custom markup
      },
      {
        accessorKey: "Estado", //alternate way
        header: "Estado Factura",
        Header: <i style={{ color: "blue" }}>Estado de la factura</i>, //optional custom markup
      },
      {
        accessorKey: "nombreTipoVenta", //alternate way
        header: "nombreTipoVenta",
        Header: <i style={{ color: "blue" }}>nombre TipoVenta</i>, //optional custom markup
      },
      {
        accessorKey: "idCliente", //alternate way
        header: "idCliente",
        Header: <i style={{ color: "blue" }}>idCliente</i>, //optional custom markup
      },
      {
        accessorKey: "nombre", //alternate way
        header: "nombre",
        Header: <i style={{ color: "blue" }}>Cliente</i>, //optional custom markup
      },
      {
        accessorKey: "nitCliente", //alternate way
        header: "nitCliente",
        Header: <i style={{ color: "blue" }}>Nit cliente</i>, //optional custom markup
      },
      {
        accessorKey: "Fecha_venta", //alternate way
        header: "Fecha_venta",
        Header: <i style={{ color: "blue" }}>Fecha venta</i>, //optional custom markup
      },
      {
        accessorKey: "Usuario", //alternate way
        header: "Usuario",
        Header: <i style={{ color: "blue" }}>Usuario</i>, //optional custom markup
      },
      {
        accessorKey: "totalVenta", //alternate way
        header: "totalVenta",
        Header: <i style={{ color: "blue" }}>Total venta</i>, //optional custom markup
      },
    ],
    []
  );
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}encabezadosVenta/createFacturaEncabezado`,
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
        <Modal.Header>Agregar Cliente</Modal.Header>
        <Modal.Body>
          <MaterialReactTable
            columns={columnsClientes}
            enableRowActions
            data={data?.clientesActivos ? data.clientesActivos : []}
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
                    setValue("idCliente", row.getValue("idCliente"));
                    setValue("nitCliente", row.getValue("nitCliente"));
                    setValue("nombreCliente", row.getValue("nombre"));
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
            VENTAS ENCABEZADOS
          </h5>
          <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div>
              <div className="mb-2">
                <Label
                  htmlFor="idMetodoPago"
                  value="Selecciona un Metodo de pago"
                />
              </div>
              <Select
                id="idMetodoPago"
                name="idMetodoPago"
                {...register("idMetodoPago", {
                  required: {
                    value: true,
                    message: "El metodo de pago es requerido",
                  },
                })}
              >
                {data?.metodospago ? (
                  data?.metodospago.map((metodospago, index) => (
                    <option key={index} value={metodospago.idMetodoPago}>
                      {metodospago.metodoNombre}
                    </option>
                  ))
                ) : (
                  <option>NO HAY REGISTROS</option>
                )}
              </Select>
              {errors.idMetodoPago && (
                <span className="text-red-600">
                  {errors.idMetodoPago.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="cliente" value="Selecciona un cliente" />
                <Button onClick={() => props.setOpenModal("default")}>
                  SELECCIONAR
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="ClienteId" value="ID CLIENTE ELEGIDO" />
                <TextInput
                  id="ClienteId"
                  name="ClienteId"
                  disabled
                  type="text"
                  {...register("idCliente", {
                    required: {
                      value: true,
                      message: "CLIENTE requerido",
                    },
                  })}
                />
                {errors.idCliente && (
                  <span className="text-red-600">
                    {errors.idCliente.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="nitCliente" value="NIT CLIENTE ELEGIDO" />
                <TextInput
                  id="nitCliente"
                  name="nitCliente"
                  disabled
                  type="text"
                  {...register("nitCliente")}
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="nombreCliente" value="NOMBRE CLIENTE ELEGIDO" />
                <TextInput
                  id="nombreCliente"
                  name="nombreCliente"
                  disabled
                  type="text"
                  {...register("nombreCliente")}
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label
                  htmlFor="idtipoVenta"
                  value="Selecciona un Tipo de venta"
                />
              </div>
              <Select
                id="idtipoVenta"
                name="idtipoVenta"
                {...register("idtipoVenta", {
                  required: {
                    value: true,
                    message: "El tipo de venta es requerido",
                  },
                })}
              >
                {data?.tipoventa ? (
                  data?.tipoventa.map((metodospago, index) => (
                    <option key={index} value={metodospago.idTipoVenta}>
                      {metodospago.nombreTipoVenta}
                    </option>
                  ))
                ) : (
                  <option>NO HAY REGISTROS</option>
                )}
              </Select>
              {errors.idMetodoPago && (
                <span className="text-red-600">
                  {errors.idMetodoPago.message}
                </span>
              )}
            </div>
            <Button type="submit">Crear</Button>
          </form>
        </Card>
        <h3>Facturas Encabezado ventas</h3>
        <Card className="max-w-sm mb-4 md:max-w-2xl">
          <MaterialReactTable
            columns={columnsEncabezadosVentas}
            enableRowActions
            data={data?.encabezados ? data.encabezados : []}
            enableDensityToggle={false}
            initialState={{
              density: "compact",
            }}
            muiTableProps={{
              sx: {
                border: "1px solid rgba(81, 81, 81, 1)",
              },
            }}
            renderRowActions={({ row, table }) => (
              <div className="flex">
                {row.getValue("Estado") == "ANULADA" ? null : (
                  <>
                    <Tooltip content="Administrar Detalles">
                      <Button
                        color="success"
                        pill
                        onClick={() => {
                          router.push(
                            `/moduloVentas/detallesVentas/${row.getValue(
                              "idEncabezadoVenta"
                            )}`
                          );
                        }}
                      >
                        <SettingsApplicationsIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Anular encabezado factura">
                      <Button
                        color="failure"
                        pill
                        onClick={async () => {
                          if (
                            !confirm(
                              `Deseas anular el encabezado venta id : ${row.getValue(
                                "idEncabezadoVenta"
                              )}`
                            )
                          ) {
                            return;
                          }
                          const res = await axios.delete(
                            `${
                              process.env.NEXT_PUBLIC_API_URL
                            }encabezadosVenta/deleteencabezado?idEncabezadoVenta=${row.getValue(
                              "idEncabezadoVenta"
                            )}&idEmpresa=${idEmpresa}&Estado=${row.getValue(
                              "Estado"
                            )}`
                          );
                          toast(res.data?.message, {
                            style: { background: "red" },
                          });
                          mutate();
                        }}
                      >
                        <Delete />
                      </Button>
                    </Tooltip>
                      {
                        row.getValue("totalVenta") == 0 ?(null):(<Tooltip content="GENERAR PDF FACTURA">
                      <Button
                        color="warning"
                        pill
                        onClick={async () => {
                          window.open(
                            `${
                              process.env.NEXT_PUBLIC_API_URL
                            }encabezadosVenta/generarFactura?idEncabezado=${row.getValue(
                              "idEncabezadoVenta"
                            )}&idEmpresa=${idEmpresa}`
                          );
                        }}
                      >
                        <FileDownloadIcon />
                      </Button>
                    </Tooltip>)
                      }
                  </>
                )}
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
