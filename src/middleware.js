export {default} from 'next-auth/middleware'; 

export const config = {
    matcher: ["/", "/moduloSeguridad/:path*", "/moduloProductos/:path*"]
} // proteccion de rutas xd