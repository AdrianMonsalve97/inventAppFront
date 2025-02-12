import axios from "axios";
import { Categoria } from "../core/Categoria";

const API_URL = "http://localhost:8080/api/categorias";

export const listarCategorias = async (): Promise<Categoria[]> =>
  (await axios.get(`${API_URL}`)).data;

export const crearCategoria = async (categoria: Categoria): Promise<Categoria> =>
  (await axios.post(`${API_URL}/crear`, categoria)).data;

export const actualizarCategoria = async (categoria: Categoria): Promise<Categoria> =>
  (await axios.put(`${API_URL}`, categoria)).data;

export const eliminarCategoria = async (id: string) =>
  await axios.delete(`${API_URL}/${id}`);
