'use client';
import { Navbar } from 'flowbite-react';
import Link from 'next/link';
export default function SeguridadLayout({children}){
    return <>
      <Navbar
      fluid
      rounded
    >
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          href="/moduloProductos"
        >
          <p>
            Productos
          </p>
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/moduloProductos/categorias"
        >
          <p>
            Categorias
          </p>
        </Navbar.Link>
        <Navbar.Link as={Link} href="/moduloProductos/presentaciones">
          Presentaciones
        </Navbar.Link>
        <Navbar.Link  as={Link} href="/moduloProductos/marcas">
          Marcas
        </Navbar.Link>
        <Navbar.Link  as={Link} href="/moduloProductos/sabores">
          Sabores
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
      {children}
    
    </>
}