export {default} from 'next-auth/middleware'; 

export const config = {
    matcher: ["/", "/moduloSeguridad/:path*", "/moduloProductos/:path*", "/moduloCompras/:path*","/moduloVentas/:path*"]
} // proteccion de rutas xd