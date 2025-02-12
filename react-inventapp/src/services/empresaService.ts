import axios from "axios";
import { Empresa } from "../core/Empresa";

const API_URL = "http://localhost:8080/api/empresas";


export const obtenerEmpresas = async (): Promise<Empresa[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearEmpresa = async (empresa: Empresa) => {
    const response = await fetch("http://localhost:8080/api/empresas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
      },
      body: JSON.stringify(empresa),
    });
  
    if (!response.ok) {
      throw new Error("Error al crear la empresa");
    }
  
    return response.json();
  };
  
export const actualizarEmpresa = async (empresa: Empresa): Promise<void> => {
  await axios.put(`${API_URL}/${empresa.nit}`, empresa);
};
export const eliminarEmpresa = async (nombre: string): Promise<void> => {
  await axios.delete(`${API_URL}/borrar/${encodeURIComponent(nombre)}`);
};

