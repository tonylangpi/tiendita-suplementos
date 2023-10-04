"use client";

import { Spinner } from "flowbite-react";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Spinner
          aria-label="Center-aligned spinner example"
          size="xl"
          color="success"
        />
        <p>Cargando...</p>
      </div>
    </>
  );
}
