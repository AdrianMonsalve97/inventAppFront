import axios from "axios";
import { Cliente } from "../core/Cliente";

const API_URL = "http://localhost:8080/clientes";

export const crearCliente = async (cliente: {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
}) => {
  try {
    const response = await axios.post(API_URL, cliente, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el cliente", error);
    throw error;
  }
};
export const obtenerClientes = async (): Promise<Cliente[]> => {
    try {
      const response = await fetch("http://localhost:8080/clientes/list");
      if (!response.ok) throw new Error("Error en la API");
  
      const data = await response.json();
      return Array.isArray(data) ? data : []; 
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      return [];
    }
  };
  