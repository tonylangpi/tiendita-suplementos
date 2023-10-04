"use client";
import React, { useMemo } from "react";
import { Toaster, toast } from 'sonner';
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios, { AxiosError } from "axios";
import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

function EmpresasPage(){
  const [openModal, setOpenModal] = useState();
  const router = useRouter();
  const props = { openModal, setOpenModal };
  /***peticion a la api para las empresas get */
  const { data, mutate} = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}empresas/all`,{
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  /******************************************** */
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    //funciona que captura datos y actualiza los datos a la BD mediante la api
    let res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}empresas/updateEmpresa`, values);
    toast(res.data?.message,{style:{background:'yellow'}});
    mutate();
    exitEditingMode();
  };

  const columns = useMemo(
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
        header: "NombreEmpresa",
        Header: <i style={{ color: "blue" }}>NombreEmpresa</i>, //optional custom markup
      },
      {
        accessorKey: "direccion", //alternate way
        header: "Direccion",
        Header: <i style={{ color: "red" }}>Direccion</i>, //optional custom markup
      },
    ],
    []
  );
  //configuracion del envio de datos post crear una nueva empresa
  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormDAta = new FormData(e.currentTarget);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}empresas/createEmpresa`, {
        nombre: FormDAta.get("nombre"),
        direccion: FormDAta.get("direccion"),
      });
      toast(response?.data?.message);
      mutate();
      props.setOpenModal(undefined)
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
    }
  };

  return (
    <>
    <Toaster position="top-center" offset="80px"/>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Agregar Sucursal</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nombre" value="Nombre" />
              </div>
              <TextInput id="nombre" required type="text" name="nombre" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="direccion" value="Direccion empresa" />
              </div>
              <Textarea
                id="direccion"
                name="direccion"
                placeholder="zona 14 mixco etc..."
                required
                rows={4}
              />
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
      <h1>Sucursales</h1>
      {
        data ? (<MaterialReactTable
        columns={columns}
        enableRowActions
        data={data ? data : []}
        onEditingRowSave={handleSaveRowEdits}
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
              color="warning"
              pill
              onClick={() => {
                table.setEditingRow(row);
              }}
            >
              <EditIcon />
            </Button>
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
      />) : (<h1>ESPERANDO....</h1>)
      }
    </>
  );
}

export default EmpresasPage