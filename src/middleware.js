export {default} from 'next-auth/middleware'; 

export const config = {
    matcher: ['/', '/moduloSeguridad', '/moduloSeguridad/empresas','/moduloSeguridad/roles','/moduloProductos', '/moduloProductos/categorias', '/moduloProductos/presentaciones','/moduloProductos/marcas','/moduloProductos/sabores','/moduloSeguridad/perfil']
} // proteccion de rutas xd