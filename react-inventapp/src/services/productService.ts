import api from '../config/api';
import { Producto } from "../core/Producto";

export const listarProductos = async () => {
    const response = await api.get("productos/listproductos");
    return response.data;
};

export const listarProductosPorNit = async (nit: string) => {
    const response = await api.get(`/productos/listarxnit/${nit}`);
    return response.data;
};

export const crearProducto = async (producto: Producto) => {
    const response = await api.post("/productos/crear", producto);
    return response.data;
};

export const obtenerProductoPorId = async (id: string) => {
    const response = await api.get(`/productoxid/${id}`);
    return response.data;
};

export const actualizarProducto = async (id: string, producto: Partial<Producto>) => {
    await api.put(`/actualizarproducto/${id}`, producto);
};

export const eliminarProducto = async (id: string) => {
    await api.delete(`/eliminarproducto/${id}`);
};