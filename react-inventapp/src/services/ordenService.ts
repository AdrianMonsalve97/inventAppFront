import axios from "axios";

const API_URL = "http://localhost:8080/ordenes";

export const crearOrden = async (orden: {
  clienteId: string;
  productoIds: string[];
}) => {
  try {
    const response = await axios.post(API_URL, orden, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la orden", error);
    throw error;
  }
};
