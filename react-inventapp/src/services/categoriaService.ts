import api from '../config/api';
import { Categoria } from "../core/Categoria";

const API_URL = "api/categorias";

export const listarCategorias = async (): Promise<Categoria[]> =>
    (await api.get(API_URL+"/listarcategorias")).data; 

export const crearCategoria = async (categoria: Categoria): Promise<Categoria> =>
    (await api.post(`${API_URL}/crear`, categoria)).data; 

export const actualizarCategoria = async (categoria: Categoria): Promise<Categoria> =>
    (await api.put(API_URL, categoria)).data;

export const eliminarCategoria = async (id: string) =>
    await api.delete(`${API_URL}/${id}`); 