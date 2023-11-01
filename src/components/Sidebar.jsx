"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar, Button } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import Link from "next/link";

const Slidebar = () => {
  const { data: session } = useSession();
  let nombreNivel = session?.user?.nombreNivel;
  const router = useRouter();
  return (() => {
    switch (nombreNivel) {
      case "ADMINISTRACION": //si el usuario esta autenticado retorna el dashboard
        return (
          <div className="w-72 h-screen">
            <Sidebar aria-label="Sidebar with multi-level dropdown example h-screen">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item as={Link} href="/" icon={HiChartPie}>
                    DAHSHBOARD
                  </Sidebar.Item>
                  <Sidebar.Collapse icon={HiViewBoards} label="Productos">
                    <Sidebar.Item as={Link} href="/moduloProductos">
                      Productos
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloProductos/categorias">
                      categorias
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloProductos/marcas">
                      marcas
                    </Sidebar.Item>
                    <Sidebar.Item
                      as={Link}
                      href="/moduloProductos/presentaciones"
                    >
                      presentaciones
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloProductos/sabores">
                      sabores
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Collapse icon={HiShoppingBag} label="Ventas">
                    <Sidebar.Item as={Link} href="/moduloVentas">
                       Ventas
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/tipoventas">
                      tipo Ventas
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/metodosPago">
                      Metodos de pago
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/clientes">
                      Clientes
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/reporteVentas">
                      Reporte Ventas
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Collapse icon={HiShoppingBag} label="Compras">
                    <Sidebar.Item as={Link} href="/moduloCompras">
                      Compras
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloCompras/proveedores">
                      proveedores
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloCompras/tipocompras">
                      tipo de compras
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Collapse icon={HiUser} label="Seguridad">
                    <Sidebar.Item as={Link} href="/moduloSeguridad">
                      usuarios
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloSeguridad/empresas">
                      empresas
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloSeguridad/roles">
                      roles
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloSeguridad/perfil">
                      perfil
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Item>
                    <Button
                      onClick={() => {
                        signOut();
                      }}
                      color="failure"
                    >
                      Cerrar Sesion
                    </Button>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        );
      case "USUARIO FINAL":
        return <div className="w-72 h-screen">
        <Sidebar aria-label="Sidebar with multi-level dropdown example h-screen">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item as={Link} href="/" icon={HiChartPie}>
                DAHSHBOARD
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiViewBoards} label="Productos">
                <Sidebar.Item as={Link} href="/moduloProductos">
                  Productos
                </Sidebar.Item>
                <Sidebar.Item as={Link} href="/moduloProductos/categorias">
                  categorias
                </Sidebar.Item>
                <Sidebar.Item as={Link} href="/moduloProductos/marcas">
                  marcas
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/moduloProductos/presentaciones"
                >
                  presentaciones
                </Sidebar.Item>
                <Sidebar.Item as={Link} href="/moduloProductos/sabores">
                  sabores
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiShoppingBag} label="Ventas">
                    <Sidebar.Item as={Link} href="/moduloVentas">
                       Ventas
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/tipoventas">
                      tipo Ventas
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/metodosPago">
                      Metodos de pago
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/clientes">
                      Clientes
                    </Sidebar.Item>
                  </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiShoppingBag} label="Compras">
                <Sidebar.Item as={Link} href="/moduloCompras">
                  Compras
                </Sidebar.Item>
                <Sidebar.Item as={Link} href="/moduloCompras/proveedores">
                  proveedores
                </Sidebar.Item>
                <Sidebar.Item as={Link} href="/moduloCompras/tipocompras">
                  tipo de compras
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiUser} label="Seguridad">
                    <Sidebar.Item as={Link} href="/moduloSeguridad/perfil">
                      perfil
                    </Sidebar.Item>
                  </Sidebar.Collapse>
              <Sidebar.Item>
                <Button
                  onClick={() => {
                    signOut();
                  }}
                  color="failure"
                >
                  Cerrar Sesion
                </Button>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>;
       case "SOPORTE":
        return (
          <div className="w-72 h-screen">
            <Sidebar aria-label="Sidebar with multi-level dropdown example h-screen">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item as={Link} href="/" icon={HiChartPie}>
                    DAHSHBOARD
                  </Sidebar.Item>
                  <Sidebar.Collapse icon={HiViewBoards} label="Productos">
                    <Sidebar.Item as={Link} href="/moduloProductos">
                      Productos
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloProductos/categorias">
                      categorias
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloProductos/marcas">
                      marcas
                    </Sidebar.Item>
                    <Sidebar.Item
                      as={Link}
                      href="/moduloProductos/presentaciones"
                    >
                      presentaciones
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloProductos/sabores">
                      sabores
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Collapse icon={HiShoppingBag} label="Ventas">
                    <Sidebar.Item as={Link} href="/moduloVentas">
                       Ventas
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/tipoventas">
                      tipo Ventas
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/metodosPago">
                      Metodos de pago
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/clientes">
                      Clientes
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloVentas/reporteVentas">
                      Reporte Ventas
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Collapse icon={HiShoppingBag} label="Compras">
                    <Sidebar.Item as={Link} href="/moduloCompras">
                      Compras
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloCompras/proveedores">
                      proveedores
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloCompras/tipocompras">
                      tipo de compras
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Collapse icon={HiUser} label="Seguridad">
                    <Sidebar.Item as={Link} href="/moduloSeguridad">
                      usuarios
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloSeguridad/empresas">
                      empresas
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloSeguridad/roles">
                      roles
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} href="/moduloSeguridad/perfil">
                      perfil
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Item>
                    <Button
                      onClick={() => {
                        signOut();
                      }}
                      color="failure"
                    >
                      Cerrar Sesion
                    </Button>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        );
      case "unauthenticated":
        return null;
      default:
        return null;
    }
  })();
};

export default Slidebar;
