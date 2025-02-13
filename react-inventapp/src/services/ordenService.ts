import { AwardIcon } from "lucide-react";
import api from "../config/api";
import { obtenerEmpresas } from "./empresaService";
import {listarProductos} from "./productService";
const API_URL = "/ordenes";
interface CrearOrdenDTO {
  clienteId: string;
  productoIds: string[];
}

export const OrdenService = {
  crearOrden: async (orden: CrearOrdenDTO) => {
    try {
      const response = await api.post(`${API_URL}/crearorden`, orden);
      return response.data;
    } catch (error) {
      console.error("Error al crear la orden", error);
      throw error;
    }
  },

  actualizarOrden: async (id: string, orden: string) => {
    try {
      const response = await api.put(`${API_URL}/actualizaroden/${id}`, orden);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la orden", error);
      throw error;
    }
  },

  eliminarOrden: async (id: string) => {
    try {
      const response = await api.delete(`${API_URL}/delete/${id}`);
      return response.status === 204;
    } catch (error) {
      console.error("Error al eliminar la orden", error);
      throw error;
    }
  },

  obtenerOrdenesPorCliente: async (clienteId: string) => {
    try {
      const response = await api.get(`${API_URL}/cliente/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las órdenes del cliente", error);
      throw error;
    }
  },

  obtenerOrdenPorId: async (id: string) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la orden", error);
      throw error;
    }
  },

  obtenerInformacionDeLaEmpresa: async () => {
    try {
      const empresa = await obtenerEmpresas();
      return empresa;
    } catch (error) {
      console.error("Error al obtener información de la empresa", error);
      throw error;
    }
  },

  obtenerInformacionProductos: async () => {
    try {
      const empresa = await listarProductos();
      return empresa;
    } catch (error) {
      console.error("Error al obtener información de la empresa", error);
      throw error;
    }
  },
  obtenerTodasLasOrdenes: async () => {
    try {
      const response = await api.get(`${API_URL}/list`);
      return response;
    } catch (error) {
      console.error("Error al obtener información de la empresa", error);
      throw error;
    }
  },
};
