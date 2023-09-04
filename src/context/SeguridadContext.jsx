"use client";
import { createContext, useState, useContext } from "react";
export const SeguridadContext = createContext();
export const useSecurity = () => useContext(SeguridadContext);
export function SeguridadContextProvider(props) {
  const [Empresas, setEmpresas] = useState([]); 
  const pintarEmpresas = (data) =>{
    setEmpresas(data); 
  }
  return (
    <SeguridadContext.Provider
      value={{
        Empresas, pintarEmpresas
      }}
    >
      {props.children}
    </SeguridadContext.Provider>
  );
}