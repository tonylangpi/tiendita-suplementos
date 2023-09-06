"use client";
import { useSession } from "next-auth/react";
import { Card } from "flowbite-react";
const Homepage = () => {
  const { data: session } = useSession();

  return (
    <>
      <section className="flex justify-center items-center h-screen">
      <Card>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Bienvenido
        </h1>
        <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
          {session?.user?.nombre}
        </p>
        <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
          {session?.user?.NombreEmpresa}
        </p>
      </Card>
    </section>
    </>

  )
}

export default Homepage
