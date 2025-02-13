import api from '../config/api';
import { Cliente } from "../core/Cliente";

const clienteService = {
  crearCliente: async (cliente: Omit<Cliente, 'id'>): Promise<Cliente> => { 
    try {
        const response = await api.post("", cliente);
        return response.data;
    } catch (error) {
        console.error("Error al crear cliente:", error);
        throw error; 
    }
},

    obtenerClientes: async (): Promise<Cliente[]> => {
        try {
            const response = await api.get("clientes/list");
            return response.data;
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            return []; 
        }
    },

    actualizarCliente: async (id: string, cliente: Partial<Omit<Cliente, 'id'>>): Promise<Cliente> => { 
        try {
            const response = await api.put(`/actualizar/${id}`, cliente);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar cliente:", error);
            throw error; 
        }
    },

    eliminarCliente: async (id: string): Promise<void> => { 
        try {
            await api.delete(`/delete/${id}`);
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            throw error; 
        }
    },

    obtenerCliente: async (id: string): Promise<Cliente | null> => {
        try {
            const response = await api.get(`/obetenerclientexud/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener cliente:", error);
            return null; 
        }
    },
};

export default clienteService;