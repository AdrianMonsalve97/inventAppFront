import api from "../config/api";
import { Empresa } from "../core/Empresa";

const API_URL = "/api/empresas";

export const obtenerEmpresas  = async (): Promise<Empresa[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener empresas:", error);
        throw error; 
    }
};

export const crearEmpresa = async (empresa: Empresa) => {
    try {
        const response = await api.post(API_URL +"/crear", empresa); 
        return response.data;
    } catch (error) {
        console.error("Error al crear empresa:", error);
        throw error;
    }
};

export const actualizarEmpresa = async (empresa: Empresa): Promise<void> => {
    try {
        await api.put(`${API_URL}/${empresa.nit}`, empresa); 
    } catch (error) {
        console.error("Error al actualizar empresa:", error);
        throw error; 
    }
};

export const eliminarEmpresa = async (nombre: string): Promise<void> => {
    try {
        await api.delete(`${API_URL}/borrar/${encodeURIComponent(nombre)}`); 
    } catch (error) {
        console.error("Error al eliminar empresa:", error);
        throw error; 
    }
};