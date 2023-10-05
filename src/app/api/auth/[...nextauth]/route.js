import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"; 
import  {pool}  from '../../../../config/db';
import bcrypt from 'bcryptjs'; 
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
         email: {label:"Email", type: "email", placeholder:"langpi@gmail.com"},
         password: {label:"Password", type: "password"}
      },
      async authorize(credentials) {
        const [rows] = await pool.query(`SELECT usu.idUsuario,usu.nombre,usu.correo,usu.celular, usu.clave, niv.nombreNivel, Rol.descripcion as rol, em.idEmpresa, em.nombre as NombreEmpresa FROM Usuario usu 
        inner join Rol  on Rol.idRol = usu.idRol 
        inner join Nivel niv on niv.idNivel = Rol.idNivel 
        inner join Empresas_Usuario eu on eu.idUsuario = usu.idUsuario
        inner join Empresa em on em.idEmpresa = eu.idEmpresa
        WHERE usu.correo = ? `, [credentials?.email]);
        let usuarioEncontrado = rows;
        let objetoUsuario = usuarioEncontrado[0];
        if(objetoUsuario == undefined) throw new Error("Credenciales invalidas"); 
        const passworMatch = await bcrypt.compare(credentials.password, objetoUsuario.clave);
        if(!passworMatch) throw new Error("Credenciales invalidas"); 
        // await pool.query('INSERT INTO Bitacora SET ?',{
        //   idUsuario:objetoUsuario.idUsuario
        // })
        return  objetoUsuario; 
      }
    })
  ],
  callbacks: {
      jwt({account, token, user, profile, session}){
          if(user) token.user = user; 
          return token;
      },
      session({session,token}){
        session.user = token.user 
        return session;
      }
  },
  pages: {
    signIn : '/login'
  }
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }