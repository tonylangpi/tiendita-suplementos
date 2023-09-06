"use client";
import { useSession } from "next-auth/react";
import { Card } from "flowbite-react";
const PerfilPage = () => {
  const { data: session } = useSession();
  //let idUsuario = session?.user?.idUsuario;
  return (
    <section className="flex justify-center items-center min-w-full">
      <Card>
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          {session?.user?.nombre}
        </h5>
        <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
          {session?.user?.correo}
        </p>
        <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
          {session?.user?.nombreNivel}
        </p>
        <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
          {session?.user?.rol}
        </p>
      </Card>
    </section>
  );
};

export default PerfilPage;
