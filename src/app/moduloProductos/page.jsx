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

function ProductosPage() {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const router = useRouter();
  const { data: session } = useSession();
  let idEmpresa = session?.user?.idEmpresa; //obtenemos la empresa del que esta logueado en la app
  let idUsuario = session?.user?.idUsuario;
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}productos/settingsProducto/${idEmpresa}`,
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
      codigo: "",
      descripcion: "",
      tipoprod: "",
      precio_costo: 0,
      ganancia: 0,
      precio_venta: 0,
      stock: 0,
      stock_minimo: 0,
      lote: "",
      idCategoria: 0,
      idMarca: 0,
      idPresentacion: null,
      idSabor: null,
      idEmpresa: idEmpresa,
      idUsuario: idUsuario,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}productos/createProducto`,
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
        accessorKey: "precio_venta", //simple recommended way to define a column
        header: "precio venta",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>{renderedCellValue || 0}</strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "stock", //simple recommended way to define a column
        header: "STOCK",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>{renderedCellValue || 0}</strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "stock_minimo", //alternate way
        header: "stock_minimo",
        size: 50,
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
        size: 50,
        Header: <i style={{ color: "blue" }}>Categoria</i>, //optional custom markup
      },
      {
        accessorKey: "marca", //alternate way
        header: "marca",
        size: 50,
        Header: <i style={{ color: "blue" }}>Marca</i>, //optional custom markup
      },
      {
        accessorKey: "sabor", //alternate way
        header: "Sabor",
        size: 50,
        Header: <i style={{ color: "blue" }}>Sabor</i>, //optional custom markup
      },
      {
        accessorKey: "presentacion", //alternate way
        header: "presentacion",
        size: 50,
        Header: <i style={{ color: "blue" }}>Presentacion</i>, //optional custom markup
      },
      {
        accessorKey: "Estado", //alternate way
        header: "Estado",
        size: 50,
        Header: <i style={{ color: "blue" }}>Estado</i>, //optional custom markup
      },
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
            <Modal.Header>Agregar Producto</Modal.Header>
            <Modal.Body>
              <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="tipoprod"
                      value="Selecciona el tipo de producto"
                    />
                  </div>
                  <Radio
                    defaultChecked
                    id="tipoprod"
                    name="tipoprod"
                    value="EXISTENTE"
                    {...register("tipoprod", {
                      required: {
                        value: true,
                        message: "debes seleccionar el tipo de producto",
                      },
                    })}
                  />
                  <Label htmlFor="tipoprod" value="EXISTENTE" />
                  <Radio
                    id="tipoprod"
                    name="tipoprod"
                    value="COMPRADO"
                    {...register("tipoprod", {
                      required: {
                        value: true,
                        message: "debes seleccionar el tipo de producto",
                      },
                    })}
                  />
                  <Label htmlFor="tipoprod" value="COMPRADO" />
                  {errors.tipoprod && (
                    <span className="text-red-600">
                      {errors.tipoprod.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="codigo" value="codigo sku" />
                  </div>
                  <TextInput
                    id="codigo"
                    placeholder="3234"
                    type="text"
                    {...register("codigo", {
                      required: {
                        value: true,
                        message: "codigo sku requerido",
                      },
                    })}
                    name="codigo"
                  />
                  {errors.codigo && (
                    <span className="text-red-600">
                      {errors.codigo.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="descripcion" value="descripcion producto" />
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
                      maxLength: 250,
                      minLength: 2,
                    })}
                  />
                  {errors.descripcion?.type === "required" && (
                    <span className="text-red-600">Descripcion requerida</span>
                  )}
                  {errors.descripcion?.type === "maxLength" && (
                    <span className="text-red-600">
                      La descripcion no debe superar los 250 caracteres
                    </span>
                  )}
                  {errors.descripcion?.type === "minLength" && (
                    <span className="text-red-600">
                      La descripcion debe ser mayor a 2 caracteres
                    </span>
                  )}
                </div>
                {getValues("tipoprod") === "EXISTENTE" ? (
                  <>
                    <div>
                      <div className="mb-2">
                        <Label htmlFor="stock" value="stock existente" />
                        <TextInput
                          id="stock"
                          name="stock"
                          type="number"
                          min={0}
                          {...register("stock", {
                            required: {
                              value: true,
                              message: "precio costo requerido",
                            },
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "solo numeros",
                            },
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
                        <Label htmlFor="precio_costo" value="Precio Costo" />
                        <TextInput
                          id="precio_costo"
                          name="precio_costo"
                          type="text"
                          {...register("precio_costo", {
                            required: {
                              value: true,
                              message: "precio costo requerido",
                            },
                            pattern: {
                              value: /^[0-9.]*$/,
                              message: "solo numeros",
                            },
                          })}
                        />
                        {errors.precio_costo && (
                          <span className="text-red-600">
                            {errors.precio_costo.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <Label
                          htmlFor="ganancia"
                          value="Ingresa porcentaje de ganancia"
                        />
                        <TextInput
                          id="ganancia"
                          name="ganancia"
                          type="text"
                          {...register("ganancia", {
                            required: {
                              value: true,
                              message: "porcentaje de ganancia requerido",
                            },
                            pattern: {
                              value: /^[0-9.]*$/,
                              message: "solo numeros",
                            },
                          })}
                        />
                        {errors.ganancia && (
                          <span className="text-red-600">
                            {errors.ganancia.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Button
                        color="light"
                        pill
                        onClick={() => {
                          let ganancia = parseInt(getValues("ganancia")) / 100;
                          let precioCosto = parseFloat(
                            getValues("precio_costo")
                          );
                          let precioAsumar = precioCosto * ganancia;
                          let precioVenta = precioCosto + precioAsumar;
                          setValue("precio_venta", precioVenta);
                        }}
                      >
                        <p>Calcular PrecioVenta</p>
                      </Button>
                    </div>
                    <div>
                      <div className="mb-2">
                        <Label
                          htmlFor="precio_venta"
                          value="PRECIO VENTA CALCULADO"
                        />
                        <TextInput
                          id="precio_venta"
                          name="precio_venta"
                          disabled
                          type="text"
                          {...register("precio_venta", {
                            required: {
                              value: true,
                              message: "Producto requerido",
                            },
                            pattern: {
                              value: /^[1-9.]*$/,
                              message: "Codigo de producto no válido",
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
                  </>
                ) : null}
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="stock_minimo"
                      value="stock minimo de producto"
                    />
                  </div>
                  <TextInput
                    id="stock_minimo"
                    name="stock_minimo"
                    type="number"
                    min={0}
                    {...register("stock_minimo", {
                      required: {
                        value: true,
                        message: "stock_minimo requerido",
                      },
                    })}
                  />
                  {errors.stock_minimo && (
                    <span className="text-red-600">
                      {errors.stock_minimo.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="lote"
                      value="lote/fecha de vencimiento del producto"
                    />
                  </div>
                  <TextInput
                    id="lote"
                    name="lote"
                    type="date"
                    {...register("lote", {
                      required: {
                        value: true,
                        message: "lote requerido",
                      },
                    })}
                  />
                  {errors.lote && (
                    <span className="text-red-600">{errors.lote.message}</span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="idCategoria"
                      value="Selecciona una categoria"
                    />
                  </div>
                  <Select
                    id="idCategoria"
                    name="idCategoria"
                    {...register("idCategoria")}
                  >
                    {data.categorias ? (
                      data?.categorias.map((cat, index) => (
                        <option key={index} value={cat.idCategoria}>
                          {cat.descripcion}
                        </option>
                      ))
                    ) : (
                      <option>NO HAY REGISTROS</option>
                    )}
                  </Select>
                </div>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="idMarca" value="Selecciona una Marca" />
                  </div>
                  <Select id="idMarca" name="idMarca" {...register("idMarca")}>
                    {data.marcas ? (
                      data?.marcas.map((marc, index) => (
                        <option key={index} value={marc.idMarca}>
                          {marc.Marca}
                        </option>
                      ))
                    ) : (
                      <option>no hay registros</option>
                    )}
                  </Select>
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      htmlFor="idPresentacion"
                      value="Selecciona una Presentación"
                    />
                  </div>
                  <Select
                    id="idPresentacion"
                    name="idPresentacion"
                    {...register("idPresentacion")}
                  >
                    {data.presentaciones ? (
                      data?.presentaciones.map((pres, index) => (
                        <option key={index} value={pres.idPresentacion}>
                          {pres.presentacion}
                        </option>
                      ))
                    ) : (
                      <option>no hay registros</option>
                    )}
                  </Select>
                </div>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="idSabor" value="Selecciona un sabor" />
                  </div>
                  <Select id="idSabor" name="idSabor" {...register("idSabor")}>
                    {data.sabores ? (
                      data?.sabores.map((pres, index) => (
                        <option key={index} value={pres.idSabor}>
                          {pres.sabor}
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
          <h1>PRODUCTOS</h1>
          <Card className="w-1/2 mb-4 md:w-1/2">
            <MaterialReactTable
              columns={columns}
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
                  <Tooltip content="Editar">
                    <Button
                      color="warning"
                      pill
                      onClick={() => {
                        router.push(
                          `/moduloProductos/sabores/${row.getValue("codigo")}`
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
                            `Deseas cambiar el estado del producto: ${row.getValue(
                              "descripcion"
                            )}`
                          )
                        ) {
                          return;
                        }
                        let res = await axios.delete(
                          `${
                            process.env.NEXT_PUBLIC_API_URL
                          }productos/changeStatusProd/${row.getValue(
                            "codigo"
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
        <h1>Espera....</h1>
      )}
    </div>
  );
}

export default ProductosPage;
