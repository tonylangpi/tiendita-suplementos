"use client";
import React, { useMemo} from "react";
import { Toaster, toast } from 'sonner';
import { useSession } from "next-auth/react";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios, { AxiosError } from "axios";
import { Button, Modal, Label, TextInput, } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function TablaCategorias({datos}) {
  const [openModal, setOpenModal] = useState();
  const router = useRouter();
  const props = { openModal, setOpenModal };

  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "codigo", //simple recommended way to define a column
        header: "CODIGO SKU",
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
        accessorKey: "precio_venta", //alternate way
        header: "Precio Venta",
        Header: <i style={{ color: "blue" }}>Precio Venta</i>, //optional custom markup
      },
      {
        accessorKey: "stock", //alternate way
        header: "stock",
        Header: <i style={{ color: "blue" }}>stock</i>, //optional custom markup
      },
      {
        accessorKey: "stock_minimo", //alternate way
        header: "stock_minimo",
        Header: <i style={{ color: "blue" }}>stock_minimo</i>, //optional custom markup
      },
      {
        accessorKey: "lote", //alternate way
        header: "lote",
        Header: <i style={{ color: "blue" }}>Lote</i>, //optional custom markup
      },
      {
        accessorKey: "Categoria", //alternate way
        header: "Categoria",
        Header: <i style={{ color: "blue" }}>Categoria</i>, //optional custom markup
      },
      {
        accessorKey: "marca", //alternate way
        header: "marca",
        Header: <i style={{ color: "blue" }}>Marca</i>, //optional custom markup
      },
      {
        accessorKey: "sabor", //alternate way
        header: "Sabor",
        Header: <i style={{ color: "blue" }}>Sabor</i>, //optional custom markup
      },
      {
        accessorKey: "presentacion", //alternate way
        header: "presentacion",
        Header: <i style={{ color: "blue" }}>Presentacion</i>, //optional custom markup
      },
    ],
    []
  );
  //configuracion del envio de datos post crear una nueva empresa
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const FormDAta = new FormData(e.currentTarget);
//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}categorias/createCategoria`, {
//         descripcion: FormDAta.get("descripcion"),
//         idUsuario: idUsuario
//       });
//       toast(response.data?.message);
//       router.refresh();
//       props.setOpenModal(undefined)
//     } catch (error) {
//       console.error(error);
//       if (error instanceof AxiosError) {
//         toast(error.response?.data.message);
//       }
//     }
//   };
  
  return (
    <>
     <div className="max-w-2xl">
     <MaterialReactTable
        columns={columns}
        enableRowActions
        data={datos}
        renderRowActions={({ row, table }) => (
          <div className="flex">
            <Button
              color="failure"
              pill
              onClick={() => {router.push(`/moduloProductos/sabores/${row.getValue("codigo")}`)}}
            >
              VER
            </Button>
          </div>
        )}
        positionActionsColumn="last"
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
     </div>
     
    </>
  );
}
