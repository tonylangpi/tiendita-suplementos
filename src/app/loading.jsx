
"use client";

import { Spinner } from 'flowbite-react';
const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
    <Spinner aria-label="Center-aligned spinner example" size="xl" color="success" />
    <p>Cargando...</p>
  </div>
  )
}

export default loading