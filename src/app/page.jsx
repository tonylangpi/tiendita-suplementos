"use client";
import { useSession } from "next-auth/react";
function HomePage(){
  const { data: session } = useSession();

  return (
    <>
      <section className="container mx-auto p-4">
        <div className="flex justify-center items-center bg-white rounded-lg shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-semibold">BIENVENIDO</h1>
            <p className="text-gray-600">{session?.user?.NombreEmpresa}</p>
            <p className="text-gray-600">{session?.user?.nombre}</p>
            <div className="mt-4">
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
