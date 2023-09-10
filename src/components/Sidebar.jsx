"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
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
  return (() => {
    switch (nombreNivel) {
      case "ADMINISTRACION": //si el usuario esta autenticado retorna el dashboard
        return (
          <div className="w-72 h-screen">
            <Sidebar aria-label="Sidebar with multi-level dropdown example h-screen">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                 <Sidebar.Item as={Link} href="/" icon={HiChartPie}>
                  DASHBOARD
                 </Sidebar.Item>
                 <Sidebar.Item as={Link} href="/moduloProductos" icon={HiShoppingBag}>
                 PRODUCTOS
                 </Sidebar.Item>
                  <Sidebar.Item as={Link} href="/moduloSeguridad" icon={HiUser} >
                      Seguridad
                  </Sidebar.Item>
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
      case "loading":
        return null;
      case "unauthenticated":
        return null;
      default:
        return null;
    }
  })();
};

export default Slidebar;
