import axios from "axios";
import { Producto } from "../core/Producto";

const API_URL = "http://localhost:8080/productos";

export const listarProductos = async () => {
  const response = await axios.get(`${API_URL}/listproductos`);
  return response.data;
};

export const listarProductosPorNit = async (nit: string) => {
  const response = await axios.get(`${API_URL}/productos/listarxnit/${nit}`);
  return response.data;
};

export const crearProducto = async (producto: Producto) => {
  const response = await axios.post(`${API_URL}/crear`, producto);
  return response.data;
};

export const obtenerProductoPorId = async (id: string) => {
  const response = await axios.get(`${API_URL}/productoxid/${id}`);
  return response.data;
};

export const actualizarProducto = async (id: string, producto: Partial<Producto>) => {
  await axios.put(`${API_URL}/actualizarproducto/${id}`, producto);
};

export const eliminarProducto = async (id: string) => {
  await axios.delete(`${API_URL}/eliminarproducto/${id}`);
};
