export {default} from 'next-auth/middleware'; 

export const config = {
    matcher: ['/', '/moduloSeguridad', '/moduloSeguridad/empresas','/moduloSeguridad/roles','/moduloProductos', '/moduloProductos/categorias']
}