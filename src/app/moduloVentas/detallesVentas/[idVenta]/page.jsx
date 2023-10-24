"use client";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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

const DetallesVentas = ({ params }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const { data: session } = useSession();
  let idEmpresa = session?.user?.idEmpresa; //obtenemos la empresa del que esta logueado en la app
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}detallesVenta/all?idEmpresa=${idEmpresa}&idEncabezadoVenta=${params.idVenta}`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid},
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      idEncabezadoVenta: params.idVenta ? params.idVenta : "",
      idProducto: "",
      nombreProducto:"",
      stock:0,
      cantidad: 0,
      precio_venta: 0,
      idEmpresa:idEmpresa
    },
  });
  const columnsProductos = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "codigo", //simple recommended way to define a column
        header: "CODIGO",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "descripcion", //alternate way
        header: "Descripcion",
        Header: <i style={{ color: "blue" }}>Descripcion</i>, //optional custom markup
      },
      {
        accessorKey: "precio_costo", //alternate way
        header: "precio_costo",
        Header: <i style={{ color: "blue" }}>Precio Costo</i>, //optional custom markup
      },
      {
        accessorKey: "precio_venta", //alternate way
        header: "precio_venta",
        Header: <i style={{ color: "blue" }}>Precio Venta</i>, //optional custom markup
      },
      {
        accessorKey: "stock", //alternate way
        header: "stock",
        Header: <i style={{ color: "blue" }}>Stock</i>, //optional custom markup
      },
      {
        accessorKey: "ganancia", //alternate way
        header: "ganancia",
        Header: <i style={{ color: "blue" }}>ganancia</i>, //optional custom markup
      },
      
      {
        accessorKey: "Estado", //alternate way
        header: "Estado",
        Header: <i style={{ color: "blue" }}>Estado</i>, //optional custom markup
      },
    ],
    []
  );

  const columnsDetalles = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idDetalleVenta", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "codigo", //alternate way
        header: "codigo",
        Header: <i style={{ color: "blue" }}>CodigoProducto</i>, //optional custom markup
      },
      
      {
        accessorKey: "descripcion", //alternate way
        header: "descripcion",
        Header: <i style={{ color: "blue" }}>Producto</i>, //optional custom markup
      },
      {
        accessorKey: "cantidad", //alternate way
        header: "cantidad",
        Header: <i style={{ color: "blue" }}>Cantidad vendida</i>, //optional custom markup
      },
      {
        accessorKey: "precio_venta", //alternate way
        header: "precio_venta",
        Header: <i style={{ color: "blue" }}>precio Venta</i>, //optional custom markup
      },
      {
        accessorKey: "Subtotal", //alternate way
        header: "Subtotal",
        Header: <i style={{ color: "blue" }}>Subtotal</i>, //optional custom markup
      },
    ],
    []
  );
  const onSubmit = handleSubmit(async (data) => {
    try {
      if(data?.stock == 0){
        toast('YA NO HAY STOCK DE ESTE PRODUCTO',{style:{background:'red'}});
      }else{
        const values = {
          idEncabezadoVenta: data?.idEncabezadoVenta,
          idProducto: data?.idProducto,
          stock:data?.stock - parseInt(data?.cantidad),
          cantidad: data?.cantidad,
          idEmpresa:data?.idEmpresa
          } 
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}detallesVenta/createDetalle`,
            values
          );
          toast(res.data?.message);
          reset();
          mutate();
      }
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
        <Modal.Header>Agregar Producto</Modal.Header>
        <Modal.Body>
          <MaterialReactTable
            columns={columnsProductos}
            enableRowActions
            data={data?.productos ? data.productos : []}
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
                  color="success"
                  pill
                  onClick={() => {
                    setValue("idProducto", row.getValue("codigo"));
                    setValue("precio_venta", row.getValue("precio_venta"));
                    setValue("nombreProducto", row.getValue("descripcion"));
                    if(row.getValue("stock") == 0){
                      setValue("stock", 0);
                    }else{
                      setValue("stock", row.getValue("stock"));
                    }
                    props.setOpenModal(undefined);
                  }}
                >
                  <CheckCircleOutlineIcon />
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
            DETALLES DE LA VENTA
          </h5>
          <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div>
              <div className="mb-2">
                <Label htmlFor="EncabezadoID" value="Encabezado ID" />
              </div>
              <TextInput
                id="idEncabezadoVenta"
                name="idEncabezadoVenta"
                disabled
                {...register("idEncabezadoVenta", {
                  required: {
                    value: true,
                    message: "El id del encabezado es requerido",
                  },
                })}
              />
              {errors.idEncabezadoVenta && (
                <span className="text-red-600">
                  {errors.idEncabezadoVenta.message}
                </span>
              )}
            </div>
            <div>
              <div className="mb-2">
                <Label
                  htmlFor="idProducto"
                  value="Selecciona el producto a vender"
                />
                <Button onClick={() => props.setOpenModal("default")}>
                  SELECCIONAR
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="idProducto" value="ID PRODUCTO ELEGIDO" />
                <TextInput
                  id="idProducto"
                  name="idProducto"
                  disabled
                  type="text"
                  {...register("idProducto", {
                    required: {
                      value: true,
                      message: "Producto requerido",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Codigo de producto no válido",
                    },
                  })}
                />
                {errors.idProducto && (
                  <span className="text-red-600">
                    {errors.idProducto.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="nombreProducto" value="Nombre Producto" />
                <TextInput
                  id="nombreProducto"
                  name="nombreProducto"
                  disabled
                  type="text"
                  {...register("nombreProducto", {
                    required: {
                      value: true,
                      message: "Producto requerido",
                    }
                  })}
                />
                {errors.nombreProducto && (
                  <span className="text-red-600">
                    {errors.nombreProducto.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="stock" value="stock Actual Producto" />
                <TextInput
                  id="stock"
                  name="stock"
                  disabled
                  type="text"
                  {...register("stock", {
                    required: {
                      value: true,
                      message: "stock traido del producto requerido",
                    }
                  })}
                />
                {errors.stock && (
                  <span className="text-red-600">
                    {errors.stock.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="cantidad" value="cantidad despachada" />
                <TextInput
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  min={0}
                  {...register("cantidad", {
                    required: {
                      value: true,
                      message: "cantidad requerida",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "solo numeros",
                    },
                  })}
                />
                {errors.cantidad && (
                  <span className="text-red-600">
                    {errors.cantidad.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="precio_venta" value="Precio Venta" />
                <TextInput
                  id="precio_venta"
                  name="precio_venta"
                  disabled
                  type="text"
                  {...register("precio_venta", {
                    required: {
                      value: true,
                      message: "precio venta requerido",
                    },
                    pattern: {
                      value: /^[0-9.]*$/,
                      message: "solo numeros",
                    },
                  })}
                />
                {errors.precio_venta && (
                  <span className="text-red-600">
                    {errors.precio_venta.message}
                  </span>
                )}
              </div>
            </div>
            <div>
            </div>
            <Button type="submit" disabled={!isValid}>Agregar</Button>
            <Button color="success"
              onClick={()=>{
                 router.back(); 
              }}
            >
            Regresar
            </Button>
          </form>
        </Card>
        <h3>Detalle Venta</h3>
        <Card className="max-w-sm mb-4 md:max-w-2xl">
          <MaterialReactTable
            columns={columnsDetalles}
            enableRowActions
            data={data?.detalles ? data.detalles : []}
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
                <Tooltip content="Quitar el detalle">
                  <Button
                    color="failure"
                    pill
                    onClick={async() => {
                      if (
                        !confirm(
                          `Deseas eliminar el detalle con id : ${row.getValue(
                            "idDetalleVenta"
                          )}`
                        )
                      ) {
                        return;
                      }
                      const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}detallesVenta/deletedetalleventa?idDetalleVenta=${row.getValue("idDetalleVenta")}&idEmpresa=${idEmpresa}`
                      );
                      toast(res.data?.message,{style:{background:'red'}});
                      mutate();
                    }}
                  >
                    <Delete/>
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
};

export default DetallesVentas;
