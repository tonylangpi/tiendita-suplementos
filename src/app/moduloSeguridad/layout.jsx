'use client';

import { Navbar } from 'flowbite-react';
import Link from 'next/link';
import {SeguridadContextProvider} from '../../context/SeguridadContext';
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
          active
          href="/moduloSeguridad"
        >
          <p>
            Usuarios
          </p>
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/moduloSeguridad/empresas"
        >
          <p>
            Empresas
          </p>
        </Navbar.Link>
        <Navbar.Link as={Link} href="/moduloSeguridad/roles">
          Roles
        </Navbar.Link>
        <Navbar.Link as={Link} href="/moduloSeguridad/perfil">
          Perfil
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    <SeguridadContextProvider>
      {children}
    </SeguridadContextProvider>
    
    </>
}