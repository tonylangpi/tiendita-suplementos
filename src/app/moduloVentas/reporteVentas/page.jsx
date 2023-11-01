"use client"
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
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
const ReporteVentas = () => {
   const[consulta, setConsulta] = useState(0); 
    const { data: session } = useSession();
  let idEmpresa = session?.user?.idEmpresa; //obtenemos la empresa del que esta logueado en la app
 
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
        fechaInicio: null,
        fechaFin: null,
        Estado: null,
        idEmpresa: idEmpresa
    },
  });
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
         console.log(data); 
         const datos = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}encabezadosVenta/reporteFactura`,data);
         setConsulta(datos?.data); 
    } catch (error) {
      console.log(error);
    }
  });
  return (
     <>
       <div class="container mx-auto p-4">
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <form onSubmit={onSubmit}>
             <h3>REPORTE DE VENTAS buscar ventas por fechas y estados</h3>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="fechaInicio"
                      value="Desde"
                    />
                  </div>
                  <TextInput
                    id="fechaInicio"
                    name="fechaInicio"
                    type="date"
                    {...register("fechaInicio")}
                  />
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="fechaFin"
                      value="Hasta"
                    />
                  </div>
                  <TextInput
                    id="fechaFin"
                    name="fechaFin"
                    type="date"
                    {...register("fechaFin")}
                  />
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="Estado"
                      value="Selecciona Estado"
                    />
                  </div>
                  <Select
                    id="Estado"
                    name="Estado"
                    {...register("Estado")}
                  >
                     <option value={""}>Todos</option>
                     <option value={'ANULADA'}>ANULADA</option>
                     <option value={'VIGENTE'}>VIGENTE</option>
                  </Select>
                </div>
                <Button type="submit">Buscar</Button>
              </form>
              {
                consulta  ? (
            <MaterialReactTable
              columns={columnsEncabezadosVentas}
              enableRowActions
              data={consulta ? consulta : []}
              enableDensityToggle={false}
              initialState={{ density: "compact" }}
              muiTableProps={{
                sx: {
                  border: "1px solid rgba(81, 81, 81, 1)",
                },
              }}
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
            />) : (<MaterialReactTable
              columns={columnsEncabezadosVentas}
              enableRowActions
              data={consulta ? consulta : []}
              enableDensityToggle={false}
              initialState={{ density: "compact" }}
              muiTableProps={{
                sx: {
                  border: "1px solid rgba(81, 81, 81, 1)",
                },
              }}
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
            />)
              }
        </div>
    </div>
           {/* <h3>REPORTE DE VENTAS</h3>
          <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="fechaInicio"
                      value="Desde"
                    />
                  </div>
                  <TextInput
                    id="fechaInicio"
                    name="fechaInicio"
                    type="date"
                    {...register("fechaInicio")}
                  />
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="fechaFin"
                      value="Hasta"
                    />
                  </div>
                  <TextInput
                    id="fechaFin"
                    name="fechaFin"
                    type="date"
                    {...register("fechaFin")}
                  />
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="Estado"
                      value="Selecciona Estado"
                    />
                  </div>
                  <Select
                    id="Estado"
                    name="Estado"
                    {...register("Estado")}
                  >
                     <option value={""}>Todos</option>
                     <option value={'ANULADA'}>ANULADA</option>
                     <option value={'VIGENTE'}>VIGENTE</option>
                  </Select>
                </div>
                <Button type="submit">Buscar</Button>
              </form> */}
     </>
  )
}

export default ReporteVentas